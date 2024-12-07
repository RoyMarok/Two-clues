import React from 'react'
import ReactMarkdown from 'react-markdown'

import { Weapon } from '../../d6/display'
import { GridCell, FlexWrapper, NobreakWrapper } from '../../styled'
import { GetIcon } from '../../get-icon'

import { COLUMN_WIDTH, defaultD6MeleeWeapon, defaultD6RangeWeapon, demoCharacter } from '../constants'

export const WeaponQR = ({ t }) => (
    <>
        <GridCell width={COLUMN_WIDTH} open wrapper >
            <ReactMarkdown>{t('qr.weapon.title')}</ReactMarkdown>
            <Weapon {...defaultD6MeleeWeapon} character={demoCharacter.characteristics} />
            

            {/* <FlexWrapper>
                <GridCell center filled><GetIcon icon="strength" /></GridCell>
                <GridCell center ><GetIcon icon="agility" /></GridCell>
                <GridCell center filled><GetIcon icon="perception" /></GridCell>
                <GridCell center ><GetIcon icon="intelligence" /></GridCell>

                <GridCell center big>{'±'}</GridCell>
                <GridCell width={8} wrapper>{t('qr.character.main')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center><GetIcon icon="move" /></GridCell>
                <GridCell center >{'||'}</GridCell>
                <GridCell center><GetIcon icon="fly" /></GridCell>
                <GridCell width={2} />
                <GridCell width={9} wrapper>{t('qr.character.move')}</GridCell>
            </FlexWrapper> */}
            <FlexWrapper>
                <GridCell center><GetIcon icon="range" color="secondary" /></GridCell>
                <GridCell width={3} />
                <GridCell width={10} >{t('qr.weapon.range')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center filled black><GetIcon icon="hit" /></GridCell>
                <GridCell center ><GetIcon icon="agility" color="secondary"/></GridCell>
                <GridCell center >{'-1'}</GridCell>
                <GridCell center filled black>{'-2'}</GridCell>
                <GridCell width={10} >{t('qr.weapon.melee.hit')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center filled black><GetIcon icon="dmg" /></GridCell>
                <GridCell center ><GetIcon icon="strength" color="secondary"/></GridCell>
                <GridCell center >{'-2'}</GridCell>
                <GridCell center filled black>{'-3'}</GridCell>
                <GridCell width={10} >{t('qr.weapon.melee.dmg')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell width={4} wrapper black>{t('qr.weapon.trait.melee.example')}</GridCell>
                <GridCell width={9} >{t('qr.weapon.trait')}</GridCell>
            </FlexWrapper>
            {/* <Weapon {...defaultD6RangeWeapon} character={demoCharacter.characteristics} /> */}
        </GridCell>
    </>
) 