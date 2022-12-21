import { atom, selector } from 'recoil'

export const aosIdonethState = atom({
    key: 'aosIdonethState',
    default: {
        male: []
    }
})

export const aosIdonethNameLoaded = selector({
    key: 'aosIdonethNameLoaded',
    get: ({get}) => get(aosIdonethState)?.male.length !== 0
})

export const IdonethNames = {
    title: 'Idoneth Deepkin',
    src: 'json/aos_idoneth.json',
    stateLoaded: aosIdonethNameLoaded,
    setState: aosIdonethState
}