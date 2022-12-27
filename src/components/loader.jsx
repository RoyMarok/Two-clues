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
    SkillsList
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
    { ...WeaponsState },
    { ...ArmourState },
    { ...TraitsState },
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
    { ...SkillsList }
]

export const LoaderComponent = ({ axios }) => (
    <>
        {loadingFiles.map((item, key) => <LoadFile {...item} key={item?.src} axios={axios} />) }
    </>
)

export const Loader = withAxios(LoaderComponent)