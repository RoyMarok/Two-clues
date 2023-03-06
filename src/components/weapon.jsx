import React, { useState } from 'react'

import { clamp, noop } from '../utils'

import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock } from './styled'
import { FieldNumber } from './field-number'
import { GetIcon } from './get-icon'
import { SelectWithOptions } from './weapons-selection'
import { Traits } from './traits'
import { IconedElement } from './short-character'

export const Weapon = (props) => {
    
    const {
        currentStats,
        onChange = noop,
        index = 0,
        controlled = true,
        weapons = [],
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
        traits = [],
        masterIndex
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
        if (value === '5') {
            passedValue = 2
        }
        else if (value === '3' || (value === '7' && range === 8)) {
            passedValue = 6
        } else if (value === '7' || value === '11') {
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
            dmg: clamp(value, 0, 4)
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
            mass: clamp(value, 0, 4)
        })
    }
    const changeTraits = (newTraits) => {
        onChange({
            ...commonProps,
            traits: newTraits
        })
    }
    const changeMaster = (e) => {
        console.log('changeMaster', e.target.value)
        onChange({
            ...commonProps,
            masterIndex: e.target.value
        })
    }

    const restWeapons = weapons.filter(weapon => weapon.index !== index)
    let passedReload = parseInt(reload) ? 1 : 2
    if (parseInt(range) === 1) {
        passedReload = 0
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
                {controlled ? <FlexWrapper>
                    <FieldNumber title="Даль" value={range} onChange={changeRange} icon="range" filled controlled={controlled} />
                    <FieldNumber title="Встр" value={shots} onChange={changeShots} icon="shots" controlled={controlled} />
                    <FieldNumber title="Маг" value={drum} onChange={changeDrum} icon="drum" filled controlled={controlled} />
                    <FieldNumber title="Прз" value={reload} onChange={changeReload} icon="reload" controlled={controlled} />
                    <FieldNumber title="Пробив" value={ap} onChange={changeAp} icon="ap" filled controlled={controlled} />
                    <FieldNumber title="Урон" value={dmg} onChange={changeDmg} icon="dmg" controlled={controlled} />
                    <FieldNumber title="Вес" value={mass} onChange={changeMass} icon="mass" filled controlled={controlled} />
                </FlexWrapper>
                : <FlexWrapper>
                    <IconedElement value={range} icon="range" filled />
                    <IconedElement value={shots} icon="shots" />
                    <IconedElement value={drum} icon="drum" filled />
                    <IconedElement value={passedReload} squared icon="reload" />
                    <IconedElement value={ap} icon="ap" filled />
                    <IconedElement value={dmg} icon="dmg" />
                    <IconedElement value={mass} icon="mass" filled />
                    </FlexWrapper>
                }
            
                {(controlled || Boolean(traits.length)) && <FlexWrapper>
                <GridCell width={14} height={controlled ? 2 : 1} center>
                    <Traits
                        traits={allTraits}
                        selectedTraits={traits}
                        controlled={controlled}
                        onChange={changeTraits}
                    />
                </GridCell>
            </FlexWrapper>}
            {controlled && <GridCell width={14} center>
                <SelectWithOptions
                    onChange={changeMaster}
                    elements={restWeapons}
                    selected={masterIndex}
                    index={`${index}_masterIndex`}
                    passedName={`${passedName}_masterIndex`}
                />
            </GridCell>}
        </BorderWrapper>
        <GridCell />
        </FlexWrapper>
        <NonPrintableBlock>
            <GridCell center />
        </NonPrintableBlock>
        </div>
    )
}
