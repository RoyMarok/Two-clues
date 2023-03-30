import { atom, selector } from 'recoil'

import { weaponTraitsState } from './weapons'

const defaultD6Weapon = {
    range: 1,
    shots: 1,
    ap: 0,
    dmg: 1,
    count: 1,
    title: 'Кулаки',
    dependencies: {
        strength: true,
        agility: true,
        perception: false,
        intelligence: false
    },
    mod: -2,
    drum: 0,
    traits: [],
    customValues: {},
    price: 2
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
    price: 5
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
    price: 5
}

const defaultD6Charcter = {
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
    // armour: {
    //     head: 0,
    //     chest: 0,
    //     hands: 0,
    //     legs: 0
    // },
    actions: 2,
    title: '',
    price: 33,
    count: 0,
    weapons: [
        defaultD6Weapon
    ],
    spells: [],
    skills: [],
    names: 'Common_0',
    index: 0
}

const PRICE_KOEFF = 1
const WEAPONS_RANGE = [
    {
        range: 1,
        price: 1
    },
    {
        range: 2,
        price: 2
    },
    {
        range: 3,
        price: 4
    },
    {
        range: 6,
        price: 6
    },
    {
        range: 8,
        price: 8
    },
    {
        range: 12,
        price: 10
    },
    {
        range: 30,
        price: 12
    }
]

const getD6WeaponPrice = (weapon) => {
    const {
        range = 1,
        shots = 1,
        ap = 0,
        dmg = 1,
        count = 1,
        mod = -2,
        drum = 1,
        traits = [],
        allTraits = []
    } = weapon

    let traitsPrice = 0
    allTraits.map(trait => {
        if (traits.includes(trait.id)) {
            traitsPrice += parseInt(trait.price)
        }
        return null
    })
    const passedRangePrice = WEAPONS_RANGE.filter(
        (item, index) => range === item.range || (range > WEAPONS_RANGE?.[Math.max(index - 1, 0)].range && range < item.range))[0]?.price

    const dmgRange = ((parseInt(dmg) + 1) * shots * 2 * range * 0.275) / 5
    const dmgRange2 = (parseInt(dmg) + 1) * shots * passedRangePrice

    return Math.max(
        Math.round(
            ((dmgRange2 + Math.max(parseInt(drum) - 1, 1) + (ap * 3)) * count + (parseInt(mod) + 2) * 3 + parseInt(traitsPrice) / 5) / PRICE_KOEFF
        )
        , 1)
}

const getD6SpellPrice = (spell) => {
    const {
        dice,
        strength,
        agility,
        perception,
        intelligence,
        move,
        panic,
        mod,
        traits,
        allTraits
    } = spell

    let traitsPrice = 0
    allTraits.map(trait => {
        if (traits.includes(trait.id)) {
            traitsPrice += parseInt(trait.price)
        }
        return null
    })


    return Math.max(
        Math.round(((5 * Math.abs(dice) + (Math.abs(strength) + Math.abs(agility) + Math.abs(perception) + Math.abs(intelligence) + Math.abs(move) + Math.abs(panic)) * 4) * (parseInt(mod) + 5) + parseInt(traitsPrice)) / PRICE_KOEFF)
        , 1)
}

const getConditionKoefficient = (value) => value === 0 ? 0 : parseInt(2 / value)

const getD6SkillPrice = (skill) => {
    const {
        mod,
        ready,
        hidden,
        panic,
    } = skill

    return Math.max(
        Math.round(((getConditionKoefficient(ready)
        + getConditionKoefficient(hidden)
        + getConditionKoefficient(panic))
        + (parseInt(mod) + 2) * 4
            + 5) / PRICE_KOEFF)
        , 5)
}

const calculateAttr = (attribute) => (6 - parseInt(attribute)) * 3 + 1

export const getD6CharacterPrice = (character) => {
    const {
        characteristics,
        actions,
        weapons = [],
        spells = [],
        skills=[],
        //  equipment,
        allTraits,
        spelltraits = [],
        armour
    } = character
    // const {
    //     head = 0,
    //     chest = 0,
    //     hands = 0,
    //     legs = 0
    // } = armour
    const {
        strength,
        agility,
        perception,
        intelligence,
        health,
        move,
        panic,
        defence,
        fly
    } = characteristics

    // const armourSum = (parseInt(head) + parseInt(chest) + parseInt(hands) + parseInt(legs)) * 3
    const attributeSum =
        calculateAttr(strength)
        + calculateAttr(agility)
        + calculateAttr(perception)
        + calculateAttr(intelligence)
    const moveCalculated = Math.round(Math.pow(2, parseInt(move) - 1) * (fly ? 2 : 1))
    const healthCalculated = Math.round(Math.pow(2, parseInt(health) - 1) * 6)
    let calculatedWeapons = 0
    weapons.map((weapon) => calculatedWeapons += getD6WeaponPrice({ ...weapon, allTraits }))
    let calculatedSpells = 0
    spells.map((spell) => calculatedSpells += getD6SpellPrice({ ...spell, allTraits: spelltraits }))
    let calculatedSkills = 0
    skills.map((skill) => calculatedSkills += getD6SkillPrice({ ...skill }))

    const characteristicSum =
        (attributeSum + moveCalculated + parseInt(defence) * 3) * actions
        // + parseInt(health) * 6
        + healthCalculated
        - panic
        + parseInt(calculatedWeapons)
        + parseInt(calculatedSpells)
        + parseInt(calculatedSkills)
        // + armourSum
    return characteristicSum
}

export const characterD6State = atom({
    key: 'characterD6State',
    default: [defaultD6Charcter]
})

