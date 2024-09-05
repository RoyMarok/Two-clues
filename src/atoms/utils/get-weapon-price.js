export const getD6WeaponPrice = (weapon) => {
    const {
        range = {
            min: 1,
            max: 1
        },
        str = 0,
        dmg = 1,
        count = 1,
        exp = 0,
        traits = [],
        allTraits = [],
        dependencies,
        title
    } = weapon



    // const rangeKoeff = WEAPONS_RANGE.findIndex((item) => item === range.max) - WEAPONS_RANGE.findIndex((item) => item === range.min) + 1
    // const rangeKoeff = clamp(Math.floor(range.max / 3) - Math.floor(range.min / 3) + 1, 1, 6)
    const rangeKoeff = Math.floor(range.max / 3) - Math.floor(range.min / 3) + 1
    const rangeDMG = rangeKoeff + ((str + dmg + 6))

    let thisTraitPrice = ''
    let traitsPrice = 0
    allTraits.map(trait => {
        if (traits.includes(trait.id)) {
            thisTraitPrice = thisTraitPrice + ` ${JSON.stringify(trait)}`
            if (trait?.multi && trait.price) {
                const traitsDivider = 1 / parseFloat(trait.price)
                traitsPrice = traitsPrice - Math.round(rangeDMG * (traitsDivider - 1) / traitsDivider)
            } else {
                traitsPrice = traitsPrice + trait.price
            }

        }
        return null
    })

    traitsPrice = Math.floor(traitsPrice)

    // console.log(
    //     'Weapon Price',
    //     title,
    //     rangeKoeff,
    //     str,
    //     dmg,
    //     (str + dmg + 6),
    //     rangeDMG,
    //     traitsPrice,
    //     thisTraitPrice
    // )

    return Math.max(
        Math.ceil(
            (
                // (str + 3)
                // + (dmg + 3)
                + rangeDMG
                // - depKoeff
                + traitsPrice
            ) * count
        )
        , 1)
}
