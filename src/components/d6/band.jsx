import React, { useState, useRef } from 'react'
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
import { clamp } from '../../utils'

export const BandD6 = () => {
    const [controlledIndex, setControlledIndex] = useState(0)
    const characters = useRecoilValue(CharacterD6StateObj.change)
    const addCharacter = useSetRecoilState(CharacterD6StateObj.add)
    // const numberOfCharacters = useRef(characters.length)

    const handleAddCharacter = (e) => {
        addCharacter()
    }

    let allCharactersPrice = 0
    let charactersCount = 0
    const passedCharacters = characters.filter(characterItem => characterItem?.count)
    if (characters) {
        passedCharacters.map(character => {
            charactersCount += character?.count
            allCharactersPrice += (character?.count) * parseInt(character.price)
        })
    }
    // if (numberOfCharacters.current !== characters.length) {
    //     setControlledIndex(characters[characters.length - 1]?.index)
    //     numberOfCharacters.current = characters.length
    // }

    // console.log('BAND', characters, controlledIndex, characters.length, numberOfCharacters.current)

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
                        const additionalNumber = new Array(clamp(characterItem?.count - 1, 0, 20))
                        const ShowCard = () => <DisplayCharacter
                            index={index}
                            isControlled={false}
                            setControlled={setControlledIndex}
                        />
                        const AdditionalCharacter = () => additionalNumber.fill('').map(() => <OnlyPrintableBlock><ShowCard /></OnlyPrintableBlock>)

                        // console.log('Character render', characterItem, index, controlledIndex, index === controlledIndex, additionalNumber)
                        if (!isControlled) {
                            return (
                                <>
                                    <ShowCard />
                                    <AdditionalCharacter />
                                </>
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
                                    <ShowCard />
                                </OnlyPrintableBlock>
                                <AdditionalCharacter />
                            </>
                        )
                    }
                    )
                }
            </FlexWrapper>
            {/* <Scenarios /> */}
            {/* <NonPrintableBlock> <FlexWrapper>
                <Chances />
                <Chances mod={1} />
                <Chances mod={-1} />
                <Chances mod={-2} />
                <Chances mod={-3} />
                <Chances mod={-4} />
            </FlexWrapper>
            </NonPrintableBlock> */}
        </>
    )
}
