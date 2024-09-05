import React, { useState } from 'react'

import { clamp, noop } from '../../../utils'
import {
    Button,
    GridCell,
    FlexWrapper
} from '../../styled'

import { GetIcon } from '../../get-icon'
const isInRange = (value, min, max) => value >= min && value <= max

export const SquareChooser = ({ values = [], limits = { min: 1, max: 6}, onChange, value, filled }) => {
    const [isRangeSelection, setRangeSelection] = useState(false)
    const isRangeValue = value?.min
    const handleClick = (e) => {
        const valueIndex = e.target.value
        const selctedValue = values[valueIndex]
        if (isRangeValue) {
            const passedValue = {...value}
            if (selctedValue <= passedValue.min) {
                passedValue.max = passedValue.min
                passedValue.min = selctedValue
            } else {
                passedValue.min = passedValue.max
                passedValue.max = selctedValue
            }
            onChange(passedValue)
            setRangeSelection(!isRangeSelection)
        } else {
            onChange(selctedValue)
        }
       
    }
    return (
        <FlexWrapper>
            {
                values.map((item, index) => {
                    const validValue = item >= limits?.min && item <= limits?.max
                    const buttonTitle = String(item).length < 3 ? item : <GetIcon icon={item} />
                    const isInverse = isRangeValue ? isInRange(item, value.min, value.max) : String(value) === String(item)
                    
                    return (
                        <GridCell
                            center
                            inverse={isInverse}
                            filled={!isInverse && filled}
                            muted={!validValue}
                        >
                            {validValue
                            ? <Button value={index} title={buttonTitle} onClick={handleClick} />
                            : item
                            }
                        </GridCell>
                    )
                })
            }
        </FlexWrapper>
    )
}
