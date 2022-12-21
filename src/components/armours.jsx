import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ArmourState } from '../atoms'

import { Button, GridCell, FlexWrapper } from './styled'
import { Armour } from './armour'

export const Armours = () => {
    const armours = useRecoilValue(ArmourState.setState)
    const changeArmour = useSetRecoilState(ArmourState.change)
    const addArmour = useSetRecoilState(ArmourState.add)
    console.log('Armours', JSON.stringify(armours))
    return (
        <>
            <FlexWrapper>
                {armours.map((armourItem, index) =>

                    <Armour
                        currentStats={armourItem}
                        onChange={changeArmour}
                        index={index}
                        key={armourItem.title}
                    />
                )
                }
            </FlexWrapper>
            <GridCell width={5} inverse center>
                <Button title="Еще броня" onClick={addArmour} />
            </GridCell>
        </>
    )
}