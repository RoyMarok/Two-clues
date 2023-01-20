import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { clamp, getElementByProp } from '../utils'

import {
    ArmourState,
    characterState,
    changeCharacterInState,
    cloneCharacterInState,
    removeCharacterFromState,
    weaponState,
    weaponTraitsState,
    SkillsList,
    FractionsList
} from '../atoms'

import { BorderWrapper, Button, GridCell, FlexWrapper, NonPrintableBlock, OnlyPrintableBlock, Sticky, White, MoveUp, PrintOrDisplayBlock } from './styled'
import { ShortCharacter } from './short-character'
import { GetIcon } from './get-icon'
import { SelectWithOptions } from './weapons-selection'

const defaultFractionCount = {
    min: 0,
    max: 10
}
const makeLimitsString = (limits = defaultFractionCount) => `${limits?.min}-${limits?.max}`
const getLimits = ({ characterItem, fractions }) => fractions.filter(
    (fraction) =>
        fraction?.id === characterItem?.fraction
    )?.[0]?.values
    .filter(
        fractionWarriorType => fractionWarriorType?.id === characterItem?.warriorType
    )[0]?.limits || defaultFractionCount

const gerFranctionAndType = ({ characterItem, fractions }) => {
    const fraction = fractions.filter(
        (fraction) =>
            fraction?.id === characterItem?.fraction
    )?.[0]
    const fractionName = fraction?.title || ''
    const warriorType = fraction?.values.filter(
        fractionWarriorType => fractionWarriorType?.id === characterItem?.warriorType
    )[0]?.title || ''
    return `${fractionName} ${warriorType}`
}

export const Band = () => {
    const skillsList = useRecoilValue(SkillsList.setState)
    const fractions = useRecoilValue(FractionsList.setState)
    const armours = useRecoilValue(ArmourState.setState)
    const characters = useRecoilValue(characterState)
    const weapons = useRecoilValue(weaponState)
    const traits = useRecoilValue(weaponTraitsState)
    const changeCharacter = useSetRecoilState(changeCharacterInState)

    const handleRemoveCharacter = (e) => {
        const index = e.target.value
        const fractionLimits = getLimits({ characterItem: characters[index], fractions })
        const passedCharacter = {
            ...characters[index],
            count: clamp((characters[index]?.count || 0) - 1, fractionLimits?.min, fractionLimits?.max)
        }
        changeCharacter(passedCharacter)
    }

    const handleAddCharacter = (e) => {
        const index = e.target.value
        const fractionLimits = getLimits({ characterItem: characters[index], fractions })
        const passedCharacter = {
            ...characters[index],
            count: clamp((characters[index]?.count || 0) + 1, fractionLimits?.min, fractionLimits?.max)
        }
        changeCharacter(passedCharacter)
    }

    let allCharactersPrice = 0
    let charactersCount = 0
    const passedCharacters = characters.filter(characterItem => characterItem?.count)
    if (characters) {
        passedCharacters.map(character => {
            const armourParams = armours.filter(armouritem => armouritem?.id === character?.armour)?.[0]
            let allWeaponsPrice = parseInt(armourParams?.price) || 0
            charactersCount += character?.count
            if (character.weapons) {
                character.weapons.map(weapon => {
                    allWeaponsPrice += parseInt(getElementByProp({ elements: weapons, prop: 'id', value: weapon })?.price || 0)
                    return null
                })
                allCharactersPrice += (character?.count)*(parseInt(character.price) + parseInt(allWeaponsPrice))
            }
            return null
        })
    }
    console.log('Band', JSON.stringify(characters))

    return (
        <>
            <Sticky>
                <NonPrintableBlock>
                <White>
                    <FlexWrapper>
                        <GridCell width={1} center> <GetIcon icon="face" /></GridCell>
                        <GridCell width={1} center black>{charactersCount}</GridCell>
                        <GridCell width={1} center> <GetIcon icon="coin" /></GridCell>
                        <GridCell width={2} black >{allCharactersPrice}</GridCell>
                    </FlexWrapper>
                </White>
                </NonPrintableBlock>
            </Sticky>
            
            <OnlyPrintableBlock>
                <MoveUp>
                    <FlexWrapper>
                        <GridCell width={1} center> <GetIcon icon="face" /></GridCell>
                        <GridCell width={1} center black>{charactersCount}</GridCell>
                        <GridCell width={1} center> <GetIcon icon="coin" /></GridCell>
                        <GridCell width={2} black >{allCharactersPrice}</GridCell>
                    </FlexWrapper>
                </MoveUp>
            </OnlyPrintableBlock>
            <FlexWrapper columns>
                {characters &&
                    characters.map((characterItem, index) =>
                        <PrintOrDisplayBlock printable={Boolean(characterItem?.count)}>
                            <FlexWrapper>
                                <NonPrintableBlock>
                                    <FlexWrapper>
                                        <GridCell width={2} inverse center>{makeLimitsString(getLimits({ characterItem, fractions }))}</GridCell>
                                        <GridCell center big><Button title="-" value={index} onClick={handleRemoveCharacter} /></GridCell>
                                        <GridCell center big>{characterItem?.count || 0}</GridCell>
                                        <GridCell center big><Button title="+" value={index} onClick={handleAddCharacter} /></GridCell>
                                    </FlexWrapper>
                                </NonPrintableBlock>
                                <OnlyPrintableBlock>
                                    <GridCell center inverse >{characterItem?.count || 0}</GridCell>
                                </OnlyPrintableBlock>
                                <GridCell width={8} >{gerFranctionAndType({ characterItem, fractions })}</GridCell>
                            </FlexWrapper>
                            
                            <ShortCharacter
                                currentStats={characterItem}
                                onDelete={handleRemoveCharacter}
                                index={index}
                                weapons={weapons}
                                allTraits={traits}
                                key={`${index}_${characterItem.title}`}
                                skillsList={skillsList}
                                armours={armours}
                                fractions={fractions}
                                useRemove={characters.length > 1}
                                collapsed
                            />
                            <GridCell center />
                        </PrintOrDisplayBlock>
                    )
                }
            </FlexWrapper>

        </>
    )
}