import React from 'react'

import {
    Button,
    GridCell,
} from '../../styled'

import { GetIcon } from '../../get-icon'

export const IconedField = ({ title, children, filled, iconButton = false, iconButtonClick }) => {
    const passedTitle = GetIcon.list.includes(title) ? <GetIcon icon={title} /> : title
    const PassedIcon = iconButton ? <Button title={passedTitle} onClick={iconButtonClick} /> : passedTitle
    return (
    <GridCell width={2} height="3" center>
            <GridCell width={2} height="1" center black filled={iconButton} big>
            {PassedIcon}
        </GridCell>
        <GridCell width={2} height={2} center filled={filled}>
            {children}
        </GridCell>
    </GridCell>
)}
