import { atom, selector } from 'recoil'

import { getRandomName, generateFromParts } from './utils'

export const imperialCitizenNamesState = atom({
    key: 'imperialCitizenNamesState',
    default: {
        male: []
    }
})

export const imperialCitizenNameLoaded = selector({
    key: 'imperialCitizenNameLoaded',
    get: ({get}) => get(imperialCitizenNamesState)?.male.length !== 0
})

export const imperialCitizenRandomName = (names) => {
    const firstNameMale = generateFromParts({ parts: names?.male})
    const firstNameFemale = generateFromParts({ parts: names?.female })
    const middleEasternNameParts = {
        prefix: generateFromParts({ parts: names?.middleEasternName?.prefix }),
        name1: generateFromParts({ parts: names?.middleEasternName?.name1 }),
        name2: generateFromParts({ parts: names?.middleEasternName?.name2 })
    }
    const middleEasternName = getRandomName([
        [middleEasternNameParts.prefix, middleEasternNameParts.name1].join(''),
        middleEasternNameParts.name1,
        [middleEasternNameParts.prefix, middleEasternNameParts.name2].join(''),
        middleEasternNameParts.name1
    ])
    const passedFamily = [
        generateFromParts({ parts: names?.familyName }),
        generateFromParts({ parts: names?.familyName }),
        generateFromParts({ parts: names?.familyName }),
        middleEasternName
    ]

    return ({
        male: [firstNameMale, getRandomName(passedFamily)].join(' '),
        female: [firstNameFemale, getRandomName(passedFamily)].join(' '),
    })

}

export const ImperialCitizenNames = {
    title: 'Imperium Citizen',
    src: 'json/40k_imperial_citizen_names.json',
    stateLoaded: imperialCitizenNameLoaded,
    setState: imperialCitizenNamesState,
    random: imperialCitizenRandomName
}