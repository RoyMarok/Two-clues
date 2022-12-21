import styled from '@emotion/styled'
import { css } from '@emotion/react'

import {
    baseFontSize,
    gridBase,
    theme
} from './common.style'

export const Trait = styled.div`
    height: ${parseInt(1.2 * baseFontSize)}px;
    background-color: ${theme.secondary };
    color: ${theme.white};
    font-size: ${parseInt(baseFontSize)}px;
    line-height: ${parseInt(baseFontSize)}px;
    padding: 0 ${parseInt(gridBase/2)}px;
    vertical-align: middle;
`

export const TraitButtonWrapper = styled.div`
    height: ${parseInt(1.2 * baseFontSize)}px;
    width: ${parseInt(1.2 * baseFontSize)}px;
`

Trait.Button = TraitButtonWrapper