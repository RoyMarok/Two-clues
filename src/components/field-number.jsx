import React from 'react'

import { Button, GridCell, Value, NonPrintableBlock, OnlyPrintableBlock, } from './styled'

import { GetIcon } from './get-icon'

export const FieldNumber = ({ title, value, onChange, icon, filled, controlled = true, iconButton = false, iconButtonClick }) => {
    const PassedIcon = iconButton ? <Button title={<GetIcon icon={icon} />} onClick={iconButtonClick} /> : <GetIcon icon={icon} />
    return (
    <GridCell width={2} height="3" center>
        <GridCell width={2} height="1" center black>
            {icon ? PassedIcon : title}
        </GridCell>
            {controlled ? <><NonPrintableBlock><GridCell width={2} height={2} center filled={filled} big>
            <GridCell width={2} height={0.5} center filled={filled} data-cl="hidingButton"><Button value={parseInt(value) + 1} title="+" onClick={onChange} /></GridCell>

                <GridCell width={2} height="1" center>
                <Value value={value} onChange={onChange} center big />
            </GridCell>
            
            <GridCell width={2} height={0.5} center filled={filled}>
                <Button value={parseInt(value) - 1} title="-" onClick={onChange} />
            </GridCell>
        </GridCell></NonPrintableBlock>
        <OnlyPrintableBlock><GridCell width={2} height={2} center filled={filled} big black>
                {value > 0 && value}
            </GridCell></OnlyPrintableBlock></> :
        <GridCell width={2} height={2} center filled={filled} big black>
            {value}
        </GridCell>}
    </GridCell>
)}
