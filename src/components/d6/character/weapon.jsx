import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { CharacterD6StateObj, weaponTraitsState } from '../../../atoms'
import {
    Button,
    FlexWrapper,
    GridCell,
    Value
} from '../../styled'

import { clamp, noop } from '../../../utils'
import { GetIcon } from '../../get-icon'

import { Traits } from '../../traits'

import { IconedField } from './iconed-field'
import { ValueField } from './value-field'
import { AttributeChoser } from './attribute-choser'
import { SquareChooser } from './square-choser'

export const MinAttribute = ({ title, limits = { min: 1, max: 12 }, onChange, value, filled }) => {
    const { use, min } = value
    const handleChangeInput = () => {
        onChange({
            ...value,
            use: true
        })
    }
    const changeValue = (e) => {
        onChange({
            ...value,
            min: clamp(e?.target?.value, limits.min, limits.max)
        })
    }
    return (
        <IconedField
            title={title}
            filled={filled}
            iconButton
            iconButtonClick={handleChangeInput}
            muted={!use}
        >
            <ValueField
                onChange={changeValue}
                value={min}
                filled={filled}
            />

        </IconedField>
    )
}

export const Range = ({ onChange, value, values = [], filled, controlled = true, changeCC, isCloseCombat }) => (
    <IconedField
        title={isCloseCombat ? 'weapon' : 'range'}
        filled={filled}
        iconButton
        iconButtonClick={changeCC}
    >
        {controlled ? <SquareChooser
            values={values}
            onChange={onChange}
            limits={{min: 1, max: 30}}
            value={value}
            filled={filled}
        /> : <GridCell black width={2} height="2" center big>
            {value}
        </GridCell>}
    </IconedField>
)

export const Shots = ({ onChange, values = [1, 2, 3, 6], value, filled, controlled = true, showSquare }) => (
    <IconedField
        title="shots"
        filled={filled}
    >
        {showSquare ? <SquareChooser
            values={values}
            // limits={limits}
            onChange={onChange}
            value={value}
            filled={filled}
        /> : <ValueField
            onChange={onChange}
            value={value}
            filled={filled}
            // limits={limits}
        />}
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

    const [isCloseCombat, setCloseCombat] = useState(range < 6)
    const handleRemoveWeapon = (e) => removeWeapon({ index, characterIndex })
    const handleChangeCC = (e) => setCloseCombat(!isCloseCombat)

    const handleChangeCreator = (title) => (value) => {
        const newValue = {...dependencies}
        Object.getOwnPropertyNames(dependencies).map((element) => {
            if (element === title) {
                newValue[element] = value
            } else {
                newValue[element] = {
                    ...newValue[element], 
                    use: value.use ? false : newValue[element]['use']
            }
            }
            return void 0
        })
        changes.dependencies(newValue)
    }

    const rangeValues = isCloseCombat ? [1, 2, 3] : [6, 8, 12, 30]

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
            

            <GridCell width={14} height={3} center>
                <FlexWrapper>
                    <Count
                        onChange={changes.count}
                        value={count}
                        filled
                        controlled={controlled}
                    />
                    <Range
                        onChange={changes.range}
                        value={range}
                        values={rangeValues}
                        
                        controlled={controlled}
                        changeCC={handleChangeCC}
                        isCloseCombat={isCloseCombat}
                    />
                    <Shots
                        onChange={changes.shots}
                        value={shots}
                        controlled={controlled}
                        showSquare
                        filled
                    />
                    <AP
                        onChange={changes.ap}
                        value={ap}
                        
                        controlled={controlled}
                    />
                    <DMG
                        onChange={changes.dmg}
                        value={dmg}
                        controlled={controlled}
                        filled
                    />
                    
                    {/* <Drum
                        onChange={changes.drum}
                        value={drum}
                        controlled={controlled}
                    /> */}
                    {/* <Dependencies
                        onChange={changes.dependencies}
                        value={dependencies}
                        filled
                        controlled={controlled}
                    /> */}
                    <Mod
                        onChange={changes.mod}
                        value={mod}
                        controlled={controlled}
                    />
                </FlexWrapper>
            </GridCell>
            <FlexWrapper>
                <GridCell width="8" height="3" center>
                    <FlexWrapper>
                        <MinAttribute
                            title="strength"
                            onChange={handleChangeCreator('strength')}
                            value={dependencies?.strength}
                        />
                        <MinAttribute
                            title="agility"
                            onChange={handleChangeCreator('agility')}
                            value={dependencies?.agility}
                            filled
                        />
                        <MinAttribute
                            title="perception"
                            onChange={handleChangeCreator('perception')}
                            value={dependencies?.perception}
                        />
                        <MinAttribute
                            title="intelligence"
                            onChange={handleChangeCreator('intelligence')}
                            value={dependencies?.intelligence}
                            filled
                        />

                    </FlexWrapper>
                </GridCell>
                <GridCell width="6" height="3" center>
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