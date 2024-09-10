import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withTranslation } from 'react-i18next'

import { DisplayCharacter, Weapon, IconedElement, Experience } from '../d6/display'
import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock } from '../styled'
import { GetIcon } from '../get-icon'

import { COLUMN_WIDTH, demoCharacter } from './constants'

export const RulesComponent = ({ t }) => {

    return (
        <FlexWrapper columns>
            <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
                <ReactMarkdown>
                    {t('main.title', { version: process.env.REACT_APP_VERSION })}
                </ReactMarkdown>
            </GridCell>
            <GridCell width={COLUMN_WIDTH} open wrapper>
                <ReactMarkdown>{t('rules.miniatures')}</ReactMarkdown>
            </GridCell>
            <GridCell width={COLUMN_WIDTH} open wrapper >
                <ReactMarkdown>{t('rules.mesurements')}</ReactMarkdown>
            </GridCell>
            <GridCell width={COLUMN_WIDTH} open wrapper >
                <ReactMarkdown>{t('rules.dices')}</ReactMarkdown>
                <ReactMarkdown>{t('rules.dices.questions')}</ReactMarkdown>
                <ReactMarkdown>{t('rules.dices.route')}</ReactMarkdown>
            </GridCell>
            <GridCell width={COLUMN_WIDTH} open wrapper >
                <ReactMarkdown>{t('rules.dices.mods')}</ReactMarkdown>
            </GridCell>

            <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
                <ReactMarkdown>{t('rules.character.charteristics.title')}</ReactMarkdown>
            </GridCell>
            <GridCell width={COLUMN_WIDTH + 1} open wrapper>
                <DisplayCharacter
                    index={1000}
                    isDemo
                    isControlled={false}
                    characterProps={demoCharacter}
                />
            </GridCell>
            <GridCell width={COLUMN_WIDTH} open wrapper>
                <ReactMarkdown>{t('rules.character')}</ReactMarkdown>
            </GridCell>
        </FlexWrapper>
    )
}

export const Rules = withTranslation()(RulesComponent)