import useInterval from '@use-it/interval'
import { Audio ***REMOVED*** from 'expo-av'
import * as FileSystem from 'expo-file-system'
import { useKeepAwake ***REMOVED*** from 'expo-keep-awake'
import { DeviceMotion ***REMOVED*** from 'expo-sensors'
import React, { useEffect, useRef, useState ***REMOVED*** from 'react'
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import AlbumArtSwiper from '../components/AlbumArtSwiper'
import BackButton from '../components/BackButton'
import BookView from '../components/BookView'
import ChapterSelect from '../components/ChapterSelect'
import HomeworkModal from '../components/HomeworkModal'
import PlayPauseSkip from '../components/PlayPauseSkip'
import PlayScreenHeaderButtons from '../components/PlayScreenHeaderButtons'
import Scrubber from '../components/Scrubber'
import ShareModal from '../components/ShareModal'
import VideoPlayer from '../components/VideoPlayer'
import { colors ***REMOVED*** from '../constants'
import {
  downloadLesson,
  downloadVideo,
  removeDownload
***REMOVED*** from '../redux/actions/downloadActions'
import { toggleComplete ***REMOVED*** from '../redux/actions/groupsActions'

console.disableYellowBox = true

function PlayScreen (props) {
  /* 
    STATE
  */

  //// AUDIO SPECIFIC STATE

  // stores loaded audio file
  const [soundObject, setSoundObject] = useState(new Audio.Sound())

  // stores the length of the current audio file in milliseconds (loaded by sound object)
  const [audioFileLength, setAudioFileLength] = useState(null)

  // keeps track of if the audio file is loaded
  const [isLoaded, setIsLoaded] = useState(false)

  //// VIDEO SPECIFIC STATE

  // stores loaded video file
  const [videoObject, setVideoObject] = useState()

  // keeps track of if the video is buffering
  const [isVideoBuffering, setIsVideoBuffering] = useState(false)

  // keeps track of the current screen orientation for fullscreen videos
  const [screenOrientation, setScreenOrientation] = useState(0)

  //// AUDIO + VIDEO STATE

  // keeps track of whether the audio/video file is playing or paused
  const [isPlaying, setIsPlaying] = useState(false)

  // keeps track of the current position of the seeker
  const [seekPosition, setSeekPosition] = useState(0)

  // keeps track of if the seeker should update every second
  // note: only time it shouldn't is during seeking, skipping, or loading a new chapter
  const shouldTickUpdate = useRef(false)

  //// CHAPTER STATE

  // keeps track of currently playing chapter
  const [activeChapter, setActiveChapter] = useState('fellowship')

  // sources for all 3 audio files
  const [fellowshipSource, setFellowshipSource] = useState()
  const [storySource, setStorySource] = useState()
  const [trainingSource, setTrainingSource] = useState()
  const [applicationSource, setApplicationSource] = useState()

  //// ALBUM ART STATE

  // ref for the middle album art scroller
  const [albumArtSwiperRef, setAlbumArtSwiperRef] = useState()

  // keeps the screen always awake on this screen
  useKeepAwake()

  // pause lesson if we move to a different screen (i.e. when switching to
  //  splash / game for security mode)
  useEffect(() => {
    if (isPlaying) playHandler()
  ***REMOVED***, [props.navigation.isFocused()])

  //// OTHER STATE

  // share modal
  const [showShareLessonModal, setShowShareLessonModal] = useState(false)

  // animation state
  const [playOpacity, setPlayOpacity] = useState(new Animated.Value(0))
  const [animationZIndex, setAnimationZIndex] = useState(0)

  //// NAV OPTIONS
  function getNavOptions () {
    return {
      headerTitle: props.route.params.thisLesson.subtitle,
      headerRight: props.isRTL
        ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        : () => (
            <PlayScreenHeaderButtons
              shareOnPress={() => setShowShareLessonModal(true)***REMOVED***
              completeOnPress={changeCompleteStatus***REMOVED***
              completeCondition={props.route.params.thisSetProgress.includes(
                props.route.params.thisLesson.index
              )***REMOVED***
            />
          ),
      headerLeft: props.isRTL
        ? () => (
            <PlayScreenHeaderButtons
              shareOnPress={() => setShowShareLessonModal(true)***REMOVED***
              completeOnPress={changeCompleteStatus***REMOVED***
              completeCondition={props.route.params.thisSetProgress.includes(
                props.route.params.thisLesson.index
              )***REMOVED***
            />
          )
        : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  //// CONSTRUCTOR

  useEffect(() => {
    //set nav options
    props.navigation.setOptions(getNavOptions())

    // set sources and download stuff if we need to
    setSources()

    //when leaving the screen, cancel the interval timer and unload the audio file
    return function cleanup () {
      // clearInterval(interval)

      if (soundObject) {
        soundObject.unloadAsync()
        setSoundObject(null)
      ***REMOVED***

      if (videoObject) {
        videoObject.unloadAsync()
        setVideoObject(null)
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [])

  // once we set a chapter 1 source, load it up
  useEffect(() => {
    if (fellowshipSource) {
      try {
        loadAudioFile(fellowshipSource)
      ***REMOVED*** catch (error) {
        console.log(error)
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [fellowshipSource])

  useEffect(() => {
    if (props.route.params.lessonType === 'v')
      if (props.isConnected && !isLoaded && trainingSource)
        loadVideoFile(trainingSource)
  ***REMOVED***, [props.isConnected])

  // interval for updating seeker
  useInterval(updateSeekerTick, 1000)

  //// CONSTRUCTOR FUNCTIONS

  // sets the sources for all the chapters based on lesson type and whether
  // various chapters are downloaded or not
  function setSources () {
    // set all possible sources for ease of use later
    var fellowshipLocal =
      FileSystem.documentDirectory +
      props.activeGroup.language +
      '-' +
      props.route.params.thisLesson.fellowshipType +
      '.mp3'

    var applicationLocal =
      FileSystem.documentDirectory +
      props.activeGroup.language +
      '-' +
      props.route.params.thisLesson.applicationType +
      '.mp3'

    var storyLocal =
      FileSystem.documentDirectory + props.route.params.thisLesson.id + '.mp3'

    var storyStream = props.route.params.thisLesson.audioSource

    var storyDummy =
      FileSystem.documentDirectory +
      props.activeGroup.language +
      '-' +
      'dummy-story.mp3'

    var trainingLocal =
      FileSystem.documentDirectory + props.route.params.thisLesson.id + 'v.mp4'

    var trainingStream = props.route.params.thisLesson.videoSource

    switch (props.route.params.lessonType) {
      case 'qa':
        setFellowshipSource(fellowshipLocal)
        setStorySource(storyLocal)
        setTrainingSource(null)
        setApplicationSource(applicationLocal)

        // start downloading stuff if it's not downloaded
        if (
          !props.route.params.isDownloaded &&
          !props.route.params.isDownloading
        )
          props.downloadLesson(
            props.route.params.thisLesson.id,
            props.route.params.thisLesson.audioSource
          )
        break
      case 'qav':
        setFellowshipSource(fellowshipLocal)
        setStorySource(storyLocal)
        setTrainingSource(trainingLocal)
        setApplicationSource(applicationLocal)

        // start downloading stuff if it's not downloaded
        if (
          !props.route.params.isDownloaded &&
          !props.route.params.isDownloading
        ) {
          props.downloadLesson(
            props.route.params.thisLesson.id,
            props.route.params.thisLesson.audioSource
          )
          props.downloadVideo(
            props.route.params.thisLesson.id,
            props.route.params.thisLesson.videoSource
          )
        ***REMOVED***
        break
      case 'qv':
        setFellowshipSource(fellowshipLocal)
        setStorySource(storyDummy)
        setTrainingSource(trainingLocal)
        setApplicationSource(applicationLocal)

        // start downloading stuff if it's not downloaded
        if (
          !props.route.params.isDownloaded &&
          !props.route.params.isDownloading
        )
          props.downloadVideo(
            props.route.params.thisLesson.id,
            props.route.params.thisLesson.videoSource
          )
        break
      case 'v':
        changeChapter('training')
        setFellowshipSource(null)
        setStorySource(null)
        setTrainingSource(
          props.route.params.isDownloaded ? trainingLocal : trainingStream
        )
        setApplicationSource(null)
        break
      case 'q':
        setFellowshipSource(fellowshipLocal)
        setStorySource(storyDummy)
        setTrainingSource(null)
        setApplicationSource(applicationLocal)
        break
      case 'a':
        changeChapter('story')
        setFellowshipSource(null)
        setStorySource(
          props.route.params.isDownloaded ? storyLocal : storyStream
        )
        setTrainingSource(null)
        setApplicationSource(null)
        break
    ***REMOVED***
  ***REMOVED***

  // loads an audio file, sets the length, and starts playing it
  async function loadAudioFile (source) {
    try {
      await soundObject
        .loadAsync({ uri: source ***REMOVED***, { progressUpdateIntervalMillis: 1000 ***REMOVED***)
        .then(playbackStatus => {
          setAudioFileLength(playbackStatus.durationMillis)
          soundObject.setStatusAsync({
            progressUpdateIntervalMillis: 1000,
            shouldPlay: true
          ***REMOVED***)
          shouldTickUpdate.current = true
          setIsPlaying(true)
        ***REMOVED***)
    ***REMOVED*** catch (error) {
      console.log(error)
    ***REMOVED***
  ***REMOVED***
  // loads an video file, sets the length, and starts playing it
  // note: basically the same as loadAudioFile()
  async function loadVideoFile (source) {
    try {
      await videoObject
        .loadAsync(
          { uri: trainingSource ***REMOVED***,
          { progressUpdateIntervalMillis: 100 ***REMOVED***
        )
        .then(playbackStatus => {
          setAudioFileLength(playbackStatus.durationMillis)
          videoObject.setStatusAsync({
            progressUpdateIntervalMillis: 1000,
            shouldPlay: true
          ***REMOVED***)
          shouldTickUpdate.current = true
          setIsPlaying(true)
        ***REMOVED***)
    ***REMOVED*** catch (error) {
      console.log(error)
    ***REMOVED***
  ***REMOVED***

  //// UTILITY FUNCTIONS

  // if a download finishes, remove it from download tracker
  useEffect(() => {
    switch (props.route.params.lessonType) {
      case 'qa':
        if (props.downloads[props.route.params.thisLesson.id] === 1)
          props.removeDownload(props.route.params.thisLesson.id)
        break
      case 'qav':
        if (
          props.downloads[props.route.params.thisLesson.id] === 1 &&
          props.downloads[props.route.params.thisLesson.id + 'v'] === 1
        ) {
          props.removeDownload(props.route.params.thisLesson.id)
          props.removeDownload(props.route.params.thisLesson.id + 'v')
        ***REMOVED***
        break
      case 'qv':
      case 'v':
        if (props.downloads[props.route.params.thisLesson.id + 'v'] === 1)
          props.removeDownload(props.route.params.thisLesson.id + 'v')
        break
    ***REMOVED***
  ***REMOVED***, [props.downloads])

  useEffect(() => {
    if (videoObject && trainingSource) {
      loadVideoFile(props.route.params.thisLesson.videoSource)

      // orientation listener to activate full screen when switched to landscape and vice versa
      DeviceMotion.addListener(({ orientation ***REMOVED***) => {
        if (orientation !== screenOrientation) {
          setScreenOrientation(orientation)
        ***REMOVED***
      ***REMOVED***)
    ***REMOVED***
  ***REMOVED***, [videoObject, trainingSource])

  // TODO: load audio file for audio books
  useEffect(() => {
    if (props.route.params.lessonType === 'a' && storySource) {
      loadAudioFile(storySource)
    ***REMOVED***
  ***REMOVED***, [storySource])

  useEffect(() => {
    if (screenOrientation === -90 || screenOrientation === 90) {
      videoObject.presentFullscreenPlayer()
    ***REMOVED***
  ***REMOVED***, [screenOrientation])

  //// PLAYBACK CONTROL FUNCTIONS

  // updates something on every api call to audio object and every second
  soundObject.setOnPlaybackStatusUpdate(playbackStatus => {
    if (playbackStatus.isLoaded) {
      setIsLoaded(true)
    ***REMOVED***

    // depending on what chapter we're on, either jump to the next
    // chapter once we finish or toggle the whole lesson as complete
    if (playbackStatus.didJustFinish) {
      if (activeChapter === 'fellowship') {
        if (!props.route.params.thisLesson.audioSource) {
          changeChapter('story')
          swipeToScripture()
        ***REMOVED*** else if (
          props.downloads[props.route.params.thisLesson.id] ||
          ((props.route.params.lessonType === 'qa' ||
            props.route.params.lessonType === 'qav') &&
            !props.isConnected &&
            !props.route.params.isDownloaded)
        ) {
          swipeToScripture()
        ***REMOVED*** else {
          changeChapter('story')
        ***REMOVED***
      ***REMOVED*** else if (activeChapter === 'story') {
        switch (props.route.params.lessonType) {
          case 'qa':
            if (!props.isDownloading) {
              changeChapter('application')
            ***REMOVED***
            break
          case 'qav':
            if (!props.downloads[props.route.params.thisLesson.id + 'v']) {
              changeChapter('training')
            ***REMOVED***
            break
        ***REMOVED***
      ***REMOVED*** else if (
        activeChapter === 'application' &&
        !props.route.params.thisSetProgress.includes(
          props.route.params.thisLesson.index
        )
      ) {
        changeCompleteStatus()
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***)

  // gets called every second by our timer and updates the seeker position based on the progress through the audio file
  async function updateSeekerTick () {
    if (shouldTickUpdate.current) {
      if (videoObject) {
        try {
          await videoObject.getStatusAsync().then(playbackStatus => {
            setSeekPosition(playbackStatus.positionMillis)
          ***REMOVED***)
          //.catch(err => console.log(err))
        ***REMOVED*** catch (error) {
          console.log(error)
        ***REMOVED***
      ***REMOVED*** else {
        try {
          await soundObject.getStatusAsync().then(playbackStatus => {
            setSeekPosition(playbackStatus.positionMillis)
          ***REMOVED***)
          //.catch(err => console.log(err))
        ***REMOVED*** catch (error) {
          console.log(error)
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  // plays the audio if it's currently paused and pauses the audio if it's currently playing
  function playHandler () {
    if (isLoaded) {
      if (videoObject) {
        updateSeekerTick()
        isPlaying ? videoObject.pauseAsync() : videoObject.playAsync()
      ***REMOVED*** else {
        startPlayPauseAnimation()
        updateSeekerTick()
        isPlaying
          ? soundObject.setStatusAsync({
              progressUpdateIntervalMillis: 1000,
              shouldPlay: false
            ***REMOVED***)
          : soundObject.setStatusAsync({
              progressUpdateIntervalMillis: 1000,
              shouldPlay: true
            ***REMOVED***)
      ***REMOVED***
      setIsPlaying(currentStatus => !currentStatus)
    ***REMOVED***
  ***REMOVED***

  // starts playing loaded audio from the position the user releases the thumb at
  // note: catchs are empty because of a weird ios-only warning appearing
  // that doesn't seem to affect any functionality--it's being ignored
  function onSeekRelease (value) {
    if (videoObject) {
      if (isPlaying) {
        videoObject
          .setStatusAsync({
            shouldPlay: false,
            positionMillis: value,
            seekMillisToleranceBefore: 10000,
            seekMillisToleranceAfter: 10000
          ***REMOVED***)
          .catch(err => {***REMOVED***)
        videoObject
          .setStatusAsync({
            shouldPlay: true,
            positionMillis: value,
            seekMillisToleranceBefore: 10000,
            seekMillisToleranceAfter: 10000
          ***REMOVED***)
          .catch(err => {***REMOVED***)
      ***REMOVED*** else {
        videoObject
          .setStatusAsync({
            shouldPlay: false,
            positionMillis: value,
            seekMillisToleranceBefore: 10000,
            seekMillisToleranceAfter: 10000
          ***REMOVED***)
          .catch(err => {***REMOVED***)
      ***REMOVED***
    ***REMOVED*** else {
      if (isPlaying) {
        soundObject
          .setStatusAsync({
            shouldPlay: false,
            positionMillis: value,
            seekMillisToleranceBefore: 10000,
            seekMillisToleranceAfter: 10000
          ***REMOVED***)
          .catch(err => {***REMOVED***)
        soundObject
          .setStatusAsync({
            shouldPlay: true,
            positionMillis: value,
            seekMillisToleranceBefore: 10000,
            seekMillisToleranceAfter: 10000
          ***REMOVED***)
          .catch(err => {***REMOVED***)
      ***REMOVED*** else {
        soundObject
          .setStatusAsync({
            shouldPlay: false,
            positionMillis: value,
            seekMillisToleranceBefore: 10000,
            seekMillisToleranceAfter: 10000
          ***REMOVED***)
          .catch(err => {***REMOVED***)
      ***REMOVED***
    ***REMOVED***

    shouldTickUpdate.current = true
    setSeekPosition(value)
  ***REMOVED***

  // sets shouldTickUpdate to flase to prevent the seeker from updating while dragging
  function onSeekDrag (value) {
    shouldTickUpdate.current = false
  ***REMOVED***

  // skips an amount of milliseconds through the audio track
  function skip (amount) {
    if (videoObject) {
      isPlaying
        ? videoObject.setStatusAsync({
            shouldPlay: true,
            positionMillis: seekPosition + amount
          ***REMOVED***)
        : videoObject.setStatusAsync({
            shouldPlay: false,
            positionMillis: seekPosition + amount
          ***REMOVED***)
    ***REMOVED*** else {
      isPlaying
        ? soundObject.setStatusAsync({
            shouldPlay: true,
            positionMillis: seekPosition + amount
          ***REMOVED***)
        : soundObject.setStatusAsync({
            shouldPlay: false,
            positionMillis: seekPosition + amount
          ***REMOVED***)
    ***REMOVED***
    setSeekPosition(seekPosition => seekPosition + amount)
  ***REMOVED***

  // changes the active chapter
  function changeChapter (chapter) {
    if (chapter !== activeChapter) {
      soundObject.unloadAsync()
      shouldTickUpdate.current = false
      if (chapter === 'fellowship') {
        setSeekPosition(0)
        loadAudioFile(fellowshipSource)
      ***REMOVED*** else if (chapter === 'story') {
        setSeekPosition(0)
        if (storySource) {
          loadAudioFile(storySource)
        ***REMOVED***
        // auto scroll to scripture if
        //  1. there's no audio source
        //  2. we're currently downloading the lesson
        //  3. there's an audio source, it's not downloading, and there's no internet
        if (!props.route.params.thisLesson.audioSource) swipeToScripture()
      ***REMOVED*** else if (chapter === 'application') {
        setSeekPosition(0)
        loadAudioFile(applicationSource)
      ***REMOVED*** else if (chapter === 'training') {
        setIsLoaded(false)
        setSeekPosition(0)
      ***REMOVED***
      setActiveChapter(chapter)
    ***REMOVED***
  ***REMOVED***

  function swipeToScripture () {
    if (albumArtSwiperRef)
      albumArtSwiperRef.scrollToIndex({
        animated: true,
        viewPosition: 0.5,
        viewOffset: -Dimensions.get('screen').width,
        index: 0
      ***REMOVED***)
  ***REMOVED***

  //// OTHER FUNCTIONS

  // switches the complete status of a lesson to the opposite of its current status
  // and alerts the user of the change
  function changeCompleteStatus () {
    props.toggleComplete(
      props.activeGroup.name,
      props.route.params.thisSet,
      props.route.params.thisLesson.index
    )

    if (
      props.route.params.thisSetProgress.includes(
        props.route.params.thisLesson.index
      )
    ) {
      Alert.alert(
        props.translations.play.popups.marked_as_incomplete_title,
        props.translations.play.popups.marked_as_incomplete_message,
        [
          {
            text: props.translations.general.ok,
            onPress: () => props.navigation.goBack()
          ***REMOVED***
        ]
      )
    ***REMOVED*** else {
      Alert.alert(
        props.translations.play.popups.marked_as_complete_title,
        props.translations.play.popups.marked_as_complete_message,
        [
          {
            text: props.translations.general.ok,
            onPress: () => props.navigation.goBack()
          ***REMOVED***
        ]
      )
    ***REMOVED***
  ***REMOVED***

  function startPlayPauseAnimation () {
    setAnimationZIndex(2)
    Animated.sequence([
      Animated.timing(playOpacity, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true
      ***REMOVED***),
      Animated.timing(playOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      ***REMOVED***)
    ]).start(() => setAnimationZIndex(0))
  ***REMOVED***

  //// RENDER

  var titleSection = (
    <View style={styles.titlesContainer***REMOVED***>
      <Text
        style={Typography(props, 'h2', 'black', 'center', colors.shark)***REMOVED***
        numberOfLines={1***REMOVED***
      >
        {props.route.params.thisLesson.title***REMOVED***
      </Text>
    </View>
  )

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.topHalfContainer***REMOVED***>
        {props.route.params.lessonType === 'a' ? null : titleSection***REMOVED***

        {/* MIDDLE SECTION */***REMOVED***
        {props.route.params.lessonType === 'a' ? (
          <BookView
            thisLesson={props.route.params.thisLesson***REMOVED***
            titleSection={titleSection***REMOVED***
          />
        ) : activeChapter === 'training' ? (
          <VideoPlayer
            setVideoObject={setVideoObject***REMOVED***
            setIsLoaded={setIsLoaded***REMOVED***
            setIsPlaying={setIsPlaying***REMOVED***
            setIsVideoBuffering={setIsVideoBuffering***REMOVED***
            changeChapter={changeChapter***REMOVED***
            isLoaded={isLoaded***REMOVED***
          />
        ) : (
          <AlbumArtSwiper
            setAlbumArtSwiperRef={setAlbumArtSwiperRef***REMOVED***
            iconName={props.route.params.thisSet.iconName***REMOVED***
            thisLesson={props.route.params.thisLesson***REMOVED***
            playHandler={playHandler***REMOVED***
            playOpacity={playOpacity***REMOVED***
            animationZIndex={animationZIndex***REMOVED***
            isPlaying={isPlaying***REMOVED***
          />
        )***REMOVED***
      </View>

      {/* AUDIO CONTROLS */***REMOVED***
      {isLoaded ? (
        <View style={styles.audioControlContainer***REMOVED***>
          {props.route.params.lessonType !== 'v' &&
          props.route.params.lessonType !== 'a' ? (
            <ChapterSelect
              activeChapter={activeChapter***REMOVED***
              lessonID={props.route.params.thisLesson.id***REMOVED***
              onPress={chapter => changeChapter(chapter)***REMOVED***
              lessonType={props.route.params.lessonType***REMOVED***
              isDownloaded={props.route.params.isDownloaded***REMOVED***
            />
          ) : null***REMOVED***
          <Scrubber
            value={seekPosition***REMOVED***
            onSlidingComplete={onSeekRelease***REMOVED***
            onValueChange={onSeekDrag***REMOVED***
            maximumValue={audioFileLength***REMOVED***
            seekPosition={seekPosition***REMOVED***
          />
          <PlayPauseSkip
            isPlaying={isPlaying***REMOVED***
            isVideoBuffering={isVideoBuffering***REMOVED***
            onPlayPress={playHandler***REMOVED***
            onSkipPress={value => {
              skip(value)
            ***REMOVED******REMOVED***
          />
        </View>
      ) : (
        <View style={styles.audioControlContainer***REMOVED***>
          <ActivityIndicator size='large' color={colors.shark***REMOVED*** />
        </View>
      )***REMOVED***

      {/* MODALS */***REMOVED***
      <ShareModal
        isVisible={showShareLessonModal***REMOVED***
        hideModal={() => setShowShareLessonModal(false)***REMOVED***
        closeText={props.translations.general.close***REMOVED***
        lesson={props.route.params.thisLesson***REMOVED***
        lessonType={props.route.params.lessonType***REMOVED***
        set={props.route.params.thisSet***REMOVED***
      />
      <HomeworkModal
        isVisible={showHomeworkModal***REMOVED***
        hideModal={() => setShowHomeworkModal(false)***REMOVED***
        homework={props.route.params.thisLesson.homework***REMOVED***
      />
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    backgroundColor: colors.white
  ***REMOVED***,
  topHalfContainer: {
    justifyContent: 'space-evenly',
    flex: 1
  ***REMOVED***,
  titlesContainer: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    paddingHorizontal: 20
  ***REMOVED***,
  albumArtContainer: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').width - 80,
    borderRadius: 10,
    backgroundColor: colors.porcelain,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: colors.chateau,
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  audioControlContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '33%'
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    database: state.database,
    activeGroup: activeGroup,
    activeDatabase: state.database[activeGroup.language],
    translations: state.database[activeGroup.language].translations,
    downloads: state.downloads,
    primaryColor: state.database[activeGroup.language].primaryColor,
    isRTL: state.database[activeGroup.language].isRTL,
    font: state.database[activeGroup.language].font,
    isConnected: state.network.isConnected
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    toggleComplete: (groupName, set, lessonIndex) => {
      dispatch(toggleComplete(groupName, set, lessonIndex))
    ***REMOVED***,
    downloadLesson: (lessonID, source) => {
      dispatch(downloadLesson(lessonID, source))
    ***REMOVED***,
    downloadVideo: (lessonID, source) => {
      dispatch(downloadVideo(lessonID, source))
    ***REMOVED***,
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen)
