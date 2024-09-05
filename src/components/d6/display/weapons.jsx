import React from 'react'
import { useRecoilValue } from 'recoil'

import {
    GridCell,
    FlexWrapper,
    BorderWrapper
} from '../../styled'
import { WeaponsState } from '../../../atoms'
import { COLUMN_WIDTH } from '../../rules'
import { Weapon } from './weapon'

export const Weapons = () => {
    const allWeapons = useRecoilValue(WeaponsState.setState)
    const weaponsCount = allWeapons.length
    return (
        <FlexWrapper columns>
            {/* <GridCell width={COLUMN_WIDTH} open wrapper>
                {
                    allWeapons.map((oneWeapon, index) => index < Math.ceil(weaponsCount /2) && <Weapon {...oneWeapon} />)
                }
            </GridCell>
            <GridCell width={COLUMN_WIDTH} open wrapper>
                {
                    allWeapons.map((oneWeapon, index) => index >= Math.ceil(weaponsCount / 2) && <Weapon {...oneWeapon} />)
                }
            </GridCell> */}
            {
                allWeapons.map((oneWeapon, index) => <Weapon {...oneWeapon} />)
            }

        </FlexWrapper>
        
    )
}
