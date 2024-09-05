export const getMidDmg = (value) => {
    const passedValue = value + 3
    let sum = 0
    for (let i = 1; i <= passedValue; i++) {
        sum += i / passedValue
    }
    return sum
}
