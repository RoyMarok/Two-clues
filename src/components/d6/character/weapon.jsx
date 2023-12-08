import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { CharacterD6StateObj, weaponTraitsState } from '../../../atoms'
import { WEAPONS_DAMAGE, WEAPONS_RANGE } from '../../../atoms/d6_character'
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

export const MinAttribute = ({ title, limits = { min: 1, max: 12 }, onChange, value, controlled = true, filled }) => {
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
            {controlled ? <ValueField
                onChange={changeValue}
                value={min}
                filled={filled}
            /> : <GridCell black width={2} height="2" center big>
                {min}
            </GridCell>}

        </IconedField>
    )
}

export const Range = ({ onChange, value, values = WEAPONS_RANGE, filled, controlled = true, changeCC, isCloseCombat }) => {
    
    return (
        <GridCell width={4} height="3" center>
        <GridCell width={4} height="1" center black big>
            <GetIcon icon='range' color="primary" />
        </GridCell>
        <GridCell width={4} height={2} center filled={filled}>
            <SquareChooser
                values={values}
                onChange={onChange}
                limits={{ min: 1, max: 50 }}
                value={value}
                filled={filled}
            />
        </GridCell>
    </GridCell>
    // <IconedField
    //     title={isCloseCombat ? 'weapon' : 'range'}
    //     filled={filled}
    //     iconButton={Boolean(changeCC)}
    //     iconButtonClick={changeCC}
    // >
    //     {controlled ? <SquareChooser
    //         values={values}
    //         onChange={onChange}
    //         limits={{min: 1, max: 30}}
    //         value={value}
    //         filled={filled}
    //     /> : <GridCell black width={2} height="2" center big>
    //         {value}
    //     </GridCell>}
    // </IconedField>
)}

export const Shots = ({ onChange, values = [1, 2, 3, 6], value, filled, controlled = true, showSquare }) => (
    <IconedField
        title="shots"
        filled={filled}
    >
        {controlled ? <SquareChooser
            values={values}
            // limits={limits}
            onChange={onChange}
            value={value}
            filled={filled}
        /> : <GridCell black width={2} height="2" center big>
            {value}
        </GridCell>}
    </IconedField>
)

export const STR = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="fist"
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
            showValue={WEAPONS_DAMAGE[value].title}
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

export const Exp = ({ onChange, value, filled, controlled = true }) => (
    <IconedField
        title="chart"
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
        str,
        dmg,
        count,
        exp,
        dependencies,
        changes,
        controlled,
        traits,
        index,
        characterIndex,
        price,
        person = false
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

    const handleChangeMinRange = (value) => {
        changes.range({
            ...range,
            min: value
        })
    }

    const handleChangeMaxRange = (value) => {
        changes.range({
            ...range,
            max: value
        })
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
            
            <FlexWrapper>
                <GridCell width={10} height={6} center>
                    <FlexWrapper>
                        <Range
                            onChange={changes.range}
                            value={range}
                            // values={[1, 2, 3]}
                            filled
                            controlled={controlled}
                            // changeCC={handleChangeCC}
                            // isCloseCombat
                        />
                        {/* <Range
                            onChange={handleChangeMaxRange}
                            value={range?.max}
                            values={rangeValues}
 
                            controlled={controlled}
                            changeCC={handleChangeCC}
                            isCloseCombat={isCloseCombat}
                        /> */}

                        <STR
                            onChange={changes.str}
                            value={str}
                            controlled={controlled}
                        />
                        <DMG
                            onChange={changes.dmg}
                            value={dmg}
                            controlled={controlled}
                            filled
                        />
                        <Exp
                            onChange={changes.exp}
                            value={exp}
                        // controlled={controlled}
                        />
                    </FlexWrapper>

                    <FlexWrapper>
                        <Count
                            onChange={changes.count}
                            value={count}
                            filled
                        // controlled={controlled}
                        />
                        <MinAttribute
                            title="strength"
                            onChange={handleChangeCreator('strength')}
                            value={dependencies?.strength}
                            controlled={controlled}
                        />
                        <MinAttribute
                            title="agility"
                            onChange={handleChangeCreator('agility')}
                            value={dependencies?.agility}
                            filled
                            controlled={controlled}
                        />
                        <MinAttribute
                            title="perception"
                            onChange={handleChangeCreator('perception')}
                            value={dependencies?.perception}
                            controlled={controlled}
                        />
                        <MinAttribute
                            title="intelligence"
                            onChange={handleChangeCreator('intelligence')}
                            value={dependencies?.intelligence}
                            filled
                            controlled={controlled}
                        />

                    </FlexWrapper>

                </GridCell>
                <GridCell width="4" height="6" center>
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