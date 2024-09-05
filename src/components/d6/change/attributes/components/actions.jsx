import React from 'react'

import { GridCell } from '../../../../styled'
import { IconedField, SquareChooser } from '../../'

export const Actions = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="atom"
        filled={filled}
    >
        {controlled ? <SquareChooser
            values={[1, 2, 3, 4]}
            onChange={onChange}
            value={value}
        /> : <GridCell black width={2} height="2" center big>
            {value}
        </GridCell>}
    </IconedField>
)
