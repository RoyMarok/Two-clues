import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { withTranslation } from 'react-i18next'

import {
    FractionsList,
    weaponState,
    weaponTraitsState
} from '../atoms'

import { BorderWrapper, Button, GridCell, FlexWrapper, NonPrintableBlock, OnlyPrintableBlock, Sticky, White, MoveUp, PrintOrDisplayBlock } from './styled'
import { ShortCharacter } from './short-character'
import { GetIcon } from './get-icon'
import { WeaponDisplay } from './weapon-display'

export const FractionComponent = (props) => {
    const fractions = useRecoilValue(FractionsList.setState)
    const weapons = useRecoilValue(weaponState)
    const traits = useRecoilValue(weaponTraitsState)

    return (
        <>
            {fractions.map(fraction => (
                <GridCell open wrapper width={28}>
                    <GridCell width={14} black>{fraction?.title}</GridCell>
                    {fraction?.values.map(value => (
                        <FlexWrapper>
                            <GridCell width={6}>{value?.title}</GridCell>
                            <GridCell width={6}>{value?.values.join(' ')}</GridCell>
                            <GridCell width={6}>{value?.limits?.min}-{value?.limits?.max}</GridCell>
                        </FlexWrapper>
                    ))}

                    {(weapons || []).filter(weapon => (fraction?.weapons || []).includes(weapon?.id)).map(weapon => (
                        <WeaponDisplay
                            currentStats={weapon}
                            weapons={weapons}
                            allTraits={traits}
                            
                        />
                    ))
                    }
                </GridCell>
            ))}
        </>
    )
}

export const Fractions = withTranslation()(FractionComponent)