import React from 'react'

import {
    GridCell,
    FlexWrapper,
} from '../../styled'

import { GetIcon } from '../../get-icon'

import { IconedElement } from './iconed-element'

export const Skill = (props) => {
    const {
        title,
        ready,
        hidden,
        panic,
        out,
        dependencies,
        mod,
        price,
        character
    } = props

    const {
        strength,
        agility,
        perception,
        intelligence
    } = character

    return (
        <>
            <FlexWrapper>
                <GridCell filled center><GetIcon icon="skill" /></GridCell>
                <GridCell width={11} filled black >{title}</GridCell>
                <GridCell width={1} center filled><GetIcon color="secondary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>

                <IconedElement icon="like" value={ready} filled nonZero />
                <IconedElement icon="hidden" value={hidden} nonZero />
                <IconedElement icon="panic" value={panic} filled nonZero />
                <IconedElement icon="clock" value={out} nonZero />
                <GridCell width={7} />
                <IconedElement icon="±" value={mod} important={false} />
                {dependencies.strength && <IconedElement icon="strength" value={strength} plus />}
                {dependencies.agility && <IconedElement icon="agility" value={agility} plus />}
                {dependencies.perception && <IconedElement icon="perception" value={perception} plus />}
                {dependencies.intelligence && <IconedElement icon="intelligence" value={intelligence} plus />}
            </FlexWrapper>
        </>
    )
}
