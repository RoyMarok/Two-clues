import { atom, selector } from 'recoil'

export const aosSylvanethState = atom({
    key: 'aosSylvanethState',
    default: {
        male: []
    }
})

export const aosSylvanethNameLoaded = selector({
    key: 'aosSylvanethNameLoaded',
    get: ({get}) => get(aosSylvanethState)?.male.length !== 0
})

export const SylvanethNames = {
    title: 'Sylvaneth',
    src: 'json/aos_sylvaneth.json',
    stateLoaded: aosSylvanethNameLoaded,
    setState: aosSylvanethState
}