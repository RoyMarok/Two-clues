import { atom, selector } from 'recoil'

import { getRandomName, generateFromParts } from './utils'

export const chaosDwarfNameState = atom({
    key: 'chaosDwarfNameState',
    default: {
        male: []
    },
})

export const chaosDwarfNameLoaded = selector({
    key: 'chaosDwarfNameLoaded',
    get: ({get}) => get(chaosDwarfNameState)?.male.length !== 0
})

export const chaosDwarfRandomName = (names) => ({
    male: [generateFromParts({ parts: names?.male }), generateFromParts({ parts: names?.male })].join(' '),
    female: [[generateFromParts({ parts: names?.male }), getRandomName(names?.female?.suffix)].join(''), [generateFromParts({ parts: names?.male }), getRandomName(names?.female?.suffix)].join('')].join(' ')
})

export const ChaosDwarfNames = {
    title: 'Chaos Dwarfs',
    src: 'json/chaos_dwarf.json',
    stateLoaded: chaosDwarfNameLoaded,
    setState: chaosDwarfNameState,
    random: chaosDwarfRandomName
}