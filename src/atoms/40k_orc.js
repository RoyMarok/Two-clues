import { atom, selector } from 'recoil'

export const ork40kState = atom({
    key: 'ork40kState',
    default: {
        male: []
    }
})

export const ork40kNameLoaded = selector({
    key: 'ork40kNameLoaded',
    get: ({get}) => get(ork40kState)?.male.length !== 0
})

export const Ork40kNames = {
    title: 'Ork',
    src: 'json/40k_ork.json',
    stateLoaded: ork40kNameLoaded,
    setState: ork40kState
}