import React from 'react'

import { GridCell, FlexWrapper } from './styled'
import { GetIcon } from './get-icon'
const defaultRow = ['', '', '', '', '', '']

const MassRow = ({ even = false, value, max, elements = [], black }) => (
    <FlexWrapper>
        {elements.map((item, index) => {
            let passedColor = max < item ? 'error' : 'secondary'
            if (index < black) {
                passedColor = 'primary'
            }
            const passedFill = even ? index % 2 !== 0 : index % 2 === 0
            return (
                <GridCell width="1" filled={passedFill} center key={item}>
                    {value >= item && <GetIcon icon="mass" color={passedColor} />}
            </GridCell>
            )
        })}
    </FlexWrapper>
)

const firstRow = defaultRow.map((item, index) => index + 1)
const secondRow = defaultRow.map((item, index) => index + 7)
const thirdRow = defaultRow.map((item, index) => index + 9)

export const Mass = ({ value, max, black } ) => (
    <GridCell width="6" height="2" center>
        <MassRow
            value={value}
            max={max}
            elements={firstRow}
            black={black}
        />
        <MassRow
            value={value}
            max={max}
            elements={secondRow}
            even
        />
        {/* <MassRow
            value={value}
            max={max}
            elements={thirdRow}
        /> */}

    </GridCell>
)

