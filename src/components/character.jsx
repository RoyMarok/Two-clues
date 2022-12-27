import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { withTranslation } from 'react-i18next'

import { ArmourState, SkillsList } from '../atoms'
import { clamp, CalculateHealth, CalculateMove, getElementByProp } from '../utils'
import {
    BorderWrapper,
    Button,
    GridCell,
    NonPrintableBlock,
    NonPrintableText,
    OnlyPrintableBlock,
    OnlyPrintableText,
    Value,
    FlexWrapper } from './styled'
import { Skill } from './skill'
import { FieldNumber } from './field-number'
import { GetIcon } from './get-icon'
import { WeaponsSelection, SelectWithOptions } from './weapons-selection'
import { Mass } from './mass'
import { InsertedNames } from './names-generator'

const actionsOptions = [
    {
        id: '1',
        title: '1 действие'
    },
    {
        id: '2',
        title: '2 действия'
    },
    {
        id: '3',
        title: '3 действия'
    },
    {
        id: '4',
        title: '4 действия'
    },
]

export const CharacterComponent = (props) => {
    const armours = useRecoilValue(ArmourState.setState)
    const skillsList = useRecoilValue(SkillsList.setState)
    const { index, currentStats, onChange, weapons, allTraits, t } = props

    const [titleValue, setTitleValue] = useState(currentStats?.title  || '')

    const handleSetTitleValue = (e) => setTitleValue(e.target.value)
    if (!currentStats || !currentStats?.characteristics) {
        return null
    }
    const {
        price,
        characteristics,
        skills,
        armour,
        actions,
        faction
    } = currentStats
    const {
        agility,
        health,
        intelligence,
        move,
        panic,
        perception,
        strength,
        fly
    } = characteristics

  

    const changeStrength = (e) => {
        e.preventDefault()
        const { value } = e.target
        const passedValue = clamp(value, 6, 14)
        onChange({
            ...currentStats,
            index,
            characteristics: {
                ...currentStats?.characteristics,
                strength: passedValue,
                health: CalculateHealth(passedValue)
            }
        })
    }
    const changeAgility = (e) => {
        e.preventDefault()
        const { value } = e.target
        const passedValue = clamp(value, 6, 14)
        onChange({
            ...currentStats,
            index,
            characteristics: {
                ...currentStats?.characteristics,
                agility: passedValue,
                move: CalculateMove(passedValue)
            }
        })
    }
    const changePerception = (e) => {
        e.preventDefault()
        const { value } = e.target
        const passedValue = clamp(value, 6, 14)
        onChange({
            ...currentStats,
            index,
            characteristics: {
                ...currentStats?.characteristics,
                perception: passedValue
            }
        })
    }
    const changeIntelligence = (e) => {
        e.preventDefault()
        const { value } = e.target
        const passedValue = clamp(value, 6, 14)
        onChange({
            ...currentStats,
            index,
            characteristics: {
                ...currentStats?.characteristics,
                intelligence: passedValue
            }
        })
    }

    const changeMove = (e) => {
        e.preventDefault()
        const { value } = e.target
        const passedValue = clamp(value, 3, 8)
        onChange({
            ...currentStats,
            index,
            characteristics: {
                ...currentStats?.characteristics,
                move: passedValue
            }
        })
    }
    const changeHealth = (e) => {
        e.preventDefault()
        const { value } = e.target
        const passedValue = clamp(value, 1, 10)
        onChange({
            ...currentStats,
            index,
            characteristics: {
                ...currentStats?.characteristics,
                health: passedValue
            }
        })
    }
    const changePanic = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            ...currentStats,
            index,
            characteristics: {
                ...currentStats?.characteristics,
                panic: clamp(value, 0, 10)
            }
        })
    }

    const changeSkill = (skillName) => (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            ...currentStats,
            index,
            skills: {
                ...currentStats?.skills,
                [skillName]: value
            }
        })
    }

    const changeTitle = (e) => {

        onChange({
            ...currentStats,
            index,
            title: titleValue
        })
    }
    const changeFly = (e) => {
        onChange({
            ...currentStats,
            index,
            characteristics: {
                ...currentStats?.characteristics,
                fly: !fly
            }
        })
    }

    const generateTitle = (value) => {
        onChange({
            ...currentStats,
            index,
            title: value
        })
    }

    const setSelectedFaction = (value) => {
        onChange({
            ...currentStats,
            index,
            faction: value
        })
    }

    const selectArmour = (e) => {
        const { value } = e.target 
        onChange({
            ...currentStats,
            index,
            armour: value
        })
    }
    const selectActions = (e) => {
        const { value } = e.target 
        onChange({
            ...currentStats,
            index,
            actions: value
        })
    }
     

    const changeWeapon = (weaponIndex) => (e) => {
        e.preventDefault()
        const { value } = e.target
        console.log('changeWeapon', weaponIndex, value, currentStats.weapons)
        const passedWeapons = [...currentStats.weapons]
        value !== 'clear'
            ? passedWeapons.splice(
                weaponIndex,
                1,
                value !== 'clear' && value)
            : passedWeapons.splice(weaponIndex, 1)
        onChange({
            ...currentStats,
            index,
            weapons: [...passedWeapons]
        })
    }

    const armourParams = armours.filter(armouritem => armouritem?.id === armour)?.[0]
    const armourMass = parseInt(armourParams?.mass)

    let allWeaponsPrice = parseInt(armourParams?.price) || 0
    let allWeaponsMass = armourMass || 0
    currentStats.weapons.map(item => {
        const singleWeapon = getElementByProp({ elements: weapons, prop: 'id', value: item })
        allWeaponsPrice += parseInt(singleWeapon?.price || 0)
        allWeaponsMass += parseInt(singleWeapon?.mass || 0)
        return null
    })

    const overallPrice = parseInt(price) + parseInt(allWeaponsPrice)
    const overallMass = allWeaponsMass

    return (
        <>  
            <FlexWrapper>
                <div>
                    <div>
                        <BorderWrapper>
                            <FlexWrapper>
                                <GridCell width={12} filled serif><Value value={titleValue} onChange={handleSetTitleValue} onBlur={changeTitle} /></GridCell>
                                <GridCell width={1} center filled><GetIcon color="primary" icon="coin" /></GridCell>
                                <GridCell width={1} inverse center>{overallPrice}</GridCell>
                            </FlexWrapper>
                            <FlexWrapper>
                                <NonPrintableBlock>
                                    <GridCell width={8} center>
                                        <InsertedNames onChange={generateTitle} index={index} selectedFaction={faction} setSelectedFaction={setSelectedFaction} />
                                    </GridCell>

                                </NonPrintableBlock>
                                <OnlyPrintableBlock>
                                    <FlexWrapper>
                                        <GridCell filled width={2}>Опыт</GridCell>
                                        <GridCell width={6} ></GridCell>
                                    </FlexWrapper>
                                </OnlyPrintableBlock>

                                <GridCell width={5} >{t('band.character.characteristics')}</GridCell>
                                <GridCell width={1} filled center>{price}</GridCell>

                            </FlexWrapper>

                            <FlexWrapper>
                                <GridCell width="8" height="6" center>
                                    <FlexWrapper>
                                        <FieldNumber title="Сила" value={strength} onChange={changeStrength} filled icon="strength" />
                                        <FieldNumber title="Лов" value={agility} onChange={changeAgility} icon="agility" />
                                        <FieldNumber title="Вос" value={perception} onChange={changePerception} filled icon="perception" />
                                        <FieldNumber title="Инт" value={intelligence} onChange={changeIntelligence} icon="intelligence" />
                                    </FlexWrapper>
                                    <FlexWrapper>
                                        <FieldNumber title="Зд" value={health} onChange={changeHealth} icon="health" filled />
                                        <FieldNumber title="Движ" value={move} onChange={changeMove} icon={fly ? 'fly' : 'move'} iconButton iconButtonClick={changeFly} />
                                        <FieldNumber title="Ужас" value={panic} onChange={changePanic} icon="panic" filled />
                                        <GridCell width="2" height="3" center>
                                            <GridCell width="2" height="1" center black>
                                                <GetIcon icon="defence" />
                                            </GridCell>
                                            <FlexWrapper>
                                                <GridCell center><GetIcon icon="up" color="secondary" /></GridCell>
                                                <GridCell center big black>{armourParams?.front}</GridCell>
                                            </FlexWrapper>
                                            <FlexWrapper>
                                                <GridCell center><GetIcon icon="down" color="secondary" /></GridCell>
                                                <GridCell center big black>{armourParams?.rear}</GridCell>
                                            </FlexWrapper>
                                        </GridCell>
                                        {/* <FieldNumber title="Броня" value={defence} onChange={changeDefence}  icon="defence" /> */}
                                    </FlexWrapper>
                                </GridCell>
                                <GridCell width="6" height="6" center>
                                    {/* <FlexWrapper>
                                    
                                </FlexWrapper> */}

                                    <FlexWrapper>
                                        <GridCell width={5} >{t('band.character.weapons')}</GridCell>
                                        <GridCell width={1} filled center>{allWeaponsPrice}</GridCell>
                                    </FlexWrapper>

                                    <Mass value={overallMass} max={health + 3} black={armourMass} />
                                    <GridCell width="6" center>
                                        <SelectWithOptions onChange={selectArmour} elements={armours} selected={armour} index={index} passedName="armourSelect" placeholder="Броня" />
                                    </GridCell>
                                    <GridCell width="6" center>
                                        <SelectWithOptions onChange={selectActions} elements={actionsOptions} selected={actions} index={index} passedName="actionSelect" />
                                    </GridCell>

                                </GridCell>
                            </FlexWrapper>

                        {/* </BorderWrapper>
                    </div>
                    <div>
                        <BorderWrapper> */}
                            <FlexWrapper>
                                <GridCell width="8" ></GridCell>
                                <GridCell width="1" center >-2</GridCell>
                                <GridCell width="1" center >-1</GridCell>
                                <GridCell width="1" center ></GridCell>
                                <GridCell width="1" center >+1</GridCell>
                                <GridCell width="1" center >+2</GridCell>
                                <GridCell width="1" center >%</GridCell>
                            </FlexWrapper>
                            {
                                skillsList.map((item, index) => (
                                    <Skill
                                        {...(item?.attributes || {})}
                                        title={t(`band.character.skill.${item?.id}`)}
                                        value={skills[item?.id]}
                                        key={item?.id}
                                        even={!(index % 2)}
                                        onChange={changeSkill(item?.id)}
                                        character={characteristics}
                                    />))
                            }

                        </BorderWrapper>
                    </div>
                    
                    <OnlyPrintableBlock>
                        <GridCell center />
                    </OnlyPrintableBlock>
                    
                </div>
        
                <GridCell center />
                <div>
                    {[...currentStats.weapons, ''].map((item, index2) =>
                        <WeaponsSelection
                            passedName={`${index}_${index2}`}
                            key={`${index}_${index2}_${item}`}
                            weapons={weapons}
                            allTraits={allTraits}
                            selected={item}
                            index={index2}
                            onChange={changeWeapon(index2)}
                        />)}
                    
                </div>
                    
            </FlexWrapper>
            <OnlyPrintableBlock>
                <GridCell center />
            </OnlyPrintableBlock>
        </>
    )
}

export const Character = withTranslation()(CharacterComponent)
