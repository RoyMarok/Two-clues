import React from 'react'

import { clamp, noop } from '../utils'

import { BorderWrapper, Value, GridCell, FlexWrapper, NonPrintableBlock, Trait, Button, TraitButtonWrapper } from './styled'
import { GetIcon } from './get-icon'
import { SelectWithOptions } from './weapons-selection'

const calculateTraitWidth = (title) => {
    const titleLength = title.length
    if (titleLength >= 15) {
        return 5
    } else if (titleLength >= 10 ) {
        return 4
    } else if(titleLength >= 7) {
        return 3
    }
    return 2
}

const TraitElement = ({ title, onChange, value, controlled }) =>  (
    <FlexWrapper nowrap>
        <GridCell width={calculateTraitWidth(title)} center>
            {controlled ? <Button value={value} title={title} onClick={onChange} /> : title}
        </GridCell>
    </FlexWrapper>
)

export const Traits = ({ traits = [], selectedTraits =[], onChange, controlled = true }) => {
    const removeTrait = (e) => {
        e.preventDefault()
        const { value } = e.target
        // console.log('Traits removeTrait', value)
        onChange(selectedTraits.filter(item => item !== value))
    }
    const addTrait = (e) => {
        e.preventDefault()
        const { value } = e.target
        // console.log('Traits addTrait', value, [...selectedTraits, value])
        onChange([...selectedTraits, value])
    }
    const inTraits = [...traits]
    const passedTraits = inTraits.sort((a, b) => a.title > b.title ? 1 : -1)
    const passedSelectedTraits = inTraits.filter(trait => selectedTraits.includes(trait.id)).sort((a, b) => a.title > b.title ? 1 : -1)

    return (
        <FlexWrapper>
            {passedSelectedTraits.map(trait => <TraitElement {...trait} onChange={removeTrait} key={trait.id} controlled={controlled} value={trait.id} />)}
            {controlled && <GridCell width={2} center>
                <SelectWithOptions onChange={addTrait} elements={passedTraits} />
            </GridCell>}
        </FlexWrapper>
)}
