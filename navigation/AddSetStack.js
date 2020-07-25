import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import React from 'react'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import AddSetScreen from '../screens/AddSetScreen'
import SetInfoScreen from '../screens/SetInfoScreen'
const Stack = createStackNavigator()

function AddSetStack (props) {
  return (
    <Stack.Navigator
      initialRouteName='AddSet'
      screenOptions={{
        headerStyle: {
          height: 90 * scaleMultiplier
        ***REMOVED***,
        headerTitleAlign: 'center',
        gestureDirection: props.isRTL ? 'horizontal-inverted' : 'horizontal'
      ***REMOVED******REMOVED***
      mode='card'
    >
      <Stack.Screen
        name='AddSet'
        component={AddSetScreen***REMOVED***
        options={{
          title: ''
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='SetInfo'
        component={SetInfoScreen***REMOVED***
        options={{
          title: ''
        ***REMOVED******REMOVED***
      />
    </Stack.Navigator>
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
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(AddSetStack)
