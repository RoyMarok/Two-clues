import React, { useState } from 'react'

import { clamp, noop } from '../utils'
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
import { FieldNumber } from './field-number'

export const Armour = (props) => {
    const {
        currentStats,
        onChange = noop,
        index = 0
    } = props
    const {
        front,
        rear,
        mass,
        title,
        price
    } = currentStats

    const [titleValue, setTitleValue] = useState(currentStats?.title || '')
    const handleSetTitleValue = (e) => setTitleValue(e.target.value)

    const commonProps = {
        ...currentStats,
        index
    }
    const changeFrontArmour = (e) => {
        const { value } = e.target
        const passedValue = clamp(value, 0, 2)
        onChange({
            ...commonProps,
            front: passedValue,
            mass: parseInt(rear) + parseInt(passedValue)
        })
    }
    const changeRearArmour = (e) => {
        const { value } = e.target
        const passedValue = clamp(value, 0, 2)
        onChange({
            ...commonProps,
            rear: passedValue,
            mass: parseInt(front) + parseInt(passedValue)
        })
    }
    const changeMass = (e) => {
        const { value } = e.target
        onChange({
            ...commonProps,
            mass: clamp(value, 0, 8)
        })
    }
    const changeTitle = (e) => {
        onChange({
            ...commonProps,
            title: e.target.value
        })
    }
    return (
        <div>
            <FlexWrapper>
                <BorderWrapper>
                    <FlexWrapper>
                        <GridCell width={6} filled>
                            <Value value={titleValue} onChange={handleSetTitleValue} onBlur={changeTitle} />
                        </GridCell>
                        <GridCell width={1} center filled> <GetIcon color="secondary" icon="coin" /></GridCell>
                        <GridCell width={1} inverse center>{price}</GridCell>
                    </FlexWrapper>
                    <FlexWrapper>
                        <FieldNumber icon="up" value={front} onChange={changeFrontArmour} filled />
                        <FieldNumber icon="down" value={rear} onChange={changeRearArmour} />
                        <FieldNumber icon="mass" value={mass} onChange={changeMass} filled />
                    </FlexWrapper>
                </BorderWrapper>
                <GridCell />
            </FlexWrapper>
            <NonPrintableBlock>
                <GridCell center />
            </NonPrintableBlock>
        </div>
        
    )
}