import { Download } from './downloads'
import { Group } from './groups'

export interface CommonProps {
  isRTL?: boolean
  isDark?: boolean
  activeGroup?: Group
  t?: Object
  isConnected?: boolean
  activeDatabase?: Object
  database?: Object
  downloads?: {
    [key: string]: Download
  }
}
