import React from 'react'

import { Icon } from './styled'

import { ReactComponent as StrengthIcon } from '../icons/strength.svg'
import { ReactComponent as AgilityIcon } from '../icons/agility.svg'
import { ReactComponent as PerceptionIcon } from '../icons/perception.svg'
import { ReactComponent as IntelligenceIcon } from '../icons/intelligence.svg'
import { ReactComponent as HealthIcon } from '../icons/health.svg'
import { ReactComponent as MoveIcon } from '../icons/move.svg'
import { ReactComponent as PanicIcon } from '../icons/panic.svg'
import { ReactComponent as DefenceIcon } from '../icons/defence.svg'
import { ReactComponent as RangeIcon } from '../icons/range.svg'
import { ReactComponent as ShotsIcon } from '../icons/shots.svg'
import { ReactComponent as DrumIcon } from '../icons/drum.svg'
import { ReactComponent as ReloadIcon } from '../icons/reload.svg'
import { ReactComponent as ApIcon } from '../icons/ap.svg'
import { ReactComponent as DmgeIcon } from '../icons/dmg.svg'
import { ReactComponent as CoinIcon } from '../icons/coin.svg'
import { ReactComponent as MassIcon } from '../icons/mass.svg'
import { ReactComponent as FaceIcon } from '../icons/face.svg'
import { ReactComponent as CrossIcon } from '../icons/cross.svg'
import { ReactComponent as PrintIcon } from '../icons/printer.svg'
import { ReactComponent as FlyIcon } from '../icons/fly.svg'
import { ReactComponent as HiddenIcon } from '../icons/invisible.svg'
import { ReactComponent as LikeIcon } from '../icons/like.svg'
import { ReactComponent as ConfusedIcon } from '../icons/confused.svg'
import { ReactComponent as DiceIcon } from '../icons/dice.svg'
import { ReactComponent as PencilIcon } from '../icons/pencil.svg'
import { ReactComponent as AtomIcon } from '../icons/atom.svg'
import { ReactComponent as GearIcon } from '../icons/gear.svg'
import { ReactComponent as MagicIcon } from '../icons/bahai.svg'
import { ReactComponent as SkillIcon } from '../icons/phyllotaxis.svg'
import { ReactComponent as WeaponIcon } from '../icons/weapon.svg'
import { ReactComponent as ScrollIcon } from '../icons/parchment.svg'

import { ReactComponent as HelmetIcon } from '../icons/mandalorian.svg'
import { ReactComponent as ArmIcon } from '../icons/gloves.svg'
import { ReactComponent as ChestIcon } from '../icons/singlet.svg'
import { ReactComponent as LegIcon } from '../icons/valenki.svg'
import { ReactComponent as HussarIcon } from '../icons/hussar.svg'
import { ReactComponent as NapoleongIcon } from '../icons/napoleon.svg'
import { ReactComponent as PoisonIcon } from '../icons/poison.svg'
import { ReactComponent as ClockIcon } from '../icons/clock.svg'
import { ReactComponent as CloudIcon } from '../icons/cloud.svg'
import { ReactComponent as FogIcon } from '../icons/fog.svg'
import { ReactComponent as GobletIcon } from '../icons/goblet.svg'

