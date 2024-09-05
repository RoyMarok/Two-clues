import React, { useState } from 'react'
import {  useSetRecoilState } from 'recoil'

import {
    CharacterD6StateObj
} from '../../../atoms'

import { Button, GridCell, FlexWrapper, Value } from '../../styled'

import { GetIcon } from '../../get-icon'

import { IconedField } from './iconed-field'
import { ValueField } from './value-field'
import { Dependencies, Mod } from './weapon'

export const Ready = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="like"
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

export const Hidden = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="hidden"
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

export const Panic = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="panic"
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

export const OutOfGame = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="clock"
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

export const Skill = (props) => {
    const removeSkill = useSetRecoilState(CharacterD6StateObj.removeSkill)
    const [titleValue, setTitleValue] = useState(props?.title || '')
    const handleSetTitleValue = (e) => setTitleValue(e.target.value)

    const {
        ready,
        hidden,
        panic,
        out,
        dependencies,
        mod,
        changes,
        controlled,
        index,
        characterIndex,
        price
    } = props

    const handleRemoveSkill = (e) =>  removeSkill({ index, characterIndex })
        
    return (
        <>
            <FlexWrapper>
                <GridCell inverse center ><Button title="—" onClick={handleRemoveSkill} /> </GridCell>
                <GridCell filled center><GetIcon icon="skill" /></GridCell>
                <GridCell width={10} filled >
                    <Value
                        value={titleValue}
                        onChange={handleSetTitleValue}
                        onBlur={changes.title}
                    />
                </GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <Dependencies
                    onChange={changes.dependencies}
                    value={dependencies}
                    filled
                    controlled={controlled}
                />
                <Ready
                    onChange={changes.ready}
                    value={ready}
                    controlled={controlled}
                />
                <Hidden
                    onChange={changes.hidden}
                    value={hidden}
                    controlled={controlled}
                    filled
                />
                <Panic
                    onChange={changes.panic}
                    value={panic}
                    controlled={controlled}
                />
                <OutOfGame
                    onChange={changes.out}
                    value={out}
                    controlled={controlled}
                    filled
                />
                <Mod
                    onChange={changes.mod}
                    value={mod}
                    controlled={controlled}
                    
                />
            </FlexWrapper>
        </>
    )
}
