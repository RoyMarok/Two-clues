import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { theme } from './common.style'

export const ButtonCoreStyled = styled.button(({wide = true, print = false}) => css`
    position: relative;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    overflow: hidden;
    display: inline-block;
    border: none;
    ${wide && 'width: 100%;'}
    height: 100%;
    background-color: transparent;
    color: inherit;
    line-height: inherit;
    padding: 0;
    /* font-size: inherit; */

    &:hover {
        color: ${theme.primary};
        background-color: greenyellow;
    }
    ${!print && '@media print { color: transparent; }'}
`)

export const Button = ({ title, ...prop}) => <ButtonCoreStyled {...prop} >{title}</ButtonCoreStyled>

export const ButtonBottomStyled = styled(Button)`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    &:hover {
        background-color: orangered;
    }
`

export const ButtonTopStyled = styled(Button)`
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`
export const ButtonSquareStyled = styled(Button)`
    width: 32px;
`

Button.Top = ButtonTopStyled
Button.Bottom = ButtonBottomStyled
Button.Square = ButtonSquareStyled
