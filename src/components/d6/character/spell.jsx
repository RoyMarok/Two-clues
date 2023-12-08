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
import { STR, Dependencies, DMG, Exp, MinAttribute } from './weapon'

export const Quality = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title=""
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
        target,
        quality,
        mod,
        ap,
        dmg,
        changes,
        index,
        characterIndex,
        controlled,
        price,
        attributes
    } = props

    const { defence } = attributes

    const handleRemoveSpell = (e) => removeSpell({ index, characterIndex })
    const powerAcumulate = ((target.strength + 0) + (target.agility + 0) + (target.perception + 0) + (target.intelligence + 0)) * Math.abs(quality) + Math.abs(ap) + Math.abs(dmg) - 1

    return (
        <>
            <FlexWrapper>
                <GridCell inverse center ><Button title="—" onClick={handleRemoveSpell} /> </GridCell>
                {<GridCell inverse center>{Boolean(powerAcumulate) && `+${powerAcumulate}`}</GridCell>}
                <GridCell filled center><GetIcon icon="magic" /></GridCell>
                
                <GridCell width={9} filled >
                    <Value
                        value={titleValue}
                        onChange={handleSetTitleValue}
                        onBlur={changes.title}
                    />
                </GridCell>
                {/* <GridCell filled center><GetIcon icon="perception"  /></GridCell>
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
                        <MinAttribute
                            onChange={changes.dmg}
                            value={dmg}
                            title="dmg"
                            controlled={controlled}
                            limits={limits}
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
                <GridCell width="4" height="3" center>
                    {/* <GridCell width="6" height="4" center>
                        <Traits
                            traits={allTraits}
                            selectedTraits={traits}
                            controlled={controlled}
                            onChange={changes.traits}
                        />
                    </GridCell> */}
                    {Boolean(defence) && <FlexWrapper>
                        <GridCell height="2" center big black error>!</GridCell>
                        <IconedElement icon="±" value={mod - defence} important={false} />
                    </FlexWrapper>}
                    
                </GridCell>
            </FlexWrapper>
        </>
    )
}
