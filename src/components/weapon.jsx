import React, { useState } from 'react'

import { clamp, noop } from '../utils'

import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock } from './styled'
import { FieldNumber } from './field-number'
import { GetIcon } from './get-icon'
import { SelectWithOptions } from './weapons-selection'
import { Traits } from './traits'

export const Weapon = (props) => {
    const {
        currentStats,
        onChange = noop,
        index = 0,
        controlled = true,
        weapons,
        selected,
        passedName,
        allTraits
    } = props

    const {
        range,
        shots,
        drum,
        reload,
        ap,
        dmg,
        title,
        price,
        mass,
        traits = []
    } = currentStats

    const [titleValue, setTitleValue] = useState(currentStats?.title || '')
    const handleSetTitleValue = (e) => setTitleValue(e.target.value)

    const commonProps = {
        ...currentStats,
        index
    }

    const changeRange = (e) => {
        e.preventDefault()
        const { value } = e.target
        let passedValue = value
        if (value === '7') {
            passedValue = 1
        }
        else if (value === '2' || value === '11') {
            passedValue = 8
        } else if (value === '9' || value === '29') {
            passedValue = 12
        } else if (value === '13' || value > 30) {
            passedValue = 30
        }
        onChange({
            ...commonProps,
            range: passedValue
        })
    }
    const changeShots = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            ...commonProps,
            shots: clamp(value, 1, 6)
        })
    }
    const changeDrum = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            ...commonProps,
            drum: value
        })
    }
    const changeReload = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            ...commonProps,
            reload: clamp(value, 0, 2)
        })
    }
    const changeAp = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            ...commonProps,
            ap: clamp(value, 0, 10)
        })
    }
    const changeDmg = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            ...commonProps,
            dmg: clamp(value, 1, 4)
        })
    }
    const changeTitle = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            ...commonProps,
            title: value
        })
    }
    const changeMass = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            ...commonProps,
            mass: clamp(value, 1, 4)
        })
    }
    const changeTraits = (newTraits) => {
        onChange({
            ...commonProps,
            traits: newTraits
        })
    }
    
    return (
        <div>
        <FlexWrapper>
        <BorderWrapper>
            <FlexWrapper>
                <GridCell width={12} filled center={!controlled}>
                    {controlled ?
                        <Value value={titleValue} onChange={handleSetTitleValue} onBlur={changeTitle} disabled={!controlled} />
                    : 
                        <SelectWithOptions onChange={onChange} elements={weapons} selected={selected} index={index} passedName={passedName} />
                    }
                </GridCell>
                <GridCell width={1} center filled> <GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            
            <FlexWrapper>
                {/* <GridCell width={2} center /> */}
                <FieldNumber title="Даль" value={range} onChange={changeRange} icon="range" filled controlled={controlled} />
                <FieldNumber title="Встр" value={shots} onChange={changeShots} icon="shots" controlled={controlled} />
                <FieldNumber title="Маг" value={drum} onChange={changeDrum} icon="drum" filled controlled={controlled} />
                <FieldNumber title="Прз" value={reload} onChange={changeReload} icon="reload" controlled={controlled} />
                <FieldNumber title="Пробив" value={ap} onChange={changeAp} icon="ap" filled controlled={controlled} />
                <FieldNumber title="Урон" value={dmg} onChange={changeDmg} icon="dmg" controlled={controlled} />
                <FieldNumber title="Вес" value={mass} onChange={changeMass} icon="mass" filled controlled={controlled} />
            </FlexWrapper>
            <FlexWrapper>
                <GridCell width={14} height={controlled ? 2 : 1} center>
                    <Traits
                        traits={allTraits}
                        selectedTraits={traits}
                        controlled={controlled}
                        onChange={changeTraits}
                    />
                </GridCell>
            </FlexWrapper>
        </BorderWrapper>
        <GridCell />
        </FlexWrapper>
        <NonPrintableBlock>
            <GridCell center />
        </NonPrintableBlock>
        </div>
    )
}
