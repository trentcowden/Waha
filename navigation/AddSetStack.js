import React from 'react'
import { View, TouchableOpacity ***REMOVED*** from 'react-native'
import { scaleMultiplier ***REMOVED*** from '../constants'

import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import { connect ***REMOVED*** from 'react-redux'
import AddSetScreen from '../screens/AddSetScreen'

const Stack = createStackNavigator()

function AddSetStack (props) {
  return (
    <Stack.Navigator
      initialRouteName='AddSet'
      screenOptions={{
        headerStyle: {
          height: 90 * scaleMultiplier
        ***REMOVED***,
        headerTitleAlign: 'center'
      ***REMOVED******REMOVED***
      mode='card'
    >
      <Stack.Screen
        name='AddSet'
        component={AddSetScreen***REMOVED***
        options={{
          title: '',
          headerLeft: props.isRTL
            ? () => <View></View>
            : () => (
                <TouchableOpacity onPress={() => props.navigation.goBack()***REMOVED***>
                  <Icon name='cancel' size={50***REMOVED*** color='#3A3C3F' />
                </TouchableOpacity>
              ),
          headerRight: props.isRTL
            ? () => (
                <TouchableOpacity onPress={() => props.navigation.goBack()***REMOVED***>
                  <Icon name='cancel' size={50***REMOVED*** color='#3A3C3F' />
                </TouchableOpacity>
              )
            : () => <View></View>
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='AddSetFolder'
        component={AddSetScreen***REMOVED***
        options={{
          title: '',
          headerLeft: props.isRTL
            ? () => <View></View>
            : () => (
                <TouchableOpacity onPress={() => props.navigation.goBack()***REMOVED***>
                  <Icon name='arrow-left' size={50***REMOVED*** color='#3A3C3F' />
                </TouchableOpacity>
              ),
          headerRight: props.isRTL
            ? () => (
                <TouchableOpacity onPress={() => props.navigation.pop()***REMOVED***>
                  <Icon name='arrow-right' size={50***REMOVED*** color='#3A3C3F' />
                </TouchableOpacity>
              )
            : () => <View></View>
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
