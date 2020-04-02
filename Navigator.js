import React from 'react';
import { StyleSheet, Image ***REMOVED*** from 'react-native';
import HeaderButtons from './components/HeaderButtons'
import { scaleMultiplier ***REMOVED*** from './constants'
import WahaDrawer from './components/WahaDrawer'

import LessonListScreen from './screens/LessonListScreen';
import PlayScreen from './screens/PlayScreen'
import LanguageSelectScreen from './screens/LanguageSelectScreen';
import OnboardingSlidesScreen from './screens/OnboardingSlidesScreen';
import SettingsScreen from './screens/SettingsScreen'
import StudySetScreen from './screens/StudySetScreen';
import GroupsScreen from './screens/GroupsScreen';
import AddNewGroupScreen from './screens/AddNewGroupScreen';

import { NavigationContainer ***REMOVED*** from '@react-navigation/native';
import { createStackNavigator ***REMOVED*** from '@react-navigation/stack';
import { createDrawerNavigator ***REMOVED*** from '@react-navigation/drawer';
import { connect ***REMOVED*** from 'react-redux'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



//allows only accessing hamburger swipe from study set screen
function getGestureEnabled(route) {
   // Access the tab navigator's state using `route.state`
   const routeName = route.state
      ? // Get the currently active route name in the tab navigator
      route.state.routes[route.state.index].name
      : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Feed" as that's the first screen inside the navigator
      route.params?.screen || 'StudySet';
   if (routeName === 'StudySet')
      return true
   else
      return false
***REMOVED***

//Drawer navigator contains stack navigator as only screen
function DrawerNavigator(props) {
   
   //main navigator through all app screens
   function StackNavigator() {
      return (
         //global navigation options
         <Stack.Navigator initialRouteName="Groups" screenOptions={{
            headerStyle: {
               height: 90 * scaleMultiplier,
            ***REMOVED***,
            gestureDirection: props.isRTL ? 'horizontal-inverted' : 'horizontal',
         ***REMOVED******REMOVED***>

            {/* Study Set Screen */***REMOVED***
            <Stack.Screen
               name="StudySet"
               component={StudySetScreen***REMOVED***
               options={{
                  headerTitle: <Image style={styles.headerImage***REMOVED*** source={require('./assets/headerLogo.png')***REMOVED*** />,
                  headerStyle: {
                     backgroundColor: "#EAEEF0",
                  ***REMOVED***,
                  headerTitleAlign: "center",
                  gestureEnabled: 'true'
               ***REMOVED******REMOVED***
            />

            {/* Lesson List Screen */***REMOVED***
            <Stack.Screen
               name="LessonList"
               component={LessonListScreen***REMOVED***
               options={{
                  gestureDirection: props.isRTL ? 'horizontal-inverted' : 'horizontal',
                  headerTitle: () => <Image style={styles.headerImage***REMOVED*** source={require('./assets/headerLogo.png')***REMOVED*** />,
                  headerStyle: {
                     backgroundColor: "#F7F9FA",
                  ***REMOVED***,
                  headerTitleAlign: "center",
               ***REMOVED******REMOVED***
            />

            {/* Play Screen */***REMOVED***
            <Stack.Screen
               name="Play"
               component={PlayScreen***REMOVED***
               options={{
                  headerStyle: {
                     backgroundColor: "#FFFFFF",
                  ***REMOVED***,
                  headerTitleStyle: {
                     color: "#82868D",
                     fontFamily: 'bold'
                  ***REMOVED***,
                  gestureEnabled: false
               ***REMOVED******REMOVED***
            />

            {/* Language Select Screen (Onboarding) */***REMOVED***
            <Stack.Screen
               name="LanguageSelect"
               component={LanguageSelectScreen***REMOVED***
            />

            {/* Onboarding Slides Screen */***REMOVED***
            <Stack.Screen
               name="OnboardingSlides"
               component={OnboardingSlidesScreen***REMOVED***
            />
            <Stack.Screen
               name="Settings"
               component={SettingsScreen***REMOVED***
               options={{
                  headerTitle: "Settings",
                  headerStyle: {
                     backgroundColor: "#F7F7F7",
                  ***REMOVED***,
                  headerTitleStyle: {
                     color: props.colors.primaryColor,
                     fontFamily: 'bold'
                  ***REMOVED***,
               ***REMOVED******REMOVED***
            />
            <Stack.Screen
               name="Groups"
               component={GroupsScreen***REMOVED***
               options={{
                  headerTitle: "Groups & Languages",
                  headerStyle: {
                     backgroundColor: "#F7F7F7",
                  ***REMOVED***,
                  headerTitleStyle: {
                     color: "#000000",
                     fontFamily: 'bold'
                  ***REMOVED***,
               ***REMOVED******REMOVED***
            />
            <Stack.Screen
               name="AddNewGroup"
               component={AddNewGroupScreen***REMOVED***
               options={{
                  headerTitle: "Add New Group",
                  headerStyle: {
                     backgroundColor: "#F7F7F7",
                  ***REMOVED***,
                  headerTitleStyle: {
                     color: "#000000",
                     fontFamily: 'bold'
                  ***REMOVED***,
               ***REMOVED******REMOVED***
            />
         </Stack.Navigator>
      )
   ***REMOVED***
   return (
      <NavigationContainer>
         <Drawer.Navigator drawerContent={props => <WahaDrawer {...props***REMOVED***/>***REMOVED***>
            <Drawer.Screen options={({ route ***REMOVED***) => ({ gestureEnabled: getGestureEnabled(route) ***REMOVED***)***REMOVED*** name="StackNavigator" component={StackNavigator***REMOVED*** />
         </Drawer.Navigator>
      </NavigationContainer>
   )
***REMOVED***


const styles = StyleSheet.create({
   headerImage: {
      resizeMode: "center",
      width: 120,
      height: 40,
      alignSelf: "center",
   ***REMOVED***
***REMOVED***)

/////////////
////REDUX////
/////////////

function mapStateToProps(state) {
   if (!state.database.isFetching)
      return {
         database: state.database,
         colors: state.database[state.database.currentLanguage].colors,
         appProgress: state.appProgress,
         isRTL: state.database[state.database.currentLanguage].isRTL,
      ***REMOVED***
   else {
      return {
         isFetching: state.database.isFetching,
         isFirstOpen: state.database.isFirstOpen
      ***REMOVED***
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);