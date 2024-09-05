import React, { useState } from 'react'

import { IconedField, ValueField, SquareChooser } from '../../'

export const MainAttribute = ({ values = [], title = '', limits, onChange, value, filled, controlled = true }) => {
    const [showSquare, setView] = useState(false)
    const handleChangeInput = () => {
        setView(!showSquare)
    }
    return (
        <IconedField
            title={title}
            filled={filled}
            iconButton
        // iconButtonClick={handleChangeInput}
        >
            {showSquare ? <SquareChooser
                values={values}
                limits={limits}
                onChange={onChange}
                value={value}
                filled={filled}
            /> : <ValueField
                onChange={onChange}
                value={value}
                filled={filled}
                limits={limits}
            />}

        </IconedField>
    )
}
