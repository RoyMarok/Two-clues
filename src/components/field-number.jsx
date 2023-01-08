import React from 'react'

import { Button, GridCell, Value, NonPrintableBlock, OnlyPrintableBlock, FlexWrapper } from './styled'

import { GetIcon } from './get-icon'

const FourValues = ({ values = [], limits, onChange, value, filled }) => (
    <FlexWrapper>
        {
            values.map((item) => {
                const validValue = item >= limits?.min && item <= limits?.max
                return (
                    <GridCell center inverse={value === item} filled={value !== item && filled} muted={!validValue}>
                    {validValue 
                        ? <Button value={parseInt(item)} title={item} onClick={onChange} />
                        : item}
                 </GridCell>
                )
            })
        }
       
    </FlexWrapper>
)

export const FieldNumber = ({ title, value, onChange, icon, filled, controlled = true, iconButton = false, iconButtonClick, values = [], limits }) => {
    const PassedIcon = iconButton ? <Button title={<GetIcon icon={icon} />} onClick={iconButtonClick} /> : <GetIcon icon={icon} />
    const useFourValue = values.length > 0
    return (
    <GridCell width={2} height="3" center>
        <GridCell width={2} height="1" center black>
            {icon ? PassedIcon : title}
        </GridCell>
        {controlled && <>
            <NonPrintableBlock>
            {!useFourValue
            ? 
                <GridCell width={2} height={2} center filled={filled} big>
                <GridCell width={2} height={0.5} center filled={filled} data-cl="hidingButton"><Button value={parseInt(value) + 1} title="+" onClick={onChange} /></GridCell>

                <GridCell width={2} height="1" center>
                    <Value value={value} onChange={onChange} center big />
                </GridCell>
                <GridCell width={2} height={0.5} center filled={filled}>
                    <Button value={parseInt(value) - 1} title="-" onClick={onChange} />
                </GridCell>
                </GridCell>
            
            : <FourValues
                values={values}
                limits={limits}
                onChange={onChange}
                value={value}
                filled={filled}
            />
            }
            </NonPrintableBlock>
            <OnlyPrintableBlock>
                <GridCell width={2} height={2} center filled={filled} big black>
                    {value > 0 && value}
                </GridCell>
            </OnlyPrintableBlock>
            </>
        }
       {!controlled && <GridCell width={2} height={2} center filled={filled} big black>
            {value}
        </GridCell>}
    </GridCell>
)}
