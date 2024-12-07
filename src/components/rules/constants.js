export const COLUMN_WIDTH = 14
export const characteristicsPrefix = 'band.character.characteristics'
export const weaponsPrefix = 'weapons.characteristics'
export const DICE_VALUES = new Array(6).fill('')

export const weaponProps = {
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

export const defaultD6MeleeWeapon = {
    "range": {
        "min": 1,
        "max": 1
    },
    "str": -1,
    "dmg": -2,
    // price: 0,
    "count": 1,
    "title": "Кулаки",
    "dependencies": {
        "strength": true,
        "agility": false,
        "perception": false,
        "intelligence": false
    },
    "traits": [
        "melee"
    ]
}

export const defaultD6RangeWeapon = {
    "range": {
        "min": 3,
        "max": 36
    },
    "str": 0,
    "dmg": 1,
    
    "count": 1,
    "title": "Болтер",
    "dependencies": {
        "strength": false,
        "agility": false,
        "perception": true,
        "intelligence": false
    },
    "traits": ["rapid", "rending"]
}

export const demoCharacter = {
    characteristics: {
        strength: -1,
        agility: -1,
        perception: -1,
        intelligence: -1,
        health: 1,
        move: 4,
        panic: 0,
        defence: 0,
        fly: false
    },

    fearless: false,
    actions: 2,
    price: 24,
    count: 0,
    height: 0,
    weapons: [],
    spells: [],
    skills: [],
    poisons: [],
    names: 'Common_0',
    warriorType: 'leader',
    title: 'Character',
    "traits": ["strong"]
}
