import React, { useEffect ***REMOVED*** from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  AsyncStorage,
  Text
***REMOVED*** from 'react-native'
import * as FileSystem from 'expo-file-system'
import SetItem from '../components/SetItem'
import AvatarImage from '../components/AvatarImage'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { resumeDownload ***REMOVED*** from '../redux/actions/downloadActions'

function SetScreen (props) {
  //// STUFF FOR TESTING

  // FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(contents => {
  //   console.log(contents)
  // ***REMOVED***)
  // console.log(scaleMultiplier)

  //// CONSTRUCTOR

  useEffect(() => {
    console.log(props.route.name)
  ***REMOVED***, [])

  //// NAV OPTIONS

  //// RENDER

  function renderStudySetItem (setList) {
    return (
      <SetItem
        thisSet={setList.item***REMOVED***
        isSmall={false***REMOVED***
        onSetSelect={() =>
          props.navigation.navigate('LessonList', {
            thisSet: setList.item
          ***REMOVED***)
        ***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <FlatList
        data={props.activeDatabase.sets.filter(
          set => set.category === props.route.name
        )***REMOVED***
        renderItem={renderStudySetItem***REMOVED***
        ListEmptyComponent={<Text>NO SETS HERE BUDDY</Text>***REMOVED***
      />
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EAEEF0'
  ***REMOVED***,
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
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***
function mapDispatchToProps (dispatch) {
  return {
    resumeDownload: (lessonID, downloadSnapshotJSON) => {
      dispatch(resumeDownload(lessonID, downloadSnapshotJSON))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(SetScreen)
