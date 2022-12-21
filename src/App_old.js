import React from 'react'
import { withAxios } from 'react-axios'

import { AppWrapper, Button, GridCell, GetIcon, Character, FlexWrapper, Weapon, NonPrintableBlock, Sticky, White } from './components'
import { getWeaponPrice, getCharacterPrice } from './utils'

const defaultWeapon = {
    range: '1',
    shots: '1',
    drum: '0',
    reload: '0',
    ap: '0',
    dmg: '1',
    title: 'Оружие',
    traits: [''],
    price: '20',
    mass: '1'
}

const getDefaultCharacter = () => (
    {
        characteristics: {
            strength: 11,
            agility: 11,
            perception: 12,
            intelligence: 13,
            health: 3,
            move: 4,
            panic: 0,
            defence: 0

        },
        skills: {
            melee: '0',
            // throwing: '-2',
            guns: '0',
            magic: '-2',
            acrobathics: '-1',
            stealth: '-2',
            // lockpick: '-2',
            medicine: '-2'
        },
        title: '',
        price: '45',
        weapons: []
    }
)

const disabledMenu = {
    band: false,
    weapons: false,
    rules: false
}

class App extends React.PureComponent {
    state = {
        characters: [getDefaultCharacter()],
        armour: [],
        weapons: [defaultWeapon],
        traits: [],
        sum: 500,
        menu: {
            band: true,
            weapons: false,
            rules: false
        }
    }

    componentDidMount() {
        this.props.axios('characters.json').then(result => {
            this.setState({
                // characters: result?.data,
            })
        })
        this.props.axios('weapons.json').then(result => {
            this.setState({ weapons: result.data })
        })
        this.props.axios('traits.json').then(result => {
            this.setState({ traits: result.data })
        })
        // this.props.axios('armour.json').then(result => {
        //     this.setState({ armour: result.data})
        // })
    }

    
    characterChangeStats = (props) => {
        const passedProps = {
            ...props,
            price: getCharacterPrice(props)
        }
        const passedCharacters = [
            ...this.state.characters.slice(0, passedProps?.index),
            passedProps,
            ...this.state.characters.slice(passedProps?.index+1)
        ]

        this.setState({
            characters: [...passedCharacters]
        })
    }
    addCharacter = () => {
        this.setState({
            characters: [...this.state.characters, getDefaultCharacter()]
        })
    }
    cloneCharacter = (e) => {
        e.preventDefault()
        const { value } = e.target
        const newCharcter = {
            ...this.state.characters.slice(value)[0],
            index: this.state.characters.length,
            title: getDefaultCharacter().title
        }
        const passedCharacters = [...this.state.characters]
        passedCharacters.splice(parseInt(value)+1, 0, newCharcter)
        this.setState({
            characters: passedCharacters
        })
    }
    removeCharacter = (e) => {
        e.preventDefault()
        const { value } = e.target
        const passedCharacters = [...this.state.characters]
        passedCharacters.splice(value, 1)
        this.setState({
            characters: passedCharacters
        })
    }
    weaponChangeStats = (props) => {
        const passedProps = {
            ...props,
            price: getWeaponPrice({
                ...props,
                allTraits: this.state.traits
            })
        }

        const passedWeapons = [
            ...this.state.weapons.slice(0, passedProps?.index),
            passedProps,
            ...this.state.weapons.slice(passedProps?.index + 1)
        ]
        this.setState({
            weapons: [...passedWeapons]
        })
    }
    addWeapon = () => {
        this.setState({
            weapons: [...this.state.weapons, defaultWeapon]
        })
    }

    menuChange = (e) => {
        e.preventDefault()
        const { value } = e.target
        const passedMenu =  {
            ...disabledMenu,
            [value]: true
        }
        this.setState({
            menu: passedMenu
        })
    }

    render () {
        let allCharactersPrice = 0
        this.state.characters.map(character => {
            
            let allWeaponsPrice = 0
            character.weapons.map(weapon => {
                allWeaponsPrice += parseInt(this.state.weapons[weapon]?.price || 0)
                return null
            })
            allCharactersPrice += parseInt(character.price) + parseInt(allWeaponsPrice)
            
            return null
        })

        const passedWeapons = this.state.weapons.sort((a, b) => {
            if (a.range > b.range) {
                return 1
            } else {
                if (a.range === b.range) {
                    return a.price > b.price ? 1 : -1
                } else {
                    return -1
                }
            }
            }
        )

        return (
            <AppWrapper>
                <NonPrintableBlock>
                    <FlexWrapper>
                        <GridCell width={3} inverse center>
                            <Button title="Банда" onClick={this.menuChange} value="band" />
                        </GridCell>
                        <GridCell width={3} inverse center>
                            <Button title="Оружие" onClick={this.menuChange} value="weapons" />
                        </GridCell>
                        <GridCell width={3} inverse center>
                            <Button title="Правила" onClick={this.menuChange} value="rules" />
                        </GridCell>
                    </FlexWrapper>
                   
                </NonPrintableBlock>
                
                {this.state.menu.band && 
                <>
                    <Sticky>
                        <White>
                            <FlexWrapper>
                                <GridCell width={1} center> <GetIcon icon="face" /></GridCell>
                                <GridCell width={1} center black>{this.state.characters.length}</GridCell>
                                <GridCell width={1} center> <GetIcon icon="coin" /></GridCell>
                                <GridCell width={2} black >{allCharactersPrice}</GridCell>
                            </FlexWrapper>
                        </White>
                        
                    </Sticky>
                    

                    {this.state.characters.map((characterItem, index) =>
                        <>
                            <NonPrintableBlock>
                                
                                <FlexWrapper>
                                        
                                        {/* <GridCell width={5} inverse center>
                                            <Button title="Дублировать" 
                                                value={index} onClick={this.cloneCharacter} />
                                        </GridCell> */}
                                    {this.state.characters.length > 1 &&
                                        <GridCell width={5} inverse center>
                                            <Button title="Удалить персонаж" value={index} onClick={this.removeCharacter} />
                                        </GridCell>
                                    }
                                </FlexWrapper> 
                              
                            </NonPrintableBlock>
                            <Character
                                currentStats={characterItem}
                                onChange={this.characterChangeStats}
                                index={index}
                                weapons={passedWeapons}
                                allTraits={this.state.traits}
                                key={`${index}_${characterItem.title}`}
                            />
                            
                        </>
                        
                        
                    )
                    }
                    <NonPrintableBlock>
                        <FlexWrapper>
                            <GridCell width={5} inverse center>
                                <Button title="Еще персонаж" onClick={this.addCharacter} />
                            </GridCell>
                            
                        </FlexWrapper>
                        
                    </NonPrintableBlock>
                    
                </>}
                {this.state.menu.weapons && 
                <>
                    <FlexWrapper>
                        {this.state.weapons.map((weaponItem, index) =>
                            
                            <Weapon
                                currentStats={weaponItem}
                                onChange={this.weaponChangeStats}
                                index={index}
                                key={weaponItem}
                                allTraits={this.state.traits}
                            />
                        )
                        }
                    </FlexWrapper>
                    <GridCell width={5} inverse center>
                        <Button title="Еще оружие" onClick={this.addWeapon} />
                    </GridCell>
                </>}
                {this.state.menu.rules && 
                <>
                
                </>}
                
            </AppWrapper>
        )
    }
    
}

export default withAxios(App)
