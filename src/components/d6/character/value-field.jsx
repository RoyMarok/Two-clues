import React from 'react'

import {
    Button,
    GridCell,
    Value
} from '../../styled'

export const ValueField = ({ value, onChange, filled  }) => (
    <GridCell width={2} height={2} center filled={filled} big>
        <GridCell width={2} height={0.5} center filled={filled} data-cl="hidingButton"><Button value={parseInt(value) + 1} title="+" onClick={onChange} /></GridCell>

        <GridCell width={2} height="1" center>
            <Value value={value} onChange={onChange} center big />
        </GridCell>
        <GridCell width={2} height={0.5} center filled={filled}>
            <Button value={parseInt(value) - 1} title="-" onClick={onChange} />
        </GridCell>
    </GridCell>
)
