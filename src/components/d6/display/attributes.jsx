import React from 'react'

import {
    GridCell,
    FlexWrapper,
} from '../../styled'

import { IconedElement } from './iconed-element'

export const Attributes = (props) => {
    const {
        strength,
        agility,
        perception,
        intelligence,
        move,
        defence,
        fly,
        actions
    } = props

    return (
        <GridCell height={2} width={7} center>
            <FlexWrapper>
                <IconedElement icon="strength" value={strength} filled minimal black />
                <IconedElement icon="agility" value={agility} minimal black />
                <IconedElement icon="perception" value={perception} filled minimal black />
                <IconedElement icon="intelligence" value={intelligence} minimal black />
            {/* </FlexWrapper>
            <FlexWrapper> */}
                <IconedElement icon="defence" value={defence} filled black />
                <IconedElement icon={fly ? 'fly' : 'move'} value={move} black />
                <IconedElement icon='atom' value={actions} filled black />
            </FlexWrapper>
        </GridCell>
    )
}
