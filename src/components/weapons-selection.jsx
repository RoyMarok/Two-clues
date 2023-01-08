import React from 'react'

import { BorderWrapper, GridCell, SelectStyled, NonPrintableBlock } from './styled'
import { Weapon } from './weapon'

const randomHash = () => parseInt(1000 + 1000*Math.random())

export const SelectWithOptions = ({ passedName = randomHash(), onChange, index = randomHash(), elements, selected = '', placeholder = '-' }) => (
    <SelectStyled onChange={onChange} id={passedName} name={`WeaponsSelection_${passedName}`} value={selected}>
        <option value="clear">{placeholder}</option>
        {elements.map((option, index2) =>
            <option
                key={`${index2} ${option.title} ${option.price}`}
                selected={String(option?.id) === String(selected)}
                value={`${option?.id || index+'_'+index2}`}>

                {/* {`${option?.title} ${option?.price || ''}`} */}
                {`${option?.title}`}
            </option>)}
    </SelectStyled>
)

export const WeaponsSelection = ({ passedName, weapons, selected, index, onChange, allTraits }) => {
    const selectedWeapon = weapons.filter(weapon => weapon?.id === selected)[0]
    return (
    <div>
        {!(selectedWeapon?.id) ?
            <NonPrintableBlock>
                <BorderWrapper>
                    <GridCell width={14} center>
                        <SelectWithOptions passedName={passedName} onChange={onChange} index={index} elements={weapons} selected={selected} placeholder="Оружие"/>
                    </GridCell>
                </BorderWrapper>
                <GridCell />
            </NonPrintableBlock>
        :
            <Weapon
                currentStats={selectedWeapon}
                controlled={false}
                weapons={weapons}
                selected={selected}
                onChange={onChange}
                index={index}
                passedName={passedName}
                allTraits={allTraits}
            />
        }
    </div>
)}