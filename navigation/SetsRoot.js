import React from 'react'
import { View, Image, StyleSheet, Dimensions ***REMOVED*** from 'react-native'
import SetTabs from './SetTabs'
import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import AddSetStack from './AddSetStack'
import AvatarImage from '../components/AvatarImage'
import * as FileSystem from 'expo-file-system'

const Stack = createStackNavigator()

function SetsRoot (props) {
  return (
    //global navigation options
    <Stack.Navigator
      initialRouteName='SetTabs'
      screenOptions={{
        headerStyle: {
          height: Dimensions.get('screen').height / 9
        ***REMOVED***,
        headerTitleAlign: 'center',
        headerMode: 'float'
      ***REMOVED******REMOVED***
      mode='modal'
    >
      {/* Study Set Screen */***REMOVED***
      <Stack.Screen
        name='SetTabs'
        component={SetTabs***REMOVED***
        options={{
          headerTitle: () => (
            <Image
              style={styles.headerImage***REMOVED***
              source={{
                uri:
                  FileSystem.documentDirectory +
                  props.activeGroup.language +
                  '-header.png'
              ***REMOVED******REMOVED***
            />
          ),
          headerLeft: props.isRTL
            ? () => <View></View>
            : () => (
                <View style={{ paddingHorizontal: 10 ***REMOVED******REMOVED***>
                  <AvatarImage
                    source={props.activeGroup.imageSource***REMOVED***
                    size={40***REMOVED***
                    onPress={() => props.navigation.toggleDrawer()***REMOVED***
                    isActive={true***REMOVED***
                  />
                </View>
              ),
          headerRight: props.isRTL
            ? () => (
                <View style={{ paddingHorizontal: 10 ***REMOVED******REMOVED***>
                  <AvatarImage
                    source={props.activeGroup.imageSource***REMOVED***
                    size={40***REMOVED***
                    onPress={() => props.navigation.toggleDrawer()***REMOVED***
                    isActive={true***REMOVED***
                  />
                </View>
              )
            : () => <View></View>
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='AddSetStack'
        component={AddSetStack***REMOVED***
        options={{
          headerShown: false
        ***REMOVED******REMOVED***
      />
    </Stack.Navigator>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  headerImage: {
    resizeMode: 'contain',
    width: 120,
    height: 40,
    alignSelf: 'center'
  ***REMOVED***
***REMOVED***)

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

export default connect(mapStateToProps)(SetsRoot)