export const changeCharacterD6InState = selector({
    key: 'changeCharacterD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, props) => {
        const characters = get(characterD6State)
        const allTraits = get(weaponTraitsState)
        const { weapons, spells, skills, index } = props
        const passedWeapons = weapons.map((weapon) => ({ ...weapon, price: getD6WeaponPrice({ ...weapon, allTraits }) }))
        const passedSpells = spells.map((spell) => ({ ...spell, price: getD6SpellPrice({ ...spell, allTraits }) }))
        const passedSkills = skills.map((skill) => ({ ...skill, price: getD6SkillPrice({ ...skill }) }))

        const passedProps = {
            ...props,
            weapons: passedWeapons,
            spells: passedSpells,
            skills: passedSkills,
            price: getD6CharacterPrice({
                ...props,
                allTraits
            })
        }

        set(characterD6State, [
            ...characters.slice(0, index),
            passedProps,
            ...characters.slice(index + 1)
        ])
    }
})

export const addCharactersD6InState = selector({
    key: 'addCharactersD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, insertingCaracters = []) => {
        const characters = get(characterD6State)
        const baseIndex = characters.length
        const passedInsertingCharacters = {
            ...defaultD6Charcter,
            index: baseIndex
        }
        set(characterD6State, [...characters, passedInsertingCharacters])
    }
})

export const removeCharacterD6FromState = selector({
    key: 'removeCharacterD6FromState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, index) => {
        const characters = get(characterD6State)
        set(characterD6State, [...characters.slice(0, index), ...characters.slice(index + 1)])
    }
})

export const addWeaponD6InState = selector({
    key: 'addWeaponD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, index) => {
        const characters = get(characterD6State)
        const character = characters[index]
        const passedCharacter = {
            ...character,
            weapons: [...character.weapons, defaultD6Weapon]
        }
        const allTraits = get(weaponTraitsState)
        const passedProps = {
            ...passedCharacter,
            price: getD6CharacterPrice({
                ...passedCharacter,
                allTraits
            })
        }

        set(characterD6State, [
            ...characters.slice(0, index),
            passedProps,
            ...characters.slice(index + 1)
        ])
    }
})

export const removeWeaponD6InState = selector({
    key: 'removeWeaponD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, { index, characterIndex }) => {
        const characters = get(characterD6State)
        const character = characters[characterIndex]
        const { weapons } = character
        const passedCharacter = {
            ...character,
            weapons: [...weapons.slice(0, index), ...weapons.slice(index + 1)]
        }
        const allTraits = get(weaponTraitsState)
        const passedProps = {
            ...passedCharacter,
            price: getD6CharacterPrice({
                ...passedCharacter,
                allTraits
            })
        }
        set(characterD6State, [
            ...characters.slice(0, characterIndex),
            passedProps,
            ...characters.slice(characterIndex + 1)
        ])
    }
})

export const addSpellD6InState = selector({
    key: 'addSpellD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, index) => {
        const characters = get(characterD6State)
        const character = characters[index]
        const passedCharacter = {
            ...character,
            spells: [...character.spells, defaultD6Spell]
        }
        const allTraits = get(weaponTraitsState)
        const passedProps = {
            ...passedCharacter,
            price: getD6CharacterPrice({
                ...passedCharacter,
                allTraits
            })
        }

        set(characterD6State, [
            ...characters.slice(0, index),
            passedProps,
            ...characters.slice(index + 1)
        ])
    }
})

export const removeSpellD6InState = selector({
    key: 'removeSpellD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, { index, characterIndex }) => {
        const characters = get(characterD6State)
        const character = characters[characterIndex]
        const { spells } = character
        const passedCharacter = {
            ...character,
            spells: spells.length === 1 ? [] : [...spells.slice(0, index), ...spells.slice(index + 1)]
        }
        const allTraits = get(weaponTraitsState)
        const passedProps = {
            ...passedCharacter,
            price: getD6CharacterPrice({
                ...passedCharacter,
                allTraits
            })
        }
        set(characterD6State, [
            ...characters.slice(0, characterIndex),
            passedProps,
            ...characters.slice(characterIndex + 1)
        ])
    }
})

export const addSkillD6InState = selector({
    key: 'addSkillD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, index) => {
        const characters = get(characterD6State)
        const character = characters[index]
        const passedCharacter = {
            ...character,
            skills: [...character.skills, defaultD6Skill]
        }
        const passedProps = {
            ...passedCharacter,
            price: getD6CharacterPrice({
                ...passedCharacter          
            })
        }

        set(characterD6State, [
            ...characters.slice(0, index),
            passedProps,
            ...characters.slice(index + 1)
        ])
    }
})

export const removeSkillD6InState = selector({
    key: 'removeSkillD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, {index, characterIndex}) => {
        const characters = get(characterD6State)
        const character = characters[characterIndex]
        const { skills } = character
        const passedCharacter = {
            ...character,
            skills: skills.length < 2 ? [] : [...skills.slice(0, index), ...skills.slice(index + 1)]
        }
        const passedProps = {
            ...passedCharacter,
            price: getD6CharacterPrice({
                ...passedCharacter
            })
        }
        set(characterD6State, [
            ...characters.slice(0, characterIndex),
            passedProps,
            ...characters.slice(characterIndex + 1)
        ])
    }
})

export const CharacterD6StateObj = {
    setState: characterD6State,
    change: changeCharacterD6InState,
    add: addCharactersD6InState,
    remove: removeCharacterD6FromState,
    addWeapon: addWeaponD6InState,
    removeWeapon: removeWeaponD6InState,
    addSpell: addSpellD6InState,
    removeSpell: removeSpellD6InState,
    addSkill: addSkillD6InState,
    removeSkill: removeSkillD6InState
}
