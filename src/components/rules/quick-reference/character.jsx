import React from 'react'
import ReactMarkdown from 'react-markdown'

import { DisplayCharacter } from '../../d6/display'
import { GridCell, FlexWrapper, NobreakWrapper } from '../../styled'
import { GetIcon } from '../../get-icon'

import { COLUMN_WIDTH, demoCharacter } from '../constants'

export const CharacterQR =({ t }) => (
    <>
        <GridCell width={COLUMN_WIDTH + 1} open wrapper >
            <ReactMarkdown>{t('qr.character.title')}</ReactMarkdown>
            <DisplayCharacter
                index={1000}
                isDemo
                isControlled={false}
                characterProps={demoCharacter}
            />
            <FlexWrapper>
                <GridCell center filled><GetIcon icon="strength" /></GridCell>
                <GridCell center ><GetIcon icon="agility" /></GridCell>
                <GridCell center filled><GetIcon icon="perception" /></GridCell>
                <GridCell center ><GetIcon icon="intelligence" /></GridCell>
                {/* <GridCell /> */}
                <GridCell center big>{'±'}</GridCell>
                <GridCell width={8} >{t('qr.character.main')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center><GetIcon icon="move" /></GridCell>
                <GridCell center >{'||'}</GridCell>
                <GridCell center><GetIcon icon="fly" /></GridCell>
                <GridCell width={2}/>
                <GridCell width={9} >{t('qr.character.move')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center><GetIcon icon="defence" /></GridCell>
                <GridCell width={4} />
                <GridCell width={9} >{t('qr.character.defence')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell center><GetIcon icon="atom" /></GridCell>
                <GridCell width={4} />
                <GridCell width={9} >{t('qr.character.actions')}</GridCell>
            </FlexWrapper>
            <FlexWrapper>
                <GridCell width={5} wrapper black>{t('qr.character.trait.example')}</GridCell>
                <GridCell width={9} >{t('qr.character.trait')}</GridCell>
            </FlexWrapper>
        </GridCell>
    </>
) 