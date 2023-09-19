import React from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

import { CharacterD6StateObj, weaponTraitsState } from '../../../atoms'

import { clamp, noop } from '../../../utils'

import {
    BorderWrapper,
    Button,
    GridCell,
    FlexWrapper,
    NonPrintableBlock,
    OnlyPrintableBlock
} from '../../styled'

import { Traits } from '../../traits'
import { GetIcon } from '../../get-icon'
import { WARRIOR_TYPES_VALUES, sizeLimits } from '../character/character'

const FULL_EXP = []
FULL_EXP.length = 116
FULL_EXP.fill(0)

const heroExpPoints = [
    2, 4, 6, 8, 11, 14, 17, 20, 24, 28, 32, 36, 41, 46, 51, 57, 63, 69, 76, 83, 90, 100, 116
]

const skillsNames = {
    fight: ['Зверь', 'Бронекулак', 'Напосошок', 'Мясник', 'Град Ударов', 'Твёрдый'],
    speed: ['Спринт', 'Верхолаз', 'Сальто', 'Молния', 'Бей-Беги', 'Акробат'],
    shooting: ['Перерыв', 'Охотник', 'Пистольеро', 'Ловкие Руки', 'Орлиный Глаз', 'Стрелок'],
    trickster: ['Безликий', 'Устрашающий', 'Проныра', 'Фокусник', 'Торговец', 'Боевой Маг'],
}

const henchmanExpPoints = [2, 5, 9, 14]

const Experience = ({ initialExp = 0}) => (
    <FlexWrapper>
        <GridCell center width={14.5} height={2}>
            <FlexWrapper>
                {FULL_EXP.map((el, index) => <GridCell center width={0.5} height={0.5} filled={(index + 1) % 2 === 0 && !heroExpPoints.includes(index + 1)} inverse={heroExpPoints.includes(index + 1)} >{index < initialExp ? '•' : ''}</GridCell>)}
            </FlexWrapper>
        </GridCell>
        <GridCell center width={0.5}/>
        <GridCell center filled mirror>{'З'}</GridCell>
    </FlexWrapper>
    
    
)

const Skills = () => (
    <FlexWrapper>
        {Object.getOwnPropertyNames(skillsNames).map((itemName) => (
            <GridCell center width={4} height={3}>
                {skillsNames[itemName].map((item, index) => <FlexWrapper><GridCell height={0.5} width={0.5} filled={!(index % 2)} /><GridCell left height={0.5} width={3.5}>{item}</GridCell></FlexWrapper>)}
            </GridCell>
        ))}
        
    </FlexWrapper>
)

export const IconedElement = (props) => {
    const {
        icon,
        value,
        filled = false,
        plus = false,
        minus = false,
        black = false,
        inverse = false,
        color = 'secondary',
        description = '',
        prefix = '',
        checkboxes = false,
        nonZero = false,
        important = true,
        minimal = false
    } = props
    const nonZeroPassed = nonZero && value !== 0
    const passedTitle = GetIcon.list.includes(icon)
        ? <GetIcon icon={icon} color={black || nonZeroPassed ? 'primary' : color} />
        : <GridCell center big black={black} >{icon}</GridCell>
    const passedValue = value !== 0 && `${prefix}${value}${plus ? '+' : ''}${minus && value > 1 ? '-' : ''}`
    return (
        <GridCell height={Boolean(description) ? 3 : 2} center>
            <FlexWrapper>
                <GridCell center >
                    {passedTitle}
                </GridCell>
                <GridCell center black={(black || important) && !inverse} filled={filled} inverse={inverse}>
                    {!minimal
                    ? passedValue
                    : <div>
                        <GridCell center width={0.5} height={0.5} >{passedValue}</GridCell>
                        <GridCell center width={0.5} height={0.5} />
                    </div>
                    }
                </GridCell>
                {Boolean(description) && <GridCell center >
                    <FlexWrapper>
                        <GridCell center width={0.5} height={0.5} filled={checkboxes} />
                        <GridCell center width={0.5} height={0.5} filled={checkboxes} muted/>
                    </FlexWrapper>
                    <GridCell center height={0.5} muted>{description}</GridCell> 
                </GridCell>}
            </FlexWrapper>
        </GridCell>
    )
}

