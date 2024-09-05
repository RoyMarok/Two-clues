export const RACES = {
    'human': {
        title: 'Человек',
        strength: {
            min: -2,
            max: 2,
            avg: -1
        },
        agility: {
            min: -2,
            max: 2,
            avg: -1
        },
        perception: {
            min: -2,
            max: 2,
            avg: -1
        },
        intelligence: {
            min: -2,
            max: 2,
            avg: -1
        },
        defence: 0,
        move: 5,
        fly: false
    },
    'marine': {
        title: 'Космодесантник',
        strength: {
            min: -2,
            max: 3,
            avg: 1
        },
        agility: {
            min: -2,
            max: 3,
            avg: 1
        },
        perception: {
            min: -2,
            max: 2,
            avg: 1
        },
        intelligence: {
            min: -2,
            max: 2,
            avg: 0
        },
        defence: 2,
        move: 5,
        fly: false,
        traits: ['strong']
    },
    'elf': {
        title: 'Эльф',
        strength: {
            min: -2,
            max: 2,
            avg: -1
        },
        agility: {
            min: 0,
            max: 3,
            avg: 1
        },
        perception: {
            min: 0,
            max: 3,
            avg: 1
        },
        intelligence: {
            min: -1,
            max: 2,
            avg: -1
        },
        defence: 0,
        move: 6,
        fly: false
    },
    'dwarf': {
        title: 'Гном',
        strength: {
            min: 0,
            max: 3,
            avg: 1
        },
        agility: {
            min: -2,
            max: 2,
            avg: -1
        },
        perception: {
            min: -2,
            max: 2,
            avg: -1
        },
        intelligence: {
            min: -2,
            max: 2,
            avg: -1
        },
        defence: 0,
        move: 4,
        fly: false,
        traits: ['strong']
    },
    'hobbit': {
        title: 'Хоббит',
        strength: {
            min: -2,
            max: 1,
            avg: -1
        },
        agility: {
            min: -2,
            max: 2,
            avg: 1
        },
        perception: {
            min: -2,
            max: 2,
            avg: 1
        },
        intelligence: {
            min: -2,
            max: 2,
            avg: -1
        },
        defence: 0,
        move: 5,
        fly: false
    },
    // 'goblin_night': {
    //     title: 'Гоблин ночной',
    //     strength: {
    //         min: 1,
    //         max: 4,
    //         avg: 2
    //     },
    //     agility: {
    //         min: 3,
    //         max: 8,
    //         avg: 4
    //     },
    //     perception: {
    //         min: 2,
    //         max: 6,
    //         avg: 2
    //     },
    //     intelligence: {
    //         min: 1,
    //         max: 6,
    //         avg: 3
    //     },
    //     defence: 0,
    //     move: 1,
    //     fly: false
    // },
    'goblin_big': {
        title: 'Гоблин большой',
        strength: {
            min: -2,
            max: 2,
            avg: -1
        },
        agility: {
            min: -2,
            max: 2,
            avg: 0
        },
        perception: {
            min: -2,
            max: 2,
            avg: 0
        },
        intelligence: {
            min: -2,
            max: 2,
            avg: -1
        },
        defence: 0,
        move: 5,
        fly: false
    },
    'gnoll': {
        title: 'Гиена',
        strength: {
            min: 0,
            max: 3,
            avg:1
        },
        agility: {
            min: 0,
            max: 2,
            avg: 1
        },
        perception: {
            min: -1,
            max: 2,
            avg: 1
        },
        intelligence: {
            min: -2,
            max: 0,
            avg: -1
        },
        defence: 0,
        move: 6,
        fly: false
    },
    'felinid': {
        title: 'Фелинид',
        strength: {
            min: -2,
            max: 1,
            avg: -1
        },
        agility: {
            min: -1,
            max: 3,
            avg: 1
        },
        perception: {
            min: -2,
            max: 2,
            avg: 1
        },
        intelligence: {
            min: -2,
            max: 0,
            avg: -1
        },
        defence: 0,
        move: 6,
        fly: false
    },
    'orc': {
        title: 'Орк',
        strength: {
            min: -1,
            max: 3,
            avg: 1
        },
        agility: {
            min: -2,
            max: 2,
            avg: 0
        },
        perception: {
            min: -2,
            max: 1,
            avg: -1
        },
        intelligence: {
            min: -2,
            max: 1,
            avg: -1
        },
        defence: 0,
        move: 6,
        fly: false,
        traits: ['undefeat', 'immune']
    },
    'animal': {
        title: 'Животное',
        strength: {
            min: -2,
            max: 2,
            avg: 0
        },
        agility: {
            min: -1,
            max: 3,
            avg: 1
        },
        perception: {
            min: -2,
            max: 2,
            avg: 1
        },
        intelligence: {
            min: -2,
            max: -1,
            avg: -2
        },
        defence: 0,
        move: 6,
        fly: false,
        traits: ['strong', 'animal']
    },
    'teranid': {
        title: 'Теранид',
        strength: {
            min: -2,
            max: 2,
            avg: 0
        },
        agility: {
            min: -1,
            max: 3,
            avg: 1
        },
        perception: {
            min: -2,
            max: 2,
            avg: 1
        },
        intelligence: {
            min: -2,
            max: 0,
            avg: -2
        },
        defence: 0,
        move: 7,
        fly: false,
        traits: ['undefeat', 'animal']
    },
    'werewolf': {
        title: 'Оборотень',
        strength: {
            min: 0,
            max: 3,
            avg: 1
        },
        agility: {
            min: -1,
            max: 3,
            avg: 1
        },
        perception: {
            min: -2,
            max: 2,
            avg: 1
        },
        intelligence: {
            min: -2,
            max: 0,
            avg: -1
        },
        defence: 0,
        move: 6,
        fly: false
    },
    'robot': {
        title: 'Робот',
        strength: {
            min: 0,
            max: 3,
            avg: 1
        },
        agility: {
            min: -1,
            max: 3,
            avg: 1
        },
        perception: {
            min: -2,
            max: 2,
            avg: -1
        },
        intelligence: {
            min: -2,
            max: 2,
            avg: 0
        },
        defence: 1,
        move: 6,
        fly: false,
        traits: ['strong', 'immune']
    },
    // 'vampire': {
    //     title: 'Вампир',
    //     strength: {
    //         min: 3,
    //         max: 8,
    //         avg: 5
    //     },
    //     agility: {
    //         min: 4,
    //         max: 12,
    //         avg: 5
    //     },
    //     perception: {
    //         min: 4,
    //         max: 12,
    //         avg: 5
    //     },
    //     intelligence: {
    //         min: 2,
    //         max: 8,
    //         avg: 3
    //     },
    //     defence: 0,
    //     move: 3,
    //     fly: true,
    //     traits: ['Ужас(0)']
    // },
    'ghost_glave': {
        title: 'Призрак',
        strength: {
            min: -2,
            max: 1,
            avg: -1
        },
        agility: {
            min: -1,
            max: 3,
            avg: 1
        },
        perception: {
            min: -2,
            max: 0,
            avg: -1
        },
        intelligence: {
            min: -2,
            max: 0,
            avg: -1
        },
        defence: 1,
        move: 6,
        fly: true,
        traits: ['Ужас(0)', 'immune']
    },
    // 'skeleton': {
    //     title: 'Скелет',
    //     strength: {
    //         min: 1,
    //         max: 6,
    //         avg: 2
    //     },
    //     agility: {
    //         min: 1,
    //         max: 4,
    //         avg: 2
    //     },
    //     perception: {
    //         min: 1,
    //         max: 2,
    //         avg: 1
    //     },
    //     intelligence: {
    //         min: 1,
    //         max: 2,
    //         avg: 1
    //     },
    //     defence: 0,
    //     move: 2,
    //     fly: false,
    //     traits: ['Ужас(+1)']
    // },
    // 'daemon': {
    //     title: 'Демон',
    //     strength: {
    //         min: 3,
    //         max: 8,
    //         avg: 5
    //     },
    //     agility: {
    //         min: 3,
    //         max: 8,
    //         avg: 4
    //     },
    //     perception: {
    //         min: 2,
    //         max: 8,
    //         avg: 4
    //     },
    //     intelligence: {
    //         min: 2,
    //         max: 8,
    //         avg: 2
    //     },
    //     defence: 0,
    //     move: 2,
    //     fly: false,
    //     traits: ['Ужас(-1)']
    // },
}