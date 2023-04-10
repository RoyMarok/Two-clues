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
import { WARRIOR_TYPES_VALUES } from '../character/character'

const IconedElement = (props) => {
    const {
        icon,
        value,
        filled = false,
        plus = false,
        black = false,
        inverse = false,
        color = 'secondary',
        description = '',
        checkboxes = false,
        nonZero = false,
        important = true
    } = props
    const nonZeroPassed = nonZero && value !== 0
    const passedTitle = GetIcon.list.includes(icon)
        ? <GetIcon icon={icon} color={black || nonZeroPassed ? 'primary' : color} />
        : <GridCell center big black={black} >{icon}</GridCell>
    const passedValue = value !== 0 && `${value}${plus ? '+' : ''}`
    return (
        <GridCell height={Boolean(description) ? 3 : 2} center>
            <FlexWrapper>
                <GridCell center >
                    {passedTitle}
                </GridCell>
                <GridCell center black={(black || important) && !inverse} filled={filled} inverse={inverse}>
                    {passedValue}
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
        <FlexWrapper>
            
            <IconedElement icon="health" value={health} filled black />
            <IconedElement icon={fly ? 'fly' : 'move'} value={move} black />
            <IconedElement icon="atom" value={actions} filled important={false} />
            {/* <IconedElement icon="skill" value="" /> */}
            <IconedElement icon="strength" value={strength} inverse plus/>
            <IconedElement icon="agility" value={agility} inverse black plus />
            <IconedElement icon="perception" value={perception} inverse plus />
            <IconedElement icon="intelligence" value={intelligence} inverse plus />
            
            
            {/* {armour ? <FlexWrapper><GridCell width={1} height={2} center>
                <GetIcon icon="defence" color="secondary" />
            </GridCell>
                <IconedElement icon="legs" value={armour?.legs} filled color="tetriary" description="1" checkboxes/>
                <IconedElement icon="chest" value={armour?.chest} color="tetriary" description="2-4" />
                <IconedElement icon="hands" value={armour?.hands} filled color="tetriary" description="5" checkboxes />
                <IconedElement icon="helmet" value={armour?.head} color="tetriary" description="6" />
            </FlexWrapper>
                : <GridCell width={5} />} */}
            <IconedElement icon="height" value={height} />
            <IconedElement icon="defence" value={defence} black important={false} />
            <IconedElement icon="agility" value={agility}  plus />
            <IconedElement icon="perception" value={perception}  plus />
            <GridCell />
            <IconedElement icon="panic" value={panic} black filled plus />
            <IconedElement icon="perception" value={perception}  plus />
        </FlexWrapper>
    )
}

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
        price,
        character
    } = props
    const {
        strength,
        agility,
        perception,
        intelligence
    } = character
    const calculatedHits = shots * count
    return (
        <>
            <FlexWrapper>
                <GridCell inverse center >{count}</GridCell>
                <GridCell filled center><GetIcon icon="weapon" /></GridCell>
                <GridCell width={10} filled black >{title}</GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <IconedElement icon="range" value={range} filled nonZero />
                <IconedElement icon="drum" value={drum} nonZero />
                <IconedElement icon="ap" value={ap} filled nonZero />
                <IconedElement icon="dmg" value={dmg} nonZero />
                <GridCell width={4} />
                
                <IconedElement icon="±" value={mod} important={false} />
                {dependencies.strength && <IconedElement icon="strength" value={strength}  plus />}
                {dependencies.agility && <IconedElement icon="agility" value={agility}  plus />}
                {dependencies.perception && <IconedElement icon="perception" value={perception}  plus />}
                {dependencies.intelligence && <IconedElement icon="intelligence" value={intelligence}  plus />}
                {calculatedHits > 1 && <IconedElement icon="*" value={calculatedHits} important={false} />}
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
        dice,
        strength,
        agility,
        perception,
        intelligence,
        move,
        panic,
        mod,
        price,
        character
    } = props
    

    return (
        <>
            <FlexWrapper>
                <GridCell filled center><GetIcon icon="magic" /></GridCell>
                <GridCell width={11} filled black >{title}</GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <IconedElement icon="dice" value={dice} filled nonZero />
                <IconedElement icon="strength" value={strength} nonZero />
                <IconedElement icon="agility" value={agility} filled nonZero />
                <IconedElement icon="perception" value={perception} nonZero />
                <IconedElement icon="intelligence" value={intelligence} filled nonZero />
                <IconedElement icon="move" value={move} nonZero />
                <IconedElement icon="panic" value={panic} filled nonZero />
                <GridCell />
                <IconedElement icon="±" value={mod} important={false} />
                <IconedElement icon="perception"  value={character.perception} plus />
                <IconedElement icon="intelligence"  value={character.intelligence} plus />
            </FlexWrapper>
        </>
    )
}

const Poison = (props) => {
    const {
        title,
        dice,
        strength,
        agility,
        perception,
        intelligence,
        move,
        panic,
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
                <IconedElement icon="dice" value={dice} filled nonZero />
                <IconedElement icon="strength" value={strength} nonZero />
                <IconedElement icon="agility" value={agility} filled nonZero />
                <IconedElement icon="perception" value={perception} nonZero />
                <IconedElement icon="intelligence" value={intelligence} filled nonZero />
                <IconedElement icon="move" value={move} nonZero />
                <IconedElement icon="panic" value={panic} filled nonZero />
                <GridCell />
                <IconedElement icon="±" value={mod} important={false} />
                <IconedElement icon="perception"  value={character.perception} plus />
                <IconedElement icon="intelligence"  value={character.intelligence} plus />
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
                <GridCell width={4} />
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
        setControlled = noop
    } = props
    const [characters, setCharacter] = useRecoilState(CharacterD6StateObj.change)
    const character = characters[index]
    const removeCharacter = useSetRecoilState(CharacterD6StateObj.remove)
    const {
        price,
        characteristics,
        weapons,
        spells,
        poisons,
        skills,
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

    const warriorTypeIcon = WARRIOR_TYPES_VALUES.filter((item) => item?.id === warriorType)?.[0]?.icon

    return (
        <div>
            <NonPrintableBlock>
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
            </NonPrintableBlock>
            
            <BorderWrapper>
                <FlexWrapper>
                    <GridCell inverse center >
                        <NonPrintableBlock>
                            <Button title="—" onClick={handleDeleteCharacter} />
                        </NonPrintableBlock>
                        <OnlyPrintableBlock>{count || 0}</OnlyPrintableBlock>
                    </GridCell>
                    <GridCell filled center >
                        <GetIcon color="secondary" icon={warriorTypeIcon} />
                    </GridCell>
                    <GridCell width={9} black filled >{title}</GridCell>
                    <GridCell width={1} center filled>
                        <NonPrintableBlock>
                            <Button title={<GetIcon color={isControlled ? 'primary' : 'secondary'} icon="pencil" />} onClick={handleControlled} />
                        </NonPrintableBlock>
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
        </div>
    )
}
