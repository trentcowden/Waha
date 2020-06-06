//imports
import React, { useState, useEffect ***REMOVED*** from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AsyncStorage
***REMOVED*** from 'react-native'
import * as FileSystem from 'expo-file-system'
import { connect ***REMOVED*** from 'react-redux'
import { setBookmark ***REMOVED*** from '../redux/actions/groupsActions'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  removeDownload,
  resumeDownload
***REMOVED*** from '../redux/actions/downloadActions'
import DownloadStatusIndicator from '../components/DownloadStatusIndicator'

function LessonItem (props) {
  useEffect(() => {
    if (props.downloads[props.thisLesson.id] == 1) {
      props.removeDownload(props.thisLesson.id)
    ***REMOVED***
  ***REMOVED***, [props.downloads])

  //// FUNCTIONS

  // calls the various modal functions on lessonlistscreen
  function showSaveModal () {
    props.setActiveLessonInModal.call()
    props.setShowSaveLessonModal.call()
  ***REMOVED***
  function showDeleteModal () {
    props.setActiveLessonInModal.call()
    props.setShowDeleteLessonModal.call()
  ***REMOVED***
  function showLessonOptionsModal () {
    props.setActiveLessonInModal.call()
    props.setShowLessonOptionsModal.call()
  ***REMOVED***

  //// RENDER

  return (
    <View
      style={[
        styles.lessonItem,
        {
          flexDirection: props.isRTL ? 'row-reverse' : 'row'
        ***REMOVED***
      ]***REMOVED***
    >
      <TouchableOpacity
        style={[
          styles.progressAndTitle,
          { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
        ]***REMOVED***
        onPress={
          !props.isConnected && !props.isDownloaded
            ? () =>
                Alert.alert(
                  props.translations.alerts.playUndownloadedNoInternet.header,
                  props.translations.alerts.playUndownloadedNoInternet.text,
                  [
                    {
                      text: props.translations.alerts.options.ok,
                      onPress: () => {***REMOVED***
                    ***REMOVED***
                  ]
                )
            : props.onLessonSelect
        ***REMOVED***
      >
        <View style={styles.completeStatusContainer***REMOVED***>
          <Icon
            name={
              props.isComplete
                ? 'check-outline'
                : props.isBookmark
                ? props.isRTL
                  ? 'triangle-left'
                  : 'triangle-right'
                : null
            ***REMOVED***
            size={24 * scaleMultiplier***REMOVED***
            color={props.isComplete ? '#828282' : props.primaryColor***REMOVED***
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            marginLeft: props.isRTL ? 0 : 20,
            marginRight: props.isRTL ? 20 : 0
          ***REMOVED******REMOVED***
        >
          <Text
            style={{
              fontSize: 18 * scaleMultiplier,
              textAlignVertical: 'center',
              color: props.isComplete ? '#9FA5AD' : 'black',
              textAlign: props.isRTL ? 'right' : 'left',
              fontFamily: props.font + '-medium'
            ***REMOVED******REMOVED***
          >
            {props.thisLesson.title***REMOVED***
          </Text>
          <Text
            style={{
              fontSize: 14 * scaleMultiplier,
              color: '#9FA5AD',
              textAlign: props.isRTL ? 'right' : 'left',
              fontFamily: props.font + '-regular'
            ***REMOVED******REMOVED***
          >
            {props.thisLesson.subtitle***REMOVED***
          </Text>
        </View>
      </TouchableOpacity>
      <DownloadStatusIndicator
        isDownloaded={props.isDownloaded***REMOVED***
        isConnected={props.isConnected***REMOVED***
        showDeleteModal={showDeleteModal***REMOVED***
        showSaveModal={showSaveModal***REMOVED***
        lessonID={props.thisLesson.id***REMOVED***
        hasAudioSource={props.thisLesson.audioSource ? true : false***REMOVED***
      />
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  lessonItem: {
    height: 64 * scaleMultiplier,
    flexDirection: 'row',
    backgroundColor: '#F7F9FA',
    flex: 1,
    paddingLeft: 20
  ***REMOVED***,
  progressAndTitle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignContent: 'center',
    flex: 1
  ***REMOVED***,
  completeStatusContainer: {
    justifyContent: 'center',
    width: 24 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    primaryColor: state.database[activeGroup.language].primaryColor,
    //progress: state.appProgress,
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    downloads: state.downloads,
    translations: state.database[activeGroup.language].translations,
    isConnected: state.network.isConnected,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    downloadLesson: (lessonID, source) => {
      dispatch(downloadLesson(lessonID, source))
    ***REMOVED***,
    setBookmark: groupName => {
      dispatch(setBookmark(groupName))
    ***REMOVED***,
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***,
    resumeDownload: (lessonID, downloadSnapshotJSON) => {
      dispatch(resumeDownload(lessonID, downloadSnapshotJSON))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LessonItem)
