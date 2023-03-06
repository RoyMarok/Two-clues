import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { CharacterD6StateObj, weaponTraitsState } from '../../../atoms'
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
import { AttributeChoser } from './attribute-choser'

export const Range = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="range"
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

export const Shots = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="shots"
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

export const AP = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="ap"
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

export const DMG = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="dmg"
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

export const Count = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="#"
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

export const Drum = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="drum"
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

export const Dependencies = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="dice"
        filled={filled}
    >
        <AttributeChoser
            onChange={onChange}
            value={value}
            filled={filled}
            controlled={controlled}
        />
    </IconedField>
)

export const Mod = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="±"
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

export const Weapon = (props) => {
    const removeWeapon = useSetRecoilState(CharacterD6StateObj.removeWeapon)
    const allTraits = useRecoilValue(weaponTraitsState)
    const [titleValue, setTitleValue] = useState(props?.title || '')
    const handleSetTitleValue = (e) => setTitleValue(e.target.value)
    
    const {
        range,
        shots,
        ap,
        dmg,
        count,
        drum,
        dependencies,
        mod,
        changes,
        controlled,
        traits,
        index,
        characterIndex,
        price
    } = props

    const handleRemoveWeapon = (e) => removeWeapon({ index, characterIndex })

    return (
        <>
            <FlexWrapper>
                <GridCell inverse center ><Button title="—" onClick={handleRemoveWeapon} /> </GridCell>
                <GridCell filled center><GetIcon icon="weapon" /></GridCell>
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
                <GridCell width={8} height={6} center>
                    <FlexWrapper>
                        <Range
                            onChange={changes.range}
                            value={range}
                            filled
                            controlled={controlled}
                        />
                        <Shots
                            onChange={changes.shots}
                            value={shots}
                            controlled={controlled}
                        />
                        <AP
                            onChange={changes.ap}
                            value={ap}
                            filled
                            controlled={controlled}
                        />
                        <DMG
                            onChange={changes.dmg}
                            value={dmg}
                            controlled={controlled}
                        />
                    </FlexWrapper>
                    <FlexWrapper>
                        <Count
                            onChange={changes.count}
                            value={count}
                            filled
                            controlled={controlled}
                        />
                        <Drum
                            onChange={changes.drum}
                            value={drum}
                            controlled={controlled}
                        />
                        <Dependencies
                            onChange={changes.dependencies}
                            value={dependencies}
                            filled
                            controlled={controlled}
                        />
                        <Mod
                            onChange={changes.mod}
                            value={mod}
                            controlled={controlled}
                        />
                    </FlexWrapper>
                </GridCell>
                <GridCell width="6" height="6" center>
                    <Traits
                        traits={allTraits}
                        selectedTraits={traits}
                        controlled={controlled}
                        onChange={changes.traits}
                    />
                </GridCell>
            </FlexWrapper>
            
        </>
        
    )
}