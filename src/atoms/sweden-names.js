import { atom, selector } from 'recoil'

import { getRandomName } from './utils'

export const swedenNameState = atom({
    key: 'swedenNameState',
    default: {
        male: []
    }
})

export const swedenNameLoaded = selector({
    key: 'swedenNameLoaded',
    get: ({get}) => get(swedenNameState)?.male.length !== 0
})

export const swedenRandomName = (names) => ({
    male: [getRandomName(names?.male), getRandomName(names?.male), getRandomName(names?.familyName)].join(' '),
    female: [getRandomName(names?.female), getRandomName(names?.female), getRandomName(names?.familyName)].join(' ')
})

export const SweedenNames = {
    title: 'Sweeden names',
    src: 'json/sweden_names.json',
    stateLoaded: swedenNameLoaded,
    setState: swedenNameState,
    random: swedenRandomName
}