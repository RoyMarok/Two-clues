import React from 'react'
import ReactMarkdown from 'react-markdown'

import { GridCell, FlexWrapper, NobreakWrapper } from '../styled'
import { DisplayCharacter, Weapon, IconedElement, Experience } from '../d6/display'

import { COLUMN_WIDTH, defaultD6RangeWeapon, defaultD6MeleeWeapon } from './constants'
import { MoveMods } from './move-mods'
import { AttackRangeMods } from './attack-range-mods'
import { DmgMods } from './dmg-mods'


export const Actions = ({ t }) => (
    
    <FlexWrapper columns>
        <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
            <ReactMarkdown>{t('rules.game.battle.actions.title')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.battle.actions')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper>
            <ReactMarkdown>{t('rules.game.battle.actions.common.list')}</ReactMarkdown>
        </GridCell>
        <NobreakWrapper>
            <GridCell width={COLUMN_WIDTH} open wrapper>
                <ReactMarkdown>{t('rules.game.battle.actions.movement')}</ReactMarkdown>
                <MoveMods t={t} />
            </GridCell>
        </NobreakWrapper>
        <NobreakWrapper>
            <GridCell width={COLUMN_WIDTH} open wrapper>
                <ReactMarkdown>{t('rules.game.battle.actions.attack')}</ReactMarkdown>
                <ReactMarkdown>{t('rules.weapon.charteristics.title')}</ReactMarkdown>
                <Weapon {...defaultD6MeleeWeapon} />
                <Weapon {...defaultD6RangeWeapon} />
                <AttackRangeMods t={t} />
                <DmgMods t={t} />
            </GridCell>
        </NobreakWrapper>
        
        
        <GridCell width={COLUMN_WIDTH} open wrapper>
            <ReactMarkdown>{t('rules.game.battle.actions.interact')}</ReactMarkdown>
        </GridCell>
    </FlexWrapper>

    
)