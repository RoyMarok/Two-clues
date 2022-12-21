import { atom, selector } from 'recoil'

import { getCharacterPrice } from './utils'

export const defaultHuman = {
    characteristics: {
        strength: 11,
        agility: 11,
        perception: 12,
        intelligence: 13,
        health: 3,
        move: 4,
        panic: 0,
        defence: 0,
        fly: false
    },
    skills: {
        melee: '0',
        // throwing: '-2',
        guns: '0',
        magic: '-2',
        acrobathics: '-1',
        stealth: '-2',
        // lockpick: '-2',
        medicine: '-2'
    },
    actions: 2,
    title: '',
    price: '45',
    weapons: [],
    faction: 'Common_0',
    armour: ''
}

export const characterState = atom({
    key: 'characterState',
    default: [defaultHuman]
})

export const changeCharacterInState = selector({
    key: 'changeCharacterInState',
    get: ({get}) => get(characterState),
    set: ({get, set}, props) => {
        const characters = get(characterState)
        const passedProps = {
            ...props,
            price: getCharacterPrice(props)
        }
        set(characterState, [
            ...characters.slice(0, passedProps?.index),
            passedProps,
            ...characters.slice(passedProps?.index + 1)
        ])
    }
})

export const cloneCharacterInState = selector({
    key: 'cloneCharacterInState',
    get: ({get}) => get(characterState),
    set: ({get, set}, index) => {
        const characters = get(characterState)
        const newCharcter = {
            ...(index ? characters[index] : defaultHuman),
            index: characters.length,
            title: defaultHuman.title
        }
        set(characterState, [...characters, newCharcter])
    }
})

export const removeCharacterFromState = selector({
    key: 'removeCharacterFromState',
    get: ({get}) => get(characterState),
    set: ({get, set}, index) => {
        const characters = get(characterState)
        set(characterState, [...characters.slice(0, index), ...characters.slice(index + 1)])
    }
})

export const CharacterState = {
    setState: characterState,
    add: cloneCharacterInState,
    change: changeCharacterInState,
    clone: cloneCharacterInState,
    remove: removeCharacterFromState
}

