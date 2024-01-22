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
    } = props

    return (
        <GridCell height={4} width={4} center>
            <FlexWrapper>
                <IconedElement icon="strength" value={strength} filled minimal />
                <IconedElement icon="agility" value={agility} minimal />
                <IconedElement icon="perception" value={perception} filled minimal />
                <IconedElement icon="intelligence" value={intelligence} minimal />
            </FlexWrapper>
            <FlexWrapper>
                <IconedElement icon="defence" value={defence} minimal />
                <IconedElement icon={fly ? 'fly' : 'move'} value={move} />
            </FlexWrapper>
        </GridCell>
    )
}
