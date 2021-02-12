//imports
import React, { useEffect ***REMOVED*** from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { getLessonInfo, itemHeights, scaleMultiplier ***REMOVED*** from '../../constants'
import { removeDownload ***REMOVED*** from '../../redux/actions/downloadActions'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'
import DownloadStatusIndicator from '../DownloadStatusIndicator'

function LessonItem ({
  // passed from parent
  thisLesson,
  onLessonSelect,
  isBookmark,
  isDownloaded,
  isDownloading,
  lessonType,
  isComplete,
  setActiveLessonInModal,
  setShowDownloadLessonModal,
  setShowDeleteLessonModal,
  // passed from redux
  primaryColor,
  isRTL,
  activeGroup,
  downloads,
  translations,
  isConnected,
  font,
  removeDownload
***REMOVED***) {
  //+ CONSTRUCTOR

  useEffect(() => {
    // if we've completed the download for this lesson, remove the audio/video
    //  download from redux
    switch (lessonType) {
      case 'qa':
      case 'a':
        if (downloads[thisLesson.id] && downloads[thisLesson.id].progress === 1)
          removeDownload(thisLesson.id)
        break
      case 'qav':
        if (
          downloads[thisLesson.id] &&
          downloads[thisLesson.id] + 'v' &&
          downloads[thisLesson.id].progress === 1 &&
          downloads[thisLesson.id + 'v'].progress === 1
        ) {
          removeDownload(thisLesson.id)
          removeDownload(thisLesson.id + 'v')
        ***REMOVED***
        break
      case 'qv':
      case 'v':
        if (
          downloads[thisLesson.id + 'v'] &&
          downloads[thisLesson.id + 'v'].progress === 1
        )
          removeDownload(thisLesson.id + 'v')
        break
    ***REMOVED***
  ***REMOVED***, [downloads])

  //+ FUNCTIONS

  // calls the various modal functions on LessonsScreen
  function showSaveModal () {
    setActiveLessonInModal.call()
    setShowDownloadLessonModal.call()
  ***REMOVED***
  function showDeleteModal () {
    setActiveLessonInModal.call()
    setShowDeleteLessonModal.call()
  ***REMOVED***

  //+ RENDER

  return (
    <View
      style={[
        styles.lessonItem,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          height: itemHeights[font].LessonItem
        ***REMOVED***
      ]***REMOVED***
    >
      {/* main touchable area */***REMOVED***
      <TouchableOpacity
        style={[
          styles.progressAndTitle,
          { flexDirection: isRTL ? 'row-reverse' : 'row' ***REMOVED***
        ]***REMOVED***
        onPress={onLessonSelect***REMOVED***
      >
        {/* complete status indicator */***REMOVED***
        <View style={styles.completeStatusContainer***REMOVED***>
          <Icon
            name={
              isComplete
                ? 'check-outline'
                : isBookmark
                ? isRTL
                  ? 'triangle-left'
                  : 'triangle-right'
                : null
            ***REMOVED***
            size={24 * scaleMultiplier***REMOVED***
            color={isComplete ? colors.chateau : primaryColor***REMOVED***
          />
        </View>

        {/* title and subtitle */***REMOVED***
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            marginLeft: isRTL ? (thisLesson.hasAudio ? 0 : 20) : 20,
            marginRight: isRTL ? 20 : thisLesson.hasAudio ? 0 : 20
          ***REMOVED******REMOVED***
        >
          <Text
            style={StandardTypography(
              { font, isRTL ***REMOVED***,
              'h4',
              'Bold',
              'left',
              isComplete ? colors.chateau : colors.shark
            )***REMOVED***
            numberOfLines={2***REMOVED***
          >
            {thisLesson.title***REMOVED***
          </Text>
          <Text
            style={StandardTypography(
              { font, isRTL ***REMOVED***,
              'd',
              'Regular',
              'left',
              colors.chateau
            )***REMOVED***
            numberOfLines={1***REMOVED***
          >
            {getLessonInfo('subtitle', thisLesson.id)***REMOVED***
          </Text>
        </View>
      </TouchableOpacity>
      {/* cloud icon/download indicator */***REMOVED***
      <DownloadStatusIndicator
        isDownloaded={isDownloaded***REMOVED***
        isDownloading={isDownloading***REMOVED***
        showDeleteModal={showDeleteModal***REMOVED***
        showSaveModal={showSaveModal***REMOVED***
        lessonID={thisLesson.id***REMOVED***
        lessonType={lessonType***REMOVED***
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
