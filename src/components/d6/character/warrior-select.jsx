import React from 'react'

import {
    Button,
    GridCell,
    FlexWrapper
} from '../../styled'

import { GetIcon } from '../../get-icon'

export const WarriorSelect = ({ selected, elements = [], onChange }) => {
    const handleChooseWarrirType = (type) => () => {
        onChange(type)
    }
    return (
        <FlexWrapper>
            {elements.map((warrior) => (
                <GridCell center>
                    <Button
                        title={
                            <GetIcon
                                icon={warrior?.icon}
                                color={warrior?.id === selected ? 'primary' : 'secondary'}
                            />
                        }
                        onClick={handleChooseWarrirType(warrior?.id)}/>
                </GridCell>
                )
            )}
        </FlexWrapper>
    )
}