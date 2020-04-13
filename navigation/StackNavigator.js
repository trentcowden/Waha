import React from 'react';
import { scaleMultiplier ***REMOVED*** from '../constants'

import LessonListScreen from '../screens/LessonListScreen';
import PlayScreen from '../screens/PlayScreen'
import StudySetScreen from '../screens/StudySetScreen';
import GroupsScreen from '../screens/GroupsScreen';
import AddNewGroupScreen from '../screens/AddNewGroupScreen';
import AddNewLanguageScreen from '../screens/AddNewLanguageScreen';
import EditGroupScreen from '../screens/EditGroupScreen'
import StorageScreen from '../screens/StorageScreen'
import { createStackNavigator ***REMOVED*** from '@react-navigation/stack';
import { connect ***REMOVED*** from 'react-redux'

const Stack = createStackNavigator();

function StackNavigator(props) {
  
      return (
         //global navigation options
         <Stack.Navigator
            initialRouteName='StudySet'
            screenOptions={{
               headerStyle: {
                  height: 90 * scaleMultiplier,
               ***REMOVED***,
               gestureDirection: props.isRTL ? 'horizontal-inverted' : 'horizontal',
               gestureResponseDistance: {horizontal: 300 * scaleMultiplier, vertical: 135***REMOVED***
            ***REMOVED******REMOVED***>

            {/* Study Set Screen */***REMOVED***
            <Stack.Screen
               name="StudySet"
               component={StudySetScreen***REMOVED***
               options={{
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
                  //gestureDirection: props.isRTL ? 'horizontal-inverted' : 'horizontal',
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
                     fontFamily: 'medium'
                  ***REMOVED***,
               ***REMOVED******REMOVED***
            />
            <Stack.Screen
               name="Groups"
               component={GroupsScreen***REMOVED***
               options={{
                  headerTitle: "Groups & Languages",
                  headerStyle: {
                     backgroundColor: "#EFF2F4",
                  ***REMOVED***,
                  headerTitleStyle: {
                     color: "#000000",
                     fontFamily: 'medium'
                  ***REMOVED***,
               ***REMOVED******REMOVED***
            />
            <Stack.Screen
               name="AddNewGroup"
               component={AddNewGroupScreen***REMOVED***
               options={{
                  headerTitle: "Add New Group",
                  headerStyle: {
                     backgroundColor: "#FFFFFF",
                  ***REMOVED***,
                  headerTitleStyle: {
                     color: "#000000",
                     fontFamily: 'medium'
                  ***REMOVED***,
               ***REMOVED******REMOVED***
            />
            <Stack.Screen
               name="AddNewLanguage"
               component={AddNewLanguageScreen***REMOVED***
               options={{
                  headerTitle: "Add New Language",
                  headerStyle: {
                     backgroundColor: "#F7F7F7",
                  ***REMOVED***,
                  headerTitleStyle: {
                     color: "#000000",
                     fontFamily: 'medium'
                  ***REMOVED***,
               ***REMOVED******REMOVED***
            />
            <Stack.Screen
               name="EditGroup"
               component={EditGroupScreen***REMOVED***
               options={{
                  headerTitle: "Edit Group",
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
               name="Storage"
               component={StorageScreen***REMOVED***
               options={{
                  headerTitle: "Storage",
                  headerStyle: {
                     backgroundColor: "#FFFFFF",
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

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      isRTL: state.database[activeGroup.language].isRTL,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps, mapDispatchToProps)(StackNavigator);