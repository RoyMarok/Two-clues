import React, { useState } from 'react'
import { withAxios } from 'react-axios'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
    ArmourState,
    WeaponsState,
    TraitsState,
    RussianNames,
    SweedenNames,
    SpanishNames,
    ImperialCitizenNames,
    AeldariNames,
    Ork40kNames,
    CitiesNames,
    DoKNames,
    FireslayersNames,
    IdonethNames,
    KONames,
    LRLNames,
    StormcastNames,
    SylvanethNames,
    SkavenNames,
    ChaosDwarfNames,
    NighthauntNames,
    BretonianNames,
    SkillsList,
    FractionsList
} from '../atoms'

const LoadFile = ({ axios, src, stateLoaded, setState }) => {
    const [fetched, setFetched] = useState(false)
    const stateIsLoaded = useRecoilValue(stateLoaded)
    const loadData = useSetRecoilState(setState)
    if (!stateIsLoaded && !fetched) {
        axios(src).then(result => {
            loadData(result.data)
        })
        setFetched(true)
    }
    return null
}

const loadingFiles = [
    { ...TraitsState },
    { ...WeaponsState },
    { ...ArmourState },
    
    { ...RussianNames },
    { ...SweedenNames },
    { ...SpanishNames },
    { ...ImperialCitizenNames },
    { ...AeldariNames },
    { ...Ork40kNames },
    { ...CitiesNames },
    { ...DoKNames },
    { ...FireslayersNames },
    { ...IdonethNames },
    { ...KONames },
    { ...LRLNames },
    { ...StormcastNames },
    { ...SylvanethNames },
    { ...SkavenNames },
    { ...ChaosDwarfNames },
    { ...NighthauntNames },
    { ...BretonianNames },
    { ...SkillsList },
    { ...FractionsList }
]

export const LoaderComponent = ({ axios }) => (
    <>
        {loadingFiles.map((item, key) => <LoadFile {...item} key={item?.src} axios={axios} />) }
    </>
)

export const Loader = withAxios(LoaderComponent)