import React from 'react'
import ReactMarkdown from 'react-markdown'

import { DisplayCharacter, Weapon, IconedElement, Experience } from '../d6/display'
import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock } from '../styled'
import { Describe } from './describe'
import { characteristicsPrefix } from './constants'

import { COLUMN_WIDTH, demoCharacter } from './constants'

export const Character = ({ t }) => (
    <FlexWrapper columns>
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
            <FlexWrapper>
                <Describe t={t} title="strength" prefix={characteristicsPrefix} />
                <Describe t={t} title="agility" prefix={characteristicsPrefix} />
                <Describe t={t} title="perception" prefix={characteristicsPrefix} />
                <Describe t={t} title="intelligence" prefix={characteristicsPrefix} />
                <Describe t={t} title="defence" prefix={characteristicsPrefix} />
                <Describe t={t} title="move" prefix={characteristicsPrefix} />
                <Describe t={t} title="atom" prefix={characteristicsPrefix} />
                <Describe t={t} title="coin" prefix={characteristicsPrefix} />
            </FlexWrapper>
            <ReactMarkdown>{t('rules.character.characteristics')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper>
            <ReactMarkdown>{t('rules.character')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper>
            {/* <FlexWrapper>
                <Describe t={t} title="strength" prefix={characteristicsPrefix} />
                <Describe t={t} title="agility" prefix={characteristicsPrefix} />
                <Describe t={t} title="perception" prefix={characteristicsPrefix} />
                <Describe t={t} title="intelligence" prefix={characteristicsPrefix} />
                <Describe t={t} title="defence" prefix={characteristicsPrefix} />
                <Describe t={t} title="move" prefix={characteristicsPrefix} />
                <Describe t={t} title="coin" prefix={characteristicsPrefix} />
            </FlexWrapper> */}
            {/* <ReactMarkdown>{t('rules.character.characteristics')}</ReactMarkdown> */}
        </GridCell>
    </FlexWrapper>
)
