import React from 'react'

import { CharacterD6StateObj } from '../../../atoms'

import {
    GridCell,
    FlexWrapper,
} from '../../styled'

import { GetIcon } from '../../get-icon'

import { IconedElement } from './iconed-element'

export const Poison = (props) => {
    const {
        title,
        target,
        quality,
        ap,
        dmg,
        activation,
        mod,
        price,
        character
    } = props

    const activationIcon = CharacterD6StateObj.constants.POISON_ACTIVATION.filter(trait => activation === trait.id)?.[0]?.icon

    return (
        <>
            <FlexWrapper>
                <GridCell filled center><GetIcon icon="poison" /></GridCell>
                <GridCell filled center><GetIcon icon={activationIcon} color="secondary" /></GridCell>
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
                {/* <GridCell height={2} center>
                    <GridCell />
                    <GridCell center>
                        <GetIcon icon="weapon" color="secondary" />
                    </GridCell>
                </GridCell>
                <IconedElement icon="ap" value={ap} nonZero />
                <IconedElement icon="dmg" value={dmg} filled nonZero />

                <GridCell/>
                <GridCell height={2} center>
                    <GridCell />
                    <GridCell center>
                        <GetIcon icon={activationIcon}/>
                    </GridCell>
                </GridCell>
                <GridCell/>
                
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