const Attributes = (props) => {
    const {
        actions,
        strength,
        agility,
        perception,
        intelligence,
        health,
        move,
        panic,
        defence,
        height,
        fly
    } = props

    return (
        <>
            <FlexWrapper>

                <IconedElement icon="strength" value={strength} filled minus minimal />
                <IconedElement icon="agility" value={agility}  minus minimal />
                <IconedElement icon="perception" value={perception} filled minus minimal />
                <IconedElement icon="intelligence" value={intelligence} minus minimal />
                {/* <GridCell /> */}
                <GridCell height={2} width={2} center>
                    <GridCell center width={2}>
                        <GetIcon icon={fly ? 'fly' : 'move'} color="secondary" />
                    </GridCell>
                    <GridCell center width={2} black>
                        <GetIcon icon="agility" />
                        {'+'}
                        {sizeLimits[height].move}
                    </GridCell>
                </GridCell>
                {/* <GridCell /> */}
                <IconedElement icon="defence" value={height} />
                <IconedElement icon="height" value={height} />
                {/* <GridCell />
                <GridCell height={2} center>
                    <GridCell />
                    <GridCell center>
                        <GetIcon icon="defence" color="secondary" />
                    </GridCell>
                    
                </GridCell>
                <IconedElement icon="±" value={defence} minimal />
                <GridCell height={2} width={2} center>
                    <GridCell center width={2}>
                        <GetIcon icon="dice" color="secondary" />
                    </GridCell>
                    <GridCell center width={2}>
                        <GetIcon icon="agility" />
                        <GetIcon icon="perception" />
                    </GridCell>
                </GridCell> */}
            </FlexWrapper>
        </>
        
    )
}

const WeaponExpirience = ({ title, inverse }) => (
    <GridCell height={2} center>
        <GridCell center filled={inverse}>
            {title}
        </GridCell>
        <GridCell center >
            <FlexWrapper>
                {[1, 0, 0, 1].map((item) => (
                    <GridCell center width={0.5} height={0.5} filled={Boolean(item)} />
                ))}
            </FlexWrapper>
           
        </GridCell>
    </GridCell>
)

const Weapon = (props) => {
    const allTraits = useRecoilValue(weaponTraitsState)
    const {
        range,
        shots,
        ap,
        dmg,
        count,
        drum,
        dependencies,
        mod,
        traits,
        title,
        price
    } = props

    const passedShots = shots > 1 ? `Д${shots}` : shots
    const rangeText = `${range > 3 ? 2 : 1}-${range}`

    return (
        <>
            <FlexWrapper>
                {count > 1 && <GridCell inverse center >{count}</GridCell>}
                <GridCell filled center><GetIcon icon="weapon" color="secondary" /></GridCell>
                <GridCell width={count > 1 ? 10 : 11} filled black >{title}</GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <IconedElement icon="range" value={rangeText} filled  />
                <IconedElement icon="shots" value={passedShots}   />
                <IconedElement icon="ap" value={ap} filled  />
                <IconedElement icon="dmg" value={dmg}  prefix={range < 6 && dmg > 0 ? '+' : ''}/>

                <IconedElement
                    icon="strength"
                    value={dependencies.strength?.min || 1}
                    filled
                    black={dependencies.strength?.use}
                    important={false}
                    plus
                />
                <IconedElement
                    icon="agility"
                    value={dependencies.agility?.min || 1}
                    black={dependencies.agility?.use}
                    important={false}
                    plus
                />
                <IconedElement
                    icon="perception"
                    value={dependencies.perception?.min || 1}
                    filled
                    black={dependencies.perception?.use}
                    important={false}
                    plus
                />
                <IconedElement
                    icon="intelligence"
                    value={dependencies.intelligence?.min || 1}
                    black={dependencies.intelligence?.use}
                    important={false}
                    plus
                />

                <GridCell height={2} center>
                    <GridCell center filled black>
                        {1}
                    </GridCell>
                </GridCell>
                <WeaponExpirience title={2} />
                <WeaponExpirience title={3} inverse />
                <WeaponExpirience title={4} />
                <WeaponExpirience title={5} inverse />
                <IconedElement icon="±" value={mod} minimal/>

            </FlexWrapper>
            {traits?.length > 0 && <GridCell width={14} center>
                <Traits
                    traits={allTraits}
                    selectedTraits={traits}
                    controlled={false}
                />
            </GridCell>}
        </>
    )
}

