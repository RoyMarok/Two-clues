import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

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

export const Band = () => {
    const [fractionsSelected, setFraction] = useState('')
    const [warriorTypeSelected, setWarriorType] = useState('')
    const skillsList = useRecoilValue(SkillsList.setState)
    const fractions = useRecoilValue(FractionsList.setState)
    const armours = useRecoilValue(ArmourState.setState)
    const characters = useRecoilValue(characterState)
    const weapons = useRecoilValue(weaponState)
    const traits = useRecoilValue(weaponTraitsState)
    const changeCharacter = useSetRecoilState(changeCharacterInState)
    const cloneCharacter = useSetRecoilState(cloneCharacterInState)
    const removeCharacter = useSetRecoilState(removeCharacterFromState)

    const selectFraction = (e) => {
        setFraction(e.target.value)
    }
    const selectWarriorType = (e) => {
        setWarriorType(e.target.value)
    }
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
    const passedSelectedFraction = fractions.filter(fraction => fraction?.id === fractionsSelected)?.[0]
    const passedLimits = {...limits, ...(passedSelectedFraction?.limits || {})}
    const passedValuesList = passedSelectedFraction?.values || []
    const selectedValues = (passedSelectedFraction?.values || []).filter(type => type?.id === warriorTypeSelected)?.[0]?.values || []
    const passedWeapons = passedSelectedFraction?.weapons ? weapons.filter((weapon) => passedSelectedFraction?.weapons.includes(weapon?.id)) : weapons

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
                        <NonPrintableBlock>
                            <BorderWrapper>
                                <GridCell width={14} filled center>
                                    <FlexWrapper>
                                        {/* <GridCell width={5} inverse center>
                                    <Button title="Дублировать" 
                                        value={index} onClick={handleCloneCharacter} />
                                </GridCell> */}


                                        <GridCell width={5} center >
                                            <SelectWithOptions onChange={selectFraction} elements={fractions} selected={fractionsSelected} index={index} passedName="armourSelect" placeholder="Фракция" />
                                        </GridCell>
                                        <GridCell width={5} center>
                                            <SelectWithOptions onChange={selectWarriorType} elements={passedValuesList} selected={warriorTypeSelected} index={index} passedName="armourSelect" placeholder="Кто" />
                                        </GridCell>
                                        {characters.length > 1 &&
                                            <GridCell width={4} inverse center>
                                                <Button title="Удалить персонаж" value={index} onClick={handleRemoveCharacter} />
                                            </GridCell>
                                        }
                                    </FlexWrapper>
                                </GridCell>
                            </BorderWrapper>
                        </NonPrintableBlock>
                        <Character
                            currentStats={characterItem}
                            onChange={changeCharacter}
                            onDelete={handleRemoveCharacter}
                            index={index}
                            weapons={passedWeapons}
                            allTraits={traits}
                            key={`${index}_${characterItem.title}`}
                            skillsList={skillsList}
                            limits={passedLimits}
                            armours={armours}
                            values={selectedValues}
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