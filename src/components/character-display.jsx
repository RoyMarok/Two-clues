import React from 'react'
import { withTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { BorderWrapper, GridCell, FlexWrapper } from './styled'
import { FieldNumber } from './field-number'
import { Mass } from './mass'
import { GetIcon } from './get-icon'
import { Skill } from './skill'
import { Actions } from './actions'
import { defaultHuman, SkillsList  } from '../atoms'

export const CharacterDisplayComponent = ({ t }) => {
    const skillsList = useRecoilValue(SkillsList.setState)
    return (
    <FlexWrapper>
        <BorderWrapper>
            <FlexWrapper>
                <GridCell width={12} filled black>{t('band.character.title')}</GridCell>
                <GridCell width={1} center filled><GetIcon color="primary" icon="coin" /></GridCell>
                <GridCell width={1} inverse center>{defaultHuman.price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell filled width={2}>Опыт</GridCell>
                <GridCell width={6} ></GridCell>
                <GridCell width={5} >{t('band.character.characteristics')}</GridCell>
                <GridCell width={1} filled center>{defaultHuman.price}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell width="8" height="6" center>
                    <FlexWrapper>
                        <FieldNumber title="Сила" value={defaultHuman.characteristics.strength} filled icon="strength" controlled={false} />
                        <FieldNumber title="Лов" value={defaultHuman.characteristics.agility} icon="agility" controlled={false} />
                        <FieldNumber title="Вос" value={defaultHuman.characteristics.perception} filled icon="perception" controlled={false} />
                        <FieldNumber title="Инт" value={defaultHuman.characteristics.intelligence} icon="intelligence" controlled={false} />
                    </FlexWrapper>
                    <FlexWrapper>
                        <FieldNumber title="Зд" value={defaultHuman.characteristics.health} icon="health" filled controlled={false} />
                        <FieldNumber title="Движ" value={defaultHuman.characteristics.move} icon={'move'} controlled={false} />
                        <FieldNumber title="Ужас" value={defaultHuman.characteristics.panic} icon="panic" filled controlled={false} />
                        <GridCell width="2" height="3" center>
                            <GridCell width="2" height="1" center black>
                                <GetIcon icon="defence" />
                            </GridCell>
                            <FlexWrapper>
                                <GridCell center><GetIcon icon="up" color="secondary" /></GridCell>
                                <GridCell center big black>{0}</GridCell>
                            </FlexWrapper>
                            <FlexWrapper>
                                <GridCell center><GetIcon icon="down" color="secondary" /></GridCell>
                                <GridCell center big black>{0}</GridCell>
                            </FlexWrapper>
                        </GridCell>
                    </FlexWrapper>
                </GridCell>
                <GridCell width="6" height="6" center>
                    <FlexWrapper>
                        <GridCell width={5} >{t('band.character.weapons')}</GridCell>
                        <GridCell width={1} filled center>{0}</GridCell>
                    </FlexWrapper>

                    <Mass value={0} max={defaultHuman.characteristicshealth + 3} black={0} />
                    <GridCell width="6" center>
                    </GridCell>
                    <GridCell width="6" >
                        {t('band.character.actions', { count: defaultHuman.actions })}
                    </GridCell>
                </GridCell>
            </FlexWrapper>
        {/* </BorderWrapper>
        <GridCell center />
        <BorderWrapper> */}
            {/* <FlexWrapper>
                <GridCell width="8" ></GridCell>
                <GridCell width="1" center >-2</GridCell>
                <GridCell width="1" center >-1</GridCell>
                <GridCell width="1" center ></GridCell>
                <GridCell width="1" center >+1</GridCell>
                <GridCell width="1" center >+2</GridCell>
                <GridCell width="1" center >%</GridCell>
            </FlexWrapper>
            {
                skillsList.filter(item => item?.skill).map((item, index) => (
                    <Skill
                        {...(item?.attributes || {})}
                        title={t(`band.character.skill.${item?.id}`)}
                        value={defaultHuman?.skills[item?.id]}
                        key={item?.id}
                        even={!(index % 2)}
                        character={defaultHuman.characteristics}
                    />))
            } */}
            <Actions />
        </BorderWrapper>
    </FlexWrapper>
)}

export const CharacterDisplay = withTranslation()(CharacterDisplayComponent)