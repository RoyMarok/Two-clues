import React from 'react'

import { IconedField, ValueField } from '../../'

export const Move = (props) => {
    const { onChange, value = '', filled = false, changeFly, fly = false } = props
    return (
    <IconedField
        title={fly ? 'fly' : 'move'}
        filled={filled}
        iconButton
        iconButtonClick={changeFly}
    >
        <ValueField
            onChange={onChange}
            value={value}
            filled={filled}
        />
    </IconedField>
)}
