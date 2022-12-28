import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withTranslation } from 'react-i18next'

import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock } from './styled'
import { GetIcon } from './get-icon'
import { CharacterDisplay } from './character-display'
import { Actions } from './actions'

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
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open >
            <ReactMarkdown>{t('rules.mesurements')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open >
            <ReactMarkdown>{t('rules.dices')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open >
            <ReactMarkdown>{t('rules.dices.mods')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH*2} open>
            <ReactMarkdown>{t('rules.character.charteristics.title')}</ReactMarkdown>
        </GridCell>
        <CharacterDisplay />
        
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
            <GridCell width={COLUMN_WIDTH} open >
                <ReactMarkdown>{t('rules.character')}</ReactMarkdown>
                <ReactMarkdown>{t('rules.character.condition')}</ReactMarkdown>
            </GridCell>
                <FlexWrapper>
                    <GridCell center><GetIcon icon="like" /></GridCell>
                    <GridCell width={COLUMN_WIDTH - 2}>{t('rules.character.condition.stand')}</GridCell>
                </FlexWrapper>
                <FlexWrapper>
                    <GridCell center><GetIcon icon="hidden" /></GridCell>
                    <GridCell width={COLUMN_WIDTH - 2}>{t('rules.character.condition.hidden')}</GridCell>
                </FlexWrapper>
                <FlexWrapper>
                    <GridCell center><GetIcon icon="panic" /></GridCell>
                    <GridCell width={COLUMN_WIDTH - 2}>{t('rules.character.condition.panic')}</GridCell>
                </FlexWrapper>
                <FlexWrapper>
                    <GridCell center><GetIcon icon="confused" /></GridCell>
                    <GridCell width={COLUMN_WIDTH - 2}>{t('rules.character.condition.confused')}</GridCell>
                </FlexWrapper>

            
        </GridCell>
        
        <GridCell width={COLUMN_WIDTH} open >
            <ReactMarkdown>{t('rules.game')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open center>
            
        </GridCell>
    </FlexWrapper>
)

export const Rules = withTranslation()(RulesComponent)
