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
        default:
            return null
    }
}