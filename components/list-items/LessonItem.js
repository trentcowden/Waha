//imports
import React, { useEffect ***REMOVED*** from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import {
  colors,
  getLanguageFont,
  getLessonInfo,
  itemHeights,
  scaleMultiplier
***REMOVED*** from '../../constants'
import { removeDownload ***REMOVED*** from '../../redux/actions/downloadActions'
import { StandardTypography ***REMOVED*** from '../../styles/typography'
import DownloadStatusIndicator from '../DownloadStatusIndicator'
function LessonItem (props) {
  //+ CONSTRUCTOR

  useEffect(() => {
    // if we've completed the download for this lesson, remove the audio/video
    //  download from redux
    switch (props.lessonType) {
      case 'qa':
      case 'a':
        if (
          props.downloads[props.thisLesson.id] &&
          props.downloads[props.thisLesson.id].progress === 1
        )
          props.removeDownload(props.thisLesson.id)
        break
      case 'qav':
        if (
          props.downloads[props.thisLesson.id] &&
          props.downloads[props.thisLesson.id] + 'v' &&
          props.downloads[props.thisLesson.id].progress === 1 &&
          props.downloads[props.thisLesson.id + 'v'].progress === 1
        ) {
          props.removeDownload(props.thisLesson.id)
          props.removeDownload(props.thisLesson.id + 'v')
        ***REMOVED***
        break
      case 'qv':
      case 'v':
        if (
          props.downloads[props.thisLesson.id + 'v'] &&
          props.downloads[props.thisLesson.id + 'v'].progress === 1
        )
          props.removeDownload(props.thisLesson.id + 'v')
        break
    ***REMOVED***
  ***REMOVED***, [props.downloads])

  //+ FUNCTIONS

  // calls the various modal functions on lessonlistscreen
  function showSaveModal () {
    props.setActiveLessonInModal.call()
    props.setShowDownloadLessonModal.call()
  ***REMOVED***
  function showDeleteModal () {
    props.setActiveLessonInModal.call()
    props.setShowDeleteLessonModal.call()
  ***REMOVED***

  //+ RENDER

  return (
    <View
      style={[
        styles.lessonItem,
        {
          flexDirection: props.isRTL ? 'row-reverse' : 'row',
          height: itemHeights[props.font].LessonItem
        ***REMOVED***
      ]***REMOVED***
    >
      {/* main touchable area */***REMOVED***
      <TouchableOpacity
        style={[
          styles.progressAndTitle,
          { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
        ]***REMOVED***
        onPress={props.onLessonSelect***REMOVED***
      >
        {/* complete status indicator */***REMOVED***
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
            color={props.isComplete ? colors.chateau : props.primaryColor***REMOVED***
          />
        </View>

        {/* title and subtitle */***REMOVED***
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            marginLeft: props.isRTL ? (props.thisLesson.hasAudio ? 0 : 20) : 20,
            marginRight: props.isRTL ? 20 : props.thisLesson.hasAudio ? 0 : 20
          ***REMOVED******REMOVED***
        >
          <Text
            style={StandardTypography(
              props,
              'h4',
              'Bold',
              'left',
              props.isComplete ? colors.chateau : colors.shark
            )***REMOVED***
            numberOfLines={2***REMOVED***
          >
            {props.thisLesson.title***REMOVED***
          </Text>
          <Text
            style={StandardTypography(
              props,
              'd',
              'Regular',
              'left',
              colors.chateau
            )***REMOVED***
            numberOfLines={1***REMOVED***
          >
            {getLessonInfo('subtitle', props.thisLesson.id)***REMOVED***
          </Text>
        </View>
      </TouchableOpacity>
      {/* cloud icon/download indicator */***REMOVED***
      <DownloadStatusIndicator
        isDownloaded={props.isDownloaded***REMOVED***
        isDownloading={props.isDownloading***REMOVED***
        isConnected={props.isConnected***REMOVED***
        showDeleteModal={showDeleteModal***REMOVED***
        showSaveModal={showSaveModal***REMOVED***
        lessonID={props.thisLesson.id***REMOVED***
        lessonType={props.lessonType***REMOVED***
      />
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  lessonItem: {
    // height: 80 * scaleMultiplier,
    // aspectRatio: 6.1,
    flexDirection: 'row',
    backgroundColor: colors.aquaHaze,
    flex: 1,
    paddingLeft: 20
    // paddingVertical: 5
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

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    primaryColor: state.database[activeGroup.language].primaryColor,
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    downloads: state.downloads,
    translations: state.database[activeGroup.language].translations,
    isConnected: state.network.isConnected,
    font: getLanguageFont(activeGroup.language)
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LessonItem)
