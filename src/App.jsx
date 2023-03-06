import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import { withTranslation } from 'react-i18next'

import {
    Armours,
    AppWrapper,
    Band,
    Button,
    Characters,
    // Character,
    FlexWrapper,
    Fractions,
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
import { BandD6, Character } from './components/d6'

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
                        <Link to="/characters">{t('characters.title')}</Link>
                    </GridCell>
                    <GridCell width={3} inverse center>
                        <Link to="/characters-d6">{t('characters.d6.title')}</Link>
                    </GridCell>
                    <GridCell width={3} inverse center>
                        <Link to="/fractions">{t('fractions.title')}</Link>
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
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters-d6" element={<BandD6 />} />
            <Route path="/fractions" element={<Fractions />} />
            <Route path="/weapons" element={<Weapons />} />
            <Route path="/armours" element={<Armours />} />
            <Route path="/rules" element={<Rules />} />
        </Routes>
    </AppWrapper>
)

export default withTranslation()(App)