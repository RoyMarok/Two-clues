import React from 'react'

import {
    Button,
    FlexWrapper,
    GridCell,
    Value
} from '../../styled'

import { clamp, noop } from '../../../utils'
import { GetIcon } from '../../get-icon'

import { ValueField } from './value-field'

export const Defencies = (props) => {
    const {
        values,
        onChange,
        controlled
    } = props
    const changesMaker = (attr) => (e) => {
        const passedValue = e?.target?.value ? e.target.value : e
        onChange({
            ...values,
            [attr]: clamp(passedValue, 0, 2)
        })
    }
    return (
        <FlexWrapper>
            <GridCell width={2} height="3" center>
                <GridCell width={2} height="1" center black big>
                    <GetIcon icon="defence" color="secondary" />
                    <GetIcon icon="helmet" />
                </GridCell>
                <GridCell width={2} height={2} center filled>
                    <ValueField
                        onChange={changesMaker('head')}
                        value={values.head}
                        filled
                    />
                </GridCell>
            </GridCell>
            <GridCell width={2} height="3" center>
                <GridCell width={2} height="1" center black big>
                    <GetIcon icon="defence" color="secondary" />
                    <GetIcon icon="hands" />
                </GridCell>
                <GridCell width={2} height={2} center >
                    <ValueField
                        onChange={changesMaker('hands')}
                        value={values.hands}
                    />
                </GridCell>
            </GridCell>
            <GridCell width={2} height="3" center>
                <GridCell width={2} height="1" center black big>
                    <GetIcon icon="defence" color="secondary" />
                    <GetIcon icon="chest" />
                </GridCell>
                <GridCell width={2} height={2} center filled>
                    <ValueField
                        onChange={changesMaker('chest')}
                        value={values.chest}
                        filled
                    />
                </GridCell>
            </GridCell>
            <GridCell width={2} height="3" center>
                <GridCell width={2} height="1" center black big>
                    <GetIcon icon="defence" color="secondary" />
                    <GetIcon icon="legs" />
                </GridCell>
                <GridCell width={2} height={2} center>
                    <ValueField
                        onChange={changesMaker('legs')}
                        value={values.legs}
                    />
                </GridCell>
            </GridCell>
        </FlexWrapper>
    )
}
