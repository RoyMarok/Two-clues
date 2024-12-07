import React from 'react'

import { BorderWrapper, GridCell, FlexWrapper } from '../../styled'

import { GetIcon } from '../../get-icon'

export const MoveDmgTable = () => (
    <BorderWrapper>
        <FlexWrapper>
            <GridCell center filled><GetIcon icon="range" /></GridCell>
            <GridCell center>{2}</GridCell>
            <GridCell center filled>{3}</GridCell>
            <GridCell center filled>{4}</GridCell>
            <GridCell center filled>{5}</GridCell>
            <GridCell center >{6}</GridCell>
            <GridCell center >{7}</GridCell>
            <GridCell center >{8}</GridCell>
            <GridCell center filled>{9}</GridCell>
            <GridCell center filled>{10}</GridCell>
            <GridCell center filled>{11}</GridCell>
            <GridCell center inverse black>{'12+'}</GridCell>
        </FlexWrapper>
        <FlexWrapper>
            <GridCell center filled><GetIcon icon="dmg" color="secondary" /></GridCell>
            <GridCell center black>{0}</GridCell>
            <GridCell center black width={3}>{'+1'}</GridCell>
            <GridCell center black width={3}>{'+2'}</GridCell>
            <GridCell center black width={3}>{'+3'}</GridCell>
            <GridCell center black>{'+4'}</GridCell>
        </FlexWrapper>
    </BorderWrapper>
)