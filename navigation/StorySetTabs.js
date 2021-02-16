import { createMaterialTopTabNavigator ***REMOVED*** from '@react-navigation/material-top-tabs'
import React from 'react'
import { connect ***REMOVED*** from 'react-redux'
import { getSetInfo, scaleMultiplier ***REMOVED*** from '../constants'
import SetsScreen from '../screens/SetsScreen'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont ***REMOVED*** from '../styles/typography'

// Create the top tab navigator.
const Tab = createMaterialTopTabNavigator()

/**
 * This component renders the tab navigator that is used to display the 3 differnet Story Set tabs.
 */
function StorySetTabs ({
  // Props passed from redux.
  activeGroup,
  translations,
  activeDatabase,
  font,
  primaryColor,
  isRTL
***REMOVED***) {
  // Only dispaly the Mobilization Tools screen if the Mobilization Tools tab has been enabled for this group from the Mobilization Tools screen.
  var MobilizationToolsScreen = activeGroup.shouldShowMobilizationToolsTab ? (
    <Tab.Screen
      name='MobilizationTools'
      component={SetsScreen***REMOVED***
      options={{
        title: translations.sets.mobilization_tools_sets_tab_label
      ***REMOVED******REMOVED***
    />
  ) : null

  // Create the Foundational screen component.
  var FoundationalScreen = (
    <Tab.Screen
      name='Foundational'
      component={SetsScreen***REMOVED***
      options={{
        title: translations.sets.foundational_story_sets_tab_label
      ***REMOVED******REMOVED***
    />
  )

  // Create the Topical screen component.
  var TopicalScreen = (
    <Tab.Screen
      name='Topical'
      component={SetsScreen***REMOVED***
      options={{
        title: translations.sets.topical_sets_tab_label
      ***REMOVED******REMOVED***
    />
  )

  /**
   * Gets the tab that contains the current set bookmark. This is to that we can default to displaying the most relevant tab when the user opens the app.
   * @return {string***REMOVED***
   */
  function getBookmarkedTab () {
    // Get the category of the bookmarked set.
    var bookmarkSetCategory = getSetInfo(
      'category',
      activeDatabase.sets.filter(set => set.id === activeGroup.setBookmark)[0]
        .id
    )

    // Return the correct name of the tab based on the category of the bookmarked set.
    switch (bookmarkSetCategory) {
      case 'foundational':
        return 'Foundational'
        break
      case 'topical':
        return 'Topical'
        break
      case 'mobilization tools':
        return 'MobilizationTools'
        break
      default:
        return 'Foundational'
    ***REMOVED***
  ***REMOVED***

  return (
    <Tab.Navigator
      // Set the initial route based on the category of the bookmarked set.
      initialRouteName={getBookmarkedTab()***REMOVED***
      swipeEnabled={true***REMOVED***
      tabBarOptions={{
        style: {
          backgroundColor: colors.aquaHaze
        ***REMOVED***,
        labelStyle: {
          fontSize: 14 * scaleMultiplier,
          fontFamily: font + '-Bold',
          textTransform: 'none'
        ***REMOVED***,
        activeTintColor: primaryColor,
        inactiveTintColor: colors.chateau,
        indicatorStyle: {
          backgroundColor: primaryColor
        ***REMOVED***
      ***REMOVED******REMOVED***
    >
      {/* The components are declared above but rendered below like this because the tabs need to be in reverse order if the active group's language is RTL. */***REMOVED***
      {isRTL ? MobilizationToolsScreen : FoundationalScreen***REMOVED***
      {TopicalScreen***REMOVED***
      {isRTL ? FoundationalScreen : MobilizationToolsScreen***REMOVED***
    </Tab.Navigator>
  )
***REMOVED***

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language),
    primaryColor: state.database[activeGroup.language].primaryColor,
    activeGroup: activeGroup,
    activeDatabase: state.database[activeGroup.language]
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(StorySetTabs)
