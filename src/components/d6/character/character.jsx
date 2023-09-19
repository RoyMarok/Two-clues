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
import { Poison } from './poison'
import { Skill } from './skill'
import { ValueField } from './value-field'
import { IconedField } from './iconed-field'
import { WarriorSelect } from './warrior-select'

const limitsBase = {
    strength: {
        min: 1,
        max: 12
    },
    agility: {
        min: 1,
        max: 12
    },
    perception: {
        min: 1,
        max: 12
    },
    intelligence: {
        min: 1,
        max: 12
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
        max: 4
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
        min: -1,
        max: 6
    },
    drum: {
        min: 0,
        max: 30
    },
    mod: {
        min: -1,
        max: 5
    },
    height: {
        min: -2,
        max: 2
    },
}

export const WARRIOR_TYPES_VALUES = [
    {
        id: "leader",
        title: "Предводитель",
        icon: 'napoleon',
        values: [
            4,
            3,
            3,
            2
        ],
        exp: 5,
        limits: {
            min: 1,
            max: 1
        }
    },
    {
        id: "hero",
        title: "Герой",
        icon: 'hussar',
        values: [
            4,
            3,
            2,
            1
        ],
        exp: 3,
        limits: {
            min: 0,
            max: 2
        }
    },
    {
        id: "henchman",
        title: "Боец",
        icon: 'face',
        values: [
            3,
            2,
            1,
            1
        ]
    }
]

export const sizeLimits = {
    '-2': {
        strength: {
            min: 1,
            max: 1
        },
        // health: {
        //     min: 1,
        //     max: 1
        // },
        move: 0
    },
    '-1': {
        strength: {
            min: 1,
            max: 3
        },
        // health: {
        //     min: 1,
        //     max: 2
        // },
        move: 1
    },
    '0': {
        strength: {
            min: 1,
            max: 12
        },
        // health: {
        //     min: 1,
        //     max: 8
        // },
        move: 2
    },
    '1': {
        strength: {
            min: 4,
            max: 12
        },
        // health: {
        //     min: 5,
        //     max: 10
        // },
        move: 3
    },
    '2': {
        strength: {
            min: 5,
            max: 12
        },
        // health: {
        //     min: 7,
        //     max: 15
        // },
        move: 4
    },
}

