export { getD6WeaponPrice } from './get-weapon-price'
export { getD6SpellPrice } from './get-d6-spell-price'
export {
    CalculateHealth,
    CalculateMove,
    getCharacterPrice
}
from './get-character-price'

const idSymbols = '0123456789abcdefghijklmnopqrstuvwxyz'

export const getUniqueId = ({ symbols = idSymbols, length = 8 }) => {
    const id = new Array(length)
    return id.fill('').map(item => symbols[Math.round(Math.random() * (symbols.length-1))]).join()
}

export const getRandomName = (names = []) => typeof names === 'string' ?
    names :
    names[Math.round(Math.random() * (names.length - 1))]

export const generateFromParts = ({
    parts = [],
    separator = ''
}) => getRandomName(parts.map(part => part.map(part2 => getRandomName(part2)).join(separator)))

export const generateRandomNames = (names) => {
    const femaleName = generateFromParts({ parts: names?.female })
    return ({
    male: [generateFromParts({ parts: names?.male}), generateFromParts({ parts: names?.familyName })].join(' '),
    female: femaleName? [femaleName, generateFromParts({ parts: names?.familyName })].join(' ') : ''
})}