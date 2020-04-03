//basic imports
import React, { useEffect ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, Image ***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';
import i18n from 'i18n-js';
import { scaleMultiplier ***REMOVED*** from '../constants'

//other component imports
import StudySetItem from '../components/StudySetItem';

//redux
import { connect ***REMOVED*** from 'react-redux'
import { addLanguage, changeLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import { setFirstOpen ***REMOVED*** from '../redux/actions/databaseActions'
import HeaderButtons from '../components/HeaderButtons';
import { fromRight, fromLeft ***REMOVED*** from 'react-navigation-transitions';

function StudySetScreen(props) {
   useEffect(() => {
      props.navigation.setOptions(getNavOptions())
   ***REMOVED***, [])

   function getNavOptions() {
      return {
         headerRight: props.isRTL ?
            () =>
               <HeaderButtons
                  name='ios-people'
                  onPress1={() => props.navigation.toggleDrawer()***REMOVED***
                  hasCompleteButton={false***REMOVED***
               /> : null,
         headerLeft: props.isRTL ? null : () =>
            <HeaderButtons
               name='ios-people'
               onPress1={() => props.navigation.toggleDrawer()***REMOVED***
               hasCompleteButton={false***REMOVED***
            />,
      ***REMOVED***
   ***REMOVED***

   FileSystem.getFreeDiskStorageAsync().then(freeDiskStorage => {
      //console.log(freeDiskStorage)
   ***REMOVED***);

   FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(contents => {
      //console.log(contents)
   ***REMOVED***);

   //function to navigate to the lesson list screen
   //props.navigation.navigate takes us to lessonlist screen
   //params is the information we want to pass to lessonlist screen
   function navigateToLessonList(item) {
      props.navigation.navigate('LessonList', {
         title: item.title,
         studySetID: item.id,
         subtitle: item.subtitle,
         iconName: item.iconName,
         isRTL: props.isRTL
      ***REMOVED***
      )
   ***REMOVED***


   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////


   //function to render the studyset items
   //includes onSelect which navigates to the appropriate lesson list screen
   function renderStudySetItem(studySetList) {
      return (
         <StudySetItem
            title={studySetList.item.title***REMOVED***
            subtitle={studySetList.item.subtitle***REMOVED***
            onStudySetSelect={() => navigateToLessonList(studySetList.item)***REMOVED***
            id={studySetList.item.id***REMOVED***
            iconName={studySetList.item.iconName***REMOVED***
         />
      )
   ***REMOVED***

   return (
      <View style={styles.screen***REMOVED***>
         <FlatList
            data={props.database[props.database.currentLanguage].studySets***REMOVED***
            renderItem={renderStudySetItem***REMOVED***
         />
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#EAEEF0"
   ***REMOVED***,
   text: {
      textAlign: "center",
      margin: 40
   ***REMOVED***,
   headerButtonsContainer: {
      flexDirection: "row",
      width: 80
   ***REMOVED***,
   headerButton: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1
   ***REMOVED***,
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
   return {
      database: state.database,
      colors: state.database[state.database.currentLanguage].colors,
      isRTL: state.database[state.database.currentLanguage].isRTL,
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps, mapDispatchToProps)(StudySetScreen);