import { atom, selector } from 'recoil'

export const aosCitieskState = atom({
    key: 'aosCitieskState',
    default: {
        male: []
    }
})

export const aosCitiesNameLoaded = selector({
    key: 'aosCitiesNameLoaded',
    get: ({get}) => get(aosCitieskState)?.male.length !== 0
})

export const CitiesNames = {
    title: 'Cities of Sigmar',
    src: 'json/aos_cities.json',
    stateLoaded: aosCitiesNameLoaded,
    setState: aosCitieskState
}