export const RACES = {
    'human': {
        title: 'Человек',
        strength: {
            min: 1,
            max: 6,
            avg: 3
        },
        agility: {
            min: 1,
            max: 6,
            avg: 3
        },
        perception: {
            min: 1,
            max: 6,
            avg: 3
        },
        intelligence: {
            min: 1,
            max: 12,
            avg: 3
        },
        defence: 0,
        move: 2,
        fly: false
    },
    'elf': {
        title: 'Эльф',
        strength: {
            min: 1,
            max: 6,
            avg: 3
        },
        agility: {
            min: 2,
            max: 6,
            avg: 4
        },
        perception: {
            min: 3,
            max: 6,
            avg: 4
        },
        intelligence: {
            min: 2,
            max: 12,
            avg: 3
        },
        defence: 0,
        move: 2,
        fly: false
    },
    'dwarf': {
        title: 'Гном',
        strength: {
            min: 4,
            max: 12,
            avg: 4
        },
        agility: {
            min: 1,
            max: 5,
            avg: 3
        },
        perception: {
            min: 1,
            max: 6,
            avg: 2
        },
        intelligence: {
            min: 1,
            max: 12,
            avg: 3
        },
        defence: 0,
        move: 1,
        fly: false
    },
    'hobbit': {
        title: 'Хоббит',
        strength: {
            min: 1,
            max: 5,
            avg: 2
        },
        agility: {
            min: 1,
            max: 8,
            avg: 4
        },
        perception: {
            min: 3,
            max: 12,
            avg: 3
        },
        intelligence: {
            min: 1,
            max: 6,
            avg: 3
        },
        defence: 0,
        move: 1,
        fly: false
    },
    'goblin_night': {
        title: 'Гоблин ночной',
        strength: {
            min: 1,
            max: 4,
            avg: 2
        },
        agility: {
            min: 3,
            max: 8,
            avg: 4
        },
        perception: {
            min: 2,
            max: 6,
            avg: 2
        },
        intelligence: {
            min: 1,
            max: 6,
            avg: 3
        },
        defence: 0,
        move: 1,
        fly: false
    },
    'goblin_big': {
        title: 'Гоблин большой',
        strength: {
            min: 1,
            max: 7,
            avg: 4
        },
        agility: {
            min: 3,
            max: 8,
            avg: 4
        },
        perception: {
            min: 2,
            max: 6,
            avg: 3
        },
        intelligence: {
            min: 1,
            max: 6,
            avg: 3
        },
        defence: 0,
        move: 2,
        fly: false
    },
    'gnoll': {
        title: 'Гиена',
        strength: {
            min: 3,
            max: 8,
            avg: 5
        },
        agility: {
            min: 3,
            max: 8,
            avg: 5
        },
        perception: {
            min: 1,
            max: 4,
            avg: 2
        },
        intelligence: {
            min: 1,
            max: 4,
            avg: 2
        },
        defence: 2,
        move: 2,
        fly: false
    },
    'felinid': {
        title: 'Фелинид',
        strength: {
            min: 3,
            max: 8,
            avg: 4
        },
        agility: {
            min: 3,
            max: 8,
            avg: 5
        },
        perception: {
            min: 1,
            max: 6,
            avg: 3
        },
        intelligence: {
            min: 1,
            max: 4,
            avg: 2
        },
        defence: 0,
        move: 2,
        fly: false
    },
    'orc': {
        title: 'Орк',
        strength: {
            min: 3,
            max: 8,
            avg: 5
        },
        agility: {
            min: 1,
            max: 8,
            avg: 3
        },
        perception: {
            min: 1,
            max: 4,
            avg: 2
        },
        intelligence: {
            min: 1,
            max: 4,
            avg: 2
        },
        defence: 0,
        move: 2,
        fly: false
    },
    'animal': {
        title: 'Животное',
        strength: {
            min: 3,
            max: 5,
            avg: 4
        },
        agility: {
            min: 2,
            max: 8,
            avg: 4
        },
        perception: {
            min: 2,
            max: 6,
            avg: 5
        },
        intelligence: {
            min: 1,
            max: 2,
            avg: 1
        },
        defence: 0,
        move: 3,
        fly: false
    },
    'werewolf': {
        title: 'Оборотень',
        strength: {
            min: 3,
            max: 8,
            avg: 5
        },
        agility: {
            min: 3,
            max: 8,
            avg: 4
        },
        perception: {
            min: 2,
            max: 6,
            avg: 4
        },
        intelligence: {
            min: 1,
            max: 2,
            avg: 1
        },
        defence: 0,
        move: 2,
        fly: false
    },
    'vampire': {
        title: 'Вампир',
        strength: {
            min: 3,
            max: 8,
            avg: 5
        },
        agility: {
            min: 4,
            max: 12,
            avg: 5
        },
        perception: {
            min: 4,
            max: 12,
            avg: 5
        },
        intelligence: {
            min: 2,
            max: 8,
            avg: 3
        },
        defence: 0,
        move: 3,
        fly: true,
        traits: ['Ужас(3)']
    },
    'ghost_glave': {
        title: 'Призрак',
        strength: {
            min: 3,
            max: 8,
            avg: 4
        },
        agility: {
            min: 4,
            max: 12,
            avg: 4
        },
        perception: {
            min: 1,
            max: 2,
            avg: 1
        },
        intelligence: {
            min: 1,
            max: 2,
            avg: 1
        },
        defence: 1,
        move: 3,
        fly: true,
        traits: ['Ужас(2)']
    },
    'skeleton': {
        title: 'Скелет',
        strength: {
            min: 1,
            max: 6,
            avg: 2
        },
        agility: {
            min: 1,
            max: 4,
            avg: 2
        },
        perception: {
            min: 1,
            max: 2,
            avg: 1
        },
        intelligence: {
            min: 1,
            max: 2,
            avg: 1
        },
        defence: 0,
        move: 2,
        fly: false,
        traits: ['Ужас(1)']
    },
    'daemon': {
        title: 'Демон',
        strength: {
            min: 3,
            max: 8,
            avg: 5
        },
        agility: {
            min: 3,
            max: 8,
            avg: 4
        },
        perception: {
            min: 2,
            max: 8,
            avg: 4
        },
        intelligence: {
            min: 2,
            max: 8,
            avg: 2
        },
        defence: 0,
        move: 2,
        fly: false,
        traits: ['Ужас(3)']
    },
}