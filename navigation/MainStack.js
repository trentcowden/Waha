import React, { useEffect ***REMOVED*** from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  AppState
***REMOVED*** from 'react-native'
import { scaleMultiplier ***REMOVED*** from '../constants'
import * as FileSystem from 'expo-file-system'
import i18n from 'i18n-js'
import en from '../translations/en.json'
import fr from '../translations/fr.json'
import ar from '../translations/ar.json'
import LessonListScreen from '../screens/LessonListScreen'
import PlayScreen from '../screens/PlayScreen'
import GroupsScreen from '../screens/GroupsScreen'
import AddEditGroupScreen from '../screens/AddEditGroupScreen'
import LanguageSelectScreen from '../screens/LanguageSelectScreen'
import StorageScreen from '../screens/StorageScreen'
import MTScreen from '../screens/MTScreen'
import PasscodeScreen from '../screens/PasscodeScreen'
import SecurityScreen from '../screens/SecurityScreen'
import GameScreen from '../screens/GameScreen'
import SetTabNavigator from './SetTabs'
import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import { connect ***REMOVED*** from 'react-redux'
import SetsRoot from './SetsRoot'
import BackButton from '../components/BackButton'

i18n.translations = {
  en,
  fr,
  ar
***REMOVED***
const Stack = createStackNavigator()

function MainStack (props) {
  function handleAppStateChange (change) {
    if (change === 'inactive' || change === 'background') {
      if (props.securityEnabled) props.navigation.navigate('Game')
    ***REMOVED***
  ***REMOVED***

  useEffect(() => {
    const appStateUnsubscribe = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    return function cleanup () {
      AppState.removeEventListener('change', handleAppStateChange)
    ***REMOVED***
  ***REMOVED***, [props.securityEnabled])

  return (
    //global navigation options
    <Stack.Navigator
      initialRouteName={props.securityEnabled ? 'Game' : 'SetsRoot'***REMOVED***
      screenOptions={{
        gestureDirection: props.isRTL ? 'horizontal-inverted' : 'horizontal',
        gestureResponseDistance: {
          horizontal: 50 * scaleMultiplier,
          vertical: 135
        ***REMOVED***,
        headerTitleAlign: 'center'
      ***REMOVED******REMOVED***
      mode='card'
    >
      {/* Study Set Screen */***REMOVED***
      <Stack.Screen
        name='SetsRoot'
        component={SetsRoot***REMOVED***
        options={{ headerShown: false ***REMOVED******REMOVED***
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
        name='AddGroup'
        component={AddEditGroupScreen***REMOVED***
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
        name='AddLanguage'
        component={LanguageSelectScreen***REMOVED***
        options={{
          headerStyle: {
            backgroundColor: '#F7F7F7'
          ***REMOVED***,
          headerTitleStyle: {
            color: '#000000',
            fontFamily: props.font + '-medium'
          ***REMOVED***,
          headerRight: props.isRTL
            ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
            : () => <View></View>,
          headerLeft: props.isRTL
            ? () => <View></View>
            : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='EditGroup'
        component={AddEditGroupScreen***REMOVED***
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
      <Stack.Screen
        name='MT'
        component={MTScreen***REMOVED***
        options={{
          headerTitle: props.translations.navigation.headers.mtScreen,
          headerStyle: {
            backgroundColor: '#F7F9FA'
          ***REMOVED***,
          headerTitleStyle: {
            color: '#000000',
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Passcode'
        component={PasscodeScreen***REMOVED***
        options={{
          headerTitle: props.translations.navigation.headers.mtScreen,
          headerStyle: {
            backgroundColor: '#F7F9FA'
          ***REMOVED***,
          headerTitleStyle: {
            color: '#000000',
            fontFamily: props.font + '-medium'
          ***REMOVED***
        ***REMOVED******REMOVED***
      />
      <Stack.Screen
        name='Security'
        component={SecurityScreen***REMOVED***
        options={{
          headerTitle: props.translations.navigation.headers.SecurityScreen,
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
        name='Game'
        component={GameScreen***REMOVED***
        options={{ headerShown: false ***REMOVED******REMOVED***
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
    activeGroup: activeGroup,
    securityEnabled: state.securityEnabled
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(MainStack)
