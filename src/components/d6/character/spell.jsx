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

import { IconedElement } from '../display'
import { IconedField } from './iconed-field'
import { ValueField } from './value-field'

import {
    Might,
    Dex,
    Mind,
    Brain,
    Move,
    Panic
} from './attributes'
import { Mod } from './weapon'

export const Dice = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="dice"
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

export const Spell = (props) => {
    const removeSpell = useSetRecoilState(CharacterD6StateObj.removeSpell)
    
    const [titleValue, setTitleValue] = useState(props?.title || '')
    const handleSetTitleValue = (e) => setTitleValue(e.target.value)
    const {
        dice,
        strength,
        agility,
        perception,
        intelligence,
        move,
        panic,
        mod,
        traits,
        allTraits,
        changes,
        index,
        characterIndex,
        controlled,
        price,
        attributes
    } = props

    const { defence } = attributes

    const handleRemoveSpell = (e) => removeSpell({ index, characterIndex })

    return (
        <>
            <FlexWrapper>
                <GridCell inverse center ><Button title="—" onClick={handleRemoveSpell} /> </GridCell>
                <GridCell filled center><GetIcon icon="magic" /></GridCell>
                
                <GridCell width={8} filled >
                    <Value
                        value={titleValue}
                        onChange={handleSetTitleValue}
                        onBlur={changes.title}
                    />
                </GridCell>
                <GridCell filled center><GetIcon icon="perception"  /></GridCell>
                <GridCell filled center><GetIcon icon="intelligence" /></GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell width={8} height={6} center>
                    <FlexWrapper>
                        <Might
                            limits={limits}
                            onChange={changes.strength}
                            value={strength}
                            filled
                            controlled={controlled}
                        />
                        <Dex
                            limits={limits}
                            onChange={changes.agility}
                            value={agility}
                            controlled={controlled}
                        />
                        <Mind
                            limits={limits}
                            onChange={changes.perception}
                            value={perception}
                            filled
                            controlled={controlled}
                        />
                        <Brain
                            limits={limits}
                            onChange={changes.intelligence}
                            value={intelligence}
                            controlled={controlled}
                        />
                    </FlexWrapper>
                    <FlexWrapper>
                        <Dice
                            onChange={changes.dice}
                            value={dice}
                            limits={limits}
                            filled
                            controlled={controlled}
                        />
                        <Move
                            onChange={changes.move}
                            value={move}
                            limits={limits}
                            controlled={controlled}
                        />
                        <Panic
                            onChange={changes.panic}
                            value={panic}
                            limits={limits}
                            filled
                            controlled={controlled}
                        />
                        <Mod
                            onChange={changes.mod}
                            limits={limits}
                            value={mod}
                            controlled={controlled}
                        />
                    </FlexWrapper>
                </GridCell>
                <GridCell width="6" height="6" center>
                    <GridCell width="6" height="4" center>
                        <Traits
                            traits={allTraits}
                            selectedTraits={traits}
                            controlled={controlled}
                            onChange={changes.traits}
                        />
                    </GridCell>
                    {Boolean(defence) && <FlexWrapper>
                        <GridCell height="2" center big black error>!</GridCell>
                        <IconedElement icon="±" value={mod - defence} important={false} />
                    </FlexWrapper>}
                    
                </GridCell>
            </FlexWrapper>
        </>
    )
}
