import React from 'react'

import {

    GridCell,
    FlexWrapper,
} from '../../styled'

import { GetIcon } from '../../get-icon'

import { IconedElement } from './iconed-element'

export const Spell = (props) => {
    const {
        title,
        target,
        quality,
        mod,
        ap,
        dmg,
        price,
        character
    } = props

    const powerAcumulate = ((target.strength + 0) + (target.agility + 0) + (target.perception + 0) + (target.intelligence + 0)) * Math.abs(quality) + Math.abs(ap) + Math.abs(dmg) - 1


    return (
        <>
            <FlexWrapper>

                <GridCell filled center><GetIcon icon="magic" /></GridCell>
                <GridCell center filled color="secondary" >{Boolean(powerAcumulate) && `+${powerAcumulate}`}</GridCell>
                <GridCell width={10} filled black >{title}</GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>

                <IconedElement icon="strength" value={target.strength ? quality : 0} filled nonZero />
                <IconedElement icon="agility" value={target.agility ? quality : 0} nonZero />
                <IconedElement icon="perception" value={target.perception ? quality : 0} filled nonZero />
                <IconedElement icon="intelligence" value={target.intelligence ? quality : 0} nonZero />
                <GridCell />
                <GridCell height={2} center>
                    <GridCell />
                    <GridCell center>
                        <GetIcon icon="intelligence" color="secondary" />
                    </GridCell>
                </GridCell>
                <IconedElement icon="chart" value={mod} />
                {/* <IconedElement icon="ap" value={ap} nonZero />
                <IconedElement icon="dmg" value={dmg} filled nonZero />

                <GridCell width={3}/>
                <IconedElement icon="±" value={mod} />
                <GridCell height={2} width={2} center>
                    <GridCell center width={2}>
                        <GetIcon icon="dice" color="secondary" />
                    </GridCell>
                    <GridCell center width={2}>
                        <GetIcon icon="perception" />
                        <GetIcon icon="intelligence" />
                    </GridCell>
                </GridCell> */}
            </FlexWrapper>
        </>
    )
}