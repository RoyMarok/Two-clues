import React from 'react'

import {
    GridCell,
    FlexWrapper,
} from '../../styled'

import { GetIcon } from '../../get-icon'

export const IconedElement = (props) => {
    const {
        icon,
        value,
        filled = false,
        plus = false,
        minus = false,
        black = false,
        inverse = false,
        marked = false,
        color = 'secondary',
        description = '',
        prefix = '',
        checkboxes = false,
        nonZero = false,
        important = true,
        minimal = false
    } = props
    const nonZeroPassed = nonZero && value !== 0
    const passedTitle = GetIcon.list.includes(icon)
        ? <GetIcon icon={icon} color={black || nonZeroPassed ? 'primary' : color} inverse={marked} />
        : <GridCell center big black={black} >{icon}</GridCell>
    const passedValue = value !== 0 && `${prefix}${value}${plus ? '+' : ''}${minus && value > 1 ? '-' : ''}`
    return (
        <GridCell height={Boolean(description) ? 3 : 2} center>
            <FlexWrapper>
                <GridCell center inverse={marked}>
                    {passedTitle}
                </GridCell>
                {Boolean(value) && <GridCell center black={(black || important) && !inverse} filled={filled} inverse={inverse}>
                    {!minimal
                        ? passedValue
                        : <div>
                            <GridCell center width={0.5} height={0.5} >{passedValue}</GridCell>
                            <GridCell center width={0.5} height={0.5} />
                        </div>
                    }
                </GridCell>}
                {Boolean(description) && <GridCell center >
                    <FlexWrapper>
                        <GridCell center width={0.5} height={0.5} filled={checkboxes} />
                        <GridCell center width={0.5} height={0.5} filled={checkboxes} muted />
                    </FlexWrapper>
                    <GridCell center height={0.5} muted>{description}</GridCell>
                </GridCell>}
            </FlexWrapper>
        </GridCell>
    )
}