const Spell = (props) => {
    const {
        title,
        target,
        quality,
        mod,
        ap,
        dmg,
        price,
        character
    } = props

    const powerAcumulate = ((target.strength + 0) + (target.agility + 0) + (target.perception + 0) + (target.intelligence + 0)) * Math.abs(quality) + Math.abs(ap) + Math.abs(dmg) - 1
    

    return (
        <>
            <FlexWrapper>
                {<GridCell inverse center>{Boolean(powerAcumulate) && `+${powerAcumulate}`}</GridCell>}
                <GridCell filled center><GetIcon icon="magic" /></GridCell>
                <GridCell width={10} filled black >{title}</GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>

                <IconedElement icon="strength" value={target.strength ? quality : 0} filled nonZero />
                <IconedElement icon="agility" value={target.agility ? quality : 0} nonZero />
                <IconedElement icon="perception" value={target.perception ? quality : 0} filled nonZero />
                <IconedElement icon="intelligence" value={target.intelligence ? quality : 0}  nonZero />
                <GridCell/>
                <GridCell height={2} center>
                    <GridCell />
                    <GridCell center>
                        <GetIcon icon="weapon" color="secondary" />
                    </GridCell>
                </GridCell>
                <IconedElement icon="ap" value={ap} nonZero />
                <IconedElement icon="dmg" value={dmg} filled nonZero />

                <GridCell width={3}/>
                <IconedElement icon="±" value={mod} />
                <GridCell height={2} width={2} center>
                    <GridCell center width={2}>
                        <GetIcon icon="dice" color="secondary" />
                    </GridCell>
                    <GridCell center width={2}>
                        <GetIcon icon="perception" />
                        <GetIcon icon="intelligence" />
                    </GridCell>
                </GridCell>
            </FlexWrapper>
        </>
    )
}

const Poison = (props) => {
    const {
        title,
        target,
        quality,
        ap,
        dmg,
        activation,
        mod,
        price,
        character
    } = props
    
    const activationIcon = CharacterD6StateObj.constants.POISON_ACTIVATION.filter(trait => activation === trait.id)?.[0]?.icon

    return (
        <>
            <FlexWrapper>
                <GridCell filled center><GetIcon icon="poison"  /></GridCell>
                <GridCell width={11} filled black >{title}</GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>

                <IconedElement icon="strength" value={target.strength ? quality : 0} filled nonZero />
                <IconedElement icon="agility" value={target.agility ? quality : 0} nonZero />
                <IconedElement icon="perception" value={target.perception ? quality : 0} filled nonZero />
                <IconedElement icon="intelligence" value={target.intelligence ? quality : 0} nonZero />
                <GridCell />
                <GridCell height={2} center>
                    <GridCell />
                    <GridCell center>
                        <GetIcon icon="weapon" color="secondary" />
                    </GridCell>
                </GridCell>
                <IconedElement icon="ap" value={ap} nonZero />
                <IconedElement icon="dmg" value={dmg} filled nonZero />

                <GridCell/>
                <GridCell height={2} center>
                    <GridCell />
                    <GridCell center>
                        <GetIcon icon={activationIcon}/>
                    </GridCell>
                </GridCell>
                <GridCell/>
                
                <IconedElement icon="±" value={mod} />
                <GridCell height={2} width={2} center>
                    <GridCell center width={2}>
                        <GetIcon icon="dice" color="secondary" />
                    </GridCell>
                    <GridCell center width={2}>
                        <GetIcon icon="perception" />
                        <GetIcon icon="intelligence" />
                    </GridCell>
                </GridCell>
            </FlexWrapper>
        </>
    )
}

const Skill = (props) => {
    const {
        title,
        ready,
        hidden,
        panic,
        out,
        dependencies,
        mod,
        price,
        character
    } = props

    const {
        strength,
        agility,
        perception,
        intelligence
    } = character

    return (
        <>
            <FlexWrapper>
                <GridCell filled center><GetIcon icon="skill" /></GridCell>
                <GridCell width={11} filled black >{title}</GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                
                <IconedElement icon="like" value={ready} filled nonZero/>
                <IconedElement icon="hidden" value={hidden} nonZero />
                <IconedElement icon="panic" value={panic} filled nonZero />
                <IconedElement icon="clock" value={out} nonZero />
                <GridCell width={7} />
                <IconedElement icon="±" value={mod} important={false} />
                {dependencies.strength && <IconedElement icon="strength" value={strength}  plus />}
                {dependencies.agility && <IconedElement icon="agility" value={agility}  plus />}
                {dependencies.perception && <IconedElement icon="perception" value={perception}  plus />}
                {dependencies.intelligence && <IconedElement icon="intelligence" value={intelligence}  plus />}
            </FlexWrapper>
        </>
    )
}

