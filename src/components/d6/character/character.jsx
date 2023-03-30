import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { withTranslation } from 'react-i18next'

import { CharacterD6StateObj } from '../../../atoms'

import { clamp, noop } from '../../../utils'

import {
    BorderWrapper,
    Button,
    GridCell,
    Value,
    FlexWrapper
} from '../../styled'

import { SelectWithOptions } from '../../weapons-selection'
import { InsertedNames } from '../../names-generator'
import { GetIcon } from '../../get-icon'

import { Attributes } from './attributes'
import { Weapon } from './weapon'
import { Spell } from './spell'
import { Skill } from './skill'
import { SquareChooser } from './square-choser'
import { IconedField } from './iconed-field'
import { Defencies } from './defencies'

const limits = {
    strength: {
        min: 2,
        max: 6
    },
    agility: {
        min: 2,
        max: 6
    },
    perception: {
        min: 2,
        max: 6
    },
    intelligence: {
        min: 2,
        max: 6
    },
    health: {
        min: 1,
        max: 20
    },
    move: {
        min: 0,
        max: 8
    },
    panic: {
        min: 0,
        max: 6
    },
    defence: {
        min: 0,
        max: 6
    },
    count: {
        min: 1,
        max: 4
    },
    range: {
        min: 1,
        max: 30,
        values: [1, 2, 3, 4, 6, 8, 12, 30]
    },
    shots: {
        min: 1,
        max: 6
    },
    ap: {
        min: 0,
        max: 10
    },
    dmg: {
        min: 1,
        max: 8
    },
    drum: {
        min: 0,
        max: 30
    },
    mod: {
        min: -2,
        max: 2
    }
}

const WARRIOR_TYPES_VALUES = [
    {
        id: "leader",
        title: "Предводитель",
        values: [
            3,
            4,
            4,
            5
        ],
        limits: {
            min: 1,
            max: 1
        }
    },
    {
        id: "hero",
        title: "Герой",
        values: [
            3,
            4,
            5,
            6
        ],
        limits: {
            min: 0,
            max: 2
        }
    },
    {
        id: "henchman",
        title: "Боец",
        values: [
            4,
            5,
            6,
            6
        ]
    }
]

