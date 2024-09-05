import React from 'react'

import { GridCell } from '../../../../styled'
import { IconedField, ValueField } from '../..'

export const Defence = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="defence"
        filled={filled}
    >
        {controlled ? <ValueField
            onChange={onChange}
            value={value}
            filled={filled}
        /> : <GridCell black width={2} height="2" center big>
            {value}
        </GridCell>}
    </IconedField>
)

