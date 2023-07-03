import React, { useState } from 'react'


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
} from '../styled'
import { GetIcon } from '../get-icon'

const DICE = 6

const percent = (value) => Math.round(value * 100)

export const getChance = (a = 3, b = 3, mod = 0) => {
    const maxSide =  Math.max(a, b)
    const minSide =  Math.min(a, b)
    const sideDiff = Math.abs(a - b)
    const basechanceShape = Math.pow(maxSide, 2) - Math.pow(sideDiff, 2)
    let chance = basechanceShape / Math.pow(DICE, 2)

    if (mod < 0) {
        const pow = Math.abs(mod) + 2
        chance = (basechanceShape * Math.pow(minSide, Math.abs(mod))) / Math.pow(DICE, pow)
    }
    if (mod > 0) {
        chance = (basechanceShape * (DICE - maxSide) * 3 + Math.pow(maxSide, 3) - Math.pow(sideDiff, 3)) / Math.pow(DICE, 3)
    }

    return percent(chance)
}

export const Chances = ({ mod = 0 }) => {
    let chancesMatrixRows = new Array(DICE)
    let chancesMatrixColumns = new Array(DICE)
    let chancesMatrix = chancesMatrixRows.fill(chancesMatrixColumns.fill(0))
    let averangeDiff = 0
    let averange = 0

    const getLocalChanse = (a, b) => {
        if (mod) {
            averangeDiff += getChance(a, b, mod) - getChance(a, b)
            return getChance(a, b, mod)
        } else {
            averange += getChance(a, b)
            return getChance(a, b)
        }
    }
    
    // for (let i = 0; i <= DICE; i++) {
    //     for (let j = 0; j <= DICE; j++) {
    //         console.log('whiles', i, j, getChance(i, j, mod))
    //     }
    // }
    // console.log('chancesMatrix', chancesMatrix)
    return (
        <GridCell width={DICE + 1} height={DICE + 1} center> 
            
            
            <GridCell width={DICE + 1} height={DICE} center>
                {
                    chancesMatrix.map((row, rowIndex) => (
                        <FlexWrapper>
                            {row.map((item, cellIndex) => (
                                <GridCell center black={!rowIndex || !cellIndex}>{!rowIndex || !cellIndex ? rowIndex || cellIndex : getLocalChanse(rowIndex, cellIndex)}</GridCell>
                            ))}
                        </FlexWrapper>
                    ))
                }
            </GridCell>
            <GridCell width={5} center>
                <FlexWrapper>
                    <GridCell center>{mod}</GridCell>
                    {/* <GridCell /> */}
                    <GridCell center width={2}>{Math.round((averangeDiff ? averangeDiff : averange)/ Math.pow(DICE - 1, 2))}</GridCell>
                    {/* <GridCell center width={2}>{averangeDiff}</GridCell> */}
                </FlexWrapper>
            </GridCell>
            
        </GridCell>
        
    )
}
