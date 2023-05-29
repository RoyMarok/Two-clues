import React, { useState } from 'react'

import { clamp } from '../../utils'
import {
    GridCell,
    FlexWrapper
} from '../styled'

import { FieldNumber } from '../field-number'
import { IconedElement } from './display'

const convertToD6 = (value) => DICE - value + 1
const convertTo2D6 = (value) => 2 * DICE - value + 1

const chance2d6 = [
    { value: 0 },
    { value: 0 },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 5 },
    { value: 4 },
    { value: 3 },
    { value: 2 },
    { value: 1 }
]

const WSToHit = {
    1: 5,
    2: 4,
    3: 4,
    4: 4,
    5: 3,
    6: 3,
    7: 3,
    8: 3,
    9: 3,
    10: 3
}

const WSToWound = {
    1: 6,
    2: 6,
    3: 5,
    4: 4,
    5: 3,
    6: 2,
    7: 2,
    8: 2,
    9: 2,
    10: 2
}
const toughChart = {
    1: 5,
    2: 5,
    3: 4,
    4: 3,
    5: 2,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 1
}


const percent = (value) => Math.round(value * 100)
const calculateChanceMordheim2d6 = (value) => {
    let summaryChance = 0
    chance2d6.map((item, index) => {
        if(index <= value) {
            summaryChance += item.value / 36
        }
        return null
    })
    return summaryChance
}

const DICE = 6

const getChance = (a = 3, b = 3, mod = 0) => {
    const side = DICE - Math.max(a, b) + 1
    const sideDiff = Math.min(a, b) - 1
    let chance = (Math.pow(side, 2) + 2 * Math.abs(a - b) * side) / Math.pow(DICE, 2)

    if (mod < 0) {
        chance = (Math.pow(side, 3) + 3 * Math.abs(a - b) * Math.pow(side, 2)) / Math.pow(DICE, 3)
    }
    if (mod > 0) {
        chance = 1 - ((Math.pow(side, 3) + 3 * Math.pow(sideDiff, 2) * (DICE - side)) / Math.pow(DICE, 3))
        // console.log('+1', a, b, side, sideDiff, percent(chance))
    }

    return percent(chance)
}

const validValues = [2, 3, 4, 5, 6]

const oneDiceSideChance = percent(1 / DICE)
const compareDiffs = (a, b) => a?.diff - b?.diff

const getAttributes = (props) => {
    const {
        WS,
        BS,
        strength,
        tough,
        initiative,
        leadership
    } = props

    const BSchance = percent(BS / DICE)
    const WSchance = percent(convertToD6(WSToHit[WS]) / DICE)
    const passedStrength = WSToWound[strength]
    const passedAgility = convertToD6(initiative)
    const perceprionChance = percent(calculateChanceMordheim2d6(leadership))

    const D6Perception = validValues
        .map(
        (item) => ({
            value: item,
            diff: Math.abs(oneDiceSideChance - perceprionChance + percent(convertToD6(item) / DICE))
            })
        )
        .sort(compareDiffs)?.[0]?.value
    

    const calculatedWS = [
        { mod: '-1', diff: Math.abs(WSchance - getChance(passedStrength, passedAgility, -1))},
        { mod: '0', diff: Math.abs(WSchance - getChance(passedStrength, passedAgility))},
        { mod: '1', diff: Math.abs(WSchance - getChance(passedStrength, passedAgility, 1))},
    ]
    const calculatedBS = [
        ...validValues.map((item) => ({ mod: '-1', value: item, diff: Math.abs(BSchance - getChance(D6Perception, item, -1))})),
        ...validValues.map((item) => ({ mod: '0', value: item, diff: Math.abs(BSchance - getChance(D6Perception, item)) })),
        ...validValues.map((item) => ({ mod: '1', value: item, diff: Math.abs(BSchance - getChance(D6Perception, item, 1)) })),
    ]

    const firstBS = calculatedBS.sort(compareDiffs)?.[0]

    const passedInt = firstBS?.value
    const passedWSmod = calculatedWS.sort(compareDiffs)?.[0]?.mod
    const passedBSmod = firstBS?.mod

    // console.log(
    //     'WS',
    //     WSchance,
    //     getChance(passedStrength, passedAgility, passedWSmod),
    //     'BS',
    //     BSchance,
    //     getChance(D6Perception, passedInt, passedBSmod),
    // )

    return {
        strength: passedStrength,
        agility: passedAgility,
        perception: D6Perception,
        intelligence: passedInt,
        wsMod: passedWSmod,
        bsMod: passedBSmod,
        WSchance,
        BSchance
    }
}


export const Mordheim = (props) => {
    const [move, setMove] = useState(4)
    const [WS, setWS] = useState(4)
    const [BS, setBS] = useState(4)
    const [strength, setStrength] = useState(3)
    const [tough, setTough] = useState(3)
    const [wounds, setWounds] = useState(1)
    const [initiative, setInitiative] = useState(4)
    const [actions, setActions] = useState(1)
    const [leadership, setLeadership] = useState(8)

    const calculatedAttr = getAttributes({
        WS,
        BS,
        strength,
        tough,
        initiative,
        leadership
    })

    const attributes = {
        ...calculatedAttr,
        health: parseInt(tough) + parseInt(wounds),
        move,
    }

    
    return (
        <>
            <FlexWrapper>
                <FieldNumber title="M" value={move} onChange={(e) => { setMove(clamp(e.target.value, 1, 12)) }} filled />
                <FieldNumber title="WS" value={WS} onChange={(e) => { setWS(clamp(e.target.value, 1, 9)) }} />
                <FieldNumber title="BS" value={BS} onChange={(e) => { setBS(clamp(e.target.value, 1, 9)) }} filled />
                <FieldNumber title="S" value={strength} onChange={(e) => { setStrength(clamp(e.target.value, 1, 6)) }} />
                <FieldNumber title="T" value={tough} onChange={(e) => { setTough(clamp(e.target.value, 1, 6)) }} filled />
                <FieldNumber title="W" value={wounds} onChange={(e) => { setWounds(clamp(e.target.value, 1, 6)) }} />
                <FieldNumber title="I" value={initiative} onChange={(e) => { setInitiative(clamp(e.target.value, 1, 6)) }} filled />
                <FieldNumber title="A" value={actions} onChange={(e) => { setActions(clamp(e.target.value, 1, 6)) }} />
                <FieldNumber title="LD" value={leadership} onChange={(e) => { setLeadership(clamp(e.target.value, 2, 12)) }} filled />
            </FlexWrapper>
            <FlexWrapper>
                <IconedElement icon="health" value={attributes.health} filled black />
                <IconedElement icon="move" value={attributes.move} black />
                <IconedElement icon="strength" value={attributes.strength} inverse plus />
                <IconedElement icon="agility" value={attributes.agility} inverse  plus />
                <IconedElement icon="perception" value={attributes.perception} inverse plus />
                <IconedElement icon="intelligence" value={attributes.intelligence} inverse plus />
                <GridCell />
                <IconedElement icon="weapon" value={attributes.wsMod} />
                <IconedElement icon="range" value={attributes.bsMod} />

            </FlexWrapper>
            <GridCell />
        </>
        
    )
}