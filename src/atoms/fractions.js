import { atom, selector } from 'recoil'
import { noop } from '../utils'

import { addCharactersInState } from './characters'

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
        const fractions = data
        const loadedFractions = get(fractionsState)
        set(fractionsState, fractions)
        const isLoadedeFractions = loadedFractions.length !== 0
        if (isLoadedeFractions) {
            const crews = fractions.map(fraction => fraction?.crew).filter(item => Boolean(item)).flat()
            console.log('Crew', crews)
            set(addCharactersInState, crews)
        }
        // return isLoadedeFractions
    }

})

export const FractionsList = {
    title: 'Fractions',
    src: 'json/fractions.json',
    stateLoaded: fractionsLoaded,
    setState: fractionSetState,
    random: noop
}
