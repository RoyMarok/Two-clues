import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

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

import { GetIcon } from '../get-icon'

import {
    generateRandomNames,
    RussianNames,
    SweedenNames,
    SpanishNames,
    ImperialCitizenNames,
    AeldariNames,
    Ork40kNames,
    CitiesNames,
    DoKNames,
    FireslayersNames,
    IdonethNames,
    KONames,
    LRLNames,
    StormcastNames,
    SylvanethNames,
    SkavenNames,
    ChaosDwarfNames,
    NighthauntNames,
    BretonianNames

} from '../../atoms'

export const factionList = [
    {
        title: 'Common',
        list: [
            { ...RussianNames },
            { ...SweedenNames },
            { ...SpanishNames }
        ]
    },
    {
        title: 'WH40K',
        list: [
            { ...ImperialCitizenNames },
            { ...AeldariNames },
            { ...Ork40kNames }
        ]
    },
    {
        title: 'Order',
        list: [
            { ...BretonianNames },
            { ...CitiesNames },
            { ...DoKNames },
            { ...FireslayersNames },
            { ...IdonethNames },
            { ...KONames },
            { ...LRLNames },
            { ...StormcastNames },
            { ...SylvanethNames }
        ]
    },
    {
        title: 'Chaos',
        list: [
            { ...SkavenNames },
            { ...ChaosDwarfNames }
        ]
    },
    {
        title: 'Death',
        list: [
            { ...NighthauntNames },
        ]
    },
]

const NameRow = ({ title, setState, stateLoaded, random = generateRandomNames, even = false }) => {
    const namesState = useRecoilValue(setState)
    const stateIsLoaded = useRecoilValue(stateLoaded)
    const [thisNames, setThisNames] = useState('')
    const [generatedOnStart, setOnStart] = useState(false)
    if (stateIsLoaded && !generatedOnStart) {
        setThisNames(random(namesState))
        setOnStart(true)
    }
    const generateNewNames = () => {
        setThisNames(random(namesState))
    }
    return (
        <FlexWrapper>
            <GridCell width={7} filled={!even} >{title}</GridCell>
            <GridCell width={1} inverse={!even} filled={even} center><Button title={<GetIcon color={!even ? 'white' : 'secondary'} icon="reload" />} onClick={generateNewNames} /></GridCell>
            <GridCell width={12} black serif filled={!even}>{thisNames.male}</GridCell>
            <GridCell width={12}  serif filled={!even}>{thisNames.female}</GridCell>
        </FlexWrapper>
    )
}

export const NamesGenerator = () => (
    <>
        {factionList.map(faction => (
            <>
                <GridCell width={7} inverse>{faction.title}</GridCell>
                {faction.list.map((item, index) => <NameRow {...item} even={!(index % 2)} key={item?.title} />)}

            </>
            ))}
        
    </>
)
