const defaultD6Weapon = {
    range: '1',
    shots: '1',
    ap: '0',
    dmg: -4,
    title: 'Кулаки',
    dependencies: {
        strength: 'main',
        agility: 'secondary',
        perception: 'none',
        intelligence: 'none',
    },
    mod: -2,
    actions: 2,
    traits: []
}

const defaultD6Charcter = {
    characteristics: {
        strength: 14,
        agility: 14,
        perception: 14,
        intelligence: 14,
        health: 1,
        move: 3,
        panic: 0,
        defence: 0,
        fly: false
    },
    skills: {},
    actions: 2,
    title: '',
    price: '20',
    weapons: [
        defaultD6Weapon
    ],
    names: 'Common_0'
}