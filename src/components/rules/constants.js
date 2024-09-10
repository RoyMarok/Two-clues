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
    "str": 0,
    "dmg": 3,
    "exp": 0,
    "count": 2,
    price: 14,
    "title": "Когти",
    "dependencies": {
        "strength": {
            "min": 1,
            "use": true
        },
        "agility": {
            "min": 1,
            "use": false
        },
        "perception": {
            "min": 1,
            "use": false
        },
        "intelligence": {
            "min": 1,
            "use": false
        }
    },
    "traits": [
        "melee"
    ]
}
export const defaultD6RangeWeapon = {
    "range": {
        "min": 3,
        "max": 12
    },
    "str": 3,
    "dmg": 2,
    "exp": 1,
    "count": 2,
    price: 16,
    "title": "Арбалет",
    "dependencies": {
        "strength": {
            "min": 2,
            "use": false
        },
        "agility": {
            "min": 1,
            "use": false
        },
        "perception": {
            "min": 1,
            "use": true
        },
        "intelligence": {
            "min": 1,
            "use": false
        }
    },
    "traits": ["reload_1"]
}

export const demoCharacter = {
    characteristics: {
        strength: 3,
        agility: 3,
        perception: 3,
        intelligence: 3,
        health: 1,
        move: 2,
        panic: 0,
        defence: 1,
        fly: false
    },

    fearless: false,
    actions: 2,
    price: 28,
    count: 0,
    height: 0,
    weapons: [],
    spells: [],
    skills: [],
    poisons: [],
    names: 'Common_0',
    warriorType: 'leader',
    title: 'Character',
}
