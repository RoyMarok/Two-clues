import React from 'react'
import { useRecoilValue } from 'recoil'

import {
    GridCell,
    FlexWrapper,
    NobreakWrapper
} from '../../styled'
import { WeaponsState } from '../../../atoms'
import { COLUMN_WIDTH } from '../../rules'
import { Weapon } from './weapon'

export const Weapons = () => {
    const allWeapons = useRecoilValue(WeaponsState.setState)
    const weaponsRanges = allWeapons.map((weapon, index) => weapon?.range?.max !== allWeapons?.[index - 1]?.range?.max && weapon?.range?.max).filter(Boolean)
    console.log('Weapons', weaponsRanges)
    return (
        <>  
            {
                weaponsRanges.map((rangeElement) => (
                    <NobreakWrapper>
                        <GridCell />
                        <GridCell black big wrapper width={4}>{rangeElement}</GridCell>
                        <GridCell />
                        <FlexWrapper columns>
                            {
                                allWeapons.filter((oneWeapon) => oneWeapon?.range?.max === rangeElement).map((oneWeapon, index) => <Weapon {...oneWeapon} />)
                            }
                        </FlexWrapper>

                    </NobreakWrapper>

                ))
            }
        </>
        
    )
}
