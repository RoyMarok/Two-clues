import { atom, selector } from 'recoil'
import { noop } from '../utils'

import { addCharactersInState } from './characters'

export const defaultFraction = {
    title: 'Человек',
    id: 'human',
    limits: {
        strength: {
            min: 6,
            max: 14
        },
        agility: {
            min: 6,
            max: 14
        },
        perception: {
            min: 6,
            max: 14
        },
        intelligence: {
            min: 6,
            max: 14
        },
        health: {
            min: 1,
            max: 10
        },
        move: {
            min: 3,
            max: 8
        }
    },
    values: [{
            id: "leader",
            title: "Предводитель",
            values: [
                8,
                10,
                11,
                12
            ],
            limits: {
                min: 1,
                max: 1
            },
            actions: [{
                id: "inspire",
                skill: true,
                attributes: {
                    strength: false,
                    agility: false,
                    perception: true,
                    intelligence: false
                },
                action: {
                    duration: {
                        stand: 1,
                        hidden: 0,
                        panic: 0
                    },
                    first: true,
                    remain: true
                }
            }]
        },
        {
            id: "hero",
            title: "Герой",
            values: [
                8,
                10,
                11,
                14
            ],
            limits: {
                min: 0,
                max: 2
            }
        },
        {
            id: "henchman",
            title: "Боец",
            values: [
                10,
                12,
                13,
                14
            ]
        }
    ]
}

export const fractionsState = atom({
    key: 'fractionsState',
    default: []
})

export const fractionsLoaded = selector({
    key: 'fractionsLoaded',
    get: ({get}) => get(fractionsState).length !== 0
})

export const fractionSetState = selector({
    key: 'fractionSetState',
    get: ({get}) => get(fractionsState),
    set: ({get, set}, data) => {
        const fractions = data.map(fraction => ({
            ...fraction,
            limits: {
                ...defaultFraction.limits,
                ...(fraction?.limits || {})
            },
            values: [
                ...defaultFraction.values,
                ...(fraction?.values || [])
            ]
        }))
        const loadedFractions = get(fractionsState)
        set(fractionsState, fractions)
        const isLoadedeFractions = loadedFractions.length !== 0
        if (isLoadedeFractions) {
            const crews = fractions.map(fraction => fraction?.crew).filter(item => Boolean(item)).flat()
            // console.log('Crew', crews)
            set(addCharactersInState, crews)
        }
    }

})

export const FractionsList = {
    title: 'Fractions',
    src: 'json/fractions.json',
    stateLoaded: fractionsLoaded,
    setState: fractionSetState,
    random: noop
}
