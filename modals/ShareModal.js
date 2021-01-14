import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import React from 'react'
import { Alert, Share, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import OptionsModalButton from '../components/OptionsModalButton'
import Separator from '../components/standard/Separator'
import {
  logShareApp,
  logShareAudio,
  logShareText
***REMOVED*** from '../redux/LogEventFunctions'
import OptionsModal from './OptionsModal'

function ShareModal ({
  // passed from parents
  isVisible,
  hideModal,
  closeText,
  lesson,
  lessonType,
  set,
  // passed from redux
  translations,
  downloads
***REMOVED***) {
  // opens the share sheet to share a chapter of a lesson
  function share (type) {
    switch (type) {
      // share the link to Waha itself
      case 'app':
        logShareApp(lesson)
        Share.share({
          message:
            'iOS: https://apps.apple.com/us/app/waha-discover-gods-story/id1530116294\n\nAndroid: https://play.google.com/store/apps/details?id=com.kingdomstrategies.waha'
        ***REMOVED***).then(() => {
          hideModal()
        ***REMOVED***)
        break
      // share the passage text for this lesson
      case 'text':
        logShareText(lesson)
        var scriptureString = ''
        lesson.scripture.forEach((scripturePiece, index) => {
          scriptureString += scripturePiece.header + '\n' + scripturePiece.text
          if (index !== lesson.scripture.length - 1) scriptureString += '\n'
        ***REMOVED***)
        Share.share({
          message: scriptureString
        ***REMOVED***).then(() => {
          hideModal()
        ***REMOVED***)
        break
      // share the audio file for this lesson
      case 'audio':
        logShareAudio(lesson)
        FileSystem.getInfoAsync(
          FileSystem.documentDirectory + lesson.id + '.mp3'
        ).then(({ exists ***REMOVED***) => {
          exists
            ? Sharing.shareAsync(
                FileSystem.documentDirectory + lesson.id + '.mp3'
              ).then(() => {
                hideModal()
              ***REMOVED***)
            : Alert.alert(
                translations.general.popups.share_undownloaded_lesson_title,
                translations.general.popups.share_undownloaded_lesson_message,
                [
                  {
                    text: translations.general.ok,
                    onPress: () => {***REMOVED***
                  ***REMOVED***
                ]
              )
        ***REMOVED***)
        break
      // share the video link for this lesson
      case 'video':
        Share.share({
          message: lesson.videoShareLink
        ***REMOVED***).then(() => {
          hideModal()
        ***REMOVED***)
        break
    ***REMOVED***
  ***REMOVED***
  //+ RENDER
  return (
    <OptionsModal
      isVisible={isVisible***REMOVED***
      hideModal={hideModal***REMOVED***
      closeText={closeText***REMOVED***
    >
      <OptionsModalButton
        title={translations.general.share_app***REMOVED***
        onPress={() => share('app')***REMOVED***
      />
      {lessonType.includes('q') ? (
        <View>
          <Separator />
          <OptionsModalButton
            title={translations.general.share_passage_text***REMOVED***
            onPress={() => share('text')***REMOVED***
          />
        </View>
      ) : null***REMOVED***
      {lessonType.includes('a') && !downloads[lesson.id] ? (
        <View>
          <Separator />
          <OptionsModalButton
            title={translations.general.share_passage_audio***REMOVED***
            onPress={() => share('audio')***REMOVED***
          />
        </View>
      ) : null***REMOVED***
      {lessonType.includes('v') &&
      lesson.videoShareLink &&
      !downloads[lesson.id] ? (
        <View>
          <Separator />
          <OptionsModalButton
            title={translations.general.share_video_link***REMOVED***
            onPress={() => share('video')***REMOVED***
          />
        </View>
      ) : null***REMOVED***
    </OptionsModal>
  )
***REMOVED***

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    translations: state.database[activeGroup.language].translations,
    downloads: state.downloads
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(ShareModal)
