import { atom, selector } from 'recoil'

import { getRandomName } from './utils'

const defaultRussianNames = {
    male: {
        firstName: []
    }
}

export const russianNameState = atom({
    key: 'russianNameState',
    default: defaultRussianNames
})

export const russianNameLoaded = selector({
    key: 'russianNameLoaded',
    get: ({get}) => get(russianNameState)?.male?.firstName.length !== 0
})

export const russianRandomName = (names) => {
    const femaleName = getRandomName(names?.female?.firstName)
    return ({
    male: [getRandomName(names?.male?.firstName), [getRandomName(names?.male?.firstName), getRandomName(names?.male?.middleName)].join('').replace(/(йо)|(ьо)/, 'е').replace('аович', 'вич'), getRandomName(names?.familyName)].filter(item => Boolean(item)).join(' '),
    female: femaleName? [femaleName, [getRandomName(names?.male?.firstName), getRandomName(names?.female?.middleName)].join('').replace(/(йо)|(ьо)/, 'е'), [getRandomName(names?.familyName), 'а'].join('').replace('ыйа', 'ия').replace('аа', 'а').replace('ойа', 'ая').replace('ьа', 'ь')].filter(item => Boolean(item)).join(' ') : ''
})}

export const RussianNames = {
    title: 'Русские имена',
    src: 'json/russian_names.json',
    stateLoaded: russianNameLoaded,
    setState: russianNameState,
    random: russianRandomName
}
