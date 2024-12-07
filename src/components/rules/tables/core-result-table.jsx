import React from 'react'

import { BorderWrapper, GridCell, FlexWrapper } from '../../styled'


export const CoreResultTable = ({ t }) => (
    <BorderWrapper>
        <FlexWrapper>
            <GridCell center inverse black>{2}</GridCell>
            <GridCell center inverse>{3}</GridCell>
            <GridCell center inverse>{4}</GridCell>
            <GridCell center inverse>{5}</GridCell>
            <GridCell center inverse>{6}</GridCell>
            <GridCell center filled>{7}</GridCell>
            <GridCell center filled>{8}</GridCell>
            <GridCell center filled>{9}</GridCell>
            <GridCell center filled>{10}</GridCell>
            <GridCell center filled>{11}</GridCell>
            <GridCell center >{12}</GridCell>
        </FlexWrapper>
        <FlexWrapper>
            <GridCell center black filled width={5}>{t('rules.dices.result.fail')}</GridCell>
            <GridCell center black width={6}>{t('rules.dices.result.success')}</GridCell>
        </FlexWrapper>
    </BorderWrapper>
)
