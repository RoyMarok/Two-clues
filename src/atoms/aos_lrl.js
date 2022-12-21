import { atom, selector } from 'recoil'

export const aosLRLState = atom({
    key: 'aosLRLState',
    default: {
        male: []
    }
})

export const aosLRLNameLoaded = selector({
    key: 'aosLRLNameLoaded',
    get: ({get}) => get(aosLRLState)?.male.length !== 0
})

export const LRLNames = {
    title: 'Lumineth Realm-lords',
    src: 'json/aos_lrl.json',
    stateLoaded: aosLRLNameLoaded,
    setState: aosLRLState
}