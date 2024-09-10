import React from 'react'


import { GridCell, FlexWrapper } from '../styled'
import { GetIcon } from '../get-icon'


export const COLUMN_WIDTH = 14

export const Describe = ({ prefix, title, t }) => (
    <GridCell width={COLUMN_WIDTH} center>
        <FlexWrapper>
            <GridCell width="1" center><GetIcon icon={title} /></GridCell>
            <GridCell width={COLUMN_WIDTH - 1} >{t(`${prefix}.${title}`)}</GridCell>
        </FlexWrapper>
    </GridCell>
)