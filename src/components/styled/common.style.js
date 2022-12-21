import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const commonRadius = '4px'
export const baseFontSize = 20
export const gridBase = parseInt(1.8 * baseFontSize)
export const theme = {
    primary: '#2b2a29',
    secondary: '#898989',
    tetriary: '#d9dada',
    transparent: 'transparent',
    white: 'white',
    error: 'orangered'
}

export const GridCell = styled.div(({
            height = 1,
            width = 1,
            filled = false,
            border = false,
            inverse = false,
            black = false,
            center = false,
            muted = false,
            big = false,
            serif = false
        }) => css `
    display: block;
    height: ${height * gridBase}px;
    width: ${width * gridBase}px;
    text-align: left;
    padding-left: ${parseInt(gridBase/2)}px;
    line-height: ${height * gridBase}px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: ${filled ? theme.tetriary : (inverse ? theme.secondary : theme.transparent)};
    color: ${inverse ? theme.white : theme.secondary};
    ${black && 'color: '+theme.primary+';' }
    ${center && 'text-align: center; padding: 0;'}
    ${muted && 'opacity: 0.5;'}
    ${big && 'font-size: '+(baseFontSize * 2)+'px;'}
    ${serif && 'font-family: sans-serif; font-weight: 700;'}
`)

export const BorderWrapper = styled.div`
    display: inline-block;
    border: 4px solid ${theme.tetriary};
`

export const AppWrapper = styled.div`
    color: ${theme.primary};
    font-size: ${baseFontSize}px;
    font-family: 'RodchenkoCTT';
    font-weight: 400;
    margin: ${gridBase}px auto;
    width: ${gridBase * 32}px;
    input, h1, h2, h3, button {
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
    }
    a {
        color: inherit;
        text-decoration: none;
        &:hover {
            color: ${theme.primary};
        }
    }
`
export const FlexWrapper = styled.div(({ nowrap = false }) => css`
    display: flex;
    flex-wrap: ${nowrap ? 'nowrap' : 'wrap'};
`)

export const NonPrintableBlock = styled.div`
    @media print {
        display: none;
    }
`

export const NonPrintableText = styled.span`
    @media print {
        display: none;
    }
`

export const OnlyPrintableBlock = styled.div`
    display: none;
    @media print {
        display: block;
    }
`

export const OnlyPrintableText = styled.span`
    display: none;
    @media print {
        display: block;
    }
`

export const MoveUp = styled.div`
    margin-top: -${gridBase}px;
`

export const White = styled.div`
    background-color: ${theme.white};
`

export const Sticky = styled.div`
    position: sticky;
    top: 0;
    z-index: 9000;
`