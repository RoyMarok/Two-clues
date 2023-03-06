import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

import {
    generateRandomNames

} from '../../atoms'

import { noop } from '../../utils'

import {
    BorderWrapper,
    Button,
    GridCell,
    NonPrintableBlock,
    NonPrintableText,
    OnlyPrintableBlock,
    OnlyPrintableText,
    Value,
    FlexWrapper
} from '../styled'

import { SelectWithOptions } from '../weapons-selection'

import { factionList } from './names-generator'

const getOptions = () => {
    const factionOptions = []
    factionList.map(faction => faction.list.map((item, index) => {
        factionOptions.push({
            id: `${faction?.title}_${index}`,
            random: generateRandomNames,
            ...item
        })
        return null
    }))
    return factionOptions
}

export const InsertedNames = ({ onChange, options, index, selectedFaction = 'Common_0', setSelectedFaction = noop }) => {
    const passedOption = options || getOptions()
    const selectedFactionData = passedOption.filter(item => item?.id === selectedFaction)?.[0]
    const { random, setState } = selectedFactionData 
    const namesState = useRecoilValue(setState)
    const generateTitle = (e) => {
        const sex = e.target.value
        onChange(random(namesState)?.[sex])
    }

    return (
        <FlexWrapper>
            <GridCell width={1} inverse center>
                <Button title="М" value="male" onClick={generateTitle} />
            </GridCell>
            <GridCell width={1} inverse center>
                <Button title="Ж" value="female" onClick={generateTitle} />
            </GridCell>
            <GridCell width={6} color="primary" center>
                <SelectWithOptions onChange={(e) => setSelectedFaction(e.target.value)} elements={passedOption} selected={selectedFaction} passedName={index} index={index} />
            </GridCell>
        </FlexWrapper>
       
    )
}