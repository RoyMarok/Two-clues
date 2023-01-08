import Reac from 'react'
import { withTranslation } from 'react-i18next'

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
    FlexWrapper
} from './styled'
import { GetIcon } from './get-icon'
import { WeaponDisplay } from './weapon-display'

export const CalculateWeaponsPriceMass = (props) => {
    const {
        armourParams,
        currentStats,
        weapons,
        collapsed = false
    } = props
    const armourMass = parseInt(armourParams?.mass)

    let allWeaponsPrice = parseInt(armourParams?.price) || 0
    let allWeaponsMass = armourMass || 0
    currentStats.weapons.map(item => {
        const singleWeapon = getElementByProp({ elements: weapons, prop: 'id', value: item })
        allWeaponsPrice += parseInt(singleWeapon?.price || 0)
        allWeaponsMass += parseInt(singleWeapon?.mass || 0)
        return null
    })

    return ({
        price: allWeaponsPrice,
        mass: allWeaponsMass
    })
}

export const IconedElement = ({ icon, value, filled, collapsed = false, squared = false }) => {
    const passedValue = value > 0 && value
    return collapsed  ? 
    <GridCell width={2}  center>
        <FlexWrapper>
            <GridCell center >
                <GetIcon icon={icon} color="secondary" />
            </GridCell>
            <GridCell center black>
                    {passedValue}
            </GridCell>
        </FlexWrapper>
    </GridCell>
    : 
    <GridCell width={2} height={3} center>
        <GridCell width={2} center black>
            <GetIcon icon={icon} />
        </GridCell>
            <GridCell width={2} height={2} center filled={filled} big={!squared} black >
            {squared && passedValue ? (<GridCell center inverse verticalCenter>{passedValue}</GridCell>) : passedValue}
        </GridCell>
    </GridCell>}


export const ShortCharacterComponent = (props) => {
    const { currentStats, weapons, allTraits, t, skillsList, armours, fractions, useRemove, onDelete, collapsed } = props
    const {
        title,
        price,
        characteristics,
        skills,
        armour,
        actions,
        fraction,
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
    const selectedWarriorData = (passedSelectedFraction?.values || []).filter(type => type?.id === warriorType)?.[0] || []
    const fractionActions = [...(passedSelectedFraction?.actions || []), ...(selectedWarriorData?.actions || [])]
    const passedSkills = [...(skillsList || []), ...(fractionActions || [])]
    const armourParams = armours.filter(armouritem => armouritem?.id === armour)?.[0]

    const passedWeapons = currentStats?.weapons.map((characterWeapon) => weapons.filter(weapon => characterWeapon === weapon?.id)?.[0])

    const overallPrice = parseInt(price) + CalculateWeaponsPriceMass({
            armourParams,
            currentStats,
            weapons
    })?.price

    return (
        <>
            <BorderWrapper>
                    <FlexWrapper>
                        <GridCell width={12} filled black>{title}</GridCell>
                        <GridCell width={1} center filled><GetIcon color="primary" icon="coin" /></GridCell>
                        <GridCell width={1} inverse center>{overallPrice}</GridCell>
                    </FlexWrapper>
                    <OnlyPrintableBlock>
                    <FlexWrapper>
                            <GridCell width="8" height="6" center>
                                <FlexWrapper>
                                    <IconedElement
                                        icon="strength"
                                        value={strength}
                                        filled
                                    />
                                    <IconedElement
                                        icon="agility"
                                        value={agility}
                                    />
                                    <IconedElement
                                        icon="perception"
                                        value={perception}
                                        filled
                                    />
                                    <IconedElement
                                        icon="intelligence"
                                        value={intelligence}
                                    />
                                </FlexWrapper>
                                <FlexWrapper>
                                    <IconedElement
                                        icon="health"
                                        value={health}
                                        filled
                                    />
                                    <IconedElement
                                        icon={fly ? 'fly' : 'move'}
                                        value={move}
                                    />
                                    <IconedElement
                                        icon="panic"
                                        value={panic}
                                        filled
                                    />
                                    <GridCell width="2" height="3" center>
                                        <GridCell width="2" height="1" center black>
                                            <GetIcon icon="defence" />
                                        </GridCell>
                                        <FlexWrapper>
                                            <GridCell center><GetIcon icon="up" color="black" /></GridCell>
                                            <GridCell center big black>{armourParams?.front}</GridCell>
                                        </FlexWrapper>
                                        <FlexWrapper>
                                            <GridCell center><GetIcon icon="down" color="secondary" /></GridCell>
                                            <GridCell center big black>{armourParams?.rear}</GridCell>
                                        </FlexWrapper>
                                    </GridCell>
                                </FlexWrapper>
                            </GridCell>
                            <GridCell width="6" height="6" center>
                                <FlexWrapper>
                                    <GridCell width={5}>{t('band.character.action')}</GridCell>
                                    <GridCell center black>{actions}</GridCell>
                                </FlexWrapper>
                                {
                                    passedSkills.filter(item => item?.skill && skills[item?.id] > -2).map((item, index) => (
                                        <FlexWrapper key={item?.id}>
                                            <GridCell width={5}>{t(`band.character.skill.${item?.id}`)}</GridCell>
                                            <GridCell center black>{skills[item?.id]}</GridCell>
                                        </FlexWrapper>
                                    ))
                                }
                            </GridCell>
                    </FlexWrapper>
                    {passedWeapons.map((item, index2) =>
                        <WeaponDisplay
                            currentStats={item}
                            weapons={weapons}
                            allTraits={allTraits}
                            
                        />)}
                    </OnlyPrintableBlock>
                    <NonPrintableBlock>
                        <FlexWrapper>
                            <IconedElement
                                icon="strength"
                                value={strength}
                                filled
                                collapsed
                            />
                            <IconedElement
                                icon="agility"
                                value={agility}
                                collapsed
                            />
                            <IconedElement
                                icon="perception"
                                value={perception}
                                filled
                                collapsed
                            />
                            <IconedElement
                                icon="intelligence"
                                value={intelligence}
                                collapsed
                            />
                            <IconedElement
                                icon="health"
                                value={health}
                                filled
                                collapsed
                            />
                            <IconedElement
                                icon={fly ? 'fly' : 'move'}
                                value={move}
                                collapsed
                            />
                        </FlexWrapper>
                    {passedWeapons.map((item, index2) =>
                        <WeaponDisplay
                            currentStats={item}
                            weapons={weapons}
                            allTraits={allTraits}
                            collapsed={collapsed}
                        />)}
                    </NonPrintableBlock>
                    
                
            </BorderWrapper>
        </>
    )
}

export const ShortCharacter = withTranslation()(ShortCharacterComponent)
