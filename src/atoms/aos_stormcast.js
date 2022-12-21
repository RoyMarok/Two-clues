import { atom, selector } from 'recoil'

export const aosStormcastState = atom({
    key: 'aosStormcastState',
    default: {
        male: []
    }
})

export const aosStormcastNameLoaded = selector({
    key: 'aosStormcastNameLoaded',
    get: ({get}) => get(aosStormcastState)?.male.length !== 0
})

export const StormcastNames = {
    title: 'Stormcast Eternals',
    src: 'json/aos_stormcast.json',
    stateLoaded: aosStormcastNameLoaded,
    setState: aosStormcastState
}
