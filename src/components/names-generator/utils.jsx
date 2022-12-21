export const getRandomName = (names = []) => typeof names === 'string'
? names
: names[parseInt(Math.random() * (names.length - 1))]

export const generateFromParts = ({ parts = [], separator = '' }) => parts.map(part => getRandomName(part)).join(separator)

export const getSpainName = ({ names = '', family = '', separator = ['-', ' y ', ' de '] }) => `${getRandomName(names)} ${getRandomName(family)}${getRandomName(separator)}${getRandomName(family)}`

export const getSwedenName = ({ names = '', family = '' }) => `${getRandomName(names)} ${getRandomName(names)} ${getRandomName(family)}`

export const getRussianName = ({ names = '', family = '', middleName = '' }) => `${getRandomName(names)} ${getRandomName(middleName)} ${getRandomName(family)}`

