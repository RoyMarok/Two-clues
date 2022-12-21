import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { gridBase } from './common.style'

export const Value = styled.input(({
            big = false,
            wide = true,
            center = false,
            value
        }) => css`
    /* display: block; */
    outline: none;
    background-color: transparent;
    line-height: ${gridBase}px;
    
   ${wide && ' width: 100%;'}
    padding: 0;
    /* border: 1px solid grey; */
    border: none;
    font-size: inherit;
    /* font-size: ${gridBase}px!important; */
    box-sizing: border-box;
    /* height: 64px; */
    ${big && 'text-align: center; font-size: '+gridBase+'px!important;'}
    ${center && 'text-align: center;'}
    &:focus {
        background-color: orangered;
    }

    ${(!value || value === '0') && '@media print { color: transparent; }'}
    
    /* font-weight: 600; */
`)