import React from 'react'
import ReactMarkdown from 'react-markdown'

import { DisplayCharacter, Weapon, IconedElement, Experience } from '../d6/display'
import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock } from '../styled'
import { Describe } from './describe'
import { characteristicsPrefix } from './constants'

import { COLUMN_WIDTH, demoCharacter } from './constants'

export const Game = ({ t }) => (
    <FlexWrapper columns>
        <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
            <ReactMarkdown>{t('rules.game.title')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper>
            <ReactMarkdown>{t('rules.game.prepare')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper>
            <ReactMarkdown>{t('rules.game.battle')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper>
            <ReactMarkdown>{t('rules.game.post')}</ReactMarkdown>
        </GridCell>
    </FlexWrapper>
)