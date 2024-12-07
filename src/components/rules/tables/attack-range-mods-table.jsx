import React from 'react'

import { BorderWrapper, GridCell, FlexWrapper } from '../../styled'
import { GetIcon } from '../../get-icon'


export const AttackRangeModsTable = ({ t }) => (
    <BorderWrapper>
        <FlexWrapper>
            <GridCell center filled><GetIcon icon="range" color="secondary" /></GridCell>
            <GridCell center width={2}>{'0-3'}</GridCell>
            <GridCell center filled width={2}>{'3-12'}</GridCell>
            <GridCell center width={2}>{'12-24'}</GridCell>
            <GridCell center inverse black width={2}>{'24+'}</GridCell>
        </FlexWrapper>
        <FlexWrapper>
            <GridCell center filled big>
                {/* <GetIcon icon="hit" color="secondary" /> */}
                {'±'}
            </GridCell>
            <GridCell center black width={2}>{'0'}</GridCell>
            <GridCell center black width={2}>{'-1'}</GridCell>
            <GridCell center black width={2}>{'-2'}</GridCell>
            <GridCell center black width={2}>{'-3'}</GridCell>
        </FlexWrapper>
    </BorderWrapper>
)
