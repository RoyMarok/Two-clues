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

const IconedElement = ({ icon, value, filled = false, black = false, color = 'secondary', description = '', checkboxes = false, important = true }) => {
    const passedTitle = GetIcon.list.includes(icon) ? <GetIcon icon={icon} color={black ? 'primary' : color} /> : <GridCell center big black={black} >{icon}</GridCell>
    const passedValue = value !== 0 && value
    return (
        <GridCell height={Boolean(description) ? 3 : 2} center>
            <FlexWrapper>
                <GridCell center >
                    {passedTitle}
                </GridCell>
                <GridCell center black={black || important} filled={filled}>
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
        armour,
        fly
    } = props

    return (
        <FlexWrapper>
            
            <IconedElement icon="health" value={health} filled black />
            <IconedElement icon={fly ? 'fly' : 'move'} value={move} black />
            <IconedElement icon="atom" value={actions} filled important={false} />
            {/* <IconedElement icon="skill" value="" /> */}
            <IconedElement icon="strength" value={strength} />
            <IconedElement icon="agility" value={agility} filled black  />
            <IconedElement icon="perception" value={perception}  />
            <IconedElement icon="intelligence" value={intelligence} filled />
            
            
            {/* {armour ? <FlexWrapper><GridCell width={1} height={2} center>
                <GetIcon icon="defence" color="secondary" />
            </GridCell>
                <IconedElement icon="legs" value={armour?.legs} filled color="tetriary" description="1" checkboxes/>
                <IconedElement icon="chest" value={armour?.chest} color="tetriary" description="2-4" />
                <IconedElement icon="hands" value={armour?.hands} filled color="tetriary" description="5" checkboxes />
                <IconedElement icon="helmet" value={armour?.head} color="tetriary" description="6" />
            </FlexWrapper>
                : <GridCell width={5} />} */}
            <GridCell />
            <IconedElement icon="defence" value={defence} black />
            <IconedElement icon="agility" value={agility} black />
            <IconedElement icon="perception" value={perception} black />
            <GridCell />
            <IconedElement icon="panic" value={panic} black filled />
            <IconedElement icon="perception" value={perception} black />
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
                <IconedElement icon="range" value={range} filled />
                
                <IconedElement icon="drum" value={drum}  />
                <IconedElement icon="ap" value={ap} filled />
                <IconedElement icon="dmg" value={dmg}  />
                <GridCell width={3} />
                <IconedElement icon="shots" value={shots}/>
                <IconedElement icon="±" value={mod} />
                {dependencies.strength && <IconedElement icon="strength" value={strength} black />}
                {dependencies.agility && <IconedElement icon="agility" value={agility} black />}
                {dependencies.perception && <IconedElement icon="perception" value={perception} black />}
                {dependencies.intelligence && <IconedElement icon="intelligence" value={intelligence} black />}
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
                <IconedElement icon="dice" value={dice} filled />
                <IconedElement icon="strength" value={strength} />
                <IconedElement icon="agility" value={agility} filled />
                <IconedElement icon="perception" value={perception} />
                <IconedElement icon="intelligence" value={intelligence} filled />
                <IconedElement icon="move" value={move} />
                <IconedElement icon="panic" value={panic} filled />
                <GridCell />
                <IconedElement icon="±" value={mod} />
                
                <IconedElement icon="perception" black value={character.perception} />
                <IconedElement icon="intelligence" black value={character.intelligence} />
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
                
                <IconedElement icon="like" value={ready} filled />
                <IconedElement icon="hidden" value={hidden} />
                <IconedElement icon="panic" value={panic} filled />
                <GridCell width={5} />
                <IconedElement icon="±" value={mod} />
                {dependencies.strength && <IconedElement icon="strength" value={strength} black />}
                {dependencies.agility && <IconedElement icon="agility" value={agility} black />}
                {dependencies.perception && <IconedElement icon="perception" value={perception} black />}
                {dependencies.intelligence && <IconedElement icon="intelligence" value={intelligence} black />}
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
        skills,
        count,
        actions,
        title,
        armour
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
                    <GridCell width={10} black filled>{title}</GridCell>
                    <GridCell width={1} center filled>
                        <NonPrintableBlock>
                            <Button title={<GetIcon color={isControlled ? 'primary' : 'secondary'} icon="pencil" />} onClick={handleControlled} />
                        </NonPrintableBlock>
                    </GridCell>
                    <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                    <GridCell width={1} inverse center>{price}</GridCell>
                </FlexWrapper>
                <Attributes {...characteristics} armour={armour} actions={actions} />
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
