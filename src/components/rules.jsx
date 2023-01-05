import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { SkillsList } from '../atoms'
import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock } from './styled'
import { GetIcon } from './get-icon'
import { CharacterDisplay } from './character-display'
import { Weapon } from './weapon'

export const COLUMN_WIDTH = 14

const Describe = ({ prefix, title, t }) => (
    <GridCell width={COLUMN_WIDTH} center>
        <FlexWrapper>
            <GridCell width="1" center><GetIcon icon={title} /></GridCell>
            <GridCell width={COLUMN_WIDTH-1} >{t(`${prefix}.${title}`)}</GridCell>
        </FlexWrapper>
    </GridCell>
)

const characteristicsPrefix = 'band.character.characteristics'
const weaponsPrefix = 'weapons.characteristics'

const weaponProps = {
    currentStats: {
        range: 12,
        shots: 1,
        drum: 10,
        reload: 1,
        ap: 0,
        dmg: 1,
        titl: 'Пуляка',
        price: 10,
        mass: 1
    },
    controlled: false
}

export const RulesComponent = ({ t }) => {
    const actions = useRecoilValue(SkillsList.setState)
    return (
    <FlexWrapper columns>
        <GridCell width={COLUMN_WIDTH} open wrapper>
            <ReactMarkdown>{t('rules.miniatures')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.mesurements')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.dices')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.dices.mods')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
            <ReactMarkdown>{t('rules.character.charteristics.title')}</ReactMarkdown>
        </GridCell>
        <CharacterDisplay />
        
        
        <GridCell width={COLUMN_WIDTH+1} open center>
            <Weapon {...weaponProps} />
            <Describe t={t} title="coin" prefix={weaponsPrefix} />
            <Describe t={t} title="range" prefix={weaponsPrefix} />
            <Describe t={t} title="shots" prefix={weaponsPrefix} />
            <Describe t={t} title="drum" prefix={weaponsPrefix} />
            <Describe t={t} title="reload" prefix={weaponsPrefix} />
            <Describe t={t} title="ap" prefix={weaponsPrefix} />
            <Describe t={t} title="dmg" prefix={weaponsPrefix} />
            <Describe t={t} title="mass" prefix={weaponsPrefix} />
            
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open center>
            
            <FlexWrapper>
                <Describe t={t} title="strength" prefix={characteristicsPrefix} />
                <Describe t={t} title="agility" prefix={characteristicsPrefix} />
                <Describe t={t} title="perception" prefix={characteristicsPrefix} />
                <Describe t={t} title="intelligence" prefix={characteristicsPrefix} />
                <Describe t={t} title="health" prefix={characteristicsPrefix} />
                <Describe t={t} title="move" prefix={characteristicsPrefix} />
                <Describe t={t} title="panic" prefix={characteristicsPrefix} />
                <Describe t={t} title="defence" prefix={characteristicsPrefix} />
            </FlexWrapper>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.character')}</ReactMarkdown>
            <ReactMarkdown>{t('rules.character.condition')}</ReactMarkdown>
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
            <GridCell />
            <FlexWrapper>
                <GridCell width={1} black center big>±</GridCell>
                <GridCell width={COLUMN_WIDTH - 2}>{t('rules.dices.mods.title')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell width={1} black center big>1</GridCell>
                <GridCell width={COLUMN_WIDTH - 2}>{t('rules.dices.actions.first')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell width={1} black center big>2+</GridCell>
                <GridCell width={COLUMN_WIDTH - 2}>{t('rules.dices.mods.rest')}</GridCell>
            </FlexWrapper>

            
        </GridCell>
        
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper pageBreak>
            <ReactMarkdown>{t('rules.game.initiative')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.recovery')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.panic.check')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.fast')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.slow')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH*2 + 1} open center wrapper >
            <ReactMarkdown>{t('band.character.action.title')}</ReactMarkdown>
        </GridCell>
        {actions.map((item, key) => (
            <GridCell width={COLUMN_WIDTH} open wrapper>
                <ReactMarkdown>{t(`band.character.action.descriprion.${item?.id}`)}</ReactMarkdown>
            </GridCell>
        ))}
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.damage')}</ReactMarkdown>
            <GridCell center />
            <FlexWrapper>
                <div>
                    <GridCell width={2} center inverse>1...4</GridCell>
                    <FlexWrapper>
                        <GridCell center black>+1</GridCell>
                        <GridCell center><GetIcon icon="strength" /></GridCell>
                    </FlexWrapper>
                </div>
                <GridCell center />
                <div>
                    <GridCell width={2} center inverse>5...8</GridCell>
                    <FlexWrapper>
                        <GridCell center black>+1</GridCell>
                        <GridCell center><GetIcon icon="agility" /></GridCell>
                    </FlexWrapper>
                </div>
                <GridCell center />
                <div>
                    <GridCell width={2} center inverse>9...12</GridCell>
                    <FlexWrapper>
                        <GridCell center black>+1</GridCell>
                        <GridCell center><GetIcon icon="perception" /></GridCell>
                    </FlexWrapper>
                </div>
                <GridCell center />
                <div>
                    <GridCell width={2} center inverse>13...16</GridCell>
                    <FlexWrapper>
                        <GridCell center black>+1</GridCell>
                        <GridCell center><GetIcon icon="intelligence" /></GridCell>
                    </FlexWrapper>
                </div>
                <GridCell center />
                <div>
                    <GridCell width={2} center inverse>17...20</GridCell>
                    <FlexWrapper>
                        <GridCell center black>-1</GridCell>
                        <GridCell center><GetIcon icon="move" /></GridCell>
                    </FlexWrapper>
                </div>
                
            </FlexWrapper>
        </GridCell>
    </FlexWrapper>
)}

export const Rules = withTranslation()(RulesComponent)
