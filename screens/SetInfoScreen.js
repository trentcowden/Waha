import React, { useState, useEffect ***REMOVED*** from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  Button,
  Text,
  Share,
  Platform,
  Dimensions,
  SafeAreaView
***REMOVED*** from 'react-native'
import LessonItem from '../components/LessonItem'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import SetItem from '../components/SetItem'
import OptionsModal from '../components/OptionsModal'
import ModalButton from '../components/ModalButton'
import NetInfo from '@react-native-community/netinfo'
import { scaleMultiplier ***REMOVED*** from '../constants'
import BackButton from '../components/BackButton'
import {
  downloadLesson,
  removeDownload,
  downloadVideo
***REMOVED*** from '../redux/actions/downloadActions'
import { addSet ***REMOVED*** from '../redux/actions/groupsActions'
import { toggleComplete ***REMOVED*** from '../redux/actions/groupsActions'
import { connect ***REMOVED*** from 'react-redux'
import { SwipeListView ***REMOVED*** from 'react-native-swipe-list-view'
import LessonSwipeBackdrop from '../components/LessonSwipeBackdrop'
import { TouchableOpacity ***REMOVED*** from 'react-native-gesture-handler'
import SnackBar from 'react-native-snackbar-component'

function SetInfoScreen (props) {
  //// STATE

  //// NAV OPTIONS

  function getNavOptions () {
    return {
      title:
        props.route.params.category === 'core'
          ? props.translations.labels.addNewCoreStorySet
          : props.translations.labels.addNewTopicalSet,
      headerRight: props.isRTL
        ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: props.isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  //// CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  // whenever progress or bookmarks update, update the progress and bookmarks for this set
  useEffect(() => {***REMOVED***, [])

  //// FUNCTIONS

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.studySetItemContainer***REMOVED***>
        <SetItem thisSet={props.route.params.thisSet***REMOVED*** mode='setinfo' />
      </View>
      <TouchableOpacity
        onPress={() => {
          props.addSet(props.activeGroup.name, props.route.params.thisSet.id)
          props.route.params.showSnackbar()
          props.navigation.goBack()
        ***REMOVED******REMOVED***
        style={[
          styles.addSetButton,
          { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
        ]***REMOVED***
      >
        <Text
          style={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontSize: 18 * scaleMultiplier,
            fontFamily: props.font + '-medium',
            marginHorizontal: 10
          ***REMOVED******REMOVED***
        >
          {props.translations.labels.addNewStorySet***REMOVED***
        </Text>
        <Icon
          style={{ marginHorizontal: 10 ***REMOVED******REMOVED***
          color='#FFFFFF'
          size={36 * scaleMultiplier***REMOVED***
          name='playlist-add'
        />
      </TouchableOpacity>
      <FlatList
        data={props.activeDatabase.lessons.filter(
          lesson => props.route.params.thisSet.id === lesson.setid
        )***REMOVED***
        renderItem={({ item ***REMOVED***) => {
          var scriptureList = item.scripture[0].header
          item.scripture.forEach((chunk, index) => {
            if (index !== 0) scriptureList += ', ' + chunk.header
          ***REMOVED***)

          return (
            <View
              style={{
                height: 64 * scaleMultiplier,
                justifyContent: 'center',
                paddingHorizontal: 40
              ***REMOVED******REMOVED***
            >
              <Text
                style={{
                  color: '#1D1E20',
                  textAlign: props.isRTL ? 'right' : 'left',
                  fontSize: 16 * scaleMultiplier,
                  fontFamily: props.font + '-medium'
                ***REMOVED******REMOVED***
              >
                {item.title***REMOVED***
              </Text>
              <Text
                style={{
                  color: '#9FA5AD',
                  textAlign: props.isRTL ? 'right' : 'left',
                  fontSize: 14 * scaleMultiplier,
                  fontFamily: props.font + '-regular'
                ***REMOVED******REMOVED***
              >
                {scriptureList***REMOVED***
              </Text>
            </View>
          )
        ***REMOVED******REMOVED***
      />
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  ***REMOVED***,
  studySetItemContainer: {
    width: '100%',
    height: 100 * scaleMultiplier
  ***REMOVED***,
  addSetButton: {
    height: 68 * scaleMultiplier,
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#60C239'
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    downloads: state.downloads,
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addSet: (groupName, setID) => {
      dispatch(addSet(groupName, setID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(SetInfoScreen)
