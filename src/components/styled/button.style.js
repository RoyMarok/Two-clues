import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { commonRadius } from './common.style'

export const ButtonCoreStyled = styled.button(() => css`
    position: relative;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    overflow: hidden;
    display: inline-block;
    border-radius: ${commonRadius};
    border: none;
    width: 100%;
    height: 32px;

    &:hover {
        background-color: greenyellow;
    }
`)

export const Button = ({ title, ...prop}) => <ButtonCoreStyled {...prop} >{title}</ButtonCoreStyled>

export const ButtonBottomStyled = styled(Button)`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    &:hover {
        background-color: orangered;
    }
`

export const ButtonTopStyled = styled(Button)
`
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`
Button.Top = ButtonTopStyled
Button.Bottom = ButtonBottomStyled
