import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { gridBase, theme } from './common.style'

const baseIconSize = parseInt(gridBase * 0.7)

export const Icon = styled.span(({ size = 1, color = 'primary', inverse = false, rotate = 0 }) => css`
    height: ${parseInt(size  * baseIconSize)}px;
    width: ${parseInt(size  * baseIconSize) * 1.34}px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    margin-top: -${parseInt(size  * baseIconSize) * 1.34 / 10}px;
    transform: rotate(${rotate}deg);
    svg {
        position: relative;
        fill: ${theme?.[inverse ? 'white' : color]};
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: block;
    }
`)
