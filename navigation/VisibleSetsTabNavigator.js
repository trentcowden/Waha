import React from 'react'
import { scaleMultiplier ***REMOVED*** from '../constants'

import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import { connect ***REMOVED*** from 'react-redux'

const Tab = createMaterialTopTabNavigator()

function TabNavigator (props) {
  return (
    //global navigation options
    <Tab.Navigator
      initialRouteName='Core'
      screenOptions={{
        headerStyle: {
          height: 90 * scaleMultiplier
        ***REMOVED***,
        gestureDirection: props.isRTL ? 'horizontal-inverted' : 'horizontal',
        gestureResponseDistance: {
          horizontal: 50 * scaleMultiplier,
          vertical: 135
        ***REMOVED***,
        headerTitleAlign: 'center'
      ***REMOVED******REMOVED***
    >
      {/* Study Set Screen */***REMOVED***
      <Tab.Screen
        name='Core'
        component={SetScreen***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: '#EAEEF0'
          ***REMOVED***,
          headerTitleAlign: 'center'
        ***REMOVED******REMOVED***
      />

      {/* Lesson List Screen */***REMOVED***
      <Tab.Screen
        name='Topical'
        component={LessonListScreen***REMOVED***
        options={{
          //gestureDirection: props.isRTL ? 'horizontal-inverted' : 'horizontal',
          headerStyle: {
            backgroundColor: '#F7F9FA'
          ***REMOVED***,
          headerTitleAlign: 'center'
        ***REMOVED******REMOVED***
      />

      {/* Play Screen */***REMOVED***
      <Tab.Screen
        name='Toolkit'
        component={PlayScreen***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: '#FFFFFF'
          ***REMOVED***,
          headerTitleStyle: {
            color: '#82868D',
            fontFamily: props.font + '-medium'
          ***REMOVED***,
          gestureEnabled: false
        ***REMOVED******REMOVED***
      />
    </Tab.Navigator>
  )
***REMOVED***

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(TabNavigator)
