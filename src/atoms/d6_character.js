import { atom, selector } from 'recoil'

import { clamp, getChance } from '../utils'

import { weaponTraitsState } from './weapons'

export const WEAPONS_DAMAGE = [
    {
        title: '1',
        value: 1
    },
    {
        title: 'д2',
        value: 1.5
    },
    {
        title: 'д3',
        value: 2
    },
    {
        title: 'д6',
        value: 3.5
    },
    {
        title: 'д6+1',
        value: 4.5
    },
    {
        title: '2д6',
        value: 7
    },
    {
        title: '3д6',
        value: 10.5
    },
]

export const WEAPONS_RANGE = [
    1, 2, 3, 4, 6, 8, 12, 36
]

const defaultD6Weapon = {
    range: {
        min: 1,
        max: 1
    },
    str: 0,
    dmg: 0,
    exp: 0,
    count: 1,
    title: 'Кулаки',
    dependencies: {
        strength: {
            min: 1,
            use: true
        },
        agility: {
            min: 1,
            use: false
        },
        perception: {
            min: 1,
            use: false
        },
        intelligence: {
            min: 1,
            use: false
        }
    },
    
    traits: ['melee'],
    price: 2
}

const defaultD6Spell = {
    title: 'Проклятие',
    target: {
        strength: false,
        agility: false,
        perception: true,
        intelligence: false
    },
    quality: -1,
    ap: 0,
    dmg: 0,
    mod: 1,
    traits: [],
    price: 15
}

const defaultD6Poison = {
    title: 'Яд',
    target: {
        strength: true,
        agility: false,
        perception: false,
        intelligence: false
    },
    quality: -1,
    ap: 0,
    dmg: 0,
    mod: 1,
    traits: [],
    activation: 'drink',
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

export const defaultD6Charcter = {
    characteristics: {
        strength: 3,
        agility: 3,
        perception: 3,
        intelligence: 3,
        health: 1,
        move: 2,
        panic: 0,
        defence: 0,
        fly: false
    },

    fearless: false,
    actions: 2,
    title: '',
    price: 32,
    count: 0,
    height: 0,
    weapons: [
        // defaultD6Weapon
    ],
    spells: [],
    skills: [],
    poisons: [],
    names: 'Common_0',
    warriorType: 'henchman',
    index: 0
}

export const POISON_ACTIVATION = [
    {
        id: 'drink',
        title: '',
        icon: 'goblet',
        price: 1
    },
    {
        id: 'smoke',
        title: '',
        icon: 'fog',
        price: 2
    }
]

const PRICE_KOEFF = 2

const getMidDmg = (value) => {
    let sum = 0
    for (let i = 1; i <= value; i++) {
        sum += i / value
    }
    return sum
}

export const getD6WeaponPrice = (weapon) => {
    const {
        range = {
            min: 1,
            max: 1
        },
        str = 0,
        dmg = 1,
        count = 1,
        exp = 0,
        traits = [],
        allTraits = [],
        dependencies,
        title
    } = weapon

    let traitsPrice = 0
    allTraits.map(trait => {
        if (traits.includes(trait.id)) {
            traitsPrice += parseInt(trait.price)
        }
        return null
    })
    // const rangeKoeff = WEAPONS_RANGE.findIndex((item) => item === range.max) - WEAPONS_RANGE.findIndex((item) => item === range.min) + 1
    const rangeKoeff = clamp(range.max / 2 - range.min, 1, 6)
    const depKoeff = dependencies.strength.min + dependencies.agility.min + dependencies.perception.min + dependencies.intelligence.min  - 4
    const rangeDMG = rangeKoeff * getMidDmg(dmg)
   
    // console.log(
    //     'Weapon Price',
    //     title,
    //     rangeKoeff,
    //     WEAPONS_DAMAGE[dmg].value,
    //     rangeKoeff * WEAPONS_DAMAGE[dmg].value,
    // )

    return Math.max(
        Math.ceil(
            (
                str
                + exp
                + rangeDMG
                // - depKoeff
                + traitsPrice
            ) * count * PRICE_KOEFF
        )
        , 1)
}

const getD6SpellPrice = (spell) => {
    const {
        target,
        quality,
        mod,
        ap = 0,
        dmg = 0,
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

    const dependenciesSum = (target.strength + 0) + (target.agility + 0) + (target.perception + 0) + (target.intelligence + 0)
    // const passedAP = Boolean(ap) ? BASE_MOD_PRICE + (Math.abs(ap) * 5) : 0
    // const passedMod = Boolean(mod) ? BASE_MOD_PRICE + (Math.abs(mod) * 5) : 0

    return Math.max(
        Math.round((dependenciesSum * Math.abs(quality) + mod) * PRICE_KOEFF)
        , 1)
}

const getD6PoisonPrice = (poisons) => {
    const {
        target,
        quality,
        mod,
        ap = 0,
        dmg = 0,
        activation
    } = poisons

    const traitsPrice = POISON_ACTIVATION.filter(trait => activation === trait.id)?.[0]?.price
    const dependenciesSum = (target.strength + 0) + (target.agility + 0) + (target.perception + 0) + (target.intelligence + 0)

    // const passedAP = Boolean(ap) ? BASE_MOD_PRICE + (Math.abs(ap) * 5) : 0
    // const passedMod = Boolean(mod) ? BASE_MOD_PRICE + (Math.abs(mod) * 5) : 0

    // return Math.max(
    //     Math.round((dependenciesSum * Math.abs(quality) + Math.abs(ap) + Math.abs(dmg)) * (parseInt(mod) + 3) * 3  * traitsPrice)
    //     , 1)
    return Math.max(
        Math.round(((dependenciesSum * Math.abs(quality) + mod) * traitsPrice) * PRICE_KOEFF)
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

// const calculateAttr = (attribute) => parseInt(attribute) * (attribute >= 6 ? attribute - 4 : 1)
const calculateAttr = (attribute) => Math.ceil(parseInt(attribute) > 4 ? parseInt(attribute) * 2 : parseInt(attribute))

export const getD6CharacterPrice = (character) => {
    const {
        characteristics,
        actions,
        weapons = [],
        spells = [],
        skills=[],
        poisons=[],
        //  equipment,
        allTraits,
        spelltraits = [],
        fearless = false,
        height
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

    let calculatedWeapons = 0
    weapons.map((weapon) => calculatedWeapons += getD6WeaponPrice({ ...weapon, allTraits }))
    let calculatedSpells = 0
    spells.map((spell) => calculatedSpells += getD6SpellPrice({ ...spell, allTraits: spelltraits }))
    let calculatedSkills = 0
    skills.map((skill) => calculatedSkills += getD6SkillPrice({ ...skill }))
    let calculatedPoisons = 0
    poisons.map((poison) => calculatedPoisons += getD6PoisonPrice({ ...poison }))

    const calculatedMove = Math.ceil(fly ? Math.pow(parseInt(agility), 2) + Math.pow(parseInt(move), 2) : Math.pow(parseInt(move), 2))

    const attributeSum =
        calculateAttr(strength)
        + calculateAttr(agility)
        + calculateAttr(perception)
        + calculateAttr(intelligence)
        + calculatedMove
        + parseInt(defence) * 2
    
    

    const characteristicSum =
        Math.ceil(Math.max(Math.ceil(attributeSum), 4) * PRICE_KOEFF)
        + parseInt(calculatedWeapons)
        + parseInt(calculatedSpells)
        + parseInt(calculatedSkills)
        + parseInt(calculatedPoisons)
    // console.log('Character sum', attributeSum, Math.ceil(Math.max(Math.ceil(attributeSum), 4) * PRICE_KOEFF), parseInt(calculatedWeapons), characteristicSum)
    return Math.ceil(characteristicSum * actions / 2)
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
        const { weapons, spells, poisons, skills, index } = props
        const passedWeapons = weapons.map((weapon) => ({ ...weapon, price: getD6WeaponPrice({ ...weapon, allTraits }) }))
        const passedSpells = spells.map((spell) => ({ ...spell, price: getD6SpellPrice({ ...spell, allTraits }) }))
        const passedSkills = skills.map((skill) => ({ ...skill, price: getD6SkillPrice({ ...skill }) }))
        const passedPoisons = poisons.map((poison) => ({ ...poison, price: getD6PoisonPrice({ ...poison }) }))

        const passedProps = {
            ...props,
            weapons: passedWeapons,
            spells: passedSpells,
            skills: passedSkills,
            poisons: passedPoisons,
            price: getD6CharacterPrice({
                ...props,
                allTraits
            })
        }

        const findedIndex = characters.findIndex((item) => item.index === index)

        set(characterD6State, [
            ...characters.slice(0, findedIndex),
            passedProps,
            ...characters.slice(findedIndex + 1)
        ])
    }
})

export const addCharactersD6InState = selector({
    key: 'addCharactersD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, insertingCaracters = []) => {
        const characters = get(characterD6State)
        const passedInsertingCharacters = {
            ...defaultD6Charcter,
            index: Date.now()
        }
        set(characterD6State, [...characters, passedInsertingCharacters])
    }
})

export const removeCharacterD6FromState = selector({
    key: 'removeCharacterD6FromState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, index) => {
        const characters = get(characterD6State)
        const findedIndex = characters.findIndex((item) => item.index === index)
        set(characterD6State, [...characters.slice(0, findedIndex), ...characters.slice(findedIndex + 1)])
    }
})

export const addWeaponD6InState = selector({
    key: 'addWeaponD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, { index, weapon = defaultD6Weapon}) => {
        const characters = get(characterD6State)
        const character = characters.find((item) => item.index === index)
        const allTraits = get(weaponTraitsState)
        const passedWeapon = {
            ...weapon,
            price: getD6WeaponPrice({ ...weapon, allTraits })
        }
        const passedCharacter = {
            ...character,
            weapons: [...character.weapons, passedWeapon]
        }
        
        const passedProps = {
            ...passedCharacter,
            price: getD6CharacterPrice({
                ...passedCharacter,
                allTraits
            })
        }

        const findedIndex = characters.findIndex((item) => item.index === index)

        set(characterD6State, [
            ...characters.slice(0, findedIndex),
            passedProps,
            ...characters.slice(findedIndex + 1)
        ])
    }
})

