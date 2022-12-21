import { atom, selector } from 'recoil'

export const aosNighthauntNameState = atom({
    key: 'aosNighthauntNameState',
    default: {
        male: []
    },
})

export const aosNighthauntNameLoaded = selector({
    key: 'aosNighthauntNameLoaded',
    get: ({get}) => get(aosNighthauntNameState)?.male.length !== 0
})

export const NighthauntNames = {
    title: 'Nighthaunt',
    src: 'json/nighthaunt.json',
    stateLoaded: aosNighthauntNameLoaded,
    setState: aosNighthauntNameState
}