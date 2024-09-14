import React from 'react'
import ReactMarkdown from 'react-markdown'

import { BorderWrapper, GridCell, FlexWrapper } from '../styled'

import { GetIcon } from '../get-icon'

export const MoveMods = ({ t }) => (
    <>
        <ReactMarkdown>{t('rules.game.battle.actions.movement.mods.title')}</ReactMarkdown>
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
                <GridCell center filled><GetIcon icon="agility" color="secondary" /></GridCell>
                <GridCell center black>{0}</GridCell>
                <GridCell center black width={3}>{'-1'}</GridCell>
                <GridCell center black width={3}>{'-2'}</GridCell>
                <GridCell center black width={3}>{'-3'}</GridCell>
                <GridCell center black>{'-4'}</GridCell>
            </FlexWrapper>
        </BorderWrapper>
        <ReactMarkdown>{t('rules.game.battle.actions.movement.dmg.mods.title')}</ReactMarkdown>
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
                <GridCell center black width={3}>{'1'}</GridCell>
                <GridCell center black width={3}>{'2'}</GridCell>
                <GridCell center black width={3}>{'3'}</GridCell>
                <GridCell center black>{'4'}</GridCell>
            </FlexWrapper>
        </BorderWrapper>
    </>
    
)
