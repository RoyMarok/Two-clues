import React, { useState } from 'react'

import { clamp, CalculateHealth, CalculateMove, getElementByProp } from '../utils'
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
} from './styled'
import { GetIcon } from './get-icon'
import { FieldNumber } from './field-number'

const chance2d6 = [
    { value: 0 },
    { value: 0 },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 5 },
    { value: 4 },
    { value: 3 },
    { value: 2 },
    { value: 1 }
]

const strengthConverter = [ 18, 14, 11, 9, 6, 1]

const percent = (value) => Math.round(value * 100)
const toD20 = (value) => 21 - Math.round(value * 20)
const calculateChanceMordheim = (value) => (value)/6
const calculateChanceMordheim2d6 = (value) => {
    let summaryChance = 0
    chance2d6.map((item, index) => {
        if(index <= value) {
            summaryChance += item.value / 36
        }
        return null
    })
    return summaryChance
}
const calculateChanceNecromunda = (value) => (7-value)/6
const calculateChanceNecromunda2d6 = (value) => {
    let summaryChance = 0
    chance2d6.map((item, index) => {
        if (index >= value) {
            summaryChance += item.value / 36
        }
        return null
    })
    return summaryChance
}

export const Mordheim = (props) => {
    const [stats, chooseStats] = useState('mordheim')
    const [move, setMove] = useState(4)
    const [WS, setWS] = useState(4)
    const [BS, setBS] = useState(4)
    const [strength, setStrength] = useState(3)
    const [tough, setTough] = useState(3)
    const [wounds, setWounds] = useState(1)
    const [initiative, setInitiative] = useState(4)
    const [actions, setActions] = useState(1)
    const [leadership, setLeadership] = useState(8)
    const [cool, setCool] = useState(8)
    const [will, setWill] = useState(8)
    const [intellegence, setIntellegence] = useState(8)
    const calculateChance = stats === 'mordheim' ? calculateChanceMordheim : calculateChanceNecromunda
    const calculate2d6Chance = stats === 'mordheim' ? calculateChanceMordheim2d6 : calculateChanceNecromunda2d6
    return (
        <FlexWrapper>
            <GridCell width={4} height={4} center>
                <GridCell />
                <GridCell width={4} center inverse={stats ==='mordheim'}>
                    <Button title="Мordheim" value="mordheim" onClick={(e) => { chooseStats(e.target.value) }} />
                </GridCell>
                <GridCell width={4} center inverse={stats ==='necromunda'}>
                    <Button title="Necromunda" value="necromunda" onClick={(e) => { chooseStats(e.target.value) }} />
                </GridCell>

            </GridCell>
            <GridCell width={2} height={4} center>
                <FieldNumber title="M" value={move} onChange={(e) => { setMove(clamp(e.target.value, 1, 12)) }} filled />
                <FlexWrapper>
                    <GridCell center><GetIcon color="secondary" icon="move" /></GridCell>
                    <GridCell center black>{move}</GridCell>
                </FlexWrapper>
            </GridCell>
            
            <GridCell width={2} height={4} center>
                <FieldNumber title="WS" value={WS} onChange={(e) => { setWS(clamp(e.target.value, 1, 9)) }} />
                <GridCell width={2} center>{percent(calculateChance(WS))}%</GridCell>
            </GridCell>
            <GridCell width={2} height={4} center>
                <FieldNumber title="BS" value={BS} onChange={(e) => { setBS(clamp(e.target.value, 1, 9)) }} filled />
                <GridCell width={2} center>{percent(calculateChance(BS))}%</GridCell>
            </GridCell>
            <GridCell width={2} height={4} center>
                <FieldNumber title="S" value={strength} onChange={(e) => { setStrength(clamp(e.target.value, 1, 6)) }} />
                <FlexWrapper>
                    <GridCell center><GetIcon color="secondary" icon="strength" /></GridCell>
                    <GridCell center black>{strengthConverter[strength-1]}</GridCell>
                </FlexWrapper>
            </GridCell>
            
            <FieldNumber title="T" value={tough} onChange={(e) => { setTough(clamp(e.target.value, 1, 6))}} filled />
            <GridCell width={2} height={4} center>
                <FieldNumber title="W" value={wounds} onChange={(e) => { setWounds(clamp(e.target.value, 1, 6)) }} />
                <FlexWrapper>
                    <GridCell center><GetIcon color="secondary" icon="health" /></GridCell> 
                    <GridCell center black>{wounds + tough}</GridCell>
                </FlexWrapper>
            </GridCell>
            
            <GridCell width={2} height={4} center>
                <FieldNumber title="I" value={initiative} onChange={(e) => { setInitiative(clamp(e.target.value, 1, 9)) }} filled />
                <FlexWrapper>
                    <GridCell center><GetIcon color="secondary" icon="agility" /></GridCell>
                    <GridCell center black>{clamp(toD20(calculateChance(initiative)), 6, 14)}</GridCell>
                </FlexWrapper>
            </GridCell>
            <FieldNumber title="A" value={actions} onChange={(e) => { setActions(clamp(e.target.value, 1, 6))}} />

            <GridCell width={2} height={4} center>
                <FieldNumber title="LD" value={leadership} onChange={(e) => { setLeadership(clamp(e.target.value, 2, 12)) }} filled />
                {stats !== 'necromunda' &&<FlexWrapper>
                    <GridCell center><GetIcon color="secondary" icon="perception" /></GridCell> 
                    <GridCell center black>{toD20(calculate2d6Chance(leadership))}</GridCell>
                </FlexWrapper>}
                
            </GridCell>
            
            {stats === 'necromunda' && <>
                <GridCell width={2} height={4} center >
                    <FieldNumber title="CL" value={cool} onChange={(e) => { setCool(clamp(e.target.value, 2, 12)) }} />
                </GridCell>
                <GridCell width={2} height={4} center>
                    <FieldNumber title="Will" value={will} onChange={(e) => { setWill(clamp(e.target.value, 2, 12)) }} filled />
                    <FlexWrapper>
                        <GridCell center><GetIcon color="secondary" icon="perception" /></GridCell> 
                        <GridCell center black>{toD20(calculate2d6Chance((will + cool)/2))}</GridCell>
                    </FlexWrapper>
                </GridCell>
                <GridCell width={2} height={4} center>
                    <FieldNumber title="Int" value={intellegence} onChange={(e) => { setIntellegence(clamp(e.target.value, 2, 12)) }} />
                    <FlexWrapper>
                        {/* <GridCell filled center>{percent(calculate2d6Chance(intellegence))}%</GridCell> */}
                        <GridCell center><GetIcon color="secondary" icon="intelligence" /></GridCell> 
                        <GridCell  center black>{toD20(calculate2d6Chance(intellegence))}</GridCell>
                    </FlexWrapper>
                </GridCell>
            </>
            }

        </FlexWrapper>
    )
}