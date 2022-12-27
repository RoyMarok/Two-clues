import { atom, selector } from 'recoil'
import { noop } from '../utils'

export const skillsState = atom({
    key: 'skillsState',
    default: []
})

export const skillsLoaded = selector({
    key: 'skillsLoaded',
    get: ({get}) => get(skillsState).length !== 0
})

export const SkillsList = {
    title: 'Skills',
    src: 'json/skills.json',
    stateLoaded: skillsLoaded,
    setState: skillsState,
    random: noop
}