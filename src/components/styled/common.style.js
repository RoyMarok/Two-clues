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
            left = false,
            muted = false,
            big = false,
            serif = false,
            open = false,
            wrapper = false,
            pageBreak = false,
            verticalCenter = false,
            error=false

        }) => css`
    display: block;
    height: ${height * gridBase}px;
    width: ${width * gridBase}px;
    text-align: left;
    padding-left: ${wrapper ? 0 : parseInt(gridBase/2)}px;
    line-height: ${height * gridBase}px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: ${filled ? theme.tetriary : (inverse ? theme.secondary : theme.transparent)};
    ${error && `background-color: ${theme.error};`}
    color: ${inverse ? theme.white : theme.secondary};
    ${black && 'color: '+theme.primary+';' }
    ${center && 'text-align: center; padding: 0;'}
    ${left && 'text-align: left; padding: 0;'}
    ${verticalCenter && 'margin: '+(height * gridBase /2)+'px auto;'}
    ${muted && 'opacity: 0.5;'}
    ${big && 'font-size: '+(baseFontSize * 2)+'px;'}
    ${serif && 'font-family: sans-serif; font-weight: 700;'}
    ${height === 0.5 && '&>button { top: -'+gridBase/6+'px; }'}
    ${open && 'height: auto; line-height: 1em;'}
    ${pageBreak && 'break-before: page;'}
    h2 {
        font-size: ${baseFontSize * 2}px;
        line-height: ${baseFontSize * 2}px;
        color: ${theme.primary};
        margin: ${baseFontSize}px 0;
    }
    h3 {
        color: ${theme.primary};
         margin: 0;
        margin-top: ${baseFontSize/2}px;
    }
    ul {
        margin: 0;
        margin-top: ${baseFontSize/2}px;
        padding-left: ${parseInt(gridBase)}px;
        li {
            padding-left: ${parseInt(gridBase/2)}px;
        }
    }
    p {
        margin: 0;
        margin-top: ${baseFontSize/2}px;
        
    }
    em {
        font-style: normal;
        color: ${theme.primary};
    }
`)

export const BorderWrapper = styled.div`
    display: inline-block;
    border: 4px solid ${theme.tetriary};
    height: fit-content;
    width: fit-content;
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
export const FlexWrapper = styled.div(({ nowrap = false, columns = false, vertical = false }) => css`
    display: flex;
    flex-wrap: ${nowrap ? 'nowrap' : 'wrap'};
    
    ${ columns && 'grid-column-gap:'+gridBase+'px;'}
    ${vertical && 'flex-direction: column; align-items: flex-start; justify-content: space-between;'}
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

export const PrintOrDisplayBlock = styled.div(({ printable = true }) => css`
    @media print {
        display: ${!printable ? 'none' : 'block'};
        break-inside: avoid;
    }
`)

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