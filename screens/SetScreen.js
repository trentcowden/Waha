import React, { useEffect ***REMOVED*** from 'react';
import { View, FlatList, StyleSheet, Image ***REMOVED*** from 'react-native';
import * as FileSystem from 'expo-file-system';
import SetItem from '../components/SetItem';
import AvatarImage from '../components/AvatarImage'
import { connect ***REMOVED*** from 'react-redux'
import { headerImages ***REMOVED*** from '../constants'

function SetScreen(props) {
   useEffect(() => {
      props.navigation.setOptions(getNavOptions())
   ***REMOVED***, [props.isRTL])

   function getNavOptions() {
      return {
         headerTitle: () => <Image style={styles.headerImage***REMOVED*** source={headerImages[props.activeGroupLanguage]***REMOVED*** />,
         headerLeft: props.isRTL ?
            () => <View></View> :
            () =>
               <AvatarImage
                  source={props.activeGroupImageSource***REMOVED***
                  size={40***REMOVED***
                  onPress={() => props.navigation.toggleDrawer()***REMOVED***
                  isActive={true***REMOVED***
               />,
         headerRight: props.isRTL ?
            () =>
               <AvatarImage
                  source={props.activeGroupImageSource***REMOVED***
                  size={40***REMOVED***
                  onPress={() => props.navigation.toggleDrawer()***REMOVED***
                  isActive={true***REMOVED***
               /> :
            () => <View></View>
      ***REMOVED***
   ***REMOVED***


   ////////////////////////////////
   ////RENDER/STYLES/NAVOPTIONS////
   ////////////////////////////////


   //function to render the studyset items
   //includes onSelect which navigates to the appropriate lesson list screen
   function renderStudySetItem(setList) {
      return (
         <SetItem
            id={setList.item.id***REMOVED***
            title={setList.item.title***REMOVED***
            subtitle={setList.item.subtitle***REMOVED***
            color={setList.item.color***REMOVED***
            onSetSelect={
               () => props.navigation.navigate('LessonList', {
                  setID: setList.item.id,
                  title: setList.item.title,
                  subtitle: setList.item.subtitle,
                  color: setList.item.color,
                  isRTL: props.isRTL
               ***REMOVED***)
            ***REMOVED***
            isSmall={false***REMOVED***
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

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "#EAEEF0"
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
      activeDatabase: state.database[activeGroup.language],
      isRTL: state.database[activeGroup.language].isRTL,
      activeGroupImageSource: activeGroup.imageSource,
      activeGroupLanguage: activeGroup.language
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(SetScreen);