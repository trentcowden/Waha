import { Download } from './downloads'
import { Group } from './groups'
import { Translations } from './translations'

export interface CommonProps {
  isRTL: boolean
  isDark: boolean
}

export interface AGProps {
  activeGroup: Group
}

export interface TProps {
  t: Translations
}

export interface DLProps {
  downloads: {
    [key: string]: Download
  }
}

export interface NetworkProps {
  isConnected: boolean
}

export interface DBProps {
  database: Object
}

export interface ADBProps {
  activeDatabase: Object
}
