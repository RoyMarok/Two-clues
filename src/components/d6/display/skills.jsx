import React from 'react'

import {

    GridCell,
    FlexWrapper,
} from '../../styled'

const skillsNames = {
    fight: ['Зверь', 'Бронекулак', 'Напосошок', 'Мясник', 'Град Ударов', 'Твёрдый'],
    speed: ['Спринт', 'Верхолаз', 'Сальто', 'Молния', 'Бей-Беги', 'Акробат'],
    shooting: ['Перерыв', 'Охотник', 'Пистольеро', 'Ловкие Руки', 'Орлиный Глаз', 'Стрелок'],
    trickster: ['Безликий', 'Устрашающий', 'Проныра', 'Фокусник', 'Торговец', 'Боевой Маг'],
}

export const Skills = () => (
    <FlexWrapper>
        {Object.getOwnPropertyNames(skillsNames).map((itemName) => (
            <GridCell center width={4} height={3}>
                {skillsNames[itemName].map((item, index) => <FlexWrapper><GridCell height={0.5} width={0.5} filled={!(index % 2)} /><GridCell left height={0.5} width={3.5}>{item}</GridCell></FlexWrapper>)}
            </GridCell>
        ))}

    </FlexWrapper>
)
