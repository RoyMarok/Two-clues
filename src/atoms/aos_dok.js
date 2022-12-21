import { atom, selector } from 'recoil'

export const aosDoKState = atom({
    key: 'aosDoKState',
    default: {
        male: []
    }
})

export const aosDoKNameLoaded = selector({
    key: 'aosDoKNameLoaded',
    get: ({get}) => get(aosDoKState)?.male.length !== 0
})

export const DoKNames = {
    title: 'Daughters of Khaine',
    src: 'json/aos_dok.json',
    stateLoaded: aosDoKNameLoaded,
    setState: aosDoKState
}
