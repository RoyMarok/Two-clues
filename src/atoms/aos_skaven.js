import { atom, selector } from 'recoil'

export const aosSkavenState = atom({
    key: 'aosSkavenState',
    default: {
        male: []
    }
})

export const aosSkavenNameLoaded = selector({
    key: 'aosSkavenNameLoaded',
    get: ({get}) => get(aosSkavenState)?.male.length !== 0
})

export const SkavenNames = {
    title: 'Skaven',
    src: 'json/aos_skaven.json',
    stateLoaded: aosSkavenNameLoaded,
    setState: aosSkavenState
}
