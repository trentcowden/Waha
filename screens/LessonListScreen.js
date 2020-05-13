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
  Platform
***REMOVED*** from 'react-native'
import LessonItem from '../components/LessonItem'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import SetItem from '../components/SetItem'
import WahaModal from '../components/WahaModal'
import ModalButton from '../components/ModalButton'
import NetInfo from '@react-native-community/netinfo'
import { scaleMultiplier ***REMOVED*** from '../constants'
import BackButton from '../components/BackButton'
import {
  downloadLesson,
  removeDownload
***REMOVED*** from '../redux/actions/downloadActions'
import { toggleComplete, setBookmark ***REMOVED*** from '../redux/actions/groupsActions'
import { connect ***REMOVED*** from 'react-redux'

function LessonListScreen (props) {
  //// STATE

  // keeps track of whether the user has internet connection

  // keeps track of which lessons are downloaded
  const [downloadsInFileSystem, setDownloadsInFileSystem] = useState([])

  // keeps track of the lesson to download/delete/toggle complete when modals are up
  const [activeLessonInModal, setActiveLessonInModal] = useState({***REMOVED***)

  // modal states
  const [showSaveLessonModal, setShowSaveLessonModal] = useState(false)
  const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false)
  const [showLessonOptionsModal, setShowLessonOptionsModal] = useState(false)

  //// CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  // checks which lessons are downloaded and stores in state
  useEffect(() => {
    var whichLessonsDownloaded = {***REMOVED***
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
      .then(contents => {
        props.activeDatabase.lessons.forEach(lesson => {
          if (contents.includes(lesson.id + '.mp3'))
            whichLessonsDownloaded[lesson.id] = true
          else whichLessonsDownloaded[lesson.id] = false
        ***REMOVED***)
        return whichLessonsDownloaded
      ***REMOVED***)
      .then(whichLessonsDownloaded => {
        setDownloadsInFileSystem(whichLessonsDownloaded)
      ***REMOVED***)
  ***REMOVED***, [props.downloads])

  //// NAV OPTIONS

  function getNavOptions () {
    return {
      headerTitle: () => (
        <Image
          style={styles.headerImage***REMOVED***
          source={{
            uri:
              FileSystem.documentDirectory +
              props.activeGroup.language +
              '-header.png'
          ***REMOVED******REMOVED***
        />
      ),
      headerRight: props.isRTL
        ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: props.isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  //// FUNCTIONS

  // downloads a lesson's chapter 2 mp3 via modal press
  function downloadLessonFromModal () {
    props.downloadLesson(activeLessonInModal.id, activeLessonInModal.source)
    hideModals()
  ***REMOVED***

  // deletes a lesson's chapter 2 mp3 via modal press
  function deleteLessonFromModal () {
    FileSystem.deleteAsync(
      FileSystem.documentDirectory + activeLessonInModal.id + '.mp3'
    )
    props.removeDownload(activeLessonInModal.id)
    hideModals()
  ***REMOVED***

  // changes the complete status of a lesson via modal press
  // note: don't change it if they're marking it as what it's already marked as
  function toggleCompleteFromModal (statusToMark) {
    if (
      props.activeGroup.progress.includes(activeLessonInModal.index) &&
      statusToMark === 'incomplete'
    ) {
      props.toggleComplete(props.activeGroup.name, activeLessonInModal.index)
      props.setBookmark(props.activeGroup.name)
    ***REMOVED*** else if (
      !props.activeGroup.progress.includes(activeLessonInModal.index) &&
      statusToMark === 'complete'
    ) {
      props.toggleComplete(props.activeGroup.name, activeLessonInModal.index)
      props.setBookmark(props.activeGroup.name)
    ***REMOVED***
    hideModals()
  ***REMOVED***

  // marks every lesson in current set as complete up until the selected lesson via modal press
  function markUpToThisPointAsCompleteFromModal () {
    for (var i = 1; i <= activeLessonInModal.index; i++) {
      if (
        !props.activeGroup.progress.includes(i) &&
        props.activeDatabase.lessons[i - 1].setid ===
          props.route.params.thisSet.id
      ) {
        props.toggleComplete(props.activeGroup.name, i)
      ***REMOVED***
    ***REMOVED***
    hideModals()
    props.setBookmark(props.activeGroup.name)
  ***REMOVED***

  // hides all the modals
  function hideModals () {
    setShowSaveLessonModal(false)
    setShowDeleteLessonModal(false)
    setShowLessonOptionsModal(false)
  ***REMOVED***

  // opens the share sheet to share a chapter of a lesson
  function share (type) {
    switch (type) {
      case 'app':
        Share.share({
          message:
            Platform.OS === 'ios'
              ? 'www.appstorelink.com'
              : 'www.playstorelink.com'
        ***REMOVED***)
        break
      case 'text':
        Share.share({
          message:
            activeLessonInModal.scriptureHeader +
            ': ' +
            activeLessonInModal.scriptureText
        ***REMOVED***)
        break
      case 'audio':
        FileSystem.getInfoAsync(
          FileSystem.documentDirectory + activeLessonInModal.id + '.mp3'
        ).then(({ exists ***REMOVED***) => {
          exists
            ? Sharing.shareAsync(
                FileSystem.documentDirectory + activeLessonInModal.id + '.mp3'
              )
            : Alert.alert(
                props.translations.alerts.shareUndownloaded.header,
                props.translations.alerts.shareUndownloaded.body,
                [
                  {
                    text: props.translations.alerts.options.ok,
                    onPress: () => {***REMOVED***
                  ***REMOVED***
                ]
              )
        ***REMOVED***)
        break
    ***REMOVED***
  ***REMOVED***

  //// RENDER

  function renderLessonItem (lessonList) {
    return (
      <LessonItem
        thisLesson={lessonList.item***REMOVED***
        onLessonSelect={() =>
          props.navigation.navigate('Play', {
            thisLesson: lessonList.item,
            isDownloaded: downloadsInFileSystem[lessonList.item.id]
          ***REMOVED***)
        ***REMOVED***
        isDownloaded={downloadsInFileSystem[lessonList.item.id]***REMOVED***
        isComplete={props.activeGroup.progress.includes(lessonList.item.index)***REMOVED***
        setActiveLessonInModal={() => setActiveLessonInModal(lessonList.item)***REMOVED***
        setShowSaveLessonModal={() => setShowSaveLessonModal(true)***REMOVED***
        setShowDeleteLessonModal={() => setShowDeleteLessonModal(true)***REMOVED***
        setShowLessonOptionsModal={() => setShowLessonOptionsModal(true)***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.studySetItemContainer***REMOVED***>
        <SetItem thisSet={props.route.params.thisSet***REMOVED*** isSmall={true***REMOVED*** />
      </View>
      <FlatList
        data={props.activeDatabase.lessons.filter(
          lesson => props.route.params.thisSet.id === lesson.setid
        )***REMOVED***
        renderItem={renderLessonItem***REMOVED***
        keyExtractor={item => item.id***REMOVED***
      />

      {/* MODALS */***REMOVED***
      <WahaModal
        isVisible={showSaveLessonModal***REMOVED***
        hideModal={hideModals***REMOVED***
        closeText={
          props.activeDatabase.translations.modals.downloadLessonOptions.cancel
        ***REMOVED***
      >
        <ModalButton
          isLast={true***REMOVED***
          title={
            props.activeDatabase.translations.modals.downloadLessonOptions
              .downloadLesson
          ***REMOVED***
          onPress={downloadLessonFromModal***REMOVED***
        />
      </WahaModal>
      <WahaModal
        isVisible={showDeleteLessonModal***REMOVED***
        hideModal={hideModals***REMOVED***
        closeText={
          props.activeDatabase.translations.modals.deleteLessonOptions.cancel
        ***REMOVED***
      >
        <ModalButton
          isLast={true***REMOVED***
          title={
            props.activeDatabase.translations.modals.deleteLessonOptions
              .deleteLesson
          ***REMOVED***
          onPress={deleteLessonFromModal***REMOVED***
        />
      </WahaModal>
      <WahaModal
        isVisible={showLessonOptionsModal***REMOVED***
        hideModal={hideModals***REMOVED***
        closeText={props.activeDatabase.translations.modals.lessonOptions.close***REMOVED***
      >
        <ModalButton
          title={
            props.activeDatabase.translations.modals.lessonOptions
              .markLessonComplete
          ***REMOVED***
          onPress={() => toggleCompleteFromModal('complete')***REMOVED***
        />
        <ModalButton
          title={
            props.activeDatabase.translations.modals.lessonOptions
              .markLessonIncomplete
          ***REMOVED***
          onPress={() => toggleCompleteFromModal('incomplete')***REMOVED***
        />
        <ModalButton
          title={
            props.activeDatabase.translations.modals.lessonOptions.shareApp
          ***REMOVED***
          onPress={() => share('app')***REMOVED***
        />
        <ModalButton
          title={
            props.activeDatabase.translations.modals.lessonOptions
              .sharePassageText
          ***REMOVED***
          onPress={() => share('text')***REMOVED***
        />
        <ModalButton
          title={
            props.activeDatabase.translations.modals.lessonOptions
              .sharePassageAudio
          ***REMOVED***
          onPress={() => share('audio')***REMOVED***
        />
        <ModalButton
          isLast={true***REMOVED***
          title={
            props.activeDatabase.translations.modals.lessonOptions
              .markUpToPointAsComplete
          ***REMOVED***
          onPress={markUpToThisPointAsCompleteFromModal***REMOVED***
        />
      </WahaModal>
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F7F9FA'
  ***REMOVED***,
  studySetItemContainer: {
    width: '100%',
    height: 90 * scaleMultiplier
  ***REMOVED***,
  headerImage: {
    resizeMode: 'contain',
    width: 120,
    height: 40,
    alignSelf: 'center'
  ***REMOVED***,
  hiddenItemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
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
    translations: state.database[activeGroup.language].translations
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    downloadLesson: (lessonID, source) => {
      dispatch(downloadLesson(lessonID, source))
    ***REMOVED***,
    toggleComplete: (groupName, lessonIndex) => {
      dispatch(toggleComplete(groupName, lessonIndex))
    ***REMOVED***,
    setBookmark: groupName => {
      dispatch(setBookmark(groupName))
    ***REMOVED***,
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LessonListScreen)
