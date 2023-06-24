import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { withTranslation } from 'react-i18next'

import { CharacterD6StateObj } from '../../atoms'



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

import { Scenarios } from './display/scenarios'
import { Character } from './character'
import { DisplayCharacter } from './display'
import { Mordheim, getChance } from './mordheim'
import { Chances } from './chances'

export const BandD6 = () => {
    const [controlledIndex, setControlledIndex] = useState(0)
    const characters = useRecoilValue(CharacterD6StateObj.change)
    const addCharacter = useSetRecoilState(CharacterD6StateObj.add)
    

    const handleAddCharacter = (e) => addCharacter()

    let allCharactersPrice = 0
    let charactersCount = 0
    const passedCharacters = characters.filter(characterItem => characterItem?.count)
    if (characters) {
        passedCharacters.map(character => {
            charactersCount += character?.count
            allCharactersPrice += (character?.count) * parseInt(character.price)
        })
    }

    return (
        <>
            <Sticky>
                <NonPrintableBlock>
                    <White>
                        <FlexWrapper>
                            <GridCell width={2} center><Button title={<FlexWrapper><GridCell center><GetIcon color="primary" icon="face" /></GridCell><GridCell center big>{'+'}</GridCell></FlexWrapper>} onClick={handleAddCharacter} /></GridCell>
                            {/* <GridCell width={1} center> <GetIcon icon="face" /></GridCell> */}
                            <GridCell width={1} center black>{charactersCount}</GridCell>
                            <GridCell width={1} center> <GetIcon icon="coin" /></GridCell>
                            <GridCell width={2} black >{allCharactersPrice}</GridCell>
                        </FlexWrapper>
                    </White>
                </NonPrintableBlock>
            </Sticky>
            <OnlyPrintableBlock>
                <MoveUp>
                    <FlexWrapper>
                        <GridCell width={1} center> <GetIcon icon="face" /></GridCell>
                        <GridCell width={1} center black>{charactersCount}</GridCell>
                        <GridCell width={1} center> <GetIcon icon="coin" /></GridCell>
                        <GridCell width={2} black >{allCharactersPrice}</GridCell>
                    </FlexWrapper>
                </MoveUp>
            </OnlyPrintableBlock>
            <NonPrintableBlock>
                {/* <Mordheim /> */}
            </NonPrintableBlock>
            
            <FlexWrapper columns>
                {characters &&
                    characters.map((characterItem) => {
                        const index = characterItem.index
                        const isControlled = index === controlledIndex
                        if (!isControlled) {
                            return (
                                <DisplayCharacter
                                    index={index}
                                    isControlled={false}
                                    setControlled={setControlledIndex}
                                />
                            )
                        }
                        return (
                            <>
                                <NonPrintableBlock>
                                    <Character
                                        index={index}
                                        isControlled = { isControlled }
                                        setControlled={setControlledIndex}
                                    />
                                </NonPrintableBlock>
                                <OnlyPrintableBlock>
                                    <DisplayCharacter
                                        index={index}
                                        isControlled={false}
                                        setControlled={setControlledIndex}
                                    />
                                </OnlyPrintableBlock>
                            </>
                        )
                    }
                    )
                }
            </FlexWrapper>
            {/* <Scenarios /> */}
            <FlexWrapper>
                <Chances />
                <Chances mod={1} />
                <Chances mod={-1} />
                <Chances mod={-2} />
                <Chances mod={-3} />
                <Chances mod={-4} />
            </FlexWrapper>
            
        </>
    )
}
