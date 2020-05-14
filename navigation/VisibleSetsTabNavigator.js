import React from 'react'
import { scaleMultiplier ***REMOVED*** from '../constants'
import SetScreen from '../screens/SetScreen'
import { connect ***REMOVED*** from 'react-redux'
import { createMaterialTopTabNavigator ***REMOVED*** from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

function VisibleSetsTabNavigator (props) {
  return (
    //global navigation options
    <Tab.Navigator
      initialRouteName='Core'
      swipeEnabled={false***REMOVED***
      screenOptions={{***REMOVED******REMOVED***
    >
      <Tab.Screen name='core' component={SetScreen***REMOVED*** />

      <Tab.Screen name='topical' component={SetScreen***REMOVED*** options={{***REMOVED******REMOVED*** />

      <Tab.Screen name='toolkit' component={SetScreen***REMOVED*** options={{***REMOVED******REMOVED*** />
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

export default connect(mapStateToProps)(VisibleSetsTabNavigator)
