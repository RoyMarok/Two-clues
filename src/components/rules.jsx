import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withTranslation } from 'react-i18next'

import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock } from './styled'
import { GetIcon } from './get-icon'
import { CharacterDisplay } from './character-display'

const COLUMN_WIDTH = 14

const Describe = ({ title, t }) => (
    <GridCell width={6} center>
        <FlexWrapper>
            <GridCell width="1" center><GetIcon icon={title} /></GridCell>
            <GridCell width={3} >{t(`band.character.characteristics.${title}`)}</GridCell>
        </FlexWrapper>
    </GridCell>
)

export const RulesComponent = ({ t }) => (
    <FlexWrapper columns>
        <GridCell width={COLUMN_WIDTH} open>
            <ReactMarkdown>{t('rules.miniatures')}</ReactMarkdown>
            <ReactMarkdown>{t('rules.mesurements')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open >
            <ReactMarkdown>{t('rules.dices')}</ReactMarkdown>
        </GridCell>
        <>
            <GridCell center width={COLUMN_WIDTH} />
            <CharacterDisplay />
        </>
        <GridCell width={COLUMN_WIDTH} open center>
            <FlexWrapper>
                <Describe t={t} title="strength" />
                <Describe t={t} title="agility" />
                <Describe t={t} title="perception" />
                <Describe t={t} title="intelligence" />
                <Describe t={t} title="health" />
                <Describe t={t} title="move" />
                <Describe t={t} title="panic" />
                <Describe t={t} title="defence" />
            </FlexWrapper>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open >
            <ReactMarkdown>{t('rules.character')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open >
            <ReactMarkdown>{t('rules.game')}</ReactMarkdown>
        </GridCell>
    </FlexWrapper>
)

export const Rules = withTranslation()(RulesComponent)