export const Character = (props) => {
    const {
        index = 0,
        isControlled = true,
        setControlled = noop
    } = props
    const [characters, setCharacter] = useRecoilState(CharacterD6StateObj.change)
    const character = characters[index]
    const {
        price,
        characteristics,
        weapons,
        spells,
        skills,
        warriorType = 'henchman',
        count,
        armour
    } = character

    const [titleValue, setTitleValue] = useState(character?.title || '')
    const removeCharacter = useSetRecoilState(CharacterD6StateObj.remove)
    const addWeapon = useSetRecoilState(CharacterD6StateObj.addWeapon)
    const addSpell = useSetRecoilState(CharacterD6StateObj.addSpell)
    const addSkill = useSetRecoilState(CharacterD6StateObj.addSkill)
    const handleDeleteCharacter = (e) => removeCharacter(index)
   
    const selectedWarriorData = WARRIOR_TYPES_VALUES.filter(type => type?.id === warriorType)?.[0] || []
    const selectedValues = selectedWarriorData?.values || []

    const handleControlled = (e) => setControlled(index)
    const handleSetTitleValue = (e) => setTitleValue(e.target.value)
    
    const handleAddWeapon = (e) => addWeapon(index)
    const handleAddSpell = (e) => addSpell(index)
    const handleAddSkill = (e) => addSkill(index)

    const changesCharMaker = (attr) => (e) => {
        const passedChars = {...character}
        passedChars[attr] = e?.target?.value ? e.target.value : e
        setCharacter({
            ...passedChars
        })
    }
    const changesMaker = (attr) => (e) => {
        const passedChars = {...characteristics}
        const passedValue = e?.target?.value ? e.target.value : e
        passedChars[attr] = limits?.[attr] ? clamp(passedValue, limits?.[attr]?.min, limits?.[attr]?.max) : passedValue
        setCharacter({
            ...character,
            characteristics: passedChars
        })
    }

    const handleSetTitleValueAll = (e) => {
        setTitleValue(e)
        changesCharMaker('title')(e)
    }

    const selectWarriorType = (e) => {
        changesCharMaker('warriorType')(e)
    }

    const weaponChangesMaker = (attr) => (index) => (e) => {
        const passedWeapons = [...weapons]
        const passedWeapon = { ...weapons[index]}
        const value = e?.target?.value && !isNaN(parseInt(e.target.value)) ? parseInt(clamp(e.target.value, limits?.[attr]?.min, limits?.[attr]?.max)) : e
        passedWeapon[attr] = attr === 'title' ? e.target.value : value
        passedWeapons[index] = passedWeapon
        setCharacter({
            ...character,
            weapons: passedWeapons
        })
    }
    const spellChangesMaker = (attr) => (index) => (e) => {
        const passedSpells = [...spells]
        const passedSpell = { ...spells[index]}
        const value = e?.target?.value && !isNaN(parseInt(e.target.value)) ? parseInt(clamp(e.target.value, -2, 2)) : e
        passedSpell[attr] = attr === 'title' ? e.target.value : value
        passedSpells[index] = passedSpell
        setCharacter({
            ...character,
            spells: passedSpells
        })
    }
    const skillChangesMaker = (attr) => (index) => (e) => {
        const passedSkills = [...skills]
        const passedSkill = { ...skills[index]}
        const value = e?.target?.value && !isNaN(parseInt(e.target.value)) ? parseInt(clamp(e.target.value, -2, 2)) : e
        passedSkill[attr] = attr === 'title' ? e.target.value : value
        passedSkills[index] = passedSkill
        setCharacter({
            ...character,
            skills: passedSkills
        })
    }

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

    const changes = {
        strength: changesMaker('strength'),
        agility: changesMaker('agility'),
        perception: changesMaker('perception'),
        intelligence: changesMaker('intelligence'),
        health: changesMaker('health'),
        move: changesMaker('move'),
        panic: changesMaker('panic'),
        defence: changesMaker('defence'),
        actions: changesCharMaker('actions'),
        armour: changesCharMaker('armour'),
        title: changesCharMaker('title'),
        fly: noop
    }
    const values = [
        6, 6, 6, 6
    ]

    const weaponChanges = (index) => ({
        range: weaponChangesMaker('range')(index),
        shots: weaponChangesMaker('shots')(index),
        ap: weaponChangesMaker('ap')(index),
        dmg: weaponChangesMaker('dmg')(index),
        count: weaponChangesMaker('count')(index),
        drum: weaponChangesMaker('drum')(index),
        dependencies: weaponChangesMaker('dependencies')(index),
        traits: weaponChangesMaker('traits')(index),
        mod: weaponChangesMaker('mod')(index),
        title: weaponChangesMaker('title')(index)
    })
    const spellChanges = (index) => ({
        dice: spellChangesMaker('dice')(index),
        strength: spellChangesMaker('strength')(index),
        agility: spellChangesMaker('agility')(index),
        perception: spellChangesMaker('perception')(index),
        intelligence: spellChangesMaker('intelligence')(index),
        move: spellChangesMaker('move')(index),
        panic: spellChangesMaker('panic')(index),
        mod: spellChangesMaker('mod')(index),
        title: spellChangesMaker('title')(index),
        traits: spellChangesMaker('traits')(index)
    })
    const skillChanges = (index) => ({
        ready: skillChangesMaker('ready')(index),
        hidden: skillChangesMaker('hidden')(index),
        panic: skillChangesMaker('panic')(index),
        mod: skillChangesMaker('mod')(index),
        dependencies: skillChangesMaker('dependencies')(index),
        title: skillChangesMaker('title')(index),
    })

    return (
        <div>
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
                        // value={index}
                        onClick={handleAddCharacter} 
                    />
                </GridCell>
                <InsertedNames onChange={handleSetTitleValueAll} index={index} showSelect={false} />
                <GridCell width={5} center>
                    <SelectWithOptions onChange={selectWarriorType} elements={WARRIOR_TYPES_VALUES} selected={warriorType} index={index} passedName="armourSelect" placeholder="Кто" />
                </GridCell>
            </FlexWrapper>
        
            <BorderWrapper>
                <FlexWrapper>
                    <GridCell inverse center ><Button title="—" onClick={handleDeleteCharacter} /> </GridCell>
                    <GridCell width={10} filled>
                        <Value
                            value={titleValue}
                            onChange={handleSetTitleValue}
                            onBlur={changes.title}
                        />
                    </GridCell>
                    <GridCell width={1} center filled><Button title={<GetIcon color={isControlled ? 'primary' : 'secondary'} icon="pencil" />} onClick={handleControlled} /> </GridCell>
                    <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                    <GridCell width={1} inverse center>{price}</GridCell>
                </FlexWrapper>
                <FlexWrapper>
                    <Attributes
                        values={selectedValues}
                        attributes={characteristics}
                        changes={changes}
                        limits={limits}
                        controlled={isControlled}
                        actions={character.actions}
                    />
                    <GridCell width={2} center />
                    {/* <GridCell width={4} height={6} center >
                        <Defencies
                            values={armour}
                            onChange={changesCharMaker('armour')}
                        />
                    </GridCell> */}
                    {/* <IconedField
                        title="atom"
                        filled
                    > 
                        <SquareChooser
                            values={[1, 2, 3, 4]}
                            value={character.actions}
                            onChange={changes.actions}
                        />
                    </IconedField> */}
                </FlexWrapper>
                {isControlled && <FlexWrapper>
                    <GridCell width={2} center><Button title={<FlexWrapper><GridCell center><GetIcon color="secondary" icon="weapon" /></GridCell><GridCell center big>{'+'}</GridCell></FlexWrapper>} onClick={handleAddWeapon} /></GridCell>
                    <GridCell width={2} center><Button title={<FlexWrapper><GridCell center><GetIcon color="secondary" icon="magic" /></GridCell><GridCell center big>{'+'}</GridCell></FlexWrapper>} onClick={handleAddSpell} /></GridCell>
                    <GridCell width={2} center><Button title={<FlexWrapper><GridCell center><GetIcon color="secondary" icon="skill" /></GridCell><GridCell center big>{'+'}</GridCell></FlexWrapper>} onClick={handleAddSkill} /></GridCell>
                    {/* <GridCell width={2} center><Button title={<FlexWrapper><GridCell center><GetIcon color="secondary" icon="gear" /></GridCell><GridCell center big>{'+'}</GridCell></FlexWrapper>} /></GridCell> */}
                </FlexWrapper>}
                
                {weapons.map((weapon, weaponIndex) =>
                    <Weapon
                        {...weapon}
                        index={weaponIndex}
                        characterIndex={index}
                        changes={weaponChanges(weaponIndex)}
                        controlled={isControlled}
                        limits={limits}
                    />)
                }
                {spells.map((spell, spellIndex) =>
                    <Spell
                        {...spell}
                        index={spellIndex}
                        characterIndex={index}
                        changes={spellChanges(spellIndex)}
                        controlled={isControlled}
                    />)
                }
                {skills.map((skill, skillIndex) =>
                    <Skill
                        {...skill}
                        index={skillIndex}
                        characterIndex={index}
                        changes={skillChanges(skillIndex)}
                        controlled={isControlled}
                    />)
                }
            </BorderWrapper>
            <GridCell />
        </div>
    )
}
