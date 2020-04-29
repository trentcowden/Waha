import React, { useEffect ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, Image ***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';
import SetItem from '../components/SetItem';
import AvatarImage from '../components/AvatarImage'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants';

function SetScreen(props) {

   //// STUFF FOR TESTING
   
   // FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(contents => { console.log(contents) ***REMOVED***)
   // console.log(scaleMultiplier)

   //// CONSTRUCTOR

   useEffect(() => {
      props.navigation.setOptions(getNavOptions())
   ***REMOVED***, [props.isRTL])

   //// NAV OPTIONS

   function getNavOptions() {
      return {
         headerTitle: () => <Image style={styles.headerImage***REMOVED*** source={{ uri: FileSystem.documentDirectory + props.activeGroup.language + 'header.png' ***REMOVED******REMOVED*** />,
         headerLeft: props.isRTL ?
            () => <View></View> :
            () =>
               <AvatarImage
                  source={props.activeGroup.imageSource***REMOVED***
                  size={40***REMOVED***
                  onPress={() => props.navigation.toggleDrawer()***REMOVED***
                  isActive={true***REMOVED***
               />,
         headerRight: props.isRTL ?
            () =>
               <AvatarImage
                  source={props.activeGroup.imageSource***REMOVED***
                  size={40***REMOVED***
                  onPress={() => props.navigation.toggleDrawer()***REMOVED***
                  isActive={true***REMOVED***
               /> :
            () => <View></View>
      ***REMOVED***
   ***REMOVED***

   //// RENDER

   function renderStudySetItem(setList) {
      return (
         <SetItem
            thisSet={setList.item***REMOVED***
            isSmall={false***REMOVED***
            onSetSelect={
               () => props.navigation.navigate('LessonList', {
                  thisSet: setList.item,
               ***REMOVED***)
            ***REMOVED***
         />
      )
   ***REMOVED***

   return (
      <View style={styles.screen***REMOVED***>
         <FlatList
            data={props.activeDatabase.sets***REMOVED***
            renderItem={renderStudySetItem***REMOVED***
         />
      </View>
   )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#EAEEF0"
   ***REMOVED***,
   headerImage: {
      resizeMode: "contain",
      width: 120,
      height: 40,
      alignSelf: "center",
   ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0]
   return {
      activeDatabase: state.database[activeGroup.language],
      isRTL: state.database[activeGroup.language].isRTL,
      activeGroup: activeGroup,
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(SetScreen);