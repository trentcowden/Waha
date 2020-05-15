import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity ***REMOVED*** from 'react-native'
import { scaleMultiplier ***REMOVED*** from '../constants'
import * as FileSystem from 'expo-file-system'

import LessonListScreen from '../screens/LessonListScreen'
import PlayScreen from '../screens/PlayScreen'
import GroupsScreen from '../screens/GroupsScreen'
import AddNewGroupScreen from '../screens/AddNewGroupScreen'
import AddNewLanguageScreen from '../screens/AddNewLanguageScreen'
import EditGroupScreen from '../screens/EditGroupScreen'
import StorageScreen from '../screens/StorageScreen'
import SetTabNavigator from './SetTabNavigator'
import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import { connect ***REMOVED*** from 'react-redux'
import AvatarImage from '../components/AvatarImage'

const Stack = createStackNavigator()

function StackNavigator (props) {
  return (
    //global navigation options
    <Stack.Navigator
      initialRouteName='StudySet'
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
      mode='modal'
    >
      {/* Study Set Screen */***REMOVED***
      <Stack.Screen
        name='Sets'
        component={SetTabNavigator***REMOVED***
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
                <AvatarImage
                  source={props.activeGroup.imageSource***REMOVED***
                  size={40***REMOVED***
                  onPress={() => props.navigation.toggleDrawer()***REMOVED***
                  isActive={true***REMOVED***
                />
              ),
          headerRight: props.isRTL
            ? () => (
                <AvatarImage
                  source={props.activeGroup.imageSource***REMOVED***
                  size={40***REMOVED***
                  onPress={() => props.navigation.toggleDrawer()***REMOVED***
                  isActive={true***REMOVED***
                />
              )
            : () => <View></View>
        ***REMOVED******REMOVED***
      />

      {/* Lesson List Screen */***REMOVED***
      <Stack.Screen
        name='LessonList'
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
      <Stack.Screen
        name='Play'
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
      <Stack.Screen
        name='Groups'
        component={GroupsScreen***REMOVED***
        options={{
          headerTitle: props.translations.navigation.headers.groupScreen,
          headerStyle: {
            backgroundColor: '#EFF2F4'
          ***REMOVED***,
          headerTitleStyle: {
            color: '#000000',
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='AddNewGroup'
        component={AddNewGroupScreen***REMOVED***
        options={{
          headerTitle: props.translations.navigation.headers.addNewGroupScreen,
          headerStyle: {
            backgroundColor: '#FFFFFF'
          ***REMOVED***,
          headerTitleStyle: {
            color: '#000000',
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='AddNewLanguage'
        component={AddNewLanguageScreen***REMOVED***
        options={{
          headerTitle:
            props.translations.navigation.headers.addNewLanguageScreen,
          headerStyle: {
            backgroundColor: '#F7F7F7'
          ***REMOVED***,
          headerTitleStyle: {
            color: '#000000',
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='EditGroup'
        component={EditGroupScreen***REMOVED***
        options={{
          headerTitle: props.translations.navigation.headers.editGroupScreen,
          headerStyle: {
            backgroundColor: '#F7F7F7'
          ***REMOVED***,
          headerTitleStyle: {
            color: '#000000',
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Storage'
        component={StorageScreen***REMOVED***
        options={{
          headerTitle: props.translations.navigation.headers.storageScreen,
          headerStyle: {
            backgroundColor: '#FFFFFF'
          ***REMOVED***,
          headerTitleStyle: {
            color: '#000000',
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
    </Stack.Navigator>
  )
***REMOVED***

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

export default connect(mapStateToProps)(StackNavigator)
