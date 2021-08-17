import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { FC, ReactElement } from 'react'
import { Dimensions } from 'react-native'
import { scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { getSetInfo } from '../functions/setAndLessonDataFunctions'
import { selector } from '../hooks'
import {
  activeDatabaseSelector,
  activeGroupSelector,
} from '../redux/reducers/activeGroup'
import SetsScreen from '../screens/SetsScreen'
import { colors } from '../styles/colors'
import { getTranslations } from '../translations/translationsConfig'

export type SetsTabsParams = {
  Foundational: undefined
  Topical: undefined
  MobilizationTools: undefined
}

// Create the top tab navigator.
const Tab = createMaterialTopTabNavigator<SetsTabsParams>()

/**
 * This component renders the tab navigator that is used to display the 3 differnet Story Set tabs.
 */
const SetsTabs: FC = ({}): ReactElement => {
  // Redux state.
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const activeGroup = selector((state) => activeGroupSelector(state))
  const activeDatabase = selector((state) => activeDatabaseSelector(state))
  const areMobilizationToolsUnlocked = selector(
    (state) => state.areMobilizationToolsUnlocked
  )
  const font = info(activeGroup.language).font
  const t = getTranslations(activeGroup.language)
  const isRTL = info(activeGroup.language).isRTL

  // Only display the Mobilization Tools tab if the Mobilization Tools have been unlocked.
  var MobilizationToolsScreen =
    activeGroup.shouldShowMobilizationToolsTab &&
    areMobilizationToolsUnlocked ? (
      <Tab.Screen
        name='MobilizationTools'
        component={SetsScreen}
        options={{
          title: t.sets.mobilization,
        }}
      />
    ) : null

  // Create the Foundational screen component.
  var FoundationalScreen = (
    <Tab.Screen
      name='Foundational'
      component={SetsScreen}
      options={{
        title: t.sets.foundations,
      }}
    />
  )

  // Create the Topical screen component.
  var TopicalScreen = (
    <Tab.Screen
      name='Topical'
      component={SetsScreen}
      options={{
        title: t.sets.topics,
      }}
    />
  )

  /**
   * Gets the tab that contains the current set bookmark. This is to that we can default to displaying the most relevant tab when the user opens the app.
   * @return {string} - The tab for the bookmarked set.
   */
  const getBookmarkedTab = () => {
    // Get the category of the bookmarked set.
    if (activeDatabase !== undefined)
      return getSetInfo(
        'category',
        activeDatabase.sets.filter(
          (set) => set.id === activeGroup.setBookmark
        )[0].id
      )
    else return 'Foundational'
  }

  return (
    <Tab.Navigator
      // Set the initial route based on the category of the bookmarked set.
      initialRouteName={getBookmarkedTab()}
      swipeEnabled={true}
      // Improves performance according to docs.
      initialLayout={{ width: Dimensions.get('window').width }}
      tabBarOptions={{
        style: {
          backgroundColor: colors(isDark).bg3,
        },
        labelStyle: {
          fontSize: 14 * scaleMultiplier,
          fontFamily: font + '-Bold',
          textTransform: 'none',
        },
        activeTintColor: colors(isDark, activeGroup.language).accent,
        inactiveTintColor: colors(isDark).disabled,
        indicatorStyle: {
          backgroundColor: colors(isDark, activeGroup.language).accent,
        },
      }}
    >
      {/* The components are declared above but rendered below like this because the tabs need to be in reverse order if the active group's language is RTL. */}
      {isRTL ? MobilizationToolsScreen : FoundationalScreen}
      {TopicalScreen}
      {isRTL ? FoundationalScreen : MobilizationToolsScreen}
    </Tab.Navigator>
  )
}

export default SetsTabs
