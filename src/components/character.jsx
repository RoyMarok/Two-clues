import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { withTranslation } from 'react-i18next'

import { clamp, CalculateHealth, CalculateMove, getElementByProp } from '../utils'
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
import { Actions } from './actions'
import { CalculateWeaponsPriceMass } from './short-character'

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
    const { index, currentStats, weapons, allTraits, t, skillsList, limits, armours, fractions, useRemove, onDelete } = props

    const onChange = useSetRecoilState(changeCharacterInState)

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
        fraction,
        names,
        warriorType
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

    const passedSelectedFraction = fractions.filter(fractionItem => fractionItem?.id === fraction)?.[0]
    const passedLimits = { ...limits, ...(passedSelectedFraction?.limits || {}) }

    const passedValuesList = passedSelectedFraction?.values || []
    const selectedWarriorData = (passedSelectedFraction?.values || []).filter(type => type?.id === warriorType)?.[0] || []
    const selectedValues = selectedWarriorData?.values || []

    const selectedWeapons = [...(passedSelectedFraction?.weapons || []), ...(selectedWarriorData?.weapons || [])]
    const passedWeapons = selectedWeapons?.length > 0 ? weapons.filter((weapon) => selectedWeapons.includes(weapon?.id)) : weapons

    const fractionActions = [...(passedSelectedFraction?.actions || []), ...(selectedWarriorData?.actions || [])]
    const passedSkills = [...(skillsList || []), ...(fractionActions || [])]

    const selectFraction = (e) => {
        const { value } = e.target
        onChange({
            ...currentStats,
            index,
            fraction: value
        })
    }
    const selectWarriorType = (e) => {
        const { value } = e.target
        onChange({
            ...currentStats,
            index,
            warriorType: value
        })
    }

    const changeStrength = (e) => {
        e.preventDefault()
        const { value } = e.target
        const passedValue = clamp(value, limits?.strength?.min, limits?.strength?.max)
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
        const passedValue = clamp(value, limits?.agility?.min, limits?.agility?.max)
        onChange({
            ...currentStats,
            index,
            characteristics: {
                ...currentStats?.characteristics,
                agility: passedValue,
                move: clamp(CalculateMove(passedValue), limits?.move?.min, limits?.move?.max)
            }
        })
    }
    const changePerception = (e) => {
        e.preventDefault()
        const { value } = e.target
        const passedValue = clamp(value, limits?.perception?.min, limits?.perception?.max)
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
        const passedValue = clamp(value, limits?.intelligence?.min, limits?.intelligence?.max)
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
        const passedValue = clamp(value, limits?.move?.min, limits?.move?.max)
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
        const passedValue = clamp(value, limits?.health?.min, limits?.health?.max)
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

    const setSelectedNames = (value) => {
        onChange({
            ...currentStats,
            index,
            names: value
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

    const weaponPriceMass = CalculateWeaponsPriceMass({
        armourParams,
        currentStats,
        weapons
    })
    const allWeaponsPrice = weaponPriceMass?.price
    const overallMass = weaponPriceMass?.mass

    const overallPrice = parseInt(price) + parseInt(weaponPriceMass?.price || 0)
    
    return (
        <>  
            <FlexWrapper>
                <div>
                    <NonPrintableBlock>
                        <BorderWrapper>
                            <GridCell width={14} filled center>
                                <FlexWrapper>
                                    {/* <GridCell width={5} inverse center>
                                    <Button title="Дублировать" 
                                        value={index} onClick={handleCloneCharacter} />
                                </GridCell> */}


                                    <GridCell width={5} center >
                                        <SelectWithOptions onChange={selectFraction} elements={fractions} selected={fraction} index={index} passedName="armourSelect" placeholder="Фракция" />
                                    </GridCell>
                                    <GridCell width={5} center>
                                        <SelectWithOptions onChange={selectWarriorType} elements={passedValuesList} selected={warriorType} index={index} passedName="armourSelect" placeholder="Кто" />
                                    </GridCell>
                                    {useRemove &&
                                        <GridCell width={4} inverse center>
                                            <Button title="Удалить персонаж" value={index} onClick={onDelete} />
                                        </GridCell>
                                    }
                                </FlexWrapper>
                            </GridCell>
                        </BorderWrapper>
                    </NonPrintableBlock>
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
                                        <InsertedNames onChange={generateTitle} index={index} selectedFaction={names} setSelectedFaction={setSelectedNames} />
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
                                        <FieldNumber
                                            title="Сила"
                                            value={strength}
                                            onChange={changeStrength} filled
                                            icon="strength"
                                            values={selectedValues}
                                            limits={passedLimits?.strength}
                                        />
                                        <FieldNumber
                                            title="Лов"
                                            value={agility}
                                            onChange={changeAgility}
                                            icon="agility"
                                            values={selectedValues}
                                            limits={passedLimits?.agility}
                                        />
                                        <FieldNumber
                                            title="Вос"
                                            value={perception}
                                            onChange={changePerception}
                                            filled
                                            icon="perception"
                                            values={selectedValues}
                                            limits={passedLimits?.perception}
                                        />
                                        <FieldNumber
                                            title="Инт"
                                            value={intelligence}
                                            onChange={changeIntelligence}
                                            icon="intelligence"
                                            values={selectedValues}
                                            limits={passedLimits?.intelligence}
                                            />
                                    </FlexWrapper>
                                    <FlexWrapper>
                                        <FieldNumber
                                            title="Зд"
                                            value={health}
                                            onChange={changeHealth}
                                            icon="health"
                                            filled
                                          
                                        />
                                        <FieldNumber
                                            title="Движ"
                                            value={move}
                                            onChange={changeMove}
                                            icon={fly ? 'fly' : 'move'}
                                            iconButton
                                            iconButtonClick={changeFly}
                                           
                                        />
                                        <FieldNumber
                                            title="Ужас"
                                            value={panic}
                                            onChange={changePanic}
                                            icon="panic"
                                            filled
                                        />
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
                            <NonPrintableBlock>
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
                                    passedSkills.filter(item => item?.skill).map((item, index) => (
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
                            </NonPrintableBlock>
                            
                            <Actions character={currentStats} skills={passedSkills} />
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
                            weapons={passedWeapons}
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
