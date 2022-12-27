export const getWeaponPrice = (props) => {
    const {
        range,
        shots,
        drum,
        reload,
        ap,
        dmg,
        mass,
        traits = [],
        allTraits = [],
        weapons,
        masterIndex
    } = props
    const calcDmg = (parseInt(dmg) + 1) * shots * 2
    const calcRange = range * 0.275
    const calcReload = reload * 5 + (parseInt(drum) - 10) / 2
    const calcMass = (mass - 1)*10

    let traitsPrice = 0
    allTraits.map(trait => {
        if (traits.includes(trait.id)) {
            traitsPrice += parseInt(trait.price)
        }
        return null
    })
    const priceRanged = Math.round(
        Math.max(
            parseInt(calcReload) + (calcDmg * calcRange) + (ap * 10) - calcMass + traitsPrice,
            5
        ) / 5
    ) * 5

    const priceCC = Math.round(
        Math.max(
            (calcDmg * 5) - 20 + (ap * 10) - calcMass + traitsPrice,
            5
            ) / 5
        ) * 5

    const calculatedPrice = parseInt(range) > 1 ? priceRanged : priceCC
    const masterWeaponPrice = weapons.filter(weapon => weapon.id === masterIndex)?.[0]?.price

   return masterIndex ? Math.max(calculatedPrice - masterWeaponPrice, 0) : calculatedPrice
}