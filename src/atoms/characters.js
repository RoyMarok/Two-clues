import { atom, selector } from 'recoil'

import { getCharacterPrice } from './utils'
import { skillsState } from './skills'

export const defaultHuman = {
    characteristics: {
        strength: 14,
        agility: 14,
        perception: 14,
        intelligence: 14,
        health: 1,
        move: 3,
        panic: 0,
        defence: 0,
        fly: false
    },
    skills: {},
    actions: 2,
    title: '',
    price: '20',
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
        const skillList = get(skillsState)
        const passedProps = {
            ...props,
            price: getCharacterPrice({
                ...props,
                skillList
            })
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

