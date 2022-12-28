import React from 'react'
import { withTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { BorderWrapper, GridCell, FlexWrapper } from './styled'
import { GetIcon } from './get-icon'
import { SkillsList } from '../atoms'

const HEIGHT = 2

export const ActionsComponent = ({ t, character }) => {
    const actions = useRecoilValue(SkillsList.setState)
    return (

        <GridCell width={14} center open>
            <FlexWrapper>
                <GridCell width={4} filled black height={HEIGHT}>
                    {/* {t('band.character.action')} */}
                </GridCell>
                <GridCell width={1} filled center height={HEIGHT}>
                    {/* <GetIcon icon="strength" /> */}
                </GridCell>
                <GridCell width={1} filled center height={HEIGHT}>
                    {/* <GetIcon icon="agility" /> */}
                </GridCell>
                <GridCell width={1} filled center height={HEIGHT}>
                    {/* <GetIcon icon="perception" /> */}
                </GridCell>
                <GridCell width={1} filled center height={HEIGHT}>
                    {/* <GetIcon icon="intelligence" /> */}
                </GridCell>
                <GridCell width={1} filled center height={HEIGHT} big>±</GridCell>
                
                <GridCell width={1} filled black center height={HEIGHT}><GetIcon icon="like" /></GridCell>
                <GridCell width={1} filled black center height={HEIGHT}><GetIcon icon="hidden" /></GridCell>
                <GridCell width={1} filled black center height={HEIGHT}><GetIcon icon="panic" /></GridCell>
                <GridCell width={1} filled center height={HEIGHT}>1</GridCell>
                <GridCell width={1} filled center height={HEIGHT}>2+</GridCell>
            </FlexWrapper>
            {actions.map((item, key) => {
                const even = (key % 2)
                const stand =item?.action?.duration?.stand
                const hidden = item?.action?.duration?.hidden
                const panic = item?.action?.duration?.panic
                return (
                    <FlexWrapper>
                        <GridCell width={4}>{t(`band.character.action.${item?.id}`)}</GridCell>
                        <GridCell width={1} center><GetIcon color="secondary" icon={item?.attributes?.strength && 'strength'} /></GridCell>
                        <GridCell width={1} center><GetIcon color="secondary" icon={item?.attributes?.agility && 'agility'} /></GridCell>
                        <GridCell width={1} center><GetIcon color="secondary" icon={item?.attributes?.perception && 'perception'} /></GridCell>
                        <GridCell width={1} center><GetIcon color="secondary" icon={item?.attributes?.intelligence && 'intelligence'} /></GridCell>

                        <GridCell width={1} center filled={even}>{item?.skill && (character?.skills?.[item?.id] || '-2')}</GridCell>

                        <GridCell width={1} center filled={even && !stand} inverse={stand}>{Boolean(stand) && stand}</GridCell>
                        <GridCell width={1} center filled={even && !hidden} inverse={hidden}>{Boolean(hidden) && hidden}</GridCell>
                        <GridCell width={1} center filled={even && !panic} inverse={panic}>{Boolean(panic) && panic}</GridCell>
                        

                        <GridCell width={1} center filled={even} >{Boolean(item?.action?.first) && '•'}</GridCell>
                        <GridCell width={1} center filled={even} >{Boolean(item?.action?.remain) && '•'}</GridCell>
                    </FlexWrapper>
                )
            }
            )}
        </GridCell>
    
)}

export const Actions = withTranslation()(ActionsComponent)
