import { combineReducers } from 'redux'
import { activeGroup } from './reducers/activeGroup'
import { areMobilizationToolsUnlocked } from './reducers/areMobilizationToolsUnlocked'
import { database } from './reducers/database'
import { downloads } from './reducers/downloads'
import { groups } from './reducers/groups'
import { isInstallingLanguageInstance } from './reducers/isInstallingLanguageInstance'
import { languageInstallation } from './reducers/languageInstallation'
import { mtUnlockAttempts } from './reducers/mtUnlockAttempts'
import { network } from './reducers/network'
import { persistedPopups } from './reducers/persistedPopups'
import { popups } from './reducers/popups'
import { security } from './reducers/security'
import { settings } from './reducers/settings'
import { storedDownloads } from './reducers/storedDownloads'
/**
 * Combines all the different reducers together using the combineReducers redux function.
 */
const rootReducer = combineReducers({
  downloads,
  database,
  groups,
  activeGroup,
  network,
  isInstallingLanguageInstance,
  areMobilizationToolsUnlocked,
  security,
  mtUnlockAttempts,
  storedDownloads,
  popups,
  persistedPopups,
  settings,
  languageInstallation
})

export default rootReducer