export const Character = (props) => {
    const {
        index = 0,
        isControlled = true,
        setControlled = noop
    } = props
    const [characters, setCharacter] = useRecoilState(CharacterD6StateObj.change)
    const character = characters.find((item) => item.index === index)
    const {
        price,
        characteristics,
        weapons,
        spells,
        skills,
        poisons,
        warriorType = 'henchman',
        count,
        fearless,
        height
    } = character

    const limits = {
        ...limitsBase,
        ...sizeLimits[height]
    }

    const [titleValue, setTitleValue] = useState(character?.title || '')
    const removeCharacter = useSetRecoilState(CharacterD6StateObj.remove)
    const addWeapon = useSetRecoilState(CharacterD6StateObj.addWeapon)
    const addSpell = useSetRecoilState(CharacterD6StateObj.addSpell)
    const addPoison = useSetRecoilState(CharacterD6StateObj.addPoison)
    const addSkill = useSetRecoilState(CharacterD6StateObj.addSkill)
    const handleDeleteCharacter = (e) => removeCharacter(index)
   
    const selectedWarriorData = WARRIOR_TYPES_VALUES.filter(type => type?.id === warriorType)?.[0] || []
    const selectedValues = selectedWarriorData?.values || []

    const handleControlled = (e) => setControlled(index)
    const handleSetTitleValue = (e) => setTitleValue(e.target.value)
    
    const handleAddWeapon = (e) => addWeapon(index)
    const handleAddSpell = (e) => addSpell(index)
    const handleAddPoison = (e) => addPoison(index)
    const handleAddSkill = (e) => addSkill(index)
    const changesCharMaker = (attr) => (e) => {
        
        let limits = limitsBase
        const passedValue = e?.target?.value || e?.target?.value === '' || e?.target?.value === 0 ? e.target.value : e
        if (attr === 'height') {
            limits = {
                ...limitsBase,
                ...sizeLimits[e.target.value]
            }
        }
        
        const passedChars = {...character}
        const passedCharacteristics = { ...characteristics }
        passedCharacteristics.health = clamp(passedCharacteristics?.health, limits?.health?.min, limits?.health?.max)
        
        
        if (passedValue !== passedChars[attr]) {
            passedChars[attr] = limits?.[attr] ? clamp(passedValue, limits?.[attr]?.min, limits?.[attr]?.max) : passedValue
            setCharacter({
                ...passedChars,
                characteristics: passedCharacteristics
            })
        } else {
            console.log('changesCharMaker', attr, passedChars[attr], passedValue)
        }
        
    }
    const changesMaker = (attr) => (e) => {
        const passedChars = {...characteristics}
        const passedE = attr === 'fly' ? !characteristics.fly : e
        const passedValue = passedE?.target?.value ? passedE.target.value : passedE
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
    const poisonChangesMaker = (attr) => (index) => (e) => {
        const passedPoisons = [...poisons]
        const passedPoison = { ...poisons[index]}
        const value = e?.target?.value && !isNaN(parseInt(e.target.value)) ? parseInt(clamp(e.target.value, -2, 2)) : e
        passedPoison[attr] = attr === 'title' ? e.target.value : value
        passedPoisons[index] = passedPoison
        setCharacter({
            ...character,
            poisons: passedPoisons
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
        height: changesCharMaker('height'),
        move: changesMaker('move'),
        panic: changesMaker('panic'),
        defence: changesMaker('defence'),
        actions: changesCharMaker('actions'),
        armour: changesCharMaker('armour'),
        title: changesCharMaker('title'),
        fly: changesMaker('fly')
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
        target: spellChangesMaker('target')(index),
        quality: spellChangesMaker('quality')(index),
        mod: spellChangesMaker('mod')(index),
        ap: spellChangesMaker('ap')(index),
        dmg: spellChangesMaker('dmg')(index),
        title: spellChangesMaker('title')(index),
        traits: spellChangesMaker('traits')(index)
    })
    const poisonChanges = (index) => ({
        target: poisonChangesMaker('target')(index),
        quality: poisonChangesMaker('quality')(index),
        mod: poisonChangesMaker('mod')(index),
        ap: poisonChangesMaker('ap')(index),
        dmg: poisonChangesMaker('dmg')(index),
        activation: poisonChangesMaker('activation')(index),
        title: poisonChangesMaker('title')(index)
    })
    const skillChanges = (index) => ({
        ready: skillChangesMaker('ready')(index),
        hidden: skillChangesMaker('hidden')(index),
        panic: skillChangesMaker('panic')(index),
        out: skillChangesMaker('out')(index),
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
                    <WarriorSelect onChange={selectWarriorType} elements={WARRIOR_TYPES_VALUES} selected={warriorType} index={index} passedName="armourSelect" placeholder="Кто" />
                </GridCell>
            </FlexWrapper>
        
            <BorderWrapper>
                <FlexWrapper>
                    <GridCell inverse center ><Button title="—" onClick={handleDeleteCharacter} /> </GridCell>
                    <GridCell width={10} filled >
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
                        attributes={{ ...characteristics, height }}
                        changes={changes}
                        limits={limits}
                        controlled={isControlled}
                        actions={character.actions}
                    />
                    {/* <GridCell width={4} center /> */}
                    {/* <IconedField
                        title="height"
                        
                    >
                        <ValueField
                            onChange={changesCharMaker('height')}
                            value={height}
                            limits={limits.height}
                        />
                    </IconedField> */}
                    
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
                    {/* <GridCell width={2} center><Button title={<FlexWrapper><GridCell center><GetIcon color="secondary" icon="skill" /></GridCell><GridCell center big>{'+'}</GridCell></FlexWrapper>} onClick={handleAddSkill} /></GridCell> */}
                    <GridCell width={2} center><Button title={<FlexWrapper><GridCell center><GetIcon color="secondary" icon="poison" /></GridCell><GridCell center big>{'+'}</GridCell></FlexWrapper>} onClick={handleAddPoison} /></GridCell>
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
                        attributes={characteristics}
                        index={spellIndex}
                        characterIndex={index}
                        changes={spellChanges(spellIndex)}
                        controlled={isControlled}
                    />)
                }
                {poisons.map((poison, poisonIndex) =>
                    <Poison
                        {...poison}
                        index={poisonIndex}
                        characterIndex={index}
                        changes={poisonChanges(poisonIndex)}
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
