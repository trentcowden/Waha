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
import { toggleComplete ***REMOVED*** from '../redux/actions/groupsActions'
import { connect ***REMOVED*** from 'react-redux'
import { SwipeListView ***REMOVED*** from 'react-native-swipe-list-view'
import LessonSwipeBackdrop from '../components/LessonSwipeBackdrop'
function LessonListScreen (props) {
  //// STATE

  // read downloaded files for testing purposes
  FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(contents => {
    console.log(contents)
  ***REMOVED***)

  // keeps track of which lessons are downloaded
  const [downloadsInFileSystem, setDownloadsInFileSystem] = useState({***REMOVED***)

  // keeps track of the lesson to download/delete/toggle complete when modals are up
  const [activeLessonInModal, setActiveLessonInModal] = useState({***REMOVED***)

  // modal states
  const [showDownloadLessonModal, setShowDownloadLessonModal] = useState(false)
  const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false)
  const [showLessonOptionsModal, setShowLessonOptionsModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  // progress and bookmark for the set we're looking at
  const [thisSetProgress, setThisSetProgress] = useState([])
  const [thisSetBookmark, setThisSetBookmark] = useState(1)

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

  //// CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  // checks which lessons and lesson videos are downloaded and stores in state
  useEffect(() => {
    var whichLessonsDownloaded = {***REMOVED***
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
      .then(contents => {
        props.activeDatabase.lessons.forEach(lesson => {
          if (contents.includes(lesson.id + '.mp3'))
            whichLessonsDownloaded[lesson.id] = true
          if (contents.includes(lesson.id + 'v.mp4')) {
            whichLessonsDownloaded[lesson.id + 'v'] = true
          ***REMOVED***
        ***REMOVED***)
        return whichLessonsDownloaded
      ***REMOVED***)
      .then(whichLessonsDownloaded => {
        setDownloadsInFileSystem(whichLessonsDownloaded)
      ***REMOVED***)
  ***REMOVED***, [props.downloads])

  // whenever progress or bookmarks update, update the progress and bookmarks for this set
  useEffect(() => {
    setThisSetProgress(
      props.activeGroup.addedSets.filter(
        set => set.id === props.route.params.thisSet.id
      )[0].progress
    )
    setThisSetBookmark(
      props.activeGroup.addedSets.filter(
        set => set.id === props.route.params.thisSet.id
      )[0].bookmark
    )
  ***REMOVED***, [props.activeGroup.addedSets, props.activeGroup.setBookmark])

  //// FUNCTIONS

  // gets the type of a lesson in string form
  // note: not stored in db for ssot purposes
  function getLessonType (lesson) {
    // q = has questions, a = has audio, v = has video
    // options not allowed: av, a
    return lesson.questionsType
      ? lesson.audioSource
        ? lesson.videoSource
          ? 'qav'
          : 'qa'
        : lesson.videoSource
        ? 'qv'
        : 'q'
      : 'v'
  ***REMOVED***

  // NOTE: for next 4 functions, what is returned depends on the type of the
  //  lesson. qa checks only audio file, qav checks both audio and video files,
  //  and qv and v check only video files.

  // determines if a lesson is downloaded based on its type
  function getIsLessonDownloaded (lesson) {
    switch (getLessonType(lesson)) {
      case 'qa':
        if (downloadsInFileSystem[lesson.id]) return true
        else return false
        break
      case 'qav':
        if (
          downloadsInFileSystem[lesson.id] &&
          downloadsInFileSystem[lesson.id + 'v']
        )
          return true
        else return false
        break
      case 'qv':
      case 'v':
        if (downloadsInFileSystem[lesson.id + 'v']) return true
        else return false
        break
    ***REMOVED***
  ***REMOVED***

  // determines if a lesson is downloading based on its type
  function getIsLessonDownloading (lesson) {
    switch (getLessonType(lesson)) {
      case 'qa':
        if (props.downloads[lesson.id]) return true
        else return false
        break
      case 'qav':
        if (props.downloads[lesson.id] && props.downloads[lesson.id + 'v'])
          return true
        else return false
        break
      case 'qv':
      case 'v':
        if (props.downloads[lesson.id + 'v']) return true
        else return false
        break
    ***REMOVED***
  ***REMOVED***

  // downloads a lesson's chapter 2 mp3 via modal press based on its type
  function downloadLessonFromModal () {
    switch (getLessonType(activeLessonInModal)) {
      case 'qa':
        props.downloadLesson(
          activeLessonInModal.id,
          activeLessonInModal.audioSource
        )
        break
      case 'qav':
        props.downloadLesson(
          activeLessonInModal.id,
          activeLessonInModal.audioSource
        )
        props.downloadVideo(
          activeLessonInModal.id,
          activeLessonInModal.videoSource
        )
        break
      case 'qv':
      case 'v':
        props.downloadVideo(
          activeLessonInModal.id,
          activeLessonInModal.videoSource
        )
        break
    ***REMOVED***
    hideModals()
  ***REMOVED***

  // deletes a lesson's chapter 2 mp3 via modal press based on its type
  function deleteLessonFromModal () {
    switch (getLessonType(activeLessonInModal)) {
      case 'qa':
        FileSystem.deleteAsync(
          FileSystem.documentDirectory + activeLessonInModal.id + '.mp3'
        )
        break
      case 'qav':
        FileSystem.deleteAsync(
          FileSystem.documentDirectory + activeLessonInModal.id + '.mp3'
        )
        FileSystem.deleteAsync(
          FileSystem.documentDirectory + activeLessonInModal.id + 'v.mp4'
        )
        break
      case 'qv':
      case 'v':
        FileSystem.deleteAsync(
          FileSystem.documentDirectory + activeLessonInModal.id + 'v.mp4'
        )
        break
    ***REMOVED***

    props.removeDownload(activeLessonInModal.id)
    props.removeDownload(activeLessonInModal.id + 'v')
    hideModals()
  ***REMOVED***

  // NOT USED: marks every lesson in current set as complete up until the
  //  selected lesson via modal press
  // function markUpToThisPointAsCompleteFromModal () {
  //   for (var i = 1; i <= activeLessonInModal.index; i++) {
  //     if (!thisSetProgress.includes(i)) {
  //       props.toggleComplete(
  //         props.activeGroup.name,
  //         props.route.params.thisSet,
  //         i
  //       )
  //     ***REMOVED***
  //   ***REMOVED***
  //   hideModals()
  // ***REMOVED***

  // hides all the modals
  function hideModals () {
    setShowDownloadLessonModal(false)
    setShowDeleteLessonModal(false)
    setShowShareModal(false)
  ***REMOVED***

  // opens the share sheet to share something
  function share (type) {
    switch (type) {
      // share the link to Waha itself
      case 'app':
        Share.share({
          message:
            props.route.params.thisSet.category === 'mt'
              ? Platform.OS === 'ios'
                ? 'www.appstorelink.com' +
                  ' ' +
                  props.translations.labels.shareCode
                : 'www.playstorelink.com' +
                  ' ' +
                  props.translations.labels.shareCode
              : Platform.OS === 'ios'
              ? 'www.appstorelink.com'
              : 'www.playstorelink.com'
        ***REMOVED***)
        break
      // share the passage text for this lesson
      case 'text':
        Share.share({
          message:
            activeLessonInModal.scriptureHeader +
            ': ' +
            activeLessonInModal.scriptureText
        ***REMOVED***)
        break
      // share the audio file for this lesson
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
                props.translations.alerts.shareUndownloaded.text,
                [
                  {
                    text: props.translations.alerts.options.ok,
                    onPress: () => {***REMOVED***
                  ***REMOVED***
                ]
              )
        ***REMOVED***)
        break
      // share the video link for this lesson
      case 'video':
        Share.share({
          message: activeLessonInModal.videoSource
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
            thisSet: props.route.params.thisSet,
            thisSetProgress: thisSetProgress,
            isDownloaded: getIsLessonDownloaded(lessonList.item),
            isDownloading: getIsLessonDownloading(lessonList.item),
            lessonType: getLessonType(lessonList.item)
          ***REMOVED***)
        ***REMOVED***
        isBookmark={lessonList.item.index === thisSetBookmark***REMOVED***
        isDownloaded={getIsLessonDownloaded(lessonList.item)***REMOVED***
        isDownloading={getIsLessonDownloading(lessonList.item)***REMOVED***
        lessonType={getLessonType(lessonList.item)***REMOVED***
        isComplete={thisSetProgress.includes(lessonList.item.index)***REMOVED***
        setActiveLessonInModal={() => setActiveLessonInModal(lessonList.item)***REMOVED***
        setShowDownloadLessonModal={() => setShowDownloadLessonModal(true)***REMOVED***
        setShowDeleteLessonModal={() => setShowDeleteLessonModal(true)***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.studySetItemContainer***REMOVED***>
        <SetItem thisSet={props.route.params.thisSet***REMOVED*** mode='lessonlist' />
      </View>
      <SwipeListView
        data={props.activeDatabase.lessons.filter(
          lesson => props.route.params.thisSet.id === lesson.setid
        )***REMOVED***
        renderItem={renderLessonItem***REMOVED***
        ListFooterComponent={() => <View style={{ height: 30 ***REMOVED******REMOVED*** />***REMOVED***
        keyExtractor={item => item.index.toString()***REMOVED***
        renderHiddenItem={(data, rowMap) => (
          <LessonSwipeBackdrop
            isComplete={thisSetProgress.includes(data.item.index)***REMOVED***
            toggleComplete={() => {
              props.toggleComplete(
                props.activeGroup.name,
                props.route.params.thisSet,
                data.item.index
              )
              rowMap[data.item.index].closeRow()
            ***REMOVED******REMOVED***
            showShareModal={() => {
              setShowShareModal(true)
              rowMap[data.item.index].closeRow()
            ***REMOVED******REMOVED***
          />
        )***REMOVED***
        leftOpenValue={50***REMOVED***
        rightOpenValue={-50***REMOVED***
        // these are different on platform because the activation is causing a
        //  crash on android phones
        leftActivationValue={
          Platform.OS === 'ios' ? Dimensions.get('screen').width / 2 - 10 : 1000
        ***REMOVED***
        rightActivationValue={
          Platform.OS === 'ios'
            ? -Dimensions.get('screen').width / 2 + 10
            : -1000
        ***REMOVED***
        // leftActivationValue={Dimensions.get('screen').width / 2 - 10***REMOVED***
        // rightActivationValue={-Dimensions.get('screen').width / 2 + 10***REMOVED***
        stopLeftSwipe={Dimensions.get('screen').width / 2***REMOVED***
        stopRightSwipe={-Dimensions.get('screen').width / 2***REMOVED***
        onLeftActionStatusChange={
          props.isRTL
            ? data => {
                setShowShareModal(true)
              ***REMOVED***
            : data => {
                if (data.isActivated)
                  props.toggleComplete(
                    props.activeGroup.name,
                    props.route.params.thisSet,
                    parseInt(data.key)
                  )
              ***REMOVED***
        ***REMOVED***
        onRightActionStatusChange={
          props.isRTL
            ? data => {
                if (data.isActivated)
                  props.toggleComplete(
                    props.activeGroup.name,
                    props.route.params.thisSet,
                    parseInt(data.key)
                  )
              ***REMOVED***
            : data => {
                setShowShareModal(true)
              ***REMOVED***
        ***REMOVED***
        swipeGestureBegan={data => {
          setActiveLessonInModal(
            props.activeDatabase.lessons.filter(
              lesson =>
                props.route.params.thisSet.id === lesson.setid &&
                lesson.index === parseInt(data)
            )[0]
          )
        ***REMOVED******REMOVED***
      />

      {/* MODALS */***REMOVED***
      <OptionsModal
        isVisible={showDownloadLessonModal***REMOVED***
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
      </OptionsModal>
      <OptionsModal
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
      </OptionsModal>
      <OptionsModal
        isVisible={showShareModal***REMOVED***
        hideModal={hideModals***REMOVED***
        closeText={props.activeDatabase.translations.modals.shareOptions.close***REMOVED***
      >
        <ModalButton
          title={props.activeDatabase.translations.modals.shareOptions.shareApp***REMOVED***
          onPress={() => share('app')***REMOVED***
        />
        {getLessonType(activeLessonInModal) !== 'v' ? (
          <ModalButton
            title={
              props.activeDatabase.translations.modals.shareOptions
                .sharePassageText
            ***REMOVED***
            onPress={() => share('text')***REMOVED***
          />
        ) : null***REMOVED***
        {(getLessonType(activeLessonInModal) === 'qa' ||
          getLessonType(activeLessonInModal) === 'qav') &&
        !props.downloads[activeLessonInModal.id] ? (
          <ModalButton
            title={
              props.activeDatabase.translations.modals.shareOptions
                .sharePassageAudio
            ***REMOVED***
            onPress={() => share('audio')***REMOVED***
          />
        ) : null***REMOVED***
        {getLessonType(activeLessonInModal) !== 'qa' &&
        getLessonType(activeLessonInModal) !== 'q' ? (
          <ModalButton
            title={
              props.activeDatabase.translations.modals.shareOptions
                .shareVideoLink
            ***REMOVED***
            onPress={() => share('video')***REMOVED***
          />
        ) : null***REMOVED***
      </OptionsModal>
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
    height: 100 * scaleMultiplier
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
    downloadVideo: (lessonID, source) => {
      dispatch(downloadVideo(lessonID, source))
    ***REMOVED***,
    toggleComplete: (groupName, set, lessonIndex) => {
      dispatch(toggleComplete(groupName, set, lessonIndex))
    ***REMOVED***,
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LessonListScreen)