export const DisplayCharacter = (props) => {
    const {
        index = 0,
        isControlled = true,
        setControlled = noop,
        isDemo = false,
        characterProps = {}
    } = props
    const [characters, setCharacter] = useRecoilState(CharacterD6StateObj.change)
    const character = characters.find((item) => item.index === index) || characterProps
    const removeCharacter = useSetRecoilState(CharacterD6StateObj.remove)
    const {
        price,
        characteristics,
        weapons = [],
        spells = [],
        poisons = [],
        skills = [],
        count,
        actions,
        title,
        armour,
        height,
        warriorType
    } = character

    const handleControlled = (e) => setControlled(index)
    const handleDeleteCharacter = (e) => removeCharacter(index)

    const handleRemoveCharacter = () => {
        const passedChars = { ...character }
        setCharacter({
            ...character,
            count: clamp(passedChars?.count - 1, 0, 50)
        })

    }
    const handleAddCharacter = () => {
        const passedChars = { ...character }
        setCharacter({
            ...character,
            count: clamp(parseInt(passedChars?.count) + 1, 0, 50)
        })
    }

    const warriorTypeItem = WARRIOR_TYPES_VALUES.filter((item) => item?.id === warriorType)?.[0]
    const warriorTypeIcon = warriorTypeItem?.icon
    let weaponExperience = 0
    weapons.map((item) => weaponExperience += parseInt(item.mod) + 1)
    let spellExperience = 0
    spells.map((item) => spellExperience += parseInt(item.mod) + 1)
    let poisonExperience = 0
    poisons.map((item) => poisonExperience += parseInt(item.mod) + 1)
    const { strength,
        agility,
        perception,
        intelligence } = characteristics
    const chcracteristicSum = parseInt(strength) + parseInt(agility) + parseInt(perception) + parseInt(intelligence) 
    const expirience = chcracteristicSum >=7 ? heroExpPoints[
        // parseInt(warriorTypeItem?.exp) - 1
        chcracteristicSum - 8
        // + weaponExperience
        + spellExperience
        + poisonExperience
    ] : 0



    return (
        <div>
            {!isDemo && <NonPrintableBlock>
                <FlexWrapper>
                    <GridCell center big>
                        <Button
                            title="-"
                            onClick={handleRemoveCharacter}
                        />
                    </GridCell>
                    <GridCell center big>{count || 0}</GridCell>
                    <GridCell center big>
                        <Button
                            title="+"
                            onClick={handleAddCharacter}
                        />
                    </GridCell>
                </FlexWrapper>
            </NonPrintableBlock>}
            
            <FlexWrapper>


            
            <BorderWrapper>
                <FlexWrapper>
                    <GridCell inverse center >
                        <NonPrintableBlock>
                            {isDemo ? count : <Button title="—" onClick={handleDeleteCharacter} />}
                        </NonPrintableBlock>
                        <OnlyPrintableBlock>{count || 0}</OnlyPrintableBlock>
                    </GridCell>
                    <GridCell filled center >
                        <GetIcon color="secondary" icon={warriorTypeIcon} />
                    </GridCell>
                    <GridCell width={9} black filled >{title}</GridCell>
                    <GridCell width={1} center filled>
                        {!isDemo && <NonPrintableBlock>
                            <Button title={<GetIcon color={isControlled ? 'primary' : 'secondary'} icon="pencil" />} onClick={handleControlled} />
                        </NonPrintableBlock>}
                    </GridCell>
                    <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                    <GridCell width={1} inverse center>{price}</GridCell>
                </FlexWrapper>


                <Attributes {...characteristics} armour={armour} actions={actions} height={height} />
                {weapons.map((weapon) =>
                    <Weapon
                        character={characteristics}
                        {...weapon}

                    />)
                }
                {spells.map((spell) =>
                    <Spell
                        character={characteristics}
                        {...spell}

                    />)
                }
                {poisons.map((poison) =>
                    <Poison
                        character={characteristics}
                        {...poison}
                    />)
                }
                {skills.map((skill) =>
                    <Skill
                        character={characteristics}
                        {...skill}
                    />)
                }

            </BorderWrapper>
            <GridCell />
                <BorderWrapper>
                    <FlexWrapper>
                        <GridCell left  width={4} ><GetIcon icon="strength" color="secondary" />{'4+'}</GridCell>
                        <GridCell left width={4} ><GetIcon icon="agility" color="secondary" />{'4+'}</GridCell>
                        <GridCell left width={4} ><GetIcon icon="perception" color="secondary" />{'4+'}</GridCell>
                        <GridCell left  width={4} ><GetIcon icon="intelligence" color="secondary" />{'4+'}</GridCell>
                    </FlexWrapper>
                    <Skills />
                    
                    <Experience initialExp={expirience} />
                </BorderWrapper>
            </FlexWrapper>
            <GridCell />
        </div>
    )
}
