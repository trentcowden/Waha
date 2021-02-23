import React from 'react'
import { StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import ChapterButton from './ChapterButton'
import ChapterSeparator from './ChapterSeparator'

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    primaryColor: state.database[activeGroup.language].primaryColor,
    downloads: state.downloads,
    isConnected: state.network.isConnected
  ***REMOVED***
***REMOVED***

function ChapterSelector ({
  // Props passed from a parent component.
  activeChapter,
  lessonID,
  onPress,
  lessonType,
  isDownloaded,
  // Props passed from redux.
  primaryColor,
  downloads,
  isConnected
***REMOVED***) {
  // order of chapters is
  //  1. fellowship
  //  2. story
  //  3. (if applicable) training, which is always a video
  //  4. application

  // RENDER

  function getActiveNumber () {
    switch (activeChapter) {
      case 'fellowship':
        return 1
        break
      case 'story':
        return 2
        break
      case 'training':
        return 3
        break
      case 'application':
        if (lessonType === 'qav' || lessonType === 'qv') return 4
        else return 3
        break
    ***REMOVED***
  ***REMOVED***

  return (
    <View style={styles.chapterSelectContainer***REMOVED***>
      <ChapterButton
        name='fellowship'
        mode={activeChapter === 'fellowship' ? 'active' : 'inactive'***REMOVED***
        number={1***REMOVED***
        activeNumber={getActiveNumber()***REMOVED***
        onPress={onPress***REMOVED***
      />
      <ChapterSeparator />
      <ChapterButton
        name='story'
        mode={
          (lessonType === 'qa' || lessonType === 'qav') &&
          !isConnected &&
          !isDownloaded
            ? 'disabled'
            : downloads[lessonID] && downloads[lessonID].progress < 1
            ? 'downloading'
            : activeChapter === 'story'
            ? 'active'
            : 'inactive'
        ***REMOVED***
        number={2***REMOVED***
        activeNumber={getActiveNumber()***REMOVED***
        onPress={onPress***REMOVED***
        downloadProgress={
          downloads[lessonID] ? downloads[lessonID].progress : null
        ***REMOVED***
      />
      {lessonType === 'qav' || lessonType === 'qv' ? (
        <ChapterSeparator />
      ) : null***REMOVED***
      {lessonType === 'qav' || lessonType === 'qv' ? (
        <ChapterButton
          name='training'
          mode={
            !isConnected && !isDownloaded
              ? 'disabled'
              : downloads[lessonID + 'v'] &&
                downloads[lessonID + 'v'].progress < 1
              ? 'downloading'
              : activeChapter === 'training'
              ? 'active'
              : 'inactive'
          ***REMOVED***
          number={3***REMOVED***
          activeNumber={getActiveNumber()***REMOVED***
          onPress={onPress***REMOVED***
          downloadProgress={
            downloads[lessonID + 'v']
              ? downloads[lessonID + 'v'].progress
              : null
          ***REMOVED***
        />
      ) : null***REMOVED***
      <ChapterSeparator />
      <ChapterButton
        name='application'
        mode={activeChapter === 'application' ? 'active' : 'inactive'***REMOVED***
        number={lessonType === 'qav' || lessonType === 'qv' ? 4 : 3***REMOVED***
        activeNumber={getActiveNumber()***REMOVED***
        onPress={onPress***REMOVED***
      />
    </View>
  )
***REMOVED***

// STYLES

const styles = StyleSheet.create({
  chapterSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(ChapterSelector)
