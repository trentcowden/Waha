import React from 'react'
import { scaleMultiplier ***REMOVED*** from '../constants'
import SetScreen from '../screens/SetScreen'
import { connect ***REMOVED*** from 'react-redux'
import { createMaterialTopTabNavigator ***REMOVED*** from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

function SetTabs (props) {
  var toolkit = props.activeGroup.showToolkit ? (
    <Tab.Screen name='Toolkit' component={SetScreen***REMOVED*** options={{***REMOVED******REMOVED*** />
  ) : null

  return (
    //global navigation options
    <Tab.Navigator
      initialRouteName='Core'
      swipeEnabled={false***REMOVED***
      tabBarOptions={{
        labelStyle: {
          fontSize: 14 * scaleMultiplier,
          fontFamily: props.font + '-medium',
          textTransform: 'none'
        ***REMOVED***,
        activeTintColor: props.primaryColor,
        inactiveTintColor: '#9FA5AD',
        indicatorStyle: {
          backgroundColor: props.primaryColor
        ***REMOVED***
      ***REMOVED******REMOVED***
    >
      <Tab.Screen
        name='Core'
        component={SetScreen***REMOVED***
        options={{
          title: 'Core Story Sets'
        ***REMOVED******REMOVED***
      />

      <Tab.Screen
        name='Topical'
        component={SetScreen***REMOVED***
        options={{
          title: 'Topical Sets'
        ***REMOVED******REMOVED***
      />
      {toolkit***REMOVED***
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
    font: state.database[activeGroup.language].font,
    primaryColor: state.database[activeGroup.language].primaryColor,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(SetTabs)
