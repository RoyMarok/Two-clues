import React from 'react'
import ReactMarkdown from 'react-markdown'

import { BorderWrapper, GridCell, FlexWrapper } from '../styled'

import { GetIcon } from '../get-icon'

import { Describe } from './describe'

export const DmgMods = ({ t }) => (
    <>
        <ReactMarkdown>{t('rules.game.battle.actions.attack.dmg.mods.title')}</ReactMarkdown>
        <ReactMarkdown>{t('rules.game.battle.actions.attack.dmg.result.title')}</ReactMarkdown>
        <BorderWrapper>
            <FlexWrapper>
                <GridCell center filled><GetIcon icon="dmg" /></GridCell>
                <GridCell center>{2}</GridCell>
                <GridCell center filled>{3}</GridCell>
                <GridCell center >{4}</GridCell>
                <GridCell center filled>{5}</GridCell>
                <GridCell center >{6}</GridCell>
                <GridCell center filled>{7}</GridCell>
                <GridCell center >{8}</GridCell>
                <GridCell center filled>{9}</GridCell>
                <GridCell center >{10}</GridCell>
                <GridCell center filled>{11}</GridCell>
                <GridCell center inverse black>{12}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center black ><GetIcon icon="face" color="secondary"/></GridCell>
                <GridCell center black filled width={1}><GetIcon icon="defence" /></GridCell>
                <GridCell center black width={4}><GetIcon icon="wounded" /></GridCell>
                <GridCell center black filled width={3}><GetIcon icon="wounded" /><GetIcon icon="down" /></GridCell>
                <GridCell center black></GridCell>
                <GridCell center black width={2}><GetIcon icon="dead" /></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center black ><GetIcon icon="hussar" color="secondary" /></GridCell>
                <GridCell center black filled width={1}><GetIcon icon="defence" /></GridCell>
                <GridCell center black width={6}><GetIcon icon="wounded" /></GridCell>
                <GridCell center black filled width={2}><GetIcon icon="wounded" /><GetIcon icon="down" /></GridCell>
                <GridCell center black width={2}><GetIcon icon="dead" /></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center black ><GetIcon icon="napoleon" color="secondary" /></GridCell>
                <GridCell center black filled width={1}><GetIcon icon="defence" /></GridCell>
                <GridCell center black width={8}><GetIcon icon="wounded" /></GridCell>
                <GridCell center black filled width={2}><GetIcon icon="dead" /></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center filled><GetIcon icon="defence" /></GridCell>
                <GridCell center>{0}</GridCell>
                <GridCell center filled>{1}</GridCell>
                <GridCell center >{2}</GridCell>
                <GridCell center filled>{3}</GridCell>
                <GridCell center >{4}</GridCell>
                <GridCell center filled>{5}</GridCell>
                <GridCell center >{6}</GridCell>
                <GridCell center filled>{7}</GridCell>
                <GridCell center >{8}</GridCell>

            </FlexWrapper>
        </BorderWrapper>
        <Describe title="face" t={t} prefix="rules.game.battle.actions.attack.dmg.mods" />
        <Describe title="hussar" t={t} prefix="rules.game.battle.actions.attack.dmg.mods" />
        <Describe title="napoleon" t={t} prefix="rules.game.battle.actions.attack.dmg.mods" />
        <ReactMarkdown>{t('rules.game.battle.actions.attack.dmg.result')}</ReactMarkdown>
        

    </>
    
)
