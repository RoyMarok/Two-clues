import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withTranslation } from 'react-i18next'

import { GridCell, FlexWrapper, NobreakWrapper } from '../styled'
import { DisplayCharacter, Weapon, IconedElement, Experience } from '../d6/display'
import { GetIcon } from '../get-icon'

import { COLUMN_WIDTH, defaultD6RangeWeapon, defaultD6MeleeWeapon } from './constants'
import { BaseQR } from './quick-reference/base'
import { MoveQR } from './quick-reference/move'
import { CharacterQR } from './quick-reference/character'
import { WeaponQR } from './quick-reference/weapon'
import { AttackQR } from './quick-reference/attack'

export const QuickRefComponent = ({ t }) => (
    <FlexWrapper columns>
        <BaseQR t={t} />
        <CharacterQR t={t} />
        <div>
            <WeaponQR t={t} />
            <MoveQR t={t} />
        </div>
        
        <AttackQR t={t} />
        
    </FlexWrapper>
)

export const QuickRef = withTranslation()(QuickRefComponent)