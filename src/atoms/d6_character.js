import { atom, selector } from 'recoil'

import { getChance } from '../utils'

import { weaponTraitsState } from './weapons'

const defaultD6Weapon = {
    range: 1,
    shots: 1,
    ap: 0,
    dmg: -1,
    count: 1,
    title: 'Кулаки',
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
    price: 4
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

const defaultD6Charcter = {
    characteristics: {
        strength: 1,
        agility: 1,
        perception: 1,
        intelligence: 1,
        health: 1,
        move: 2,
        panic: 0,
        defence: 0,
        fly: false
    },

    fearless: false,
    actions: 2,
    title: '',
    price: 14,
    count: 0,
    height: 0,
    weapons: [
        defaultD6Weapon
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

const PRICE_KOEFF = 3
const WEAPONS_RANGE = [
    {
        range: 1,
        // price: 2
        price: 1
    },
    {
        range: 2,
        // price: 3
        price: 1.5
    },
    {
        range: 3,
        // price: 4
        price: 2
    },
    {
        range: 6,
        // price: 6
        price: 2.5
    },
    {
        range: 8,
        // price: 8
        price: 3
    },
    {
        range: 12,
        // price: 10
        price: 4
    },
    {
        range: 30,
        // price: 12
        price: 6
    }
]

const shotsBaseValues = [0, 1, 2, 3, 6]

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
        allTraits = [],
        title
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
    
    const shotsPrice = shotsBaseValues[shotsBaseValues.findIndex((element) => element === shots) - 1] + parseInt(shots)

    const dmgRange = passedRangePrice * (parseInt(dmg) + 2) * ((parseInt(shots) + 1) / 2)
    // const dmgRange2 = (Math.pow((parseInt(dmg) + 1), Math.max(shots, 1)) + ap) * passedRangePrice
    const passedDrumKoeff = Math.min(parseInt(drum), 4)

    const passedMod = Boolean(mod) ? (mod > 0 ? -1 : 1) * (10 + (Math.abs(mod) * 5)) : 0
    const passedAP = Boolean(ap) ? 10 + (parseInt(ap) * 5) : 0

    console.log('Weapon Price', title, shots, shotsPrice, dmgRange )

    return Math.max(
        Math.ceil(
            (
                dmgRange
                + passedDrumKoeff
                + parseInt(traitsPrice) / (5 * PRICE_KOEFF)
            ) * count
            + passedMod
            + passedAP
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
    const passedAP = Boolean(ap) ? 10 + (Math.abs(ap) * 5) : 0
    const passedMod = Boolean(mod) ? 10 + (Math.abs(mod) * 5) : 0

    return Math.max(
        Math.round(dependenciesSum * Math.abs(quality) * 10 + passedAP + Math.abs(dmg) * 10 + passedMod)
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

    const passedAP = Boolean(ap) ? 10 + (Math.abs(ap) * 5) : 0
    const passedMod = Boolean(mod) ? 10 + (Math.abs(mod) * 5) : 0

    // return Math.max(
    //     Math.round((dependenciesSum * Math.abs(quality) + Math.abs(ap) + Math.abs(dmg)) * (parseInt(mod) + 3) * 3  * traitsPrice)
    //     , 1)
    return Math.max(
        Math.round(dependenciesSum * Math.abs(quality) * 10 + passedAP + Math.abs(dmg) * 10 + passedMod) * traitsPrice
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

const calculateAttr = (attribute) => parseInt(attribute) * (attribute >= 6 ? attribute - 4 : 1)
// const calculateAttr = (attribute) => (6 - parseInt(attribute)) * 3 + 1

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


    // const armourSum = (parseInt(head) + parseInt(chest) + parseInt(hands) + parseInt(legs)) * 3
    // const passedAgility = fly ? agility + 3 : agility

    const attributeSum = getChance(strength, agility) + getChance(perception, intelligence)
        // calculateAttr(strength)
        // + calculateAttr(agility)
        // + calculateAttr(perception)
        // + calculateAttr(intelligence)
    
    const defenceCalculated = Boolean(defence) ? 10 + (parseInt(defence) * 5) : 0
    const sizeCalculated = Boolean(height) ? (height > 0 ? -1 : 1) * (10 + (Math.abs(height) * 5)) : 0
    const flyMod = fly ? 15  : 0

    console.log('Character', attributeSum, defenceCalculated, sizeCalculated, flyMod)

    const characteristicSum =
        Math.max(Math.ceil((
            attributeSum
            + defenceCalculated
            + flyMod
            + sizeCalculated
            )
            //  * (actions / 2)
        ), 6)
        // - panic
        + parseInt(calculatedWeapons)
        + parseInt(calculatedSpells)
        + parseInt(calculatedSkills)
        + parseInt(calculatedPoisons)
        
        
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
        const baseIndex = characters.length
        const passedInsertingCharacters = {
            ...defaultD6Charcter,
            index: new Date().getMilliseconds()
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
    set: ({ get, set }, index) => {
        const characters = get(characterD6State)
        const character = characters.find((item) => item.index === index)
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
