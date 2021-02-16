import { createMaterialTopTabNavigator ***REMOVED*** from '@react-navigation/material-top-tabs'
import React from 'react'
import { connect ***REMOVED*** from 'react-redux'
import { getSetInfo, scaleMultiplier ***REMOVED*** from '../constants'
import SetsScreen from '../screens/SetsScreen'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont ***REMOVED*** from '../styles/typography'

const Tab = createMaterialTopTabNavigator()

function StorySetTabs ({
  activeGroup,
  translations,
  activeDatabase,
  font,
  primaryColor,
  isRTL
***REMOVED***) {
  var MobilizationToolsScreen = activeGroup.shouldShowMobilizationToolsTab ? (
    <Tab.Screen
      name='MobilizationTools'
      component={SetsScreen***REMOVED***
      options={{
        title: translations.sets.mobilization_tools_sets_tab_label
      ***REMOVED******REMOVED***
    />
  ) : null

  var FoundationalScreen = (
    <Tab.Screen
      name='Foundational'
      component={SetsScreen***REMOVED***
      options={{
        title: translations.sets.foundational_story_sets_tab_label
      ***REMOVED******REMOVED***
    />
  )

  var TopicalScreen = (
    <Tab.Screen
      name='Topical'
      component={SetsScreen***REMOVED***
      options={{
        title: translations.sets.topical_sets_tab_label
      ***REMOVED******REMOVED***
    />
  )

  // get the initial tab, which is whatever the category of the bookmarked set
  //  is
  function getInitialRouteName () {
    var bookmarkSetCategory = getSetInfo(
      'category',
      activeDatabase.sets.filter(set => set.id === activeGroup.setBookmark)[0]
        .id
    )

    var initialRouteName

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
      initialRouteName={getInitialRouteName()***REMOVED***
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
      {isRTL ? MobilizationToolsScreen : FoundationalScreen***REMOVED***
      {TopicalScreen***REMOVED***
      {isRTL ? FoundationalScreen : MobilizationToolsScreen***REMOVED***
    </Tab.Navigator>
  )
***REMOVED***

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  // console.log(`sets: ${state.database[activeGroup.language].sets***REMOVED***`)

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
