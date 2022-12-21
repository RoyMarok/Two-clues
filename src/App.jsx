import React from 'react'
import { Routes, Route, Link } from "react-router-dom"

import {
    Armours,
    AppWrapper,
    Band,
    Button,
    Character,
    FlexWrapper,
    GetIcon,
    GridCell,
    Loader,
    NonPrintableBlock,
    Sticky,
    Weapon,
    Weapons,
    White,
    NamesGenerator
} from './components'

const Home = () => null

export const App = (props) => (
    <AppWrapper>
        <NonPrintableBlock>
            <Loader />
            <FlexWrapper>
                <GridCell width={3} inverse center>
                    <Link to="/">Имена</Link>
                </GridCell>
                <GridCell width={3} inverse center>
                    <Link to="/band">Банда</Link>
                </GridCell>
                <GridCell width={3} inverse center>
                    <Link to="/weapons">Оружие</Link>
                </GridCell>
                <GridCell width={3} inverse center>
                    <Link to="/armours">Броня</Link>
                </GridCell>
                <GridCell width={3} inverse center>
                    <Link to="/rules">Правила</Link>
                </GridCell>
            </FlexWrapper>
        </NonPrintableBlock>
        <Routes>
            <Route path="/" element={<NamesGenerator />} />
            <Route path="/band" element={<Band />} />
            <Route path="/weapons" element={<Weapons />} />
            <Route path="/armours" element={<Armours />} />
            <Route path="/rules" element={<Home />} />
        </Routes>
    </AppWrapper>
)

export default App