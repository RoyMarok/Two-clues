import React from 'react'

import {  GridCell, FlexWrapper } from './styled'
import { Traits } from './traits'
import { IconedElement } from './short-character'

export const WeaponDisplay = (props) => {  
    const {
        currentStats,
        allTraits,
        collapsed
    } = props

    const {
        range,
        shots,
        drum,
        reload,
        ap,
        dmg,
        title,
        mass,
        traits = [],
    } = currentStats

    let passedReload = parseInt(reload) ? 1 : 2
    if (parseInt(range) === 1) {
        passedReload = 0
    }

    return (
        <>
            <FlexWrapper>
                <GridCell width={14} filled black>{title}</GridCell>
            </FlexWrapper>
            {!collapsed && <>
                <FlexWrapper>
                    <IconedElement
                        icon="range"
                        value={range}
                        filled
                    />
                    <IconedElement
                        icon="shots"
                        value={shots}
                    />
                    <IconedElement
                        icon="drum"
                        value={drum}
                        filled
                    />
                    <IconedElement
                        icon="reload"
                        value={passedReload}
                        squared
                    />
                    <IconedElement
                        icon="ap"
                        value={ap}
                        filled
                    />
                    <IconedElement
                        icon="dmg"
                        value={dmg}
                    />
                    <IconedElement
                        icon="mass"
                        value={mass}
                        filled
                    />

                </FlexWrapper>
                {traits?.length > 0 && <GridCell width={14} center>
                    <Traits
                        traits={allTraits}
                        selectedTraits={traits}
                        controlled={false}
                    />
                </GridCell>}
            </>}
            

        </>
    )

}