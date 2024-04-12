export const defaultLimits = {
    min: -2,
    max: 12
}

export const limitsBase = {
    strength: defaultLimits,
    agility: defaultLimits,
    perception: defaultLimits,
    intelligence: defaultLimits,
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
        max: 8
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
        min: -2,
        max: 4
    },
    dmg: {
        min: -2,
        max: 4
    },
    str: {
        min: -2,
        max: 4
    },
    drum: {
        min: 0,
        max: 30
    },
    mod: {
        min: 0,
        max: 4
    },
    exp: {
        min: 0,
        max: 5
    },
    height: {
        min: -2,
        max: 2
    },
}