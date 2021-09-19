import NetInfo from '@react-native-community/netinfo'
import { StatusBar as StatusBarExpo } from 'expo-status-bar'
import React, { FC, ReactElement, useEffect } from 'react'
import { StatusBar as StatusBarRN, View } from 'react-native'
import { selector, useAppDispatch } from '../redux/hooks'
import {
  setGlobalGroupCounter,
  setHasInstalledFirstLanguageInstance,
  setHasOnboarded,
  storeLanguageCoreFileCreatedTime,
} from '../redux/reducers/languageInstallation'
import { setIsConnected } from '../redux/reducers/network'
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

  // (TEMP) Since we're transferring over some of the language installation information from the database reducer to the new language installation reducer, we need to compare the old and new to make sure we transfer everything over.
  const oldGlobalGroupCounter: unknown = selector(
    (state) => state.database.globalGroupCounter
  )
  const newGlobalGroupCounter = selector(
    (state) => state.languageInstallation.globalGroupCounter
  )
  const oldHasOnboarded: unknown = selector(
    (state) => state.database.hasOnboarded
  )
  const newHasOnboarded = selector(
    (state) => state.languageInstallation.hasOnboarded
  )
  const oldHasInstalledFirstLanguageInstance: unknown = selector(
    (state) => state.database.hasInstalledFirstLanguageInstance
  )
  const newHasInstalledFirstLanguageInstance = selector(
    (state) => state.languageInstallation.hasInstalledFirstLanguageInstance
  )
  const oldLanguageCoreFilesCreatedTimes: unknown = selector(
    (state) => state.database.languageCoreFilesCreatedTimes
  )
  const newLanguageCoreFilesCreatedTimes = selector(
    (state) => state.languageInstallation.languageCoreFilesCreatedTimes
  )

  useEffect(() => {
    if (oldHasOnboarded !== undefined) {
      if ((oldGlobalGroupCounter as unknown) !== newGlobalGroupCounter) {
        dispatch(
          setGlobalGroupCounter({ counter: oldGlobalGroupCounter as number })
        )
      }

      if ((oldHasOnboarded as unknown) !== newHasOnboarded)
        dispatch(setHasOnboarded({ toSet: oldHasOnboarded as boolean }))

      if (
        oldHasInstalledFirstLanguageInstance !==
        newHasInstalledFirstLanguageInstance
      )
        dispatch(
          setHasInstalledFirstLanguageInstance({
            toSet: oldHasInstalledFirstLanguageInstance as boolean,
          })
        )

      if (oldLanguageCoreFilesCreatedTimes)
        Object.keys(
          oldLanguageCoreFilesCreatedTimes as Record<string, string>
        ).forEach((fileName) => {
          if (newLanguageCoreFilesCreatedTimes[fileName] === undefined) {
            dispatch(
              storeLanguageCoreFileCreatedTime({
                fileName,
                createdTime: oldLanguageCoreFilesCreatedTimes[fileName],
              })
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
        dispatch(setIsConnected({ toSet: state.isConnected }))
    })

    return function cleanup() {
      // Cancel our connection status listener.
      netInfoUnsubscribe()
    }
  }, [])

  const languageCoreFilesCreatedTimes = selector(
    (state) => state.database.languageCoreFilesCreatedTimes
  )
  const globalGroupCounter = selector(
    (state) => state.database.globalGroupCounter
  )
  const languageCoreFilesToUpdate = selector(
    (state) => state.database.languageCoreFilesToUpdate
  )
  const groups = selector((state) => state.groups)

  useEffect(() => {
    // Below are some logs for testing.
    // Log the groups to the console.
    // console.log(`Groups:`)
    // groups.forEach(group => console.log(group.language))
    // Log the installed language instances to the console.
    // console.log(
    //   `Languages in DB: ${Object.keys(database).filter(
    //     key => key.length === 2
    //   )}`
    // )
    // Log the language Core Files to update to the console.
    // console.log(`Language Core Files to update: ${languageCoreFilesToUpdate}\n`)
    // Log the language Core File created times to the console.
    // console.log(
    //   `Language Core Files created times: ${JSON.stringify(
    //     languageCoreFilesCreatedTimes
    //   )}\n`
    // )
    // console.log(groups)
  }, [])

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
