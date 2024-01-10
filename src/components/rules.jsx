import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withTranslation } from 'react-i18next'

import { DisplayCharacter, Weapon, IconedElement, ExperienceBlock } from './d6/display'
import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock } from './styled'
import { GetIcon } from './get-icon'
import { CharacterDisplay } from './character-display'

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
    "range": {
        "min": 1,
        "max": 1
    },
    "str": 0,
    "dmg": 3,
    "exp": 0,
    "count": 2,
    price: 14,
    "title": "Когти",
    "dependencies": {
        "strength": {
            "min": 1,
            "use": true
        },
        "agility": {
            "min": 1,
            "use": false
        },
        "perception": {
            "min": 1,
            "use": false
        },
        "intelligence": {
            "min": 1,
            "use": false
        }
    },
    "traits": [
        "melee"
    ]
}
const defaultD6RangeWeapon = {
    "range": {
        "min": 3,
        "max": 12
    },
    "str": 3,
    "dmg": 2,
    "exp": 1,
    "count": 2,
    price: 16,
    "title": "Лук",
    "dependencies": {
        "strength": {
            "min": 3,
            "use": false
        },
        "agility": {
            "min": 1,
            "use": false
        },
        "perception": {
            "min": 1,
            "use": true
        },
        "intelligence": {
            "min": 1,
            "use": false
        }
    },
    "traits": []
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

const DICE_VALUES = new Array(6).fill('')
  

export const RulesComponent = ({ t }) => {
    // const actions = useRecoilValue(SkillsList.setState)
    const demoCharacter = {
        characteristics: {
            strength: 3,
            agility: 3,
            perception: 3,
            intelligence: 3,
            health: 1,
            move: 2,
            panic: 0,
            defence: 1,
            fly: false
        },

        fearless: false,
        actions: 2,
        price: 28,
        count: 0,
        height: 0,
        weapons: [],
        spells: [],
        skills: [],
        poisons: [],
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
            <GridCell />
            <GridCell panel open width={COLUMN_WIDTH - 1} wrapper filled>
                <ReactMarkdown>{t('rules.dices.example.1')}</ReactMarkdown>
            </GridCell>
            <GridCell />
            <GridCell panel open width={COLUMN_WIDTH - 1} wrapper filled>
                <ReactMarkdown>{t('rules.dices.example.2')}</ReactMarkdown>
            </GridCell>
            <GridCell />
            <ReactMarkdown>{t('rules.dices.questions')}</ReactMarkdown>
            <ReactMarkdown>{t('rules.dices.route')}</ReactMarkdown>

        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.dices.mods')}</ReactMarkdown>
        </GridCell>

        <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
            <ReactMarkdown>{t('rules.character.charteristics.title')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH  + 1} open wrapper>
            <DisplayCharacter
                index={1000}
                isDemo
                isControlled={false}
                characterProps={demoCharacter}
            />
            <ReactMarkdown>{t('rules.character')}</ReactMarkdown>
        </GridCell>
        
         <GridCell width={COLUMN_WIDTH} open wrapper>
            <FlexWrapper>
                <Describe t={t} title="strength" prefix={characteristicsPrefix} />
                <Describe t={t} title="agility" prefix={characteristicsPrefix} />
                <Describe t={t} title="perception" prefix={characteristicsPrefix} />
                <Describe t={t} title="intelligence" prefix={characteristicsPrefix} />
                <Describe t={t} title="defence" prefix={characteristicsPrefix} />
                <Describe t={t} title="move" prefix={characteristicsPrefix} />
                <Describe t={t} title="coin" prefix={characteristicsPrefix} />
            </FlexWrapper>
            <ReactMarkdown>{t('rules.character.characteristics')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            {/* <ReactMarkdown>{t('rules.character')}</ReactMarkdown> */}
            {/* <ReactMarkdown>{t('rules.character.condition')}</ReactMarkdown>
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
            </FlexWrapper> */}
        </GridCell>

       
        <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper >
            <ReactMarkdown>{t('rules.weapon.charteristics.title')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper>
            {/* <Weapon {...defaultD6MeleeWeapon} /> */}
            <Weapon {...defaultD6RangeWeapon} />
            <GridCell />
            {/* <FlexWrapper>
                <IconedElement
                    icon="strength"
                    value={3}
                    filled
                    important={false}
                />
                <IconedElement
                    icon="agility"
                    value={0}
                    important={false}
                />
                <IconedElement
                    icon="perception"
                    value={0}
                    filled
                    black={true}
                    important={false}
                />
                <IconedElement
                    icon="intelligence"
                    value={0}
                    important={false}
                />
            </FlexWrapper>
            <GridCell /> */}
            <FlexWrapper>
                <IconedElement
                    icon="strength"
                    value={3}
                    filled
                    important={false}
                />
                <GridCell width={COLUMN_WIDTH - 2} open>
                    <ReactMarkdown>{t('weapons.characteristics.min.str')}</ReactMarkdown>
                </GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <IconedElement
                    icon="perception"
                    value={0}
                    filled
                    black={true}
                    important={false}
                />
                <GridCell width={COLUMN_WIDTH - 2} open>
                    <ReactMarkdown>{t('weapons.characteristics.main')}</ReactMarkdown>
                </GridCell>
            </FlexWrapper>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper>
            <FlexWrapper>
                <GridCell inverse center >{defaultD6MeleeWeapon?.count}</GridCell>
                <GridCell width={COLUMN_WIDTH-1} >{t('weapons.characteristics.count')}</GridCell>
            </FlexWrapper>
            <Describe t={t} title="coin" prefix={weaponsPrefix} />
            <Describe t={t} title="range" prefix={weaponsPrefix} />
            <Describe t={t} title="fist" prefix={weaponsPrefix} />
            <Describe t={t} title="dmg" prefix={weaponsPrefix} />
            <Describe t={t} title="chart" prefix={weaponsPrefix} />
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
        
        
        <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
            <ReactMarkdown>{t('rules.game.title')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
            <ReactMarkdown>{t('rules.game.battle')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper>
            <ReactMarkdown>{t('rules.game.initiative')}</ReactMarkdown>
                <GridCell />
            <FlexWrapper>
                <GridCell open wrapper />
                    <GridCell width={(COLUMN_WIDTH - 1) / 2} open wrapper>{t('rules.game.initiative.double')}</GridCell>
                <GridCell width={(COLUMN_WIDTH - 1) / 2} open wrapper>{t('rules.game.initiative.triple')}</GridCell>
            </FlexWrapper>
            {DICE_VALUES.map((item, index) => (
                <FlexWrapper key={index} >
                    <GridCell open center wrapper><p>{index + 1}</p></GridCell>
                    <GridCell width={(COLUMN_WIDTH - 1) / 2} open wrapper><ReactMarkdown>{t(`rules.game.initiative.double.${index + 1}`)}</ReactMarkdown></GridCell>
                    <GridCell width={(COLUMN_WIDTH - 1) / 2} open wrapper><ReactMarkdown>{t(`rules.game.initiative.triple.${index + 1}`)}</ReactMarkdown></GridCell>
                </FlexWrapper>
            ))}
            
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.recovery')}</ReactMarkdown>
            {/* <ReactMarkdown>{t('rules.game.panic.check')}</ReactMarkdown> */}
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper pageBreak>
            <ReactMarkdown>{t('rules.game.movement')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper pageBreak>
            <ReactMarkdown>{t('rules.game.shooting')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper pageBreak>
            <ReactMarkdown>{t('rules.game.melee.fast')}</ReactMarkdown>
        </GridCell>

        {/* <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.fast')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.slow')}</ReactMarkdown>
        </GridCell> */}
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.damage')}</ReactMarkdown>
            <GridCell center />
            <FlexWrapper>
                <div>
                    <GridCell width={2} center inverse>1...2</GridCell>
                    <GridCell width={2} center><GetIcon icon="agility" /></GridCell>
                </div>
                <GridCell center />
                <div>
                    <GridCell width={2} center inverse>3...5</GridCell>
                    <GridCell width={2} center><GetIcon icon="strength" /></GridCell>
                </div>
                <GridCell center />
                <div>
                    <GridCell width={2} center inverse>6</GridCell>
                    <GridCell width={2} center><GetIcon icon="health" /></GridCell>
                </div>
                {/* <GridCell center />
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
                </div> */}
                
            </FlexWrapper>
        </GridCell>
        <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
            <ReactMarkdown>{t('rules.game.post')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.post.survive')}</ReactMarkdown>
            <GridCell />
            <FlexWrapper>
                <GridCell width={4} open wrapper>{t('rules.game.post.survive.table.title.1')}</GridCell>
                <GridCell width={(COLUMN_WIDTH - 4)} open wrapper>{t('rules.game.post.survive.table.title.2')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell width={4} open wrapper black><p>{'11-16'}</p></GridCell>
                    <GridCell width={(COLUMN_WIDTH - 4)} open wrapper><ReactMarkdown>{t('rules.game.post.survive.table.value.death')}</ReactMarkdown></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell width={4} open wrapper black><p>{'21-26'}</p></GridCell>
                    <GridCell width={(COLUMN_WIDTH - 4)} open wrapper><ReactMarkdown>{t('rules.game.post.survive.table.value.wound')}</ReactMarkdown></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell width={4} open wrapper black><p>{'31-32'}</p></GridCell>
                    <GridCell width={(COLUMN_WIDTH - 4)} open wrapper><ReactMarkdown>{t('rules.game.post.survive.table.value.madness')}</ReactMarkdown></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell width={4} open wrapper black><p>{'33'}</p></GridCell>
                    <GridCell width={(COLUMN_WIDTH - 4)} open wrapper><ReactMarkdown>{t('rules.game.post.survive.table.value.skip')}</ReactMarkdown></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell width={4} open wrapper black><p>{'34'}</p></GridCell>
                    <GridCell width={(COLUMN_WIDTH - 4)} open wrapper><ReactMarkdown>{t('rules.game.post.survive.table.value.old')}</ReactMarkdown></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell width={4} open wrapper black><p>{'35'}</p></GridCell>
                    <GridCell width={(COLUMN_WIDTH - 4)} open wrapper><ReactMarkdown>{t('rules.game.post.survive.table.value.captured')}</ReactMarkdown></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell width={4} open wrapper black><p>{'36'}</p></GridCell>
                    <GridCell width={(COLUMN_WIDTH - 4)} open wrapper><ReactMarkdown>{t('rules.game.post.survive.table.value.lost')}</ReactMarkdown></GridCell>
            </FlexWrapper>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.post.madness')}</ReactMarkdown>
                {/* <GridCell /> */}
            {DICE_VALUES.map((item, index) => (
                <FlexWrapper key={index} >
                    <GridCell open center wrapper><p>{index + 1}</p></GridCell>
                    <GridCell width={(COLUMN_WIDTH - 1)} open wrapper><ReactMarkdown>{t(`rules.game.madness.table.${index + 1}`)}</ReactMarkdown></GridCell>
                </FlexWrapper>
            ))}
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.post.expirience')}</ReactMarkdown>
            <GridCell />
            <BorderWrapper>
                <ExperienceBlock {...demoCharacter} width={10} height={4} />
            </BorderWrapper>
            <GridCell />
            {DICE_VALUES.map((item, index) => (
                <FlexWrapper key={index} >
                    <GridCell open center wrapper><p>{index + 1}</p></GridCell>
                    <GridCell width={(COLUMN_WIDTH - 1)} open wrapper><ReactMarkdown>{t(`rules.game.expirience.table.${index + 1}`)}</ReactMarkdown></GridCell>
                </FlexWrapper>
            ))}
        </GridCell>
        {/* <GridCell width={COLUMN_WIDTH * 2 + 1} open center wrapper >
            <ReactMarkdown>{t('band.character.action.title')}</ReactMarkdown>
        </GridCell> */}
        {/* {actions.map((item, key) => (
        <GridCell width={COLUMN_WIDTH} open wrapper>
            <ReactMarkdown>{t(`band.character.action.description.${item?.id}`)}</ReactMarkdown>
        </GridCell>
    ))} */}
        <GridCell width={COLUMN_WIDTH * 2 + 1} center open wrapper>
            <ReactMarkdown>{t('rules.game.additional')}</ReactMarkdown>
        </GridCell>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('rules.game.panic')}</ReactMarkdown>
            <FlexWrapper >
                <GridCell />
                <GridCell center><GetIcon icon="strength" color="secondary" /></GridCell>
                <GridCell center><GetIcon icon="agility" color="secondary" /></GridCell>
                <GridCell center><GetIcon icon="perception" color="secondary" /></GridCell>
                <GridCell center><GetIcon icon="intelligence" color="secondary" /></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell open wrapper center><p>{'1'}</p></GridCell>
                    <GridCell width={4} />
                <GridCell open wrapper  width={COLUMN_WIDTH - 5}><ReactMarkdown>{t('rules.game.panic.madness')}</ReactMarkdown></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell open wrapper center><p>{'2'}</p></GridCell>
                <GridCell />
                    <GridCell open wrapper black center><p>{'-2'}</p></GridCell>
                    <GridCell open wrapper black center><p>{'-2'}</p></GridCell>
                    <GridCell open wrapper black center><p>{'-2'}</p></GridCell>
                <GridCell open wrapper width={COLUMN_WIDTH - 5}><ReactMarkdown>{t('rules.game.panic.end.activation')}</ReactMarkdown></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell open wrapper center><p>{'3'}</p></GridCell>
                <GridCell />
                    <GridCell open wrapper black center><p>{'-2'}</p></GridCell>
                    <GridCell open wrapper black center><p>{'-2'}</p></GridCell>
                    <GridCell open wrapper black center><p>{'-1'}</p></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell open wrapper center><p>{'4'}</p></GridCell>
                    <GridCell  />
                    <GridCell open wrapper black center><p>{'-2'}</p></GridCell>
                    <GridCell open wrapper black center><p>{'-1'}</p></GridCell>
                    <GridCell open wrapper black center><p>{'-1'}</p></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell open wrapper center><p>{'5'}</p></GridCell>
                <GridCell />
                    <GridCell open wrapper black center><p>{'-1'}</p></GridCell>
                    <GridCell open wrapper black center><p>{'-1'}</p></GridCell>
            </FlexWrapper>
            <FlexWrapper>
                    <GridCell open wrapper center><p>{'6'}</p></GridCell>
                    <GridCell open wrapper black center ><p>{'+1'}</p></GridCell>
                    <GridCell open wrapper black center><p>{'-1'}</p></GridCell>
            </FlexWrapper>
            
        </GridCell>
    </FlexWrapper>
)}

export const Rules = withTranslation()(RulesComponent)
