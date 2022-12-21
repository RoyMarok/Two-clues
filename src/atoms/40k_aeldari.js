import { atom, selector } from 'recoil'

export const aeldariState = atom({
    key: 'aeldariState',
    default: {
        male: []
    }
})

export const aeldariNameLoaded = selector({
    key: 'aeldariNameLoaded',
    get: ({get}) => get(aeldariState)?.male.length !== 0
})

export const AeldariNames = {
    title: 'Aeldari',
    src: 'json/40k_aeldari.json',
    stateLoaded: aeldariNameLoaded,
    setState: aeldariState
}
