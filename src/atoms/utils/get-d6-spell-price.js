export const getD6SpellPrice = (spell) => {
    const {
        target,
        quality,
        mod,
        ap = 0,
        dmg = 0,
        traits,
        allTraits
    } = spell

    let traitsPrice = 0
    allTraits.map(trait => {
        if (traits.includes(trait.id)) {
            traitsPrice += parseInt(trait.price)
        }
        return null
    })

    const dependenciesSum = (target.strength + 0) + (target.agility + 0) + (target.perception + 0) + (target.intelligence + 0)
    // const passedAP = Boolean(ap) ? BASE_MOD_PRICE + (Math.abs(ap) * 5) : 0
    // const passedMod = Boolean(mod) ? BASE_MOD_PRICE + (Math.abs(mod) * 5) : 0

    return Math.max(
        Math.round((dependenciesSum * Math.abs(quality) + mod))
        , 1)
}
