import { atom, selector } from 'recoil'

import { getCharacterPrice } from './utils'
import { skillsState } from './skills'
import { fractionsState } from './fractions'

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
    names: 'Common_0',
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
        const skillsList = get(skillsState)
        const fractions = get(fractionsState)
        const passedSelectedFraction = fractions.filter(fractionItem => fractionItem?.id === props?.fraction)?.[0]
        const selectedWarriorData = (passedSelectedFraction?.values || []).filter(type => type?.id === props?.warriorType)?.[0] || []
        const passedProps = {
            ...props,
            price: getCharacterPrice({
                ...props,
                skillList: [
                    ...(skillsList || []),
                    ...[
                        ...(passedSelectedFraction?.actions || []),
                        ...(selectedWarriorData?.actions || [])
                    ]
                ]
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

export const addCharactersInState = selector({
    key: 'addCharactersInState',
    get: ({get}) => get(characterState),
    set: ({get, set}, insertingCaracters = []) => {
        const characters = get(characterState)
        const baseIndex = characters.length
        const passedInsertingCharacters = insertingCaracters.map((character, characterIndex) => ({
            ...character,
            index: characterIndex + baseIndex
        }))
        set(characterState, [...characters, ...passedInsertingCharacters])
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
    insert: addCharactersInState,
    change: changeCharacterInState,
    clone: cloneCharacterInState,
    remove: removeCharacterFromState
}

