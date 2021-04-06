import useInterval from '@use-it/interval'
import { Audio, Video ***REMOVED*** from 'expo-av'
import * as FileSystem from 'expo-file-system'
import { useKeepAwake ***REMOVED*** from 'expo-keep-awake'
import { LinearGradient ***REMOVED*** from 'expo-linear-gradient'
import { DeviceMotion ***REMOVED*** from 'expo-sensors'
import React, { useEffect, useRef, useState ***REMOVED*** from 'react'
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  View
***REMOVED*** from 'react-native'
import TextTicker from 'react-native-text-ticker'
import { connect ***REMOVED*** from 'react-redux'
import AlbumArtSwiper from '../components/AlbumArtSwiper'
import BookView from '../components/BookView'
import ChapterSelector from '../components/ChapterSelector'
import PlaybackControls from '../components/PlaybackControls'
import PlayScreenHeaderButtons from '../components/PlayScreenHeaderButtons'
import Scrubber from '../components/Scrubber'
import BackButton from '../components/standard/BackButton'
import VideoPlayer from '../components/VideoPlayer'
import { getLessonInfo, lockPortrait, scaleMultiplier ***REMOVED*** from '../constants'
import MessageModal from '../modals/MessageModal'
import ShareModal from '../modals/ShareModal'
import { downloadMedia, removeDownload ***REMOVED*** from '../redux/actions/downloadActions'
import { toggleComplete ***REMOVED*** from '../redux/actions/groupsActions'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    database: state.database,
    activeGroup: activeGroupSelector(state),
    activeDatabase: activeDatabaseSelector(state),
    translations: activeDatabaseSelector(state).translations,
    downloads: state.downloads,
    primaryColor: activeDatabaseSelector(state).primaryColor,
    isRTL: activeDatabaseSelector(state).isRTL,
    font: getLanguageFont(activeGroupSelector(state).language),
    isConnected: state.network.isConnected
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    toggleComplete: (groupName, set, lessonIndex) => {
      dispatch(toggleComplete(groupName, set, lessonIndex))
    ***REMOVED***,
    downloadMedia: (type, lessonID, source) => {
      dispatch(downloadMedia(type, lessonID, source))
    ***REMOVED***,
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

/**
 * A screen where the user listens to (or watches) the different parts of a lesson.
 * @param {Object***REMOVED*** thisLesson - The object for the lesson that the user has selected to do.
 * @param {Object***REMOVED*** thisSet - The object for the set that thisLesson is a part of.
 * @param {boolean***REMOVED*** isDownloaded - Whether this lesson has its Story audio file already downloaded or not.
 * @param {boolean***REMOVED*** isDownloading - Whether the
 */
const PlayScreen = ({
  // Props passed from navigation.
  navigation: { goBack, setOptions, isFocused ***REMOVED***,
  route: {
    // Props passed from previous screen.
    params: { thisLesson, thisSet, isDownloaded, isDownloading, lessonType ***REMOVED***
  ***REMOVED***,
  // Props passed from redux.
  database,
  activeGroup,
  activeDatabase,
  translations,
  downloads,
  primaryColor,
  isRTL,
  font,
  isConnected,
  toggleComplete,
  downloadMedia,
  removeDownload
***REMOVED***) => {
  /** Keeps the screen from auto-dimming or auto-locking. */
  useKeepAwake()

  /** Interval that updates the scrubber every second. */
  useInterval(updateThumb, 1000)

  // Path for the file system directory for convenience.
  const path = FileSystem.documentDirectory

  /** State for audio object. */
  const [audio, setAudio] = useState(new Audio.Sound())

  /** State for video object. */
  const [video, setVideo] = useState()

  /** Stores the length of the current media file in ms. */
  const [mediaLength, setMediaLength] = useState(null)

  /** Keeps track of whether the media file is loaded. */
  const [isMediaLoaded, setIsMediaLoaded] = useState(false)

  /** Keeps track of whether the media file is currently playing or paused. */
  const [isMediaPlaying, setIsMediaPlaying] = useState(false)

  /** Keeps track of the current position of the seeker in ms. */
  const [seekPosition, setSeekPosition] = useState(0)

  /** Keeps track of whether the seeker should update every second. Note: only time it shouldn't is during seeking, skipping, or loading a new chapter. */
  const shouldThumbUpdate = useRef(false)

  //+ CHAPTER SOURCES STATE

  /** Keeps track of the currently playing chapter. Options are 'fellowship', 'story', 'training', or 'application'. */
  const [activeChapter, setActiveChapter] = useState('fellowship')

  /** Local source for fellowship chapter audio file. */
  const [fellowshipSource, setFellowshipSource] = useState()

  /** Local source for fellowship chapter audio file. */
  const [storySource, setStorySource] = useState()

  /** Local or remote source for fellowship chapter video file. */
  const [trainingSource, setTrainingSource] = useState()

  /** Local source for fellowship chapter audio file. */
  const [applicationSource, setApplicationSource] = useState()

  const [potentialSources, setPotentialSources] = useState({
    fellowshipLocal: `${path***REMOVED***${activeGroup.language***REMOVED***-${thisLesson.fellowshipType***REMOVED***.mp3`,
    applicationLocal: `${path***REMOVED***${activeGroup.language***REMOVED***-${thisLesson.applicationType***REMOVED***.mp3`,
    storyLocal: `${path***REMOVED***${thisLesson.id***REMOVED***.mp3`,
    storyStream: getLessonInfo('audioSource', thisLesson.id),
    storyDummy: `${path***REMOVED***${activeGroup.language***REMOVED***-dummy-story.mp3`,
    trainingLocal: `${path***REMOVED***${thisLesson.id***REMOVED***v.mp4`,
    trainingStream: getLessonInfo('videoSource', thisLesson.id)
  ***REMOVED***)

  //+ MISCELLANEOUS STATE

  /** An object to store the progress of the set this lesson is a part of. */
  const [thisSetProgress, setThisSetProgress] = useState([])

  /** Stores the opacity of the play button that pops up on play/pause press. */
  const [playOpacity, setPlayOpacity] = useState(new Animated.Value(0))

  /** Stores the z-index of the play button that pops up on play/pause press. */
  const [animationZIndex, setAnimationZIndex] = useState(0)

  /** Reference for the AlbumArtSwiper component. */
  const [albumArtSwiperRef, setAlbumArtSwiperRef] = useState()

  /** Keeps track of whether the lesson share modal is visible. */
  const [showShareLessonModal, setShowShareLessonModal] = useState(false)

  /** Keeps track of whether the set complete share modal is visible. */
  const [showSetCompleteModal, setShowSetCompleteModal] = useState(false)

  /** Keeps track of the current fullscreen status for videos. */
  const [fullscreenStatus, setFullscreenStatus] = useState(
    Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS
  )

  /** Keeps track of the device rotation in an object (alpha, beta, and gamma). */
  const [deviceRotation, setDeviceRotation] = useState({***REMOVED***)

  const [shouldAutoPlay, setShouldAutoPlay] = useState(false)

  function getNavOptions () {
    return {
      headerTitle: getLessonInfo('subtitle', thisLesson.id),
      headerRight: isRTL
        ? () => (
            <BackButton
              onPress={() => {
                lockPortrait(() => {***REMOVED***)
                goBack()
              ***REMOVED******REMOVED***
            />
          )
        : () => (
            <PlayScreenHeaderButtons
              shareOnPress={() => setShowShareLessonModal(true)***REMOVED***
              completeOnPress={changeCompleteStatus***REMOVED***
              completeCondition={thisSetProgress.includes(
                getLessonInfo('index', thisLesson.id)
              )***REMOVED***
            />
          ),
      headerLeft: isRTL
        ? () => (
            <PlayScreenHeaderButtons
              shareOnPress={() => setShowShareLessonModal(true)***REMOVED***
              completeOnPress={changeCompleteStatus***REMOVED***
              completeCondition={thisSetProgress.includes(
                getLessonInfo('index', thisLesson.id)
              )***REMOVED***
            />
          )
        : () => (
            <BackButton
              onPress={() => {
                lockPortrait(() => {***REMOVED***)
                goBack()
              ***REMOVED******REMOVED***
            />
          )
    ***REMOVED***
  ***REMOVED***

  /**
   * useEffect function that sets the navigation options for this screen. Dependent on thisSetProgress because we want to update the complete button whenever the complete status of this lesson changes.
   */
  useEffect(() => {
    setOptions(getNavOptions())
  ***REMOVED***, [thisSetProgress])

  /**
   * useEffect function that enters fullscreen mode when the video component is present, the video source is loaded, we're on ios (this feature doesn't work on android), and the device rotation matches that of landscape.
   * @function
   */
  useEffect(() => {
    if (deviceRotation && Platform.OS === 'ios') {
      if (fullscreenStatus === Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS) {
        if (
          video &&
          trainingSource &&
          deviceRotation &&
          (deviceRotation.alpha > 1 || deviceRotation.alpha < -1) &&
          (deviceRotation.gamma > 0.7 || deviceRotation.gamma < -0.7) &&
          deviceRotation.beta > -0.2 &&
          deviceRotation.beta < 0.2
        )
          video.presentFullscreenPlayer()
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [deviceRotation, video, trainingSource])

  /**
   * useEffect function that updates the thisSetProgress state variable with the most updated version of the progress of the set that this lesson is a part of.
   * @function
   */
  useEffect(() => {
    setThisSetProgress(
      activeGroup.addedSets.filter(set => set.id === thisSet.id)[0].progress
    )
  ***REMOVED***, [activeGroup.addedSets])

  /** useEffect function that adds a device motion listener on iOS devices. This is so that the app can automatically enter fullscreen when the user rotates their phone. */
  useEffect(() => {
    // check if we can get any device motion data and if so, add a listener
    if (Platform.OS === 'ios') {
      DeviceMotion.isAvailableAsync().then(isAvailable => {
        if (isAvailable) {
          DeviceMotion.setUpdateInterval(1000)
          DeviceMotion.addListener(({ rotation ***REMOVED***) => {
            setDeviceRotation(rotation)
          ***REMOVED***)
        ***REMOVED***
      ***REMOVED***)
    ***REMOVED***
  ***REMOVED***, [])

  /**
   * useEffect function that acts as a constructor to set the sources for the various chapters, enable the device rotation listener, and upon exiting the screen, unloading the audio/video files.
   * @function
   */
  useEffect(() => {
    // set sources and download stuff if we need to
    setSources()

    // when leaving the screen, cancel the interval timer and unload the audio
    //  file
    return async function cleanup () {
      if (audio) {
        setAudio(null)
        await audio.unloadAsync()
      ***REMOVED***

      if (video) {
        setVideo(null)
        await video.unloadAsync()
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [])

  //+ LOADING FUNCTIONS

  /**
   * Sets all the source state files appropriately based on the lesson type and what is downloaded.
   */
  function setSources () {
    switch (lessonType) {
      case 'qa':
        setFellowshipSource(potentialSources.fellowshipLocal)
        setStorySource(potentialSources.storyLocal)
        setTrainingSource(null)
        setApplicationSource(potentialSources.applicationLocal)

        if (!isDownloaded && !isDownloading)
          downloadMedia(
            'audio',
            thisLesson.id,
            getLessonInfo('audioSource', thisLesson.id)
          )
        break
      case 'qav':
        setFellowshipSource(potentialSources.fellowshipLocal)
        setStorySource(potentialSources.storyLocal)
        setTrainingSource(potentialSources.trainingLocal)
        setApplicationSource(potentialSources.applicationLocal)

        if (!isDownloaded && !isDownloading) {
          downloadMedia(
            'audio',
            thisLesson.id,
            getLessonInfo('audioSource', thisLesson.id)
          )
          downloadMedia(
            'video',
            thisLesson.id,
            getLessonInfo('videoSource', thisLesson.id)
          )
        ***REMOVED***
        break
      case 'qv':
        setFellowshipSource(potentialSources.fellowshipLocal)
        setStorySource(potentialSources.storyDummy)
        setTrainingSource(potentialSources.trainingLocal)
        setApplicationSource(potentialSources.applicationLocal)

        if (!isDownloaded && !isDownloading)
          downloadMedia(
            'video',
            thisLesson.id,
            getLessonInfo('videoSource', thisLesson.id)
          )
        break
      case 'v':
        changeChapter('training')
        setFellowshipSource(null)
        setStorySource(null)
        setTrainingSource(
          isDownloaded
            ? potentialSources.trainingLocal
            : potentialSources.trainingStream
        )
        setApplicationSource(null)
        break
      case 'q':
        setFellowshipSource(potentialSources.fellowshipLocal)
        setStorySource(potentialSources.storyDummy)
        setTrainingSource(null)
        setApplicationSource(potentialSources.applicationLocal)
        break
      case 'a':
        changeChapter('story')
        setFellowshipSource(null)
        setStorySource(
          isDownloaded
            ? potentialSources.storyLocal
            : potentialSources.storyStream
        )
        setTrainingSource(null)
        setApplicationSource(null)
        break
    ***REMOVED***
  ***REMOVED***

  /**
   * useEffect function that loads the fellowship audio once we have a fellowship source set. We have this only for fellowship because the changeChapter function handles any chapter changes passed the initial load.
   * @function
   */
  //- once we set a chapter 1 source, load it up
  useEffect(() => {
    if (fellowshipSource) {
      loadMedia('audio', fellowshipSource)
    ***REMOVED***
  ***REMOVED***, [fellowshipSource])

  /**
   * useEffect function that reloads the streaming video file if we end up going offline and come online again.
   * @function
   */
  useEffect(() => {
    if (lessonType === 'v')
      if (isConnected && !isMediaLoaded && trainingSource)
        loadMedia('video', trainingSource)
  ***REMOVED***, [isConnected])

  /**
   * Loads audio or video for playing.
   * @param type - The type of media--either audio or video.
   * @param source - The local or remote source of the media to load.
   */
  async function loadMedia (type, source) {
    var media = type === 'video' ? video : audio
    try {
      await media
        .loadAsync({ uri: source ***REMOVED***, { progressUpdateIntervalMillis: 1000 ***REMOVED***)
        .then(playbackStatus => {
          setMediaLength(playbackStatus.durationMillis)
          media.setStatusAsync({
            progressUpdateIntervalMillis: 1000,
            shouldPlay: shouldAutoPlay ? true : false
          ***REMOVED***)
          shouldThumbUpdate.current = true
          if (shouldAutoPlay) setIsMediaPlaying(true)
          else setIsMediaPlaying(false)
        ***REMOVED***)
    ***REMOVED*** catch (error) {
      console.log(error)
    ***REMOVED***
    if (!shouldAutoPlay) setShouldAutoPlay(true)
  ***REMOVED***

  /**
   * useEffect function that loads the video file once we have our video object and training chapter source set.
   * @function
   */
  useEffect(() => {
    if (video && trainingSource) {
      loadMedia('video', trainingSource)
    ***REMOVED***
  ***REMOVED***, [video, trainingSource])

  /**
   * useEffect function that loads the story chapter file once the story source is set. For audiobook lessons only. In every other case, we load the fellowship chapter first.
   * @function
   */
  useEffect(() => {
    if (lessonType === 'a' && storySource) {
      loadMedia('audio', storySource)
    ***REMOVED***
  ***REMOVED***, [storySource])

  //+ PLAYBACK CONTROL FUNCTIONS

  /**
   * Plays the audio if it's currently paused and pauses the audio if it's currently playing.
   */
  function playHandler () {
    var media = video ? video : audio
    media.action = isMediaPlaying ? media.pauseAsync : media.playAsync

    setIsMediaPlaying(currentStatus => !currentStatus)
    startPlayPauseAnimation()
    updateThumb()

    // only play/pause if we're loaded
    if (isMediaLoaded) {
      media.action()
    ***REMOVED***
  ***REMOVED***

  /**
   * Plays media from a specified location
   * @param value - The location to start playing from.
   */
  function playFromLocation (value) {
    console.log(value)
    shouldThumbUpdate.current = false
    setSeekPosition(value)

    var media = video ? video : audio
    // only play/pause if we're loaded
    if (isMediaLoaded) {
      media
        .setStatusAsync({
          shouldPlay: isMediaPlaying ? true : false,
          positionMillis: value
        ***REMOVED***)
        .then(() => {
          shouldThumbUpdate.current = true
        ***REMOVED***)
    ***REMOVED***
  ***REMOVED***

  //- starts the animation for the play button over the album art pane
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

  //- gets called every second by our timer and updates the seeker position based on the progress through the media file
  async function updateThumb () {
    var media = video ? video : audio

    // only update our seeker position if our state allows
    if (shouldThumbUpdate.current) {
      // get the current progress through the media and update state
      await media
        .getStatusAsync()
        .then(playbackStatus => {
          setSeekPosition(playbackStatus.positionMillis)
        ***REMOVED***)
        .catch(error => console.log(error))
    ***REMOVED***
  ***REMOVED***

  /**
   * Changes the active chapter and loads its media file.
   * @param chapter
   */
  function changeChapter (chapter) {
    if (chapter !== activeChapter) {
      audio.unloadAsync()
      shouldThumbUpdate.current = false
      if (chapter === 'fellowship') {
        lockPortrait(() => {***REMOVED***)
        setSeekPosition(0)
        loadMedia('audio', fellowshipSource)
      ***REMOVED*** else if (chapter === 'story') {
        lockPortrait(() => {***REMOVED***)
        setSeekPosition(0)
        if (storySource) {
          loadMedia('audio', storySource)
        ***REMOVED***
        // auto scroll to scripture if
        //  1. there's no audio source
        //  2. we're currently downloading the lesson
        //  3. there's an audio source, it's not downloading, and there's no
        //    internet
        if (!thisLesson.hasAudio) swipeToScripture()
      ***REMOVED*** else if (chapter === 'application') {
        lockPortrait(() => {***REMOVED***)
        setSeekPosition(0)
        loadMedia('audio', applicationSource)
      ***REMOVED*** else if (chapter === 'training') {
        setIsMediaLoaded(false)
        setSeekPosition(0)
      ***REMOVED***
      setActiveChapter(chapter)
    ***REMOVED***
  ***REMOVED***

  /**
   * Updates on every api call to the audio object as well as every second. Covers the automatic switch of one chapter to the next and marking a lesson as complete at the finish of the last chapter.
   * @function
   */
  audio.setOnPlaybackStatusUpdate(playbackStatus => {
    if (playbackStatus.isLoaded) {
      setIsMediaLoaded(true)
    ***REMOVED***

    // depending on what chapter we're on, either jump to the next
    //  chapter once we finish or toggle the whole lesson as complete
    if (playbackStatus.didJustFinish) {
      if (activeChapter === 'fellowship') {
        if (!thisLesson.hasAudio) {
          changeChapter('story')
          swipeToScripture()
        ***REMOVED*** else if (
          downloads[thisLesson.id] ||
          ((lessonType === 'qa' || lessonType === 'qav') &&
            !isConnected &&
            !isDownloaded)
        ) {
          swipeToScripture()
        ***REMOVED*** else {
          changeChapter('story')
        ***REMOVED***
      ***REMOVED*** else if (activeChapter === 'story') {
        switch (lessonType) {
          case 'qa':
            if (!isDownloading) {
              setTimeout(() => changeChapter('application'), 1000)
            ***REMOVED***
            break
          case 'qav':
            if (!downloads[thisLesson.id + 'v']) {
              setTimeout(() => changeChapter('training'), 1000)
            ***REMOVED***
            break
          case 'a':
            if (
              !thisSetProgress.includes(getLessonInfo('index', thisLesson.id))
            ) {
              changeCompleteStatus()
            ***REMOVED***
        ***REMOVED***
      ***REMOVED*** else if (
        activeChapter === 'application' &&
        !thisSetProgress.includes(getLessonInfo('index', thisLesson.id))
      ) {
        changeCompleteStatus()
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***)

  //- pause lesson if we move to a different screen (i.e. when switching to
  //-   splash / game for security mode)
  /**
   * useEffect function that automatically pauses the media when the play screen becomes unfocused.
   * @function
   */
  useEffect(() => {
    if (isMediaPlaying) playHandler()
  ***REMOVED***, [isFocused()])

  //+ OTHER FUNCTIONS

  /**
   * Scrolls the album art swiper to the scripture pane.
   */
  function swipeToScripture () {
    if (albumArtSwiperRef) albumArtSwiperRef.snapToItem(2)
  ***REMOVED***

  //- if a download finishes, remove it from download tracker
  /**
   * useEffect function that removes a download record from the download tracker redux object once it's finished. Removes audio and video download records when necessary.
   * @function
   */
  useEffect(() => {
    switch (lessonType) {
      case 'qa':
        if (downloads[thisLesson.id] && downloads[thisLesson.id].progress === 1)
          removeDownload(thisLesson.id)
        break
      case 'qav':
        if (
          downloads[thisLesson.id] &&
          downloads[thisLesson.id + 'v'] &&
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

  /**
   * Switches the complete status of a lesson to the opposite of its current status and alerts the user of the change. Also shows the set complete modal if this is the last lesson to complete in a story set.
   */
  function changeCompleteStatus () {
    lockPortrait(() => {***REMOVED***)
    toggleComplete(
      activeGroup.name,
      thisSet,
      getLessonInfo('index', thisLesson.id)
    )

    // update the nav options since our header button has changed
    setOptions(getNavOptions())

    if (checkForFullyComplete()) {
      setShowSetCompleteModal(true)
    ***REMOVED*** else {
      if (!thisSetProgress.includes(getLessonInfo('index', thisLesson.id))) {
        Alert.alert(
          translations.play.popups.marked_as_complete_title,
          translations.play.popups.marked_as_complete_message,
          [
            {
              text: translations.general.ok,
              onPress: () => goBack()
            ***REMOVED***
          ]
        )
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  /**
   * Checks if the set that this lesson is a part of is fully completed.
   * @returns true if the set is fully complete and false if it's not.
   */
  function checkForFullyComplete () {
    if (
      activeGroup.addedSets.filter(set => set.id === thisSet.id)[0].progress
        .length /
        (thisSet.lessons.length - 1) ===
      1
    ) {
      return true
    ***REMOVED*** else return false
  ***REMOVED***

  //+ RENDER

  /** The title section at the top of the screen. Only hidden on audio book lessons to make more room for the book viewer. */
  var titleSection = (
    <View style={styles.titleContainer***REMOVED***>
      <TextTicker
        style={[
          StandardTypography(
            { font, isRTL ***REMOVED***,
            'h3',
            'Black',
            'center',
            colors.shark
          ),
          { paddingHorizontal: 20 ***REMOVED***
        ]***REMOVED***
        marqueeDelay={2000***REMOVED***
        bounceSpeed={300***REMOVED***
        isRTL={isRTL***REMOVED***
      >
        {thisLesson.title***REMOVED***
        {/* Suuuuuuuuuuuuuuuper long lesson title is slightly too long */***REMOVED***
      </TextTicker>
      <LinearGradient
        colors={[colors.white, colors.white + '00']***REMOVED***
        start={[0, 1]***REMOVED***
        end={[1, 1]***REMOVED***
        style={styles.leftGradient***REMOVED***
      />
      <View style={styles.leftGradientFiller***REMOVED*** />
      <LinearGradient
        colors={[colors.white, colors.white + '00']***REMOVED***
        start={[1, 0]***REMOVED***
        end={[0, 0]***REMOVED***
        style={styles.rightGradient***REMOVED***
      />
      <View style={styles.rightGradientFiller***REMOVED*** />
    </View>
  )

  return (
    <View style={styles.screen***REMOVED***>
      <View
        style={[
          styles.topHalfContainer,
          {
            marginBottom: lessonType === '' ? 10 : 0
          ***REMOVED***
        ]***REMOVED***
      >
        {/* don't display title section on audio book lessons */***REMOVED***
        {lessonType !== 'a' && lessonType !== '' ? titleSection : null***REMOVED***

        {/* 
          MIDDLE SECTION 
          1. book reading view for audio book lessons
          2. video player for lessons with videos
          3. album art swiper to display album art, scripture, and questions
        */***REMOVED***
        {lessonType === 'a' || lessonType === '' ? (
          <BookView thisLesson={thisLesson***REMOVED*** titleSection={titleSection***REMOVED*** />
        ) : activeChapter === 'training' ? (
          <VideoPlayer
            videoSource={trainingSource***REMOVED***
            setVideo={setVideo***REMOVED***
            video={video***REMOVED***
            setIsMediaLoaded={setIsMediaLoaded***REMOVED***
            setIsMediaPlaying={setIsMediaPlaying***REMOVED***
            // setIsVideoBuffering={setIsVideoBuffering***REMOVED***
            changeChapter={changeChapter***REMOVED***
            isMediaLoaded={isMediaLoaded***REMOVED***
            lessonType={lessonType***REMOVED***
            isComplete={thisSetProgress.includes(
              getLessonInfo('index', thisLesson.id)
            )***REMOVED***
            changeCompleteStatus={changeCompleteStatus***REMOVED***
            setFullScreenStatus={status => setFullscreenStatus(status)***REMOVED***
            fullscreenStatus={fullscreenStatus***REMOVED***
          />
        ) : (
          <AlbumArtSwiper
            setAlbumArtSwiperRef={setAlbumArtSwiperRef***REMOVED***
            iconName={thisSet.iconName***REMOVED***
            thisLesson={thisLesson***REMOVED***
            playHandler={playHandler***REMOVED***
            playOpacity={playOpacity***REMOVED***
            animationZIndex={animationZIndex***REMOVED***
            isMediaPlaying={isMediaPlaying***REMOVED***
          />
        )***REMOVED***
      </View>

      {/* AUDIO CONTROLS */***REMOVED***
      {lessonType !== '' ? (
        isMediaLoaded ? (
          <SafeAreaView style={styles.audioControlContainer***REMOVED***>
            {lessonType !== 'v' && lessonType !== 'a' ? (
              <ChapterSelector
                activeChapter={activeChapter***REMOVED***
                lessonID={thisLesson.id***REMOVED***
                onPress={chapter => changeChapter(chapter)***REMOVED***
                lessonType={lessonType***REMOVED***
                isDownloaded={isDownloaded***REMOVED***
              />
            ) : null***REMOVED***
            <Scrubber
              value={seekPosition***REMOVED***
              onSlidingComplete={playFromLocation***REMOVED***
              onValueChange={() => (shouldThumbUpdate.current = false)***REMOVED***
              maximumValue={mediaLength***REMOVED***
              seekPosition={seekPosition***REMOVED***
            />
            <PlaybackControls
              isMediaPlaying={isMediaPlaying***REMOVED***
              onPlayPress={playHandler***REMOVED***
              onSkipPress={value => {
                playFromLocation(seekPosition + value)
              ***REMOVED******REMOVED***
            />
          </SafeAreaView>
        ) : (
          <SafeAreaView style={styles.audioControlContainer***REMOVED***>
            <ActivityIndicator size='large' color={colors.shark***REMOVED*** />
          </SafeAreaView>
        )
      ) : null***REMOVED***

      {/* Modals */***REMOVED***
      <ShareModal
        isVisible={showShareLessonModal***REMOVED***
        hideModal={() => setShowShareLessonModal(false)***REMOVED***
        closeText={translations.general.close***REMOVED***
        lesson={thisLesson***REMOVED***
        lessonType={lessonType***REMOVED***
        set={thisSet***REMOVED***
      />
      <MessageModal
        isVisible={showSetCompleteModal***REMOVED***
        hideModal={() => setShowSetCompleteModal(false)***REMOVED***
        title={translations.general.popups.set_complete_title***REMOVED***
        body={translations.general.popups.set_complete_message***REMOVED***
        confirmText={translations.general.got_it***REMOVED***
        confirmOnPress={() => {
          setShowSetCompleteModal(false)
          goBack()
        ***REMOVED******REMOVED***
      >
        <Image
          source={require('../assets/gifs/set_complete.gif')***REMOVED***
          style={{
            height: 200 * scaleMultiplier,
            margin: 20,
            // padding: 20,
            resizeMode: 'contain'
          ***REMOVED******REMOVED***
        />
      </MessageModal>
    </View>
  )
***REMOVED***

//+ STYLES

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
  audioControlContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '33%'
  ***REMOVED***,
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10 * scaleMultiplier
  ***REMOVED***,
  rightGradient: {
    position: 'absolute',
    right: 0,
    width: 15,
    height: '100%',
    marginHorizontal: 10
  ***REMOVED***,
  leftGradient: {
    position: 'absolute',
    left: 0,
    width: 15,
    height: '100%',
    marginHorizontal: 10
  ***REMOVED***,
  rightGradientFiller: {
    position: 'absolute',
    right: 0,
    width: 10,
    height: '100%',
    backgroundColor: colors.white
  ***REMOVED***,
  leftGradientFiller: {
    position: 'absolute',
    left: 0,
    width: 10,
    height: '100%',
    backgroundColor: colors.white
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen)

/* <HomeworkModal
        isVisible={showHomeworkModal***REMOVED***
        hideModal={() => setShowHomeworkModal(false)***REMOVED***
        homework={thisLesson.homework***REMOVED***
/> */
