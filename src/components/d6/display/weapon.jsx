import React from 'react'
import { useRecoilValue } from 'recoil'

import { weaponTraitsState } from '../../../atoms'
import { WEAPONS_DAMAGE } from '../../../atoms/d6_character'

import {
    GridCell,
    FlexWrapper,
    NobreakWrapper,

} from '../../styled'

import { Traits } from '../../traits'
import { GetIcon } from '../../get-icon'

import { IconedElement } from './iconed-element'

const nonZeroValue = (value) => value !== 0 ? value : ''

export const Weapon = (props) => {
    const allTraits = useRecoilValue(weaponTraitsState)
    const {
        range,
        str,
        dmg,
        count,
        exp,
        dependencies,
        traits,
        title,
        price,
        character = {},
    } = props

    const {
        strength = 0,
        agility = 0,
        perception = 0,
        intelligence = 0,
    } = character

    const isMelee = traits.includes('melee') && Boolean(character)
    const depIcon = Object.keys(dependencies || {}).filter((attr) => dependencies?.[attr]?.use || dependencies?.[attr])[0]
    // console.log('WEAPON', title, character, traits.includes('melee'), Boolean(character))
    const rangeText = range.min > 1 ? `${range.min}-${range.max}` : range.max
    const passedStr = str + (isMelee ? agility : (character[depIcon] ?? 0))
    const passedDmg = dmg + (isMelee ? strength : 0)
    
    return (
        <NobreakWrapper>
            <FlexWrapper>
                {count > 1 && <GridCell inverse center >{count}</GridCell>}
                <GridCell filled center><GetIcon icon="weapon" color="secondary" /></GridCell>
                <GridCell width={count > 1 ? 10 : 11} filled black wrapper>{title}</GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <IconedElement icon="range" value={rangeText} filled  />
                <GridCell height={2} center>
                    <GridCell width={1} center ><GetIcon color="secondary" icon={isMelee ? 'agility' : depIcon} /></GridCell>
                    <GridCell width={1} center ><GetIcon color="secondary" icon={isMelee ? 'strength' : ''} /></GridCell>
                </GridCell>
                <GridCell height={2} center>
                    <GridCell width={1} center ><GetIcon color="primary" icon="hit" /></GridCell>
                    <GridCell width={1} center filled><GetIcon color="primary" icon="dmg" /></GridCell>
                </GridCell>
                <GridCell height={2} center>
                    <GridCell width={1} center >{nonZeroValue(str)}</GridCell>
                    <GridCell width={1} center filled>{nonZeroValue(dmg)}</GridCell>
                </GridCell>
                <GridCell height={2} center>
                    <GridCell width={1} center  black>{nonZeroValue(passedStr)}</GridCell>
                    <GridCell width={1} center filled black>{nonZeroValue(passedDmg)}</GridCell>
                </GridCell>
                {/* <IconedElement
                    icon="hit"
                    value={passedStr}
                    filled
                />
                <IconedElement
                    icon="dmg"
                    value={passedDmg}
                    
                /> */}
                

                {/* <GridCell /> */}
                {/* <IconedElement
                    icon="strength"
                    value={dependencies.strength?.min > 1 ? dependencies.strength?.min : 0}
                    filled
                    marked={dependencies.strength?.use}
                    important={false}

                />
                <IconedElement
                    icon="agility"
                    value={dependencies.agility?.min > 1 ? dependencies.agility?.min : 0}
                    marked={dependencies.agility?.use}
                    important={false}

                />
                <IconedElement
                    icon="perception"
                    value={dependencies.perception?.min > 1 ? dependencies.perception?.min : 0}
                    filled
                    marked={dependencies.perception?.use}
                    important={false}

                />
                <IconedElement
                    icon="intelligence"
                    value={dependencies.intelligence?.min > 1 ? dependencies.intelligence?.min : 0}
                    marked={dependencies.intelligence?.use}
                    important={false}

                /> */}
                <GridCell width={0.5}/>
                {traits?.length > 0 && <GridCell width={7} height={2} center open>
                    
                    <Traits
                        traits={allTraits}
                        selectedTraits={traits}
                        controlled={false}
                    />
                </GridCell>}
            </FlexWrapper>
        </NobreakWrapper>
    )
}
