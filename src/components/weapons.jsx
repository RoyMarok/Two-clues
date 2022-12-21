import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
    WeaponsState,
    TraitsState
} from '../atoms'

import { Button, GridCell,  FlexWrapper } from './styled'
import { Weapon } from './weapon'

export const Weapons = () => {
    const weapons = useRecoilValue(WeaponsState.setState)
    const traits = useRecoilValue(TraitsState.setState)
    const changeWeapon = useSetRecoilState(WeaponsState.change)
    const addWeapon = useSetRecoilState(WeaponsState.add)
    console.log('Weapons', JSON.stringify(weapons))
    return (
        <>
            <FlexWrapper>
                {weapons.map((weaponItem, index) =>

                    <Weapon
                        currentStats={weaponItem}
                        onChange={changeWeapon}
                        index={index}
                        key={weaponItem.title}
                        allTraits={traits}
                    />
                )
                }
            </FlexWrapper>
            <GridCell width={5} inverse center>
                <Button title="Еще оружие" onClick={addWeapon} />
            </GridCell>
        </>
    )
}