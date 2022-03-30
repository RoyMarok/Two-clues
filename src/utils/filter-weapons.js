const passingRestrictions = ({
    candidate,
    filter
}) => (candidate.illegal === filter?.illegal
&& candidate.rare === filter?.rare
&& filter?.rating >= candidate.rating)
|| (!candidate.illegal && !candidate.rare)

const filterSection = ({ section = [], filter }) => section.map(
    item => {
        if (passingRestrictions({
                candidate: item.restriction,
                filter
            })) {
            const passedStats = item.stats.filter(statElement => !statElement?.restriction
                || passingRestrictions({
                    candidate: statElement.restriction,
                    filter
                })
            )
            if (passedStats.length > 0) {
                return (
                    {
                        ...item,
                        stats: passedStats
                    }
                )
            }
        }
        return null
    }
    )
    .filter(item => item)

export const filterWeapons = ({ weapons = {}, filter }) => {
    const output = {
        pistol: filterSection({ section: weapons?.pistol, filter })
    }

    return output
}