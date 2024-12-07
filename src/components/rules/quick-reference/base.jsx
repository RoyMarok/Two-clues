import React from 'react'
import ReactMarkdown from 'react-markdown'

import { GridCell, FlexWrapper, NobreakWrapper } from '../../styled'
import { GetIcon } from '../../get-icon'

import { COLUMN_WIDTH } from '../constants'
import { CoreResultTable } from '../tables/core-result-table'

export const BaseQR =({ t }) => (
    <>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.base')}</ReactMarkdown>
            <FlexWrapper>
                <GridCell center filled big black>{2}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
                <GridCell center big>{'±'}</GridCell>
                <GridCell />
                <GridCell width={10} >{t('qr.dices')}</GridCell>
            </FlexWrapper>
            <ReactMarkdown>{t('qr.dices.mod')}</ReactMarkdown>
            <FlexWrapper>
                <GridCell center big black>{'+'}</GridCell>
                <GridCell center filled big black>{'X'}</GridCell>
                <GridCell big center />
                <GridCell center filled big black width={2}>{'2+X'}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
                <GridCell big center>{'=>'}</GridCell>
                <GridCell center black>{'max'}</GridCell>
                <GridCell center filled big black>{2}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center big black>{'-'}</GridCell>
                <GridCell center filled big black>{'X'}</GridCell>
                <GridCell big center />
                <GridCell center filled big black width={2}>{'2+X'}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
                <GridCell big center>{'=>'}</GridCell>
                <GridCell center black>{'min'}</GridCell>
                <GridCell center filled big black>{2}</GridCell>
                <GridCell center filled><GetIcon icon="dice" /></GridCell>
            </FlexWrapper>
            <ReactMarkdown>{t('qr.dices.result')}</ReactMarkdown>
            <CoreResultTable t={t} />
            <FlexWrapper>
                <GridCell big black width={4} wrapper>{t('qr.mesures.title')}</GridCell>
                <GridCell width={9} >{t('qr.mesures')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell big black width={4} wrapper>{t('qr.cards.title')}</GridCell>
                <GridCell width={9} >{t('qr.cards')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell big black width={4} wrapper>{t('qr.minis.title')}</GridCell>
                <GridCell width={9} >{t('qr.minis')}</GridCell>
            </FlexWrapper>
        </GridCell>
    </>
)
