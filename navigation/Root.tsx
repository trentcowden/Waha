import NetInfo from '@react-native-community/netinfo'
import { StatusBar as StatusBarExpo } from 'expo-status-bar'
import React, { FC, ReactElement, useEffect } from 'react'
import { StatusBar as StatusBarRN, View } from 'react-native'
import { selector, useAppDispatch } from '../hooks'
import {
  setGlobalGroupCounter,
  setHasInstalledFirstLanguageInstance,
  setHasOnboarded,
  storeLanguageCoreFileCreatedTime,
} from '../redux/actions/languageInstallationActions'
import { updateConnectionStatus } from '../redux/actions/networkActions'
import LoadingScreen from '../screens/LoadingScreen'
import { colors } from '../styles/colors'
import MainDrawer from './MainDrawer'
import Onboarding from './Onboarding'

interface Props {}
// This component renders a navigator conditionally based on state. It's the first thing rendered in App.js.
const Root: FC<Props> = ({}): ReactElement => {
  const hasOnboarded = selector(
    (state) => state.languageInstallation.hasOnboarded
  )
  const hasInstalledFirstLanguageInstance = selector(
    (state) => state.languageInstallation.hasInstalledFirstLanguageInstance
  )
  const isInstallingLanguageInstance = selector(
    (state) => state.isInstallingLanguageInstance
  )
  const isDark = selector((state) => state.settings.isDarkModeEnabled)

  const dispatch = useAppDispatch()

  // (TEMP) Since we're transferring over some of the language installation information, we need to compare the old and new to make sure we transfer everything over.
  const oldGlobalGroupCounter = selector(
    (state) => state.database.globalGroupCounter
  )
  const newGlobalGroupCounter = selector(
    (state) => state.languageInstallation.globalGroupCounter
  )
  const oldHasOnboarded = selector((state) => state.database.hasOnboarded)
  const newHasOnboarded = selector(
    (state) => state.languageInstallation.hasOnboarded
  )
  const oldHasInstalledFirstLanguageInstance = selector(
    (state) => state.database.hasInstalledFirstLanguageInstance
  )
  const newHasInstalledFirstLanguageInstance = selector(
    (state) => state.languageInstallation.hasInstalledFirstLanguageInstance
  )
  const oldLanguageCoreFilesCreatedTimes = selector(
    (state) => state.database.languageCoreFilesCreatedTimes
  )
  const newLanguageCoreFilesCreatedTimes = selector(
    (state) => state.languageInstallation.languageCoreFilesCreatedTimes
  )

  /** useEffect function that adds a listener for listening to network changes. */
  useEffect(() => {
    if (oldHasOnboarded !== undefined) {
      if (oldGlobalGroupCounter !== newGlobalGroupCounter) {
        dispatch(setGlobalGroupCounter(oldGlobalGroupCounter))
      }

      if (oldHasOnboarded !== newHasOnboarded)
        dispatch(setHasOnboarded(oldHasOnboarded))

      if (
        oldHasInstalledFirstLanguageInstance !==
        newHasInstalledFirstLanguageInstance
      )
        dispatch(
          setHasInstalledFirstLanguageInstance(
            oldHasInstalledFirstLanguageInstance
          )
        )

      Object.keys(oldLanguageCoreFilesCreatedTimes).forEach((fileName) => {
        if (newLanguageCoreFilesCreatedTimes[fileName] === undefined) {
          dispatch(
            storeLanguageCoreFileCreatedTime(
              fileName,
              oldLanguageCoreFilesCreatedTimes[fileName]
            )
          )
        }
      })
    }
  }, [])

  /** useEffect function that adds a listener for listening to network changes. */
  useEffect(() => {
    // Add a listener for connection status and update the redux state accordingly.
    const netInfoUnsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected !== null)
        dispatch(updateConnectionStatus(state.isConnected))
    })

    return function cleanup() {
      // Cancel our connection status listener.
      netInfoUnsubscribe()
    }
  }, [])

  // Below are some failsafes to keep the app functioning in case of group errors.
  // if (activeGroup) {
  //   // If somehow, every group got deleted, create a new group in one of the installed languages so that the app can still function.
  //   if (groups.length === 0) {
  //     var languageID
  //     Object.keys(database).forEach(key => {
  //       if (key.length === 2) {
  //         languageID = key
  //       }
  //     })
  //     createGroup(groupNames[languageID], languageID, 'default', true, 1, 1)
  //     changeActiveGroup(groupNames[languageID])
  //     // If somehow, we switch to a group that doesn't exist, fall back to the first group in the groups redux array so that the app can still function.
  //   } else if (!groups.some(group => activeGroup.name === group.name)) {
  //     changeActiveGroup(groups[0].name)
  //   }
  // }

  /*
  Conditionally render the navigator based on the state of the 3 redux variables above. There's 3 possible options:
    1. If the user has already installed their first language instance, isn't currently installing a language instance, and has gone through the onboarding sequence, then show the normal MainDrawer navigator.
    2. If the user hasn't installed their first language instance OR has but hasn't finished onboarding yet, then the user is opening up the app for the first time, or else cancelled their install and still needs to install their first language instance. In this case, the Onboarding navigator should be rendered.
    3. If the user has installed their first language instance and is currently installing a language instance, we're installing a subsequent language instance and should render the Loading screen.
  */
  if (
    hasInstalledFirstLanguageInstance &&
    !isInstallingLanguageInstance &&
    hasOnboarded
  ) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBarExpo style={isDark ? 'light' : 'dark'} />
        <MainDrawer />
      </View>
    )
  } else if (
    !hasInstalledFirstLanguageInstance ||
    (hasInstalledFirstLanguageInstance && !hasOnboarded)
  ) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBarRN
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={isDark ? colors(isDark).bg1 : colors(isDark).bg3}
        />
        <Onboarding />
      </View>
    )
  } else {
    return (
      <View style={{ flex: 1 }}>
        <StatusBarRN
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={isDark ? colors(isDark).bg1 : colors(isDark).bg3}
        />
        <LoadingScreen />
      </View>
    )
  }
}

export default Root
