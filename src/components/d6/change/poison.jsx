import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { CharacterD6StateObj } from '../../../atoms'
import {
    Button,
    FlexWrapper,
    GridCell,
    Value
} from '../../styled'

import { GetIcon } from '../../get-icon'

import { Traits } from '../../traits'

import { IconedField } from './iconed-field'
import { ValueField } from './value-field'

import {
    Might,
    Dex,
    Mind,
    Brain,
    Move,
    Panic
} from './attributes/attributes'
import { STR, Dependencies, DMG, Exp } from './weapon'
import { WarriorSelect } from './warrior-select'
import { Quality } from './spell'

export const Dice = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="health"
        filled={filled}
    >
        {controlled ? <ValueField
            onChange={onChange}
            value={value}
            filled={filled}
        /> : <GridCell black width={2} height="2" center big>
            {value}
        </GridCell>}
    </IconedField>
)

const limits = {
    min: -2,
    max: 2
}

export const Poison = (props) => {
    const removePoison = useSetRecoilState(CharacterD6StateObj.removePoison)

    const [titleValue, setTitleValue] = useState(props?.title || '')
    const handleSetTitleValue = (e) => setTitleValue(e.target.value)
    const {
        target,
        quality,
        activation,
        mod,
        ap,
        dmg,
        changes,
        index,
        characterIndex,
        controlled,
        price
    } = props

    const handleRemovePoison = (e) => removePoison({ index, characterIndex })

    return (
        <>
            <FlexWrapper>
                <GridCell inverse center ><Button title="—" onClick={handleRemovePoison} /> </GridCell>
                <GridCell filled center><GetIcon icon="poison" /></GridCell>

                <GridCell width={10} filled >
                    <Value
                        value={titleValue}
                        onChange={handleSetTitleValue}
                        onBlur={changes.title}
                    />
                </GridCell>
                {/* <GridCell filled center><GetIcon icon="perception" /></GridCell>
                <GridCell filled center><GetIcon icon="intelligence" /></GridCell> */}
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell width={10} height={3} center>
                    <FlexWrapper>
                        <Quality
                            onChange={changes.quality}
                            limits={limits}
                            value={quality}
                            controlled={controlled}
                            filled
                        />
                        <Dependencies
                            onChange={changes.target}
                            value={target}
                            controlled={controlled}
                        />
                        {/* <STR
                            onChange={changes.ap}
                            value={ap}
                            filled
                            controlled={controlled}
                        />
                        <DMG
                            onChange={changes.dmg}
                            value={dmg}
                            controlled={controlled}
                        /> */}
                        <Exp
                            onChange={changes.mod}
                            limits={limits}
                            value={mod}
                            controlled={controlled}
                            filled
                        />
                    </FlexWrapper>
                </GridCell>
                <GridCell width={4} center>
                    <WarriorSelect
                        elements={CharacterD6StateObj.constants.POISON_ACTIVATION}
                        selected={activation}
                        onChange={changes.activation}
                    />
                </GridCell>
                

            </FlexWrapper>
        </>
    )
}
