import React from 'react';
import { StyleSheet, Image ***REMOVED*** from 'react-native';
import { scaleMultiplier ***REMOVED*** from '../constants'
import WahaDrawer from '../components/WahaDrawer'

import StackNavigator from '../navigation/StackNavigator'
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



const styles = StyleSheet.create({
   headerImage: {
      resizeMode: "center",
      width: 120,
      height: 40,
      alignSelf: "center",
   ***REMOVED***
***REMOVED***)

function MainNavigator(props) {
   return (
      <NavigationContainer>
         <Drawer.Navigator drawerContent={props => <WahaDrawer {...props***REMOVED*** />***REMOVED***>
            <Drawer.Screen options={({ route ***REMOVED***) => ({ gestureEnabled: getGestureEnabled(route)***REMOVED***)***REMOVED*** name="StackNavigator" component={StackNavigator***REMOVED*** />
         </Drawer.Navigator>
      </NavigationContainer>
   )
***REMOVED***
function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      //isRTL: state.database[activeGroup.language].isRTL,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
