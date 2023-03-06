import React from 'react'

import {
    Button,
    GridCell,
    FlexWrapper
} from '../../styled'

import { GetIcon } from '../../get-icon'

export const AttributeChoser = (props) => {

    const {
        onChange,
        value = {
            strength: false,
            agility: false,
            perception: false,
            intelligence: false
        },
        filled
    } = props
    const handleClick = (buttonValue) => () => {
        const passedValues = { ...value }
        if (buttonValue) {
            passedValues[buttonValue] = !value[buttonValue]
            onChange(passedValues)
        }
       
    }

    const attributes = [
        'strength',
        'agility',
        'perception',
        'intelligence'
    ]

    return (
        <FlexWrapper>
            {
                attributes.map((item) => {
                    const color = value[item] ? 'primary' : 'secondary'
                    return (
                        <GridCell
                            center
                            // color={color}
                            filled={filled}
                        >
                            <Button value={item} title={<GetIcon icon={item} color={color} />} onClick={handleClick(item)} />
                        </GridCell>
                    )
                })
            }
        </FlexWrapper>
    )
}
