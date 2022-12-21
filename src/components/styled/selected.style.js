import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { baseFontSize, gridBase, theme } from './common.style'

export const SelectStyled = styled.select(() => css`
    height: ${gridBase}px;
    width: 100%;
    border: none;
    font-family: inherit;
    font-size: ${baseFontSize}px;
    padding-left: ${parseInt(gridBase/2)}px;
    background-color: ${theme.transparent};
    /* border: 4px solid ${theme.tetriary}; */
`)