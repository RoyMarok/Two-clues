import React from 'react'
import ReactMarkdown from 'react-markdown'

import { GridCell, FlexWrapper, NobreakWrapper } from '../../styled'
import { GetIcon } from '../../get-icon'
import { MoveModsTable } from '../tables/move-mods-table'
import { MoveDmgTable } from '../tables/move-dmg-table'

import { COLUMN_WIDTH } from '../constants'

export const MoveQR = ({ t }) => (
    <>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('qr.actions.move.title')}</ReactMarkdown>
            <ReactMarkdown>{t('qr.actions.move.test')}</ReactMarkdown>
            <FlexWrapper>
                <GridCell center filled><GetIcon icon="range" /></GridCell>
                <GridCell center big>{'>1'}</GridCell>
                <GridCell />
                
                <GridCell center filled big black>{2}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
                <GridCell center big>{'±'}</GridCell>
                <GridCell center filled><GetIcon icon="agility" /></GridCell>
                <GridCell center big>{'±'}</GridCell>
                <GridCell width={6} >{t('qr.actions.move.mods')}</GridCell>
            </FlexWrapper>
            <ReactMarkdown>{t('rules.game.battle.actions.movement.mods.title')}</ReactMarkdown>
            <MoveModsTable />
            <FlexWrapper>
                <GridCell wrapper big black width={4}>{t('rules.dices.result.fail')}</GridCell>

                <GridCell center filled big black>{2}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
                <GridCell center big>{'±'}</GridCell>
                <GridCell width={6} >{t('qr.actions.move.mods')}</GridCell>
            </FlexWrapper>
            <ReactMarkdown>{t('rules.game.battle.actions.movement.dmg.mods.title')}</ReactMarkdown>
            <MoveDmgTable />
            <ReactMarkdown>{t('qr.actions.move.bullcharge')}</ReactMarkdown>
            <ReactMarkdown>{t('qr.actions.move.bullcharge.atacker')}</ReactMarkdown>
            <FlexWrapper>
                <GridCell center filled big black>{2}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
                <GridCell center big>{'±'}</GridCell>
                <GridCell center filled><GetIcon icon="strength" /></GridCell>
                
                <GridCell center >{'?'}</GridCell>
                <GridCell center filled><GetIcon icon="range" /></GridCell>
                <GridCell center big>{'3+'}</GridCell>
                <GridCell center >{'::'}</GridCell>
                <GridCell center big black>{'+1'}</GridCell>
            </FlexWrapper>
            <ReactMarkdown>{t('qr.actions.move.bullcharge.target')}</ReactMarkdown>
            <FlexWrapper>
                <GridCell center filled big black>{2}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
                <GridCell center big>{'±'}</GridCell>
                <GridCell center filled><GetIcon icon="strength" /></GridCell>
            </FlexWrapper>
            <ReactMarkdown>{t('qr.actions.move.bullcharge.result')}</ReactMarkdown>
            <FlexWrapper>
                <GridCell center black width={4}>{t('qr.actions.move.bullcharge.target')}</GridCell>
                <GridCell center filled><GetIcon icon="down" /></GridCell>
            </FlexWrapper>
        </GridCell>
    </>
)
