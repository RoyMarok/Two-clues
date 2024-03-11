import React from 'react'
import { useRecoilValue } from 'recoil'

import { weaponTraitsState } from '../../../atoms'
import { WEAPONS_DAMAGE } from '../../../atoms/d6_character'

import {
    GridCell,
    FlexWrapper,
} from '../../styled'

import { Traits } from '../../traits'
import { GetIcon } from '../../get-icon'

import { IconedElement } from './iconed-element'

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
        price
    } = props

    const rangeText = range.min > 1 ? `${range.min}-${range.max}` : range.max
    const passedStr = str + count - 1
    const passedDmg = dmg * count
    const isMulti = count > 1

    return (
        <>
            <FlexWrapper>
                {count > 1 && <GridCell inverse center >{count}</GridCell>}
                <GridCell filled center><GetIcon icon="weapon" color="secondary" /></GridCell>
                <GridCell width={count > 1 ? 10 : 11} filled black wrapper>{title}</GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <IconedElement icon="range" value={rangeText} filled />
                <IconedElement
                    icon="fist"
                    value={isMulti ? str : passedStr}
                    minimal={isMulti}
                    currentValue={isMulti ? passedStr : ''}
                    
                />
                <IconedElement
                    icon="dmg"
                    value={isMulti ? dmg : passedDmg}
                    minimal={isMulti}
                    currentValue={isMulti ? passedDmg : ''}
                    nonZero
                    filled
                />
                <IconedElement icon="chart" value={exp} minimal />
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
                {traits?.length > 0 && <GridCell width={10} height={2} center open>
                    <GridCell />
                    <Traits
                        traits={allTraits}
                        selectedTraits={traits}
                        controlled={false}
                    />
                </GridCell>}
            </FlexWrapper>
        </>
    )
}