export const removeWeaponD6InState = selector({
    key: 'removeWeaponD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, { index, characterIndex }) => {
        const characters = get(characterD6State)
        const character = characters.find((item) => item.index === characterIndex)
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
        const findedIndex = characters.findIndex((item) => item.index === characterIndex)

        set(characterD6State, [
            ...characters.slice(0, findedIndex),
            passedProps,
            ...characters.slice(findedIndex + 1)
        ])
    }
})

export const addSpellD6InState = selector({
    key: 'addSpellD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, index) => {
        const characters = get(characterD6State)
        const character = characters.find((item) => item.index === index)
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

        const findedIndex = characters.findIndex((item) => item.index === index)

        set(characterD6State, [
            ...characters.slice(0, findedIndex),
            passedProps,
            ...characters.slice(findedIndex + 1)
        ])
    }
})

export const removeSpellD6InState = selector({
    key: 'removeSpellD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, { index, characterIndex }) => {
        const characters = get(characterD6State)
        const character = characters.find((item) => item.index === characterIndex)
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
        const findedIndex = characters.findIndex((item) => item.index === characterIndex)

        set(characterD6State, [
            ...characters.slice(0, findedIndex),
            passedProps,
            ...characters.slice(findedIndex + 1)
        ])
    }
})

export const addPoisonD6InState = selector({
    key: 'addPoisonD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, index) => {
        const characters = get(characterD6State)
        const character = characters.find((item) => item.index === index)
        const passedCharacter = {
            ...character,
            poisons: [...character.poisons, defaultD6Poison]
        }
        const allTraits = get(weaponTraitsState)
        const passedProps = {
            ...passedCharacter,
            price: getD6CharacterPrice({
                ...passedCharacter,
                allTraits
            })
        }

        const findedIndex = characters.findIndex((item) => item.index === index)

        set(characterD6State, [
            ...characters.slice(0, findedIndex),
            passedProps,
            ...characters.slice(findedIndex + 1)
        ])
    }
})

export const removePoisonD6InState = selector({
    key: 'removePoisonD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, { index, characterIndex }) => {
        const characters = get(characterD6State)
        const character = characters.find((item) => item.index === characterIndex)
        const { poisons } = character
        const passedCharacter = {
            ...character,
            poisons: poisons.length === 1 ? [] : [...poisons.slice(0, index), ...poisons.slice(index + 1)]
        }
        const allTraits = get(weaponTraitsState)
        const passedProps = {
            ...passedCharacter,
            price: getD6CharacterPrice({
                ...passedCharacter,
                allTraits
            })
        }
        const findedIndex = characters.findIndex((item) => item.index === characterIndex)

        set(characterD6State, [
            ...characters.slice(0, findedIndex),
            passedProps,
            ...characters.slice(findedIndex + 1)
        ])
    }
})

export const addSkillD6InState = selector({
    key: 'addSkillD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, index) => {
        const characters = get(characterD6State)
        const character = characters.find((item) => item.index === index)
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

        const findedIndex = characters.findIndex((item) => item.index === index)

        set(characterD6State, [
            ...characters.slice(0, findedIndex),
            passedProps,
            ...characters.slice(findedIndex + 1)
        ])
    }
})

export const removeSkillD6InState = selector({
    key: 'removeSkillD6InState',
    get: ({ get }) => get(characterD6State),
    set: ({ get, set }, {index, characterIndex}) => {
        const characters = get(characterD6State)
        const character = characters.find((item) => item.index === characterIndex)
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
        const findedIndex = characters.findIndex((item) => item.index === characterIndex)

        set(characterD6State, [
            ...characters.slice(0, findedIndex),
            passedProps,
            ...characters.slice(findedIndex + 1)
        ])
    }
})

export const CharacterD6StateObj = {
    constants: {
        POISON_ACTIVATION
    },
    setState: characterD6State,
    change: changeCharacterD6InState,
    add: addCharactersD6InState,
    remove: removeCharacterD6FromState,
    addWeapon: addWeaponD6InState,
    removeWeapon: removeWeaponD6InState,
    addSpell: addSpellD6InState,
    removeSpell: removeSpellD6InState,
    addPoison: addPoisonD6InState,
    removePoison: removePoisonD6InState,
    addSkill: addSkillD6InState,
    removeSkill: removeSkillD6InState
}
