import React from 'react'
import ReactMarkdown from 'react-markdown'

import { BorderWrapper, GridCell, FlexWrapper } from '../styled'

import { GetIcon } from '../get-icon'

export const AttackRangeMods = ({ t }) => (
    <>
        <ReactMarkdown>{t('rules.game.battle.actions.attack.range.mods.title')}</ReactMarkdown>
        <BorderWrapper>
            <FlexWrapper>
                <GridCell center filled><GetIcon icon="range" /></GridCell>
                <GridCell center width={2}>{'0-3'}</GridCell>
                <GridCell center filled width={2}>{'3-12'}</GridCell>
                <GridCell center width={2}>{'12-24'}</GridCell>
                <GridCell center inverse black width={2}>{'24+'}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center filled><GetIcon icon="hit" color="secondary" /></GridCell>
                <GridCell center black width={2}>{'0'}</GridCell>
                <GridCell center black width={2}>{'-1'}</GridCell>
                <GridCell center black width={2}>{'-2'}</GridCell>
                <GridCell center black width={2}>{'-3'}</GridCell>
            </FlexWrapper>
        </BorderWrapper>
        <ReactMarkdown>{t('rules.game.battle.actions.attack.range.mods.cover')}</ReactMarkdown>
    </>
    
)
