import React from 'react'
import { Button, GridCell, FlexWrapper } from './styled'
import { GetIcon } from './get-icon'

const dicechanceChoose = (dice1, dice2, mod) => {
    if (!dice2) {
        const N = 20
        if (mod === '1') {
            return Math.round(
                (
                    (N + 1 - dice1) * N
                    + (N + 1 - dice1) * (dice1 - 1)
                ) * 100 / Math.pow(N, 2)
            )
        }
        if (mod === '2') {
            return Math.round(
                (
                    Math.pow(N, 3) - Math.pow(dice1 - 1, 3)
                ) * 100 / Math.pow(N, 3)
            )
        }
        if (mod === '-1') {
            return Math.round(
                (N + 1 - dice1) * (N + 1 - dice1) * 100 / Math.pow(N, 2)
            )
        }
        
        if (mod === '-2') {
            return diceChanceMinus1d20(dice1, dice1)
        }
        return Math.round(
            (N + 1 - dice1) * 100 / Math.pow(N, 1)
        )
    }
    const passedDice1 = Math.min(dice1, dice2)
    const passedDice2 = Math.max(dice1, dice2)
    if (mod === '1') {
        return diceChancePlus1d20(passedDice1, passedDice2)
    }
    if (mod === '-1') {
        return diceChanceMinus1d20(passedDice1, passedDice2)
    }
    if (mod === '-2') {
        return diceChanceMinus2d20(passedDice1, passedDice2)
    }
    if (mod === '2') {
        return diceChancePlus2d20(passedDice1, passedDice2)
    }
    return dicesChance(passedDice1, passedDice2)
}

const dicesChance = (dice1, dice2 = 0, N = 20) => Math.round(
    (
        (N + 1 - dice1) * (N + 1 - dice2)
        + Math.abs(dice2 - dice1) * (N + 1 - dice2)
    ) * 100 / Math.pow(N, 2)
    )
const diceChancePlus1d20 = (dice1, dice2 = 0, N = 20) => Math.round(
    (
        0
        + (N + 1 - dice1) * (N + 1 - dice2) * N
        + (N + 1 - dice1) * (N + 1 - dice2) * (dice1 - 1)
        + (N + 1 - dice1) * (N + 1 - dice2) * (dice2 - 1)

        + Math.abs(dice2 - dice1) * (N + 1 - dice2) * (dice1 - 1)
        + Math.abs(dice2 - dice1) * (dice2 - 1) * (dice2 - 1)
        + Math.abs(dice2 - dice1) * (dice1 - 1) * (dice2 - 1)
    ) * 100 / Math.pow(N, 3)
)
const diceChancePlus2d20 = (dice1, dice2 = 0, N = 20) => Math.round(
    (
        Math.pow(N, 4) - Math.pow(dice1 - 1, 3)*N
    ) * 100 / Math.pow(N, 4)
)
const diceChanceMinus1d20 = (dice1, dice2 = 0, N = 20) => Math.round(
    (
        0
        + (N + 1 - dice1) * (N + 1 - dice2) * (N + 1 - dice2)
        + Math.abs(dice2 - dice1) * (N + 1 - dice2) * (N + 1 - dice2)
    ) * 100 / Math.pow(N, 3)
)

const diceChanceMinus2d20 = (dice1, dice2 = 0, N = 20) => Math.round(
    (
        0
        + (N + 1 - dice1) * (N + 1 - dice2) * (N + 1 - dice2)
        + Math.abs(dice2 - dice1) * (N + 1 - dice2) * (N + 1 - dice2)
    ) * (N + 1 - dice2) * 100 / Math.pow(N, 4)
)


export const Skill = ({ title, value, onChange, dice1, dice2, even = false, strength = false, agility = false, perception = false, intelligence = false }) => (
    <FlexWrapper>
        <GridCell width="4">{title}</GridCell>
        <GridCell width="1" center><GetIcon color="secondary" icon={strength && 'strength'} /></GridCell>
        <GridCell width="1" center><GetIcon color="secondary" icon={agility && 'agility'} /></GridCell>
        <GridCell width="1" center><GetIcon color="secondary" icon={perception && 'perception'} /></GridCell>
        <GridCell width="1" center><GetIcon color="secondary" icon={intelligence && 'intelligence'} /></GridCell>

        <GridCell width="1" center filled={even}><Button print value={-2} title={value === '-2' ? '-2' : ''} onClick={onChange} /></GridCell>
        <GridCell width="1" center filled={!even}><Button print value={-1} title={value === '-1' ? '-1' : ''} onClick={onChange} /></GridCell>
        <GridCell width="1" center filled={even}><Button print value={0} title={value === '0' ? '•' : ''} onClick={onChange} /></GridCell>
        <GridCell width="1" center filled={!even}><Button print value={1} title={value === '1' ? '+1' : ''} onClick={onChange} /></GridCell>
        <GridCell width="1" center filled={even}><Button print value={2} title={value === '2' ? '+2' : ''} onClick={onChange} /></GridCell>
        <GridCell width="1" center black={dicechanceChoose(dice1, dice2, value) >= 50} >{dicechanceChoose(dice1, dice2, value)}</GridCell>
    </FlexWrapper>
)
