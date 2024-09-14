import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withTranslation } from 'react-i18next'

import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock } from '../styled'
import { Character } from './character'
import { Core } from './core'
import { Game } from './game'
import { Actions } from './actions'
import { COLUMN_WIDTH } from './constants'

export const RulesComponent = ({ t }) => {

    return (
        <>
            <FlexWrapper columns>
                <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
                    <ReactMarkdown>
                        {t('main.title', { version: process.env.REACT_APP_VERSION })}
                    </ReactMarkdown>
                </GridCell>
            </FlexWrapper>
            <Core t={t} />
            <Character t={t} />
            <Game t={t} />
            <Actions t={t} />
        </>
    )
}

export const Rules = withTranslation()(RulesComponent)