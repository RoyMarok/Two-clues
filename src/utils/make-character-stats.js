const statNames = [
    'move',
    'agility',
    'will',
    'ballistic',
    'weapon',
    'closeCombatActions',
    'defence',
    'health'
]

export const makeMinCharacterStats = (comparables = []) => {
    const output = {}
    comparables.map(item => statNames.map(
        stat => output[stat] = (!output[stat] && output[stat] !== 0) || parseInt(output[stat]) > parseInt(item[stat]) ? item[stat] : output[stat]
        ))
    return output
}
export const makeMaxCharacterStats = (comparables = []) => {
    const output = {}
    comparables.map(item => statNames.map(
        stat => output[stat] = (!output[stat] && output[stat] !== 0) || parseInt(output[stat]) < parseInt(item[stat]) ? item[stat] : output[stat]
        ))
    return output
}

export const makeCharactersStats = (comparables, mode = 'min') => mode === 'min' ? makeMinCharacterStats(comparables) : makeMaxCharacterStats(comparables)