export const GetIcon = ({ icon, ...props }) => {
    switch (icon) {
        case 'strength':
            return <Icon {...props}><StrengthIcon /></Icon>
        case 'agility':
            return <Icon {...props}><AgilityIcon /></Icon>
        case 'perception':
            return <Icon {...props}><PerceptionIcon /></Icon>
        case 'intelligence':
            return <Icon {...props}><IntelligenceIcon /></Icon>
        case 'health':
            return <Icon {...props}><HealthIcon /></Icon>
        case 'move':
            return <Icon {...props}><MoveIcon /></Icon>
        case 'up':
            return <Icon {...props} rotate={315} ><MoveIcon /></Icon>
        case 'down':
            return <Icon {...props} rotate={135} ><MoveIcon /></Icon>
        case 'panic':
            return <Icon {...props}><PanicIcon /></Icon>
        case 'defence':
            return <Icon {...props}><DefenceIcon /></Icon>
        case 'range':
            return <Icon {...props}><RangeIcon /></Icon>
        case 'height':
            return <Icon {...props} rotate={90}><RangeIcon /></Icon>
        case 'shots':
            return <Icon {...props}><ShotsIcon /></Icon>
        case 'drum':
            return <Icon {...props}><DrumIcon /></Icon>
        case 'reload':
            return <Icon {...props}><ReloadIcon /></Icon>
        case 'ap':
            return <Icon {...props}><ApIcon /></Icon>
        case 'dmg':
            return <Icon {...props}><DmgeIcon /></Icon>
        case 'coin':
            return <Icon {...props}><CoinIcon /></Icon>
        case 'mass':
            return <Icon {...props}><MassIcon /></Icon>
        case 'face':
            return <Icon {...props}><FaceIcon /></Icon>
        case 'cross':
            return <Icon {...props}><CrossIcon /></Icon>
        case 'fly':
            return <Icon {...props}><FlyIcon /></Icon>
        case 'print':
            return <Icon {...props}><PrintIcon /></Icon>
        case 'hidden':
            return <Icon {...props}><HiddenIcon /></Icon>
        case 'like':
            return <Icon {...props}><LikeIcon /></Icon>
        case 'confused':
            return <Icon {...props}><ConfusedIcon /></Icon>
        case 'dice':
            return <Icon {...props}><DiceIcon /></Icon>
        case 'pencil':
            return <Icon {...props}><PencilIcon /></Icon>
        case 'atom':
            return <Icon {...props}><AtomIcon /></Icon>
        case 'gear':
            return <Icon {...props}><GearIcon /></Icon>
        case 'magic':
            return <Icon {...props}><ScrollIcon /></Icon>
        case 'skill':
            return <Icon {...props}><SkillIcon /></Icon>
        case 'weapon':
            return <Icon {...props}><WeaponIcon /></Icon>
        case 'scroll':
            return <Icon {...props}><ScrollIcon /></Icon>
        case 'helmet':
            return <Icon {...props}><HelmetIcon /></Icon>
        case 'hands':
            return <Icon {...props}><ArmIcon /></Icon>
        case 'chest':
            return <Icon {...props}><ChestIcon /></Icon>
        case 'legs':
            return <Icon {...props}><LegIcon /></Icon>
        case 'hussar':
            return <Icon {...props}><HussarIcon /></Icon>
        case 'napoleon':
            return <Icon {...props}><NapoleongIcon /></Icon>
        case 'poison':
            return <Icon {...props}><PoisonIcon /></Icon>
        case 'clock':
            return <Icon {...props}><ClockIcon /></Icon>
        case 'cloud':
            return <Icon {...props}><CloudIcon /></Icon>
        case 'fog':
            return <Icon {...props}><FogIcon /></Icon>
        case 'goblet':
            return <Icon {...props}><GobletIcon /></Icon>

        default:
            return null
    }
}

GetIcon.list = [
    'strength',
    'agility',
    'perception',
    'intelligence',
    'health',
    'move',
    'up',
    'down',
    'panic',
    'defence',
    'range',
    'shots',
    'drum',
    'reload',
    'ap',
    'dmg',
    'coin',
    'mass',
    'face',
    'cross',
    'fly',
    'print',
    'hidden',
    'like',
    'confused',
    'dice',
    'pencil',
    'atom',
    'gear',
    'magic',
    'skill',
    'weapon',
    'scroll',
    'helmet',
    'hands',
    'chest',
    'legs',
    'height',
    'hussar',
    'napoleon',
    'poison',
    'clock',
    'cloud',
    'fog',
    'goblet',
]