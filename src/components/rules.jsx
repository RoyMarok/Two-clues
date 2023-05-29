import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { SkillsList } from '../atoms'
import { DisplayCharacter } from './d6'
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

const defaultD6MeleeWeapon = {
    range: 1,
    shots: 1,
    ap: 0,
    dmg: 2,
    count: 1,
    title: 'Сабля',
    dependencies: {
        strength: true,
        agility: true,
        perception: false,
        intelligence: false
    },
    mod: 1,
    drum: 0,
    traits: [],
    customValues: {},
    price: 14
}
const defaultD6RangeWeapon = {
    range: 6,
    shots: 1,
    ap: 0,
    dmg: 2,
    count: 2,
    title: '4-х ствольный пистолет',
    dependencies: {
        strength: true,
        agility: true,
        perception: false,
        intelligence: false
    },
    mod: 1,
    drum: 4,
    traits: [],
    customValues: {},
    price: 302
}

const defaultD6Spell = {
    dice: -1,
    title: 'Проклятие',
    strength: 0,
    agility: 0,
    perception: 0,
    intelligence: 0,
    move: 0,
    panic: 0,
    mod: -2,
    traits: [],
    price: 15
}

const defaultD6Skill = {
    title: 'Акробатика',
    dependencies: {
        strength: false,
        agility: true,
        perception: false,
        intelligence: false
    },
    mod: -2,
    ready: 1,
    hidden: 0,
    panic: 0,
    out: 0,
    price: 5
}

const defaultD6Poison = {
    dice: -1,
    title: 'Яд',
    strength: 0,
    agility: 0,
    perception: 0,
    intelligence: 0,
    move: 0,
    panic: 0,
    mod: -2,
    traits: [],
    activation: 'drink',
    price: 15
}
  

export const RulesComponent = ({ t }) => {
    // const actions = useRecoilValue(SkillsList.setState)
    const demoCharacter = {
        characteristics: {
            strength: 6,
            agility: 6,
            perception: 6,
            intelligence: 6,
            health: 1,
            move: 4,
            panic: 0,
            defence: 0,
            fly: false
        },

        fearless: false,
        actions: 2,
        price: 33,
        count: 1,
        height: 0,
        // weapons: [defaultD6MeleeWeapon, defaultD6RangeWeapon],
        // spells: [defaultD6Spell],
        // skills: [defaultD6Skill],
        // poisons: [defaultD6Poison],
        names: 'Common_0',
        warriorType: 'leader',
        title: t('band.character.title'),
    }

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
        <DisplayCharacter
            index={1000}
            isDemo
            isControlled={false}
            characterProps={demoCharacter}
        />
        
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
        </GridCell>

        <GridCell width={COLUMN_WIDTH} open center>
            <FlexWrapper>
                    <Describe t={t} title="napoleon" prefix={characteristicsPrefix} />
                    <Describe t={t} title="coin" prefix={characteristicsPrefix} />

                    <Describe t={t} title="health" prefix={characteristicsPrefix} />
                    <Describe t={t} title="move" prefix={characteristicsPrefix} />
                    <Describe t={t} title="atom" prefix={characteristicsPrefix} />

                    <Describe t={t} title="strength" prefix={characteristicsPrefix} />
                    <Describe t={t} title="agility" prefix={characteristicsPrefix} />
                    <Describe t={t} title="perception" prefix={characteristicsPrefix} />
                    <Describe t={t} title="intelligence" prefix={characteristicsPrefix} />
                    
                    <Describe t={t} title="height" prefix={characteristicsPrefix} />
                    <Describe t={t} title="defence" prefix={characteristicsPrefix} />

                    <Describe t={t} title="panic" prefix={characteristicsPrefix} />
                    
            </FlexWrapper>
        </GridCell>

        
        {/* <GridCell width={COLUMN_WIDTH+1} open center>
            
            <Describe t={t} title="range" prefix={weaponsPrefix} />
            <Describe t={t} title="shots" prefix={weaponsPrefix} />
            <Describe t={t} title="drum" prefix={weaponsPrefix} />
            <Describe t={t} title="reload" prefix={weaponsPrefix} />
            <Describe t={t} title="ap" prefix={weaponsPrefix} />
            <Describe t={t} title="dmg" prefix={weaponsPrefix} />
            <Describe t={t} title="mass" prefix={weaponsPrefix} />
            
        </GridCell> */}
        
        
        
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper pageBreak>
            <ReactMarkdown>{t('rules.game.initiative')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.recovery')}</ReactMarkdown>
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
        {/* {actions.map((item, key) => (
            <GridCell width={COLUMN_WIDTH} open wrapper>
                <ReactMarkdown>{t(`band.character.action.description.${item?.id}`)}</ReactMarkdown>
            </GridCell>
        ))} */}

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
