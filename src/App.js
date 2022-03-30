import React from 'react'
import { withAxios } from 'react-axios'

import { OverallMoney, Character } from './components'
import { filterWeapons, makeCharactersStats } from './utils'

class App extends React.PureComponent {
    state = {
        gang: {
            leader: [],
            champions: [],
            gangers: []
        },
        armour: [],
        weapons: {},
        characters: {},
        sum: 500
    }

    componentDidMount() {
        this.props.axios('characters.json').then(result => {
            this.setState({
                characters: result?.data,
                gang: {
                    leader: [{
                        characteristics: result?.data?.races?.human?.characteristics?.base,
                    }]
                },
            })
        })
        this.props.axios('weapon.json').then(result => {
            this.setState({ weapons: result.data })
        })
        // this.props.axios('armour.json').then(result => {
        //     this.setState({ armour: result.data})
        // })
    }
    leaderChangeStats = (characteristics) => {
        this.setState({
            gang: {
                leader: [{
                    characteristics: makeCharactersStats([
                        characteristics,
                        this.state.characters?.races?.human?.characteristics?.max,
                        this.state.characters?.characters?.leader?.characteristics
                    ])
                }]
            },
        })
    }
    render () {
        const leaderProps = {
            currentStats: this.state.gang.leader?.[0],
            onChange: this.leaderChangeStats,
            min: this.state.characters?.races?.human,
            weapons: filterWeapons({
                weapons: this.state.weapons,
                filter: {
                    illegal: false,
                    rare: true,
                    rating: 11
                }
            }),
            // armour: this.state.armour
        }

        return (
            <>
                <OverallMoney sum={this.state.sum} onChange={this.handleChangeSum} />
                <Character {...leaderProps} />
               
            </>
        )
    }
    
}

export default withAxios(App)
