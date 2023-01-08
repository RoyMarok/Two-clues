import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { withTranslation } from 'react-i18next'

import { getElementByProp } from '../utils'

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

import { BorderWrapper, Button, GridCell, FlexWrapper, NonPrintableBlock, OnlyPrintableBlock, Sticky, White, MoveUp } from './styled'
import { Character } from './character'
import { GetIcon } from './get-icon'
import { Mordheim } from './mordheim'
import { SelectWithOptions } from './weapons-selection'

const limits = {
    strength: {
        min: 6,
        max: 14
    },
    agility: {
        min: 6,
        max: 14
    },
    perception: {
        min: 6,
        max: 14
    },
    intelligence: {
        min: 6,
        max: 14
    },
    health: {
        min: 1,
        max: 10
    },
    move: {
        min: 3,
        max: 8
    }
}

export const CharactersComponent = (props) => {
    const skillsList = useRecoilValue(SkillsList.setState)
    const fractions = useRecoilValue(FractionsList.setState)
    const armours = useRecoilValue(ArmourState.setState)
    const characters = useRecoilValue(characterState)
    const weapons = useRecoilValue(weaponState)
    const traits = useRecoilValue(weaponTraitsState)
    const changeCharacter = useSetRecoilState(changeCharacterInState)
    const cloneCharacter = useSetRecoilState(cloneCharacterInState)
    const removeCharacter = useSetRecoilState(removeCharacterFromState)

    const handleRemoveCharacter = (e) => {
        removeCharacter(e.target.value)
    }

    const handleAddCharacter = (e) => {
        cloneCharacter()
    }

    const handleCloneCharacter = (e) => {
        cloneCharacter(e.target.value)
    }

    let allCharactersPrice = 0
    if (characters) {
        characters.map(character => {
            const armourParams = armours.filter(armouritem => armouritem?.id === character?.armour)?.[0]
            let allWeaponsPrice = parseInt(armourParams?.price) || 0
            if (character.weapons) {
                character.weapons.map(weapon => {
                    allWeaponsPrice += parseInt(getElementByProp({ elements: weapons, prop: 'id', value: weapon })?.price || 0)
                    return null
                })
                allCharactersPrice += parseInt(character.price) + parseInt(allWeaponsPrice)
            }
            return null
        })
    }

    // console.log('Band', JSON.stringify(characters))

    return (
        <>

            <Sticky>
                <NonPrintableBlock>
                    <White>
                        <FlexWrapper>
                            <GridCell width={1} center> <GetIcon icon="face" /></GridCell>
                            <GridCell width={1} center black>{characters.length}</GridCell>
                            <GridCell width={1} center> <GetIcon icon="coin" /></GridCell>
                            <GridCell width={2} black >{allCharactersPrice}</GridCell>
                        </FlexWrapper>
                        {/* <Mordheim /> */}
                    </White>
                </NonPrintableBlock>
            </Sticky>

            <OnlyPrintableBlock>
                <MoveUp>
                    <FlexWrapper>
                        <GridCell width={1} center> <GetIcon icon="face" /></GridCell>
                        <GridCell width={1} center black>{characters.length}</GridCell>
                        <GridCell width={1} center> <GetIcon icon="coin" /></GridCell>
                        <GridCell width={2} black >{allCharactersPrice}</GridCell>
                    </FlexWrapper>
                </MoveUp>
            </OnlyPrintableBlock>

            {characters &&
                characters.map((characterItem, index) =>
                    <>
                        <Character
                            currentStats={characterItem}
                            onChange={changeCharacter}
                            onDelete={handleRemoveCharacter}
                            index={index}
                            weapons={weapons}
                            allTraits={traits}
                            key={`${index}_${characterItem.title}`}
                            skillsList={skillsList}
                            limits={limits}
                            armours={armours}
                            // values={selectedValues}
                            fractions={fractions}
                            useRemove={characters.length > 1}
                        />
                        <GridCell center />
                    </>

                )
            }
            <NonPrintableBlock>
                <FlexWrapper>
                    <GridCell width={5} inverse center>
                        <Button title="Еще персонаж" onClick={handleAddCharacter} />
                    </GridCell>
                </FlexWrapper>
            </NonPrintableBlock>
        </>
    )
}

export const Characters = withTranslation()(CharactersComponent)