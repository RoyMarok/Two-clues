import React from 'react'
import ReactMarkdown from 'react-markdown'

import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock } from '../styled'

import { COLUMN_WIDTH } from './constants'

export const Core = ({ t }) => {
    return (
        <>
            <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
                <ReactMarkdown>{t('rules.base')}</ReactMarkdown>
            </GridCell>
            <FlexWrapper columns>
                <GridCell width={COLUMN_WIDTH} open wrapper>
                    <ReactMarkdown>{t('rules.tools')}</ReactMarkdown>
                </GridCell>
                <GridCell width={COLUMN_WIDTH} open wrapper >
                    <ReactMarkdown>{t('rules.dices')}</ReactMarkdown>
                    <ReactMarkdown>{t('rules.dices.questions')}</ReactMarkdown>
                </GridCell>
                <GridCell width={COLUMN_WIDTH} open wrapper>
                    <ReactMarkdown>{t('rules.miniatures')}</ReactMarkdown>
                </GridCell>
                <GridCell width={COLUMN_WIDTH} open wrapper >
                    <ReactMarkdown>{t('rules.mesurements')}</ReactMarkdown>
                </GridCell>


                <GridCell width={COLUMN_WIDTH} open wrapper >
                    <ReactMarkdown>{t('rules.dices.mods')}</ReactMarkdown>
                </GridCell>
                <GridCell width={COLUMN_WIDTH} open wrapper >
                    <ReactMarkdown>{t('rules.dices.route')}</ReactMarkdown>
                </GridCell>
                <GridCell width={COLUMN_WIDTH} open wrapper >
                    <ReactMarkdown>{t('rules.dices.result')}</ReactMarkdown>
                    <BorderWrapper>
                        <FlexWrapper>
                            <GridCell center inverse black>{2}</GridCell>
                            <GridCell center inverse>{3}</GridCell>
                            <GridCell center inverse>{4}</GridCell>
                            <GridCell center inverse>{5}</GridCell>
                            <GridCell center inverse>{6}</GridCell>
                            <GridCell center filled>{7}</GridCell>
                            <GridCell center filled>{8}</GridCell>
                            <GridCell center filled>{9}</GridCell>
                            <GridCell center filled>{10}</GridCell>
                            <GridCell center filled>{11}</GridCell>
                            <GridCell center >{12}</GridCell>
                        </FlexWrapper>
                        <FlexWrapper>
                            <GridCell center black filled width={5}>{t('rules.dices.result.success')}</GridCell>
                            <GridCell center black width={6}>{t('rules.dices.result.fail')}</GridCell>
                        </FlexWrapper>
                    </BorderWrapper>
                    <ReactMarkdown>{t('rules.dices.result.critical.fail')}</ReactMarkdown>
                    <ReactMarkdown>{t('rules.dices.result.critical.success')}</ReactMarkdown>
                </GridCell>

            </FlexWrapper>
        </>
        
    )
}
