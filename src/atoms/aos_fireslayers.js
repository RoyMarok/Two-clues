import { atom, selector } from 'recoil'

export const aosFireslayersState = atom({
    key: 'aosFireslayersState',
    default: {
        male: []
    }
})

export const aosFireslayersNameLoaded = selector({
    key: 'aosFireslayersNameLoaded',
    get: ({get}) => get(aosFireslayersState)?.male.length !== 0
})

export const FireslayersNames = {
    title: 'Fyreslayers',
    src: 'json/aos_fireslayers.json',
    stateLoaded: aosFireslayersNameLoaded,
    setState: aosFireslayersState
}
