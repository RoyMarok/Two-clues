import React from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

import { CharacterD6StateObj, weaponTraitsState } from '../../../atoms'
import { WEAPONS_DAMAGE } from '../../../atoms/d6_character'

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
import { WARRIOR_TYPES_VALUES } from '../character/character'


const heroExpPoints = [
    2, 4, 6, 8, 11, 14, 17, 20, 24, 28, 32, 36, 41, 46, 51, 57, 63, 69, 76, 83, 90, 98, 116, 124, 133, 142, 151, 160
]

const skillsNames = {
    fight: ['Зверь', 'Бронекулак', 'Напосошок', 'Мясник', 'Град Ударов', 'Твёрдый'],
    speed: ['Спринт', 'Верхолаз', 'Сальто', 'Молния', 'Бей-Беги', 'Акробат'],
    shooting: ['Перерыв', 'Охотник', 'Пистольеро', 'Ловкие Руки', 'Орлиный Глаз', 'Стрелок'],
    trickster: ['Безликий', 'Устрашающий', 'Проныра', 'Фокусник', 'Торговец', 'Боевой Маг'],
}

const henchmanExpPoints = [2, 5, 9, 14]

const Experience = ({ initialExp = 0, width = 7, height = 4 }) => {
    const FULL_EXP = []
    FULL_EXP.length = width * 4 * height
    FULL_EXP.fill(0)
    return (
        <FlexWrapper>
            <GridCell center width={width} height={height}>
                <FlexWrapper>
                    {FULL_EXP.map((el, index) =>{
                        const divider = width * 2
                        return (
                        <GridCell
                            center
                            width={0.5}
                            height={0.5}
                            filled={
                                (index + (index - index % (divider)) / divider % 2) % 2 === 0
                                && !heroExpPoints.includes(index + 1)
                            }
                            inverse={
                                heroExpPoints.includes(index + 1)
                                || index + 1 === FULL_EXP.length
                            }
                        >
                                {index < initialExp ? '•' : ''}
                        </GridCell>)}
                        )
                    }
                </FlexWrapper>
            </GridCell>
        </FlexWrapper>
    )
}

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
                {Boolean(value) && <GridCell center black={(black || important) && !inverse} filled={filled} inverse={inverse}>
                    {!minimal
                    ? passedValue
                    : <div>
                        <GridCell center width={0.5} height={0.5} >{passedValue}</GridCell>
                        <GridCell center width={0.5} height={0.5} />
                    </div>
                    }
                </GridCell>}
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
        fly,
        price,
        warriorTypeIcon
    } = props

    return (
        <GridCell height={4} width={4} center>
            <FlexWrapper>

                <IconedElement icon="strength" value={strength} filled minimal />
                <IconedElement icon="agility" value={agility} minimal />
                <IconedElement icon="perception" value={perception} filled minimal />
                <IconedElement icon="intelligence" value={intelligence}  minimal />
            </FlexWrapper>
            <FlexWrapper>
                <IconedElement icon="defence" value={defence} minimal />
                <IconedElement icon={fly ? 'fly' : 'move'} value={move}/>
                {/* <IconedElement icon={warriorTypeIcon} />
                <IconedElement icon="coin" value={price}/> */}
            </FlexWrapper>
        </GridCell>
        
    )
}

// const WeaponExpirienceElement = ({ title, filled, current, black }) => 
// <GridCell height={2} center>
//     <GridCell center filled={filled} black={black}>
//         {title}
//     </GridCell>
//     {!current && <GridCell center >
//         <FlexWrapper>
//             {[1, 0, 0, 1].map((item) => (
//                 <GridCell center width={0.5} height={0.5} filled={Boolean(item)} />
//             ))}
//         </FlexWrapper>
        
//     </GridCell>}
// </GridCell>

// const WeaponExpirience = ({ value }) => (
//     <>
//         <WeaponExpirienceElement title={1} filled current={value >= 1} black={value === 1} />
//         <WeaponExpirienceElement title="2-" current={value >= 2} black={value === 2} />
//         <WeaponExpirienceElement title="3-" filled current={value >= 3} black={value === 3} />
//         <WeaponExpirienceElement title="4-" current={value >= 4} black={value === 4} />
//         <WeaponExpirienceElement title="5-" filled current={value >= 5} black={value === 5} />
//     </>
// )


const Weapon = (props) => {
    const allTraits = useRecoilValue(weaponTraitsState)
    const {
        range,
        str,
        dmg,
        count,
        exp,
        dependencies,
        traits,
        title,
        price
    } = props

    const rangeText = `${range.min}-${range.max}`

    return (
        <>
            <FlexWrapper>
                {count > 1 && <GridCell inverse center >{count}</GridCell>}
                <GridCell filled center><GetIcon icon="weapon" color="secondary" /></GridCell>
                <GridCell width={count > 1 ? 10 : 11} filled black wrapper>{title}</GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <IconedElement icon="range" value={rangeText} filled  />
                <IconedElement icon="fist" value={str}   />
                <IconedElement icon="dmg" value={WEAPONS_DAMAGE[dmg].title} nonZero filled />
                <IconedElement icon="chart" value={exp} minimal />
                <IconedElement
                    icon="strength"
                    value={dependencies.strength?.min > 1 ? dependencies.strength?.min : 0}
                    filled
                    black={dependencies.strength?.use}
                    important={false}
                    
                />
                <IconedElement
                    icon="agility"
                    value={dependencies.agility?.min > 1 ? dependencies.agility?.min : 0}
                    black={dependencies.agility?.use}
                    important={false}
                    
                />
                <IconedElement
                    icon="perception"
                    value={dependencies.perception?.min > 1 ? dependencies.perception?.min : 0}
                    filled
                    black={dependencies.perception?.use}
                    important={false}
                    
                />
                <IconedElement
                    icon="intelligence"
                    value={dependencies.intelligence?.min > 1 ? dependencies.intelligence?.min : 0}
                    black={dependencies.intelligence?.use}
                    important={false}
                    
                />

                {/* <GridCell height={2} center>
                    <GridCell center filled black>
                        {1}
                    </GridCell>
                </GridCell>
                <WeaponExpirienceElement title={2} />
                <WeaponExpirienceElement title={3} filled />
                <WeaponExpirienceElement title={4} />
                <WeaponExpirienceElement title={5} filled /> */}
                {/* <WeaponExpirience value={exp} />
                <IconedElement icon="±" value={mod} minimal/> */}
                {traits?.length > 0 && <GridCell width={6} center>
                    <Traits
                        traits={allTraits}
                        selectedTraits={traits}
                        controlled={false}
                    />
                </GridCell>}
            </FlexWrapper>
            
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
                
                <GridCell filled center><GetIcon icon="magic" /></GridCell>
                <GridCell center filled color="secondary" >{Boolean(powerAcumulate) && `+${powerAcumulate}`}</GridCell>
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
                        <GetIcon icon="intelligence" color="secondary" />
                    </GridCell>
                </GridCell>
                <IconedElement icon="chart" value={mod} />
                {/* <IconedElement icon="ap" value={ap} nonZero />
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
                </GridCell> */}
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
                <GridCell filled center><GetIcon icon={activationIcon} color="secondary" /></GridCell>
                <GridCell width={10} filled black >{title}</GridCell>
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
                        <GetIcon icon="intelligence" color="secondary" />
                    </GridCell>
                </GridCell>
                <IconedElement icon="chart" value={mod} />
                {/* <GridCell height={2} center>
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
                </GridCell> */}
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

export const ExperienceBlock = (props) => {
    const {
        weapons = [],
        spells = [],
        poisons = [],
        characteristics,
        width = 7,
        height = 4
    } = props

    const CHARACTER_SUM_TRESHOLD = 12

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
    const expirience = chcracteristicSum >= CHARACTER_SUM_TRESHOLD ? heroExpPoints[
        // parseInt(warriorTypeItem?.exp) - 1
        chcracteristicSum - CHARACTER_SUM_TRESHOLD - 1
        // + weaponExperience
        + spellExperience
        + poisonExperience
    ] : 0


    return (
        <div>
            {/* <FlexWrapper>
                <GridCell left width={4} ><GetIcon icon="strength" color="secondary" />{'4+'}</GridCell>
                <GridCell left width={4} ><GetIcon icon="agility" color="secondary" />{'4+'}</GridCell>
                <GridCell left width={4} ><GetIcon icon="perception" color="secondary" />{'4+'}</GridCell>
                <GridCell left width={4} ><GetIcon icon="intelligence" color="secondary" />{'4+'}</GridCell>
            </FlexWrapper>
            <Skills /> */}
            <Experience initialExp={expirience} width={width} height={height} />
        </div>
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

    const experienceProps = {
        characteristics,
        weapons,
        spells,
        poisons,
        skills,
    }

    return (
        <div>
            {!isDemo && <NonPrintableBlock>
                <FlexWrapper>
                    <GridCell inverse center >
                        {isDemo ? count : <Button title="—" onClick={handleDeleteCharacter} />}
                    </GridCell>
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
                    
                    <GridCell width={1} center >
                        {!isDemo && <NonPrintableBlock>
                            <Button title={<GetIcon color={isControlled ? 'primary' : 'secondary'} icon="pencil" />} onClick={handleControlled} />
                        </NonPrintableBlock>}
                    </GridCell>
                </FlexWrapper>
            </NonPrintableBlock>}
            
            <FlexWrapper>
                <BorderWrapper>
                    <FlexWrapper>
                        {/* <GridCell filled center >
                            <GetIcon color="secondary" icon={warriorTypeIcon} />
                        </GridCell> */}
                        <GridCell filled center >
                            {count || ''}
                        </GridCell>

                        <GridCell width={11} black filled wrapper>{title}</GridCell>
                        
                        <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                        <GridCell width={1} inverse center>{price}</GridCell>
                    </FlexWrapper>

                    <FlexWrapper>
                        <Attributes
                            {...characteristics}
                            armour={armour}
                            actions={actions}

                            // price={price}
                            // warriorTypeIcon={warriorTypeIcon}
                        />

                        <ExperienceBlock {...experienceProps} width={10} />
                    </FlexWrapper>
                    
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
                {/* <GridCell /> */}
                
            </FlexWrapper>
            <GridCell />
        </div>
    )
}
