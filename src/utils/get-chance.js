const percent = (value) => Math.round(value * 100)

export const getChance = (a = 3, b = 3, mod = 0, DICE = 6) => {
    const maxSide = Math.max(a, b)
    const minSide = Math.min(a, b)
    const sideDiff = Math.abs(a - b)
    const basechanceShape = Math.pow(maxSide, 2) - Math.pow(sideDiff, 2)
    let chance = basechanceShape / Math.pow(DICE, 2)

    if (mod < 0) {
        const pow = Math.abs(mod) + 2
        chance = (basechanceShape * Math.pow(minSide, Math.abs(mod))) / Math.pow(DICE, pow)
    }
    if (mod > 0) {
        chance = (basechanceShape * (DICE - maxSide) * 3 + Math.pow(maxSide, 3) - Math.pow(sideDiff, 3)) / Math.pow(DICE, 3)
    }

    return percent(chance)
}