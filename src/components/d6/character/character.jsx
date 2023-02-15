import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { withTranslation } from 'react-i18next'

import {
    BorderWrapper,
    Button,
    GridCell,
    NonPrintableBlock,
    NonPrintableText,
    OnlyPrintableBlock,
    OnlyPrintableText,
    Value,
    FlexWrapper
} from '../../styled'
import { Skill } from '../../skill'
import { FieldNumber } from '../../field-number'
import { GetIcon } from '../../get-icon'

export const Character = (props) => {
    const { index, currentStats, weapons, allTraits, t, skillsList, limits, armours, fractions, useRemove, onDelete } = props
    const {
        price,
        characteristics,
        skills,
        armour,
        actions,
        fraction,
        names,
        warriorType
    } = currentStats
    const {
        agility,
        health,
        intelligence,
        move,
        panic,
        perception,
        strength,
        fly
    } = characteristics
    const overallPrice = 0
    return (
        <>
            <FlexWrapper>
                <GridCell width={12} filled serif>
                    <Value
                        value=""
                        // onChange={}
                        // onBlur={changeTitle}
                    />
                </GridCell>
                <GridCell width={1} center filled><GetIcon color="primary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{overallPrice}</GridCell>
            </FlexWrapper>
            <GridCell width="8" height="6" center>
                <FlexWrapper>
                    <FieldNumber
                        title="Сила"
                        value={strength}
                        // onChange={changeStrength}
                        filled
                        icon="strength"
                        // values={selectedValues}
                        // limits={passedLimits?.strength}
                    />
                    <FieldNumber
                        title="Лов"
                        value={agility}
                        // onChange={changeAgility}
                        icon="agility"
                        // values={selectedValues}
                        // limits={passedLimits?.agility}
                    />
                    <FieldNumber
                        title="Вос"
                        value={perception}
                        // onChange={changePerception}
                        filled
                        icon="perception"
                        // values={selectedValues}
                        // limits={passedLimits?.perception}
                    />
                    <FieldNumber
                        title="Инт"
                        value={intelligence}
                        // onChange={changeIntelligence}
                        icon="intelligence"
                        // values={selectedValues}
                        // limits={passedLimits?.intelligence}
                    />
                </FlexWrapper>
                <FlexWrapper>
                    <FieldNumber
                        title="Зд"
                        value={health}
                        // onChange={changeHealth}
                        icon="health"
                        filled

                    />
                    <FieldNumber
                        title="Движ"
                        value={move}
                        // onChange={changeMove}
                        icon={fly ? 'fly' : 'move'}
                        iconButton
                        // iconButtonClick={changeFly}

                    />
                    <FieldNumber
                        title="Ужас"
                        value={panic}
                        // onChange={changePanic}
                        icon="panic"
                        filled
                    />
                    <FieldNumber
                        title="Броня"
                        // value={defence}
                        // onChange={changeDefence}
                        icon="defence"
                    />
                    
                </FlexWrapper>
            </GridCell>
        </>
    )
}
