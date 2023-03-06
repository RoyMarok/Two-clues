import React, { useState } from 'react'

import {
    Button,
    GridCell,
    FlexWrapper
} from '../../styled'

import { GetIcon } from '../../get-icon'

export const SquareChooser = ({ values = [], limits = { min: 0, max: 6}, onChange, value, filled }) => {
    // const [isUsedValue, setUsedVAlue] = useState(false)
    const handleClick = (e) => {
        const { value } = e.target
        onChange(values[value])
    }
    return (
        <FlexWrapper>
            {
                values.map((item, index) => {
                    // const validValue = item >= limits?.min && item <= limits?.max
                    const buttonTitle = String(item).length < 3 ? item : <GetIcon icon={item} />
                    const isInverse = String(value) === String(item)
                    // if (!isUsedValue && String(value) === String(item)) {
                    //     setUsedVAlue(true)
                    // }
                    
                    return (
                        <GridCell
                            center
                            inverse={isInverse}
                            filled={value !== item && filled}
                            // muted={!validValue}
                        >
                            {/* {validValue
                            ? <Button value={index} title={buttonTitle} onClick={handleClick} />
                            : item
                            } */}
                            <Button value={index} title={buttonTitle} onClick={handleClick} />
                        </GridCell>
                    )
                })
            }
        </FlexWrapper>
    )
}
