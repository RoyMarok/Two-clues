export { filterWeapons } from './filter-weapons'
export { makeCharactersStats } from './make-character-stats'
export { getChance } from './get-chance'

export { getWeaponPrice } from '../atoms/utils/get-weapon-price'
export {
    CalculateHealth,
    CalculateMove,
    getCharacterPrice
}
from '../atoms/utils/get-character-price'

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
export const noop = () => void 0

export const getElementByProp = ({
    elements,
    prop,
    value
}) => elements.filter(element => element?.[prop] === value)[0]
