import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import { withTranslation } from 'react-i18next'

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
    NamesGenerator,
    Rules
} from './components'

const Home = () => null

export const App = ({ t }) => (
    <AppWrapper>
        <NonPrintableBlock>
            <Loader />
            <FlexWrapper>
                <GridCell width={3} inverse center>
                    <Link to="/">{t('names.title')}</Link>
                </GridCell>
                <GridCell width={3} inverse center>
                    <Link to="/band">{t('band.title')}</Link>
                </GridCell>
                <GridCell width={3} inverse center>
                    <Link to="/weapons">{t('weapons.title')}</Link>
                </GridCell>
                <GridCell width={3} inverse center>
                    <Link to="/armours">{t('armours.title')}</Link>
                </GridCell>
                <GridCell width={3} inverse center>
                    <Link to="/rules">{t('rules.title')}</Link>
                </GridCell>
                <GridCell width={1} center>
                    <Button onClick={window.print}>
                        <GetIcon icon="print" color="secondary" />
                    </Button>
                </GridCell>
            </FlexWrapper>
        </NonPrintableBlock>
        <Routes>
            <Route path="/" element={<NamesGenerator />} />
            <Route path="/band" element={<Band />} />
            <Route path="/weapons" element={<Weapons />} />
            <Route path="/armours" element={<Armours />} />
            <Route path="/rules" element={<Rules />} />
        </Routes>
    </AppWrapper>
)

export default withTranslation()(App)