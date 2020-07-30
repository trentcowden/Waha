import { createMaterialTopTabNavigator ***REMOVED*** from '@react-navigation/material-top-tabs'
import React from 'react'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import SetScreen from '../screens/SetScreen'
const Tab = createMaterialTopTabNavigator()

function SetTabs (props) {
  var toolkit = props.activeGroup.showToolkit ? (
    <Tab.Screen
      name='Mobilization Tools'
      component={SetScreen***REMOVED***
      options={{
        title: props.translations.sets.mobilization_tools_sets_tab_label
      ***REMOVED******REMOVED***
    />
  ) : null

  var bookmarkSetCategory = props.activeDatabase.sets.filter(
    set => set.id === props.activeGroup.setBookmark
  )[0].category
  var initialRouteName

  switch (bookmarkSetCategory) {
    case 'core':
      initialRouteName = 'Core'
      break
    case 'topical':
      initialRouteName = 'Topical'
      break
    case 'mt':
      initialRouteName = 'Mobilization Tools'
      break
    default:
      initialRouteName = 'Core'
  ***REMOVED***

  var tabs = props.isRTL ? (
    <Tab.Navigator
      initialRouteName={initialRouteName***REMOVED***
      swipeEnabled={true***REMOVED***
      tabBarOptions={{
        style: {
          backgroundColor: colors.aquaHaze
        ***REMOVED***,
        labelStyle: {
          fontSize: 14 * scaleMultiplier,
          fontFamily: props.font + '-medium',
          textTransform: 'none'
        ***REMOVED***,
        activeTintColor: props.primaryColor,
        inactiveTintColor: colors.chateau,
        indicatorStyle: {
          backgroundColor: props.primaryColor
        ***REMOVED***
      ***REMOVED******REMOVED***
    >
      {toolkit***REMOVED***
      <Tab.Screen
        name='Topical'
        component={SetScreen***REMOVED***
        options={{
          title: props.translations.sets.topical_sets_tab_label
        ***REMOVED******REMOVED***
      />
      <Tab.Screen
        name='Core'
        component={SetScreen***REMOVED***
        options={{
          title: props.translations.sets.foundational_story_sets_tab_label
        ***REMOVED******REMOVED***
      />
    </Tab.Navigator>
  ) : (
    <Tab.Navigator
      initialRouteName={initialRouteName***REMOVED***
      swipeEnabled={true***REMOVED***
      tabBarOptions={{
        style: {
          backgroundColor: colors.aquaHaze
        ***REMOVED***,
        labelStyle: {
          fontSize: 14 * scaleMultiplier,
          fontFamily: props.font + '-medium',
          textTransform: 'none'
        ***REMOVED***,
        activeTintColor: props.primaryColor,
        inactiveTintColor: colors.chateau,
        indicatorStyle: {
          backgroundColor: props.primaryColor
        ***REMOVED***
      ***REMOVED******REMOVED***
    >
      <Tab.Screen
        name='Core'
        component={SetScreen***REMOVED***
        options={{
          title: props.translations.sets.foundational_story_sets_tab_label
        ***REMOVED******REMOVED***
      />

      <Tab.Screen
        name='Topical'
        component={SetScreen***REMOVED***
        options={{
          title: props.translations.sets.topical_sets_tab_label
        ***REMOVED******REMOVED***
      />
      {toolkit***REMOVED***
    </Tab.Navigator>
  )

  return tabs
***REMOVED***

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font,
    primaryColor: state.database[activeGroup.language].primaryColor,
    activeGroup: activeGroup,
    activeDatabase: state.database[activeGroup.language]
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(SetTabs)
