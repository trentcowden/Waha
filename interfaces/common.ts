import { Database, DBLanguageData } from 'redux/reducers/database'
import { Download } from '../redux/reducers/downloads'
import { Group } from '../redux/reducers/groups'
import { Translations } from './translations'

/**
 * This file contains a bunch of the most common redux props that are passed as props to components. Having our component props "extend" these means we don't have to write them out every time.
 */

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
  database: Database
}

export interface ADBProps {
  activeDatabase: DBLanguageData | undefined
}
