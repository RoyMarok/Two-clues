import React from 'react'
import ReactMarkdown from 'react-markdown'

import { GridCell, FlexWrapper, NobreakWrapper } from '../../styled'
import { GetIcon } from '../../get-icon'
import { AttackRangeModsTable } from '../tables/attack-range-mods-table'
import { DmgResultTable } from '../tables/dmg-result-table'
import { Describe } from '../describe'

import { COLUMN_WIDTH } from '../constants'

export const AttackQR = ({ t }) => (
    <>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('qr.actions.attack.title')}</ReactMarkdown>
            <FlexWrapper>
                <GridCell center filled big black>{2}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
                <GridCell center big>{'±'}</GridCell>
                <GridCell center filled><GetIcon icon="hit" /></GridCell>
                <GridCell center big>{'±'}</GridCell>
                <GridCell center filled><GetIcon icon="hit" /></GridCell>
                <GridCell center filled><GetIcon icon="range" /></GridCell>
                <GridCell center >{'?'}</GridCell>
                <GridCell center filled><GetIcon icon="fence" /></GridCell>
                <GridCell center >{'::'}</GridCell>
                <GridCell center big black>{'-1'}</GridCell>
            </FlexWrapper>
            <GridCell center height={0.5} />
            <FlexWrapper>
                <GridCell center filled ><GetIcon icon="hit" /></GridCell>
                <GridCell center width={3} />
                <GridCell  width={10}>{t('qr.actions.attack.hit')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center filled><GetIcon icon="hit" /></GridCell>
                <GridCell center filled><GetIcon icon="range" /></GridCell>
                <GridCell center width={2} />
                <GridCell  width={10}>{t('qr.actions.attack.hit.range')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center >{'?'}</GridCell>
                <GridCell center filled><GetIcon icon="fence" /></GridCell>
                <GridCell center >{'::'}</GridCell>
                <GridCell center big black>{'-1'}</GridCell>
                <GridCell  width={10}>{t('qr.actions.attack.cover')}</GridCell>
            </FlexWrapper>
            <GridCell center height={0.5} />
            <FlexWrapper>
                <GridCell center filled><GetIcon icon="hit" /></GridCell>
                <GridCell center filled><GetIcon icon="range" /></GridCell>

            </FlexWrapper>
            {/* <ReactMarkdown>{t('qr.actions.attack.hit.range.title')}</ReactMarkdown> */}
            <AttackRangeModsTable t={t} />
            <ReactMarkdown>{t('qr.actions.attack.success')}</ReactMarkdown>
            <FlexWrapper>
                <GridCell center filled big black>{2}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
                <GridCell center big>{'±'}</GridCell>
                <GridCell center filled><GetIcon icon="dmg" /></GridCell>
                <GridCell center big>{'+'}</GridCell>
                <GridCell center filled><GetIcon icon="wounded" /></GridCell>
                <GridCell center >{'?'}</GridCell>
                <GridCell center filled><GetIcon icon="down" /></GridCell>
                <GridCell center >{'::'}</GridCell>
                <GridCell center big black>{'+1'}</GridCell>
            </FlexWrapper>
            <GridCell center height={0.5} />
            <FlexWrapper>
                <GridCell center filled ><GetIcon icon="dmg" /></GridCell>
                <GridCell center width={3} />
                <GridCell  width={10}>{t('qr.actions.attack.dmg')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center filled ><GetIcon icon="wounded" /></GridCell>
                <GridCell center width={3} />
                <GridCell  width={10}>{t('qr.actions.attack.dmg.wounded')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center >{'?'}</GridCell>
                <GridCell center filled><GetIcon icon="down" /></GridCell>
                <GridCell center >{'::'}</GridCell>
                <GridCell center big black>{'+1'}</GridCell>
                <GridCell  width={10}>{t('qr.actions.attack.dmg.down')}</GridCell>
            </FlexWrapper>

            
            <ReactMarkdown>{t('rules.game.battle.actions.attack.dmg.result.title')}</ReactMarkdown>
            <DmgResultTable />
            <Describe title="face" t={t} prefix="rules.game.battle.actions.attack.dmg.mods" />
            <Describe title="hussar" t={t} prefix="rules.game.battle.actions.attack.dmg.mods" />
            <Describe title="napoleon" t={t} prefix="rules.game.battle.actions.attack.dmg.mods" />
            <Describe title="wounded" t={t} prefix="qr.actions.attack.dmg.result" />
            <Describe title="down" t={t} prefix="qr.actions.attack.dmg.result" />
            <Describe title="dead" t={t} prefix="qr.actions.attack.dmg.result" />

            {/* <ReactMarkdown>{t('rules.game.battle.actions.movement.mods.title')}</ReactMarkdown>
            <MoveModsTable />
            <FlexWrapper>
                <GridCell wrapper big black width={4}>{t('rules.dices.result.fail')}</GridCell>

                <GridCell center filled big black>{2}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
                <GridCell center big>{'±'}</GridCell>
                <GridCell width={6} >{t('qr.actions.move.mods')}</GridCell>
            </FlexWrapper>
            <ReactMarkdown>{t('rules.game.battle.actions.movement.dmg.mods.title')}</ReactMarkdown>
            <MoveDmgTable /> */}
        </GridCell>
    </>
)