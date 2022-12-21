import { atom, selector } from 'recoil'

export const defaultArmour = {
    front: '1',
    rear: '0',
    title: 'Нагрудник',
    price: '20',
    mass: '1'
}

export const armourState = atom({
    key: 'armourState',
    default: []
})

export const armourStateLoaded = selector({
    key: 'armourStateLoaded',
    get: ({get}) => get(armourState).length !== 0
})

export const armourStateSetFiltered = selector({
    key: 'armourStateSetFiltered',
    get: ({get}) => get(armourState),
    set: ({set}, data) => {
        set(armourState, data.sort((a, b) => a.price > b.price ? 1 : -1).map((armour, index) => ({
            ...armour,
            id: `armour_${index}`
        })))
    }
})

export const changeArmourInState = selector({
    key: 'changeArmourInState',
    get: ({get}) => get(armourState),
    set: ({get, set}, props) => {
        const armours = get(armourState)
        const passedProps = {
            ...props,
            price: Math.max(20 * (2 * (parseInt(props?.front) + parseInt(props?.rear)) - props?.mass), 20)
        }
        set(armourState, [
            ...armours.slice(0, passedProps?.index),
            passedProps,
            ...armours.slice(passedProps?.index + 1)
        ])
    }
})

export const addArmourInState = selector({
    key: 'addArmourInState',
    get: ({get}) => get(armourState),
    set: ({get, set}) => {
        const armours = get(armourState)
        set(armourState, [...armours, defaultArmour])
    }
})

export const ArmourState = {
    src: 'json/armour.json',
    stateLoaded: armourStateLoaded,
    setState: armourStateSetFiltered,
    add: addArmourInState,
    change: changeArmourInState
}