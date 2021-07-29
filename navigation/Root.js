import { StatusBar as StatusBarExpo } from 'expo-status-bar'
import i18n from 'i18n-js'
import React, { useEffect } from 'react'
import { StatusBar as StatusBarRN, View } from 'react-native'
import { connect } from 'react-redux'
import { groupNames } from '../constants'
import en from '../locales/en.json'
import ga from '../locales/ga.json'
import hi from '../locales/hi.json'
import { changeActiveGroup } from '../redux/actions/activeGroupActions'
import { createGroup } from '../redux/actions/groupsActions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import LoadingScreen from '../screens/LoadingScreen'
import { colors } from '../styles/colors'
import MainDrawer from './MainDrawer'
import Onboarding from './Onboarding'

function mapStateToProps (state) {
  if (state.activeGroup !== null)
    return {
      hasOnboarded: state.database.hasOnboarded,
      hasInstalledFirstLanguageInstance:
        state.database.hasInstalledFirstLanguageInstance,
      isInstallingLanguageInstance: state.isInstallingLanguageInstance,
      activeGroup: activeGroupSelector(state),
      groups: state.groups,
      database: state.database,
      isDark: state.settings.isDarkModeEnabled
    }
  else
    return {
      hasOnboarded: state.database.hasOnboarded,
      hasInstalledFirstLanguageInstance:
        state.database.hasInstalledFirstLanguageInstance,
      isInstallingLanguageInstance: state.isInstallingLanguageInstance,
      isDark: state.settings.isDarkModeEnabled
    }
}

function mapDispatchToProps (dispatch) {
  return {
    changeActiveGroup: name => {
      dispatch(changeActiveGroup(name))
    },
    createGroup: (
      groupName,
      language,
      emoji,
      shouldShowMobilizationToolsTab,
      groupID,
      groupNumber
    ) =>
      dispatch(
        createGroup(
          groupName,
          language,
          emoji,
          shouldShowMobilizationToolsTab,
          groupID,
          groupNumber
        )
      )
  }
}

// Setup for i18n.
i18n.fallbacks = true
i18n.translations = { en, ga, hi }
i18n.locale = 'en'

/**
 * This component renders a navigator conditionally based on state. It's the first thing rendered in App.js.
 */
const Root = ({
  locale,
  // Props passed from redux.
  hasOnboarded,
  hasInstalledFirstLanguageInstance,
  isInstallingLanguageInstance,
  isDark,
  activeGroup = null,
  groups = null,
  database = null,
  changeActiveGroup,
  createGroup
}) => {
  console.log(i18n.locale)

  useEffect(() => {
    // console.log(activeGroup.language)
    if (activeGroup !== null) i18n.locale = activeGroup.language
  }, [activeGroup])

  // Below are some failsafes to keep the app functioning in case of group errors.
  if (activeGroup) {
    // If somehow, every group got deleted, create a new group in one of the installed languages so that the app can still function.
    if (groups.length === 0) {
      var languageID
      Object.keys(database).forEach(key => {
        if (key.length === 2) {
          languageID = key
        }
      })
      createGroup(groupNames[languageID], languageID, 'default', true, 1, 1)
      changeActiveGroup(groupNames[languageID])
      // If somehow, we switch to a group that doesn't exist, fall back to the first group in the groups redux array so that the app can still function.
    } else if (!groups.some(group => activeGroup.name === group.name)) {
      changeActiveGroup(groups[0].name)
    }
  }

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
        <MainDrawer locale={locale} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Root)
