import { atom, selector } from 'recoil'

import { getWeaponPrice } from './utils'
import { getD6WeaponPrice } from './d6_character'

export const defaultWeapon = {
    range: '1',
    shots: '1',
    drum: '0',
    reload: '0',
    ap: '0',
    dmg: '1',
    title: 'Оружие',
    price: '20',
    mass: '1'
}

export const weaponState = atom({
    key: 'weaponState',
    default: []
})

export const weaponStateLoaded = selector({
    key: 'weaponStateLoaded',
    get: ({get}) => get(weaponState).length !== 0
})

export const weaponStateSetFiltered = selector({
    key: 'weaponStateSetFiltered',
    get: ({get}) => get(weaponState),
    set: ({get, set}, data = []) => {
        const allTraits = get(weaponTraitsState)
        set(
            weaponState, data.map((weapon, index) => ({
            ...weapon,
                price: getD6WeaponPrice({
                ...weapon,
                allTraits
            })
            
        })).sort((a, b) => {
            if (a?.range?.max > b?.range?.max) {
                return 1
            } else {
                if (a?.range?.max === b?.range?.max) {
                    return a.price > b.price ? 1 : -1
                } else {
                    return -1
                }
            }
        })
        
        )
    }
})

export const weaponTraitsState = atom({
    key: 'weaponTraitsState',
    default: []
})

export const weaponTraitsStateLoaded = selector({
    key: 'weaponTraitsStateLoaded',
    get: ({get}) => get(weaponTraitsState).length !== 0
})

export const changeWeaponsInState = selector({
    key: 'changeWeaponsInState',
    get: ({get}) => get(weaponState),
    set: ({get, set}, props) => {
        const weapons = get(weaponState)
        const passedProps = {
            ...props,
            price: getD6WeaponPrice({
                ...props,
                allTraits: get(weaponTraitsState),
                weapons
            })
        }
        set(weaponState, [
            ...weapons.slice(0, passedProps?.index),
            passedProps,
            ...weapons.slice(passedProps?.index + 1)
        ])
    }
})

export const addWeaponsInState = selector({
    key: 'addWeaponsInState',
    get: ({get}) => get(weaponState),
    set: ({get, set}) => {
        const weapons = get(weaponState)
        set(weaponState, [...weapons, {
            ...defaultWeapon,
            id: `weapon_${weapons.length}`,
            price: getD6WeaponPrice({
                ...defaultWeapon,
                allTraits: get(weaponTraitsState),
                weapons
            })
        }])
    }
})

export const WeaponsState = {
    src: 'json/weapons.json',
    stateLoaded: weaponStateLoaded,
    setState: weaponStateSetFiltered,
    add: addWeaponsInState,
    change: changeWeaponsInState
}

export const TraitsState = {
    src: 'json/traits.json',
    stateLoaded: weaponTraitsStateLoaded,
    setState: weaponTraitsState
}
