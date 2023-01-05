export const CalculateHealth = (strength) => Math.max(Math.ceil((16 - parseInt(strength)) / 2), 1)
export const CalculateMove = (agility) => Math.max(Math.ceil((20 - parseInt(agility)) / 2) - 1, 3)

export const SKILL = [
    'melee',
    'guns',
    'magic',
    'acrobathics',
    'stealth',
    'medicine'
]

const statPrice = {
    6: 65,
    7: 50,
    8: 40,
    9: 30,
    10: 25,
    11: 20,
    12: 15,
    13: 10,
    14: 5,
}

export const getCharacterPrice = (props) => {
    const {
        characteristics,
        skills,
        skillList,
        actions
    } = props
    const {
        agility,
        defence,
        health,
        intelligence,
        move,
        panic,
        perception,
        strength,
        fly
    } = characteristics

    let skillsSum = 0
    skillList.map(skill => skillsSum += skills[skill?.id] ? parseInt(skills[skill?.id]) + 2 : 0)

    const calculatedHealth = CalculateHealth(strength)
    const calculatedMove = CalculateMove(agility)

    const healthMoveDiff = parseInt(health) - calculatedHealth +
        parseInt(move) * (fly ? 2 : 1) - calculatedMove

    return Math.max(

        Math.round((+statPrice[strength] +
            statPrice[agility] +
            statPrice[perception] +
            statPrice[intelligence] +
            10 * healthMoveDiff +
            20 * Math.max(skillsSum, -6) +
            20 * defence) * (actions / 2) / 5) * 5,

        5
    )/5
}