import { atom, selector } from 'recoil'

export const bretonianNameState = atom({
    key: 'bretonianNameState',
    default: {
        male: []
    },
})

export const bretonianNameLoaded = selector({
    key: 'bretonianNameLoaded',
    get: ({get}) => get(bretonianNameState)?.male.length !== 0
})

export const BretonianNames = {
    title: 'Bretonian',
    src: 'json/bretonian.json',
    stateLoaded: bretonianNameLoaded,
    setState: bretonianNameState
}