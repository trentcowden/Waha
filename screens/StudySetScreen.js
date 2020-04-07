//basic imports
import React, { useEffect ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet ***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';

//other component imports
import StudySetItem from '../components/StudySetItem';
import AvatarImage from '../components/AvatarImage'

//redux
import { connect ***REMOVED*** from 'react-redux'
import HeaderButtons from '../components/HeaderButtons';

function StudySetScreen(props) {
   useEffect(() => {
      props.navigation.setOptions(getNavOptions())
   ***REMOVED***, [props])

   function getNavOptions() {
      return {
         headerLeft: () =>
            <AvatarImage
               source={props.activeGroupImageSource***REMOVED***
               size={40***REMOVED***
               onPress={() => props.navigation.toggleDrawer()***REMOVED***
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
            data={props.studySets***REMOVED***
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
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      database: state.database[activeGroup.language],
      colors: state.database[activeGroup.language].colors,
      isRTL: state.database[activeGroup.language].isRTL,
      studySets: state.database[activeGroup.language].studySets,
      activeGroupImageSource: activeGroup.imageSource
   ***REMOVED***
***REMOVED***;

function mapDispatchToProps(dispatch) {
   return {
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps, mapDispatchToProps)(StudySetScreen);