import { Button, Value, FieldWrapper, FieldTitle, FlexWrapper } from './styled'

const FieldNumber = ({ title, value, onChange }) => (
    <FieldWrapper>
        <FieldTitle>{title}</FieldTitle>
        <Button.Top value={parseInt(value) + 1} title="+" onClick={onChange} />
        <Value value={value} onChange={onChange} />
        <Button.Bottom value={parseInt(value) - 1} title="-" onClick={onChange} />
    </FieldWrapper>
)

const statsSum = ({ move, agility, will, ballistic, weapon, closeCombatActions, defence, health }) => parseInt(move) + parseInt(agility) + parseInt(will) + parseInt(ballistic) + parseInt(weapon) + parseInt(closeCombatActions) + parseInt(defence) + parseInt(health)


export const Character = (props) => {
    const { min, max, weapons, armour, currentStats, onChange } = props
    if (!currentStats || !currentStats?.characteristics) {
        return null
    }
    const { move, agility, will, ballistic, weapon, closeCombatActions, defence, health } = currentStats?.characteristics

    const changeMove = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            move: value, agility, will, ballistic, weapon, closeCombatActions, defence, health
        })
    }
    const changeAgility = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            move, agility: value, will, ballistic, weapon, closeCombatActions, defence, health
        })
    }
    const changeWill = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            move, agility, will: value, ballistic, weapon, closeCombatActions, defence, health
        })
    }

    const changeBS = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            move, agility, will, ballistic: value, weapon, closeCombatActions, defence, health
        })
    }
    const changeWS = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            move, agility, will, ballistic, weapon: value, closeCombatActions, defence, health
        })
    }
    const changeCCA = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            move, agility, will, ballistic, weapon, closeCombatActions: value, defence, health
        })
    }
    const changeDefence = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            move, agility, will, ballistic, weapon, closeCombatActions, defence: value, health
        })
    }
    const changeHealth = (e) => {
        e.preventDefault()
        const { value } = e.target
        onChange({
            move, agility, will, ballistic, weapon, closeCombatActions, defence, health: value
        })
    }

    const clearChange = () => {
        onChange(min?.characteristics?.base)
    }

    const basePrice = min?.price
    const baseStatsSum = statsSum(min?.characteristics?.base)
    const currentStatsSum = statsSum(currentStats?.characteristics)
    const currentPrice = basePrice + (currentStatsSum - baseStatsSum) * 5

    return (
        <>
            <FieldWrapper>{baseStatsSum}:{currentStatsSum}</FieldWrapper>
            <FlexWrapper>
                <FieldWrapper><Button title="Clear" onClick={clearChange} /></FieldWrapper>
                <FieldNumber title="M" value={move} onChange={changeMove} />
                <FieldNumber title="AG" value={agility} onChange={changeAgility} />
                <FieldNumber title="Will" value={will} onChange={changeWill} />
                <FieldNumber title="BS" value={ballistic} onChange={changeBS} />
                <FieldNumber title="WS" value={weapon} onChange={changeWS} />
                <FieldNumber title="CCA" value={closeCombatActions} onChange={changeCCA} />
                <FieldNumber title="DEF" value={defence} onChange={changeDefence} />
                <FieldNumber title="H" value={health} onChange={changeHealth} />
                <FieldWrapper><FieldTitle>{currentPrice}cr</FieldTitle></FieldWrapper>
            </FlexWrapper>
        </>
        
    )
}
