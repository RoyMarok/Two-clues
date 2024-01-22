import React from 'react'

import {

    GridCell,
    FlexWrapper,
} from '../../styled'

const heroExpPoints = [
    2, 4, 6, 8, 11, 14, 17, 20, 24, 28, 32, 36, 41, 46, 51, 57, 63, 69, 76, 83, 90, 98, 116, 124, 133, 142, 151, 160
]

export const Experience = (props) => {
    const {
        weapons = [],
        spells = [],
        poisons = [],
        characteristics,
        width = 7,
        height = 4
    } = props

    const CHARACTER_SUM_TRESHOLD = 12

    let weaponExperience = 0
    weapons.map((item) => weaponExperience += parseInt(item.mod) + 1)
    let spellExperience = 0
    spells.map((item) => spellExperience += parseInt(item.mod) + 1)
    let poisonExperience = 0
    poisons.map((item) => poisonExperience += parseInt(item.mod) + 1)
    const { strength,
        agility,
        perception,
        intelligence } = characteristics
    const chcracteristicSum = parseInt(strength) + parseInt(agility) + parseInt(perception) + parseInt(intelligence)
    const expirience = chcracteristicSum >= CHARACTER_SUM_TRESHOLD ? heroExpPoints[
        // parseInt(warriorTypeItem?.exp) - 1
        chcracteristicSum - CHARACTER_SUM_TRESHOLD - 1
        // + weaponExperience
        + spellExperience
        + poisonExperience
    ] : 0
    const FULL_EXP = []
    FULL_EXP.length = width * 4 * height
    FULL_EXP.fill(0)

    return (
        <FlexWrapper>
            <GridCell center width={width} height={height}>
                <FlexWrapper>
                    {FULL_EXP.map((el, index) => {
                        const divider = width * 2
                        return (
                            <GridCell
                                center
                                width={0.5}
                                height={0.5}
                                filled={
                                    (index + (index - index % (divider)) / divider % 2) % 2 === 0
                                    && !heroExpPoints.includes(index + 1)
                                }
                                inverse={
                                    heroExpPoints.includes(index + 1)
                                    || index + 1 === FULL_EXP.length
                                }
                            >
                                {index < expirience ? '•' : ''}
                            </GridCell>)
                    }
                    )
                    }
                </FlexWrapper>
            </GridCell>
        </FlexWrapper>
    )
}
