import { atom, selector } from 'recoil'

export const aosKOState = atom({
    key: 'aosKOState',
    default: {
        male: []
    }
})

export const aosKONameLoaded = selector({
    key: 'aosKONameLoaded',
    get: ({get}) => get(aosKOState)?.male.length !== 0
})

export const KONames = {
    title: 'Kharadron Overlords',
    src: 'json/aos_ko.json',
    stateLoaded: aosKONameLoaded,
    setState: aosKOState
}
