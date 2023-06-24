import React, { useState } from 'react'

import { getRandomName } from '../../../atoms/utils'

import {
    BorderWrapper,
    Button,
    GridCell,
    FlexWrapper,
    NonPrintableBlock,
    OnlyPrintableBlock,
    Sticky,
    White,
    MoveUp,
    PrintOrDisplayBlock
} from '../../styled'
import { GetIcon } from '../../get-icon'

const CAPACITY = ['', 'thing', 'man']
const POINT = ['edge', 'opposite edge', 'center']

const getRout = () => {
    let remainPoint = POINT
    const getPoint = () => {
        const point = getRandomName(remainPoint)
        remainPoint = remainPoint.filter((item) => item !== point)
        return point
    }
    const output = {
        start: {
            point: getPoint(),
            capacity: getRandomName(CAPACITY)
        },
        finish: {
            point: getPoint()
        }
    }
    if (Boolean(Math.round(Math.random()))) {
        const capacity = getRandomName(CAPACITY)
        output.target = {
            point: getPoint(),
            capacity,
            moving: Boolean(capacity) && Boolean(Math.round(Math.random())) && getPoint(),

        }
    }
    return output
}

export const Scenarios = () => {
    const [toPoint, setPoint] = useState(getRout())
    const handleNewRoute = () => {
        setPoint(getRout())
    }
    return (
        <>
            <GridCell center width={4}>
                <Button title="Новый маршрут" onClick={handleNewRoute} />
            </GridCell>
            
            
                <GridCell center width={16} height={4}>
                    <FlexWrapper>
                        <GridCell width={4} center />
                        <GridCell width={4} center>{'Point'}</GridCell>
                        <GridCell width={4} center>{'Capacity'}</GridCell>
                    </FlexWrapper>
                    <FlexWrapper>
                        <GridCell width={4} center>{'Start'}</GridCell>
                        <GridCell width={4} center>{toPoint.start.point}</GridCell>
                        <GridCell width={4} center>{toPoint.start.capacity}</GridCell>
                    </FlexWrapper>
                    {Boolean(toPoint?.target) && <FlexWrapper>
                        <GridCell width={4} center>{'Middle'}</GridCell>
                        <GridCell width={4} center>{toPoint?.target?.point}</GridCell>
                        <GridCell width={4} center>{toPoint?.target?.capacity}</GridCell>
                        <GridCell width={4} center>{toPoint?.target?.moving}</GridCell>
                    </FlexWrapper>}
                    <FlexWrapper>
                        <GridCell width={4} center>{'Finish'}</GridCell>
                        <GridCell width={4} center>{toPoint.finish.point}</GridCell>
                        {/* <GridCell width={4} center>{toPoint.finish.capacity}</GridCell> */}
                    </FlexWrapper>
                    
                </GridCell>

        </>
        
    )
}
