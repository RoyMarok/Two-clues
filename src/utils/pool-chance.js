const checkWin = (pool1arr, pool2arr) => {
    const maxLength = Math.max(pool1arr.length, pool2arr.length)
    return [...pool1arr].sort().reverse().join('').padEnd(maxLength, '0') > [...pool2arr].sort().reverse().join('').padEnd(maxLength, '0')
}

const getPercent = (value) => `${Math.round(value * 10000) / 100}%`

const poolChance = (pool1length, pool2length, dice = 6) => {
    const pool1Variations = dice ** pool1length
    const pool2Variations = dice ** pool2length
    const allChances = pool1Variations * pool2Variations
    let winChance = 0

    for (
        let i = 0;
        i < pool1Variations;
        i++
    ) {
        const pool1Variation = (i).toString(dice).padStart(pool1length, '0').split('').map((char) => parseInt(char, 10) + 1).join('')
        for (
            let i = 0;
            i < pool2Variations;
            i++
        ) {
            const pool2Variation = (i).toString(dice).padStart(pool2length, '0').split('').map((char) => parseInt(char, 10) + 1).join('')
            if (checkWin(pool1Variation, pool2Variation)) {
                winChance += 1
            }
        }
    }
    const pool1Rate = winChance / allChances

    return `${getPercent(pool1Rate)} ${getPercent(1 - pool1Rate)}`
}

poolChance(2, 3, 3)
