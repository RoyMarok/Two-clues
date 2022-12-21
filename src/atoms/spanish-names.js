import { atom, selector } from 'recoil'

import { getRandomName } from './utils'

const separator = ['-', ' de ']

export const spanishNameState = atom({
    key: 'spanishNameState',
    default: {
        male: []
    }
})

export const spanishNameLoaded = selector({
    key: 'spanishNameLoaded',
    get: ({get}) => get(spanishNameState)?.male.length !== 0
})

export const spanishRandomName = (names) => {
    const secondaryMaleNames = new Array(Math.round(Math.random() * 2))
    const secondaryFemaleNames = new Array(Math.round(Math.random() * 2))
    return ({
    male: [
        getRandomName(names?.male),
        ...secondaryMaleNames.fill('').map(item => getRandomName(names?.male)),
        [
            getRandomName(names?.familyName),
            getRandomName(separator),
            getRandomName(names?.familyName)
        ].join('')
    ].join(' '),
    female: [
        getRandomName(names?.female),
        ...secondaryFemaleNames.fill('').map(item => getRandomName(names?.female)),
        [
            getRandomName(names?.familyName),
            getRandomName(separator),
            getRandomName(names?.familyName)
        ].join('')
    ].join(' ')
})}

export const SpanishNames = {
    title: 'Spanish names',
    src: 'json/spanish_names.json',
    stateLoaded: spanishNameLoaded,
    setState: spanishNameState,
    random: spanishRandomName
}
