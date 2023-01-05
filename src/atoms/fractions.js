import { atom, selector } from 'recoil'
import { noop } from '../utils'

export const fractionsState = atom({
    key: 'fractionsState',
    default: []
})

export const fractionsLoaded = selector({
    key: 'fractionsLoaded',
    get: ({get}) => get(fractionsState).length !== 0
})

export const FractionsList = {
    title: 'Fractions',
    src: 'json/fractions.json',
    stateLoaded: fractionsLoaded,
    setState: fractionsState,
    random: noop
}
