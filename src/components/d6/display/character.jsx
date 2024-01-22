import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { CharacterD6StateObj } from '../../../atoms'

import { clamp, noop } from '../../../utils'

import {
    BorderWrapper,
    Button,
    GridCell,
    FlexWrapper,
    NonPrintableBlock,
} from '../../styled'

import { TraitElement } from '../../traits'
import { GetIcon } from '../../get-icon'
import { WARRIOR_TYPES_VALUES } from '../character/character'

import { Experience } from './expirience'
import { Weapon } from './weapon'
import { Attributes } from './attributes'

export const DisplayCharacter = (props) => {
    const {
        index = 0,
        isControlled = true,
        setControlled = noop,
        isDemo = false,
        characterProps = {}
    } = props
    const [characters, setCharacter] = useRecoilState(CharacterD6StateObj.change)
    const character = characters.find((item) => item.index === index) || characterProps
    const removeCharacter = useSetRecoilState(CharacterD6StateObj.remove)
    const {
        price,
        characteristics,
        weapons = [],
        spells = [],
        poisons = [],
        skills = [],
        traits = [],
        count,
        actions,
        title,
        armour,
        warriorType
    } = character

    const handleControlled = (e) => setControlled(index)
    const handleDeleteCharacter = (e) => removeCharacter(index)

    const handleRemoveCharacter = () => {
        const passedChars = { ...character }
        setCharacter({
            ...character,
            count: clamp(passedChars?.count - 1, 0, 50)
        })

    }
    const handleAddCharacter = () => {
        const passedChars = { ...character }
        setCharacter({
            ...character,
            count: clamp(parseInt(passedChars?.count) + 1, 0, 50)
        })
    }

    const warriorTypeItem = WARRIOR_TYPES_VALUES.filter((item) => item?.id === warriorType)?.[0]
    const warriorTypeIcon = warriorTypeItem?.icon

    const experienceProps = {
        characteristics,
        weapons,
        spells,
        poisons,
        skills,
    }

    return (
        <div>
            {!isDemo && <NonPrintableBlock>
                <FlexWrapper>
                    <GridCell inverse center >
                        {isDemo ? count : <Button title="—" onClick={handleDeleteCharacter} />}
                    </GridCell>
                    <GridCell center big>
                        <Button
                            title="-"
                            onClick={handleRemoveCharacter}
                        />
                    </GridCell>
                    <GridCell center big>{count || 0}</GridCell>
                    <GridCell center big>
                        <Button
                            title="+"
                            onClick={handleAddCharacter}
                        />
                    </GridCell>
                    
                    <GridCell width={1} center >
                        {!isDemo && <NonPrintableBlock>
                            <Button title={<GetIcon color={isControlled ? 'primary' : 'secondary'} icon="pencil" />} onClick={handleControlled} />
                        </NonPrintableBlock>}
                    </GridCell>
                </FlexWrapper>
            </NonPrintableBlock>}
            
            <FlexWrapper>
                <BorderWrapper>
                    <FlexWrapper>
                        <GridCell width={12} black filled wrapper>{title}</GridCell>
                        <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                        <GridCell width={1} inverse center>{price}</GridCell>
                    </FlexWrapper>
                    <FlexWrapper>
                        <Attributes
                            {...characteristics}
                            armour={armour}
                            actions={actions}
                        />
                        <Experience {...experienceProps} width={10} />
                    </FlexWrapper>
                    {traits?.length > 0 && <FlexWrapper>
                        {traits.map((skill) => <TraitElement controlled={false} key={String(skill)} title={String(skill)} />)}
                    </FlexWrapper>}
                    {weapons.map((weapon) =>
                        <Weapon
                            character={characteristics}
                            {...weapon}
                        />)
                    }
                </BorderWrapper>
            </FlexWrapper>
            <GridCell />
        </div>
    )
}
