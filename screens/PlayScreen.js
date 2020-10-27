import useInterval from '@use-it/interval'
import { Audio, Video ***REMOVED*** from 'expo-av'
import * as FileSystem from 'expo-file-system'
import { useKeepAwake ***REMOVED*** from 'expo-keep-awake'
import * as ScreenOrientation from 'expo-screen-orientation'
import { DeviceMotion ***REMOVED*** from 'expo-sensors'
import React, { useEffect, useRef, useState ***REMOVED*** from 'react'
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import AlbumArtSwiper from '../components/AlbumArtSwiper'
import BackButton from '../components/BackButton'
import BookView from '../components/BookView'
import ChapterSelect from '../components/ChapterSelect'
import MessageModal from '../components/MessageModal'
import PlayPauseSkip from '../components/PlayPauseSkip'
import PlayScreenHeaderButtons from '../components/PlayScreenHeaderButtons'
import Scrubber from '../components/Scrubber'
import ShareModal from '../components/ShareModal'
import VideoPlayer from '../components/VideoPlayer'
import { colors, getLessonInfo, scaleMultiplier ***REMOVED*** from '../constants'
import {
  downloadLesson,
  downloadVideo,
  removeDownload
***REMOVED*** from '../redux/actions/downloadActions'
import { toggleComplete ***REMOVED*** from '../redux/actions/groupsActions'

function PlayScreen (props) {
  //+ AUDIO / VIDEO STATE

  // objects for storing audio/video
  const [audio, setAudio] = useState(new Audio.Sound())
  const [video, setVideo] = useState()

  // stores the length of the current media file in milliseconds (loaded by sound object)
  const [mediaLength, setMediaLength] = useState(null)

  // keeps track of if the media file is loaded
  const [isMediaLoaded, setIsMediaLoaded] = useState(false)

  // keeps track of if the video is buffering
  // const [isVideoBuffering, setIsVideoBuffering] = useState(false)

  // keeps track of whether the audio/video file is playing or paused
  const [isMediaPlaying, setIsMediaPlaying] = useState(false)

  // keeps track of the current position of the seeker in ms
  const [seekPosition, setSeekPosition] = useState(0)

  // keeps track of if the seeker should update every second
  // note: only time it shouldn't is during seeking, skipping, or loading a new //  chapter
  const shouldThumbUpdate = useRef(false)

  //+ CHAPTER SOURCES STATE

  // keeps track of currently playing chapter
  const [activeChapter, setActiveChapter] = useState('fellowship')

  // sources for all 3 audio files
  const [fellowshipSource, setFellowshipSource] = useState()
  const [storySource, setStorySource] = useState()
  const [trainingSource, setTrainingSource] = useState()
  const [applicationSource, setApplicationSource] = useState()

  //+ MISCELLANEOUS STATE

  const [thisSetProgress, setThisSetProgress] = useState([])

  // opacity/z-index of play button that pops up on play/pause
  const [playOpacity, setPlayOpacity] = useState(new Animated.Value(0))
  const [animationZIndex, setAnimationZIndex] = useState(0)

  // ref for the middle album art scroller
  const [albumArtSwiperRef, setAlbumArtSwiperRef] = useState()

  // share modal
  const [showShareLessonModal, setShowShareLessonModal] = useState(false)
  const [showSetCompleteModal, setShowSetCompleteModal] = useState(false)

  // keeps track of the current screen orientation for fullscreen videos
  const [fullscreenStatus, setFullscreenStatus] = useState(
    Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS
  )
  const [deviceRotation, setDeviceRotation] = useState({***REMOVED***)
  const [lastPortraitOrientation, setLastPortraitOrientation] = useState(
    ScreenOrientation.OrientationLock.PORTRAIT_UP
  )

  // handle device rotation changes and set device orientation accordingly
  useEffect(() => {
    if (deviceRotation) {
      if (fullscreenStatus === Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS) {
        if (
          video &&
          trainingSource &&
          deviceRotation &&
          (deviceRotation.alpha > 1 || deviceRotation.alpha < -1) &&
          deviceRotation.beta > -0.2 &&
          deviceRotation.beta < 0.2
        )
          video.presentFullscreenPlayer()
        else if (deviceRotation.beta < -0.7) {
          ScreenOrientation.supportsOrientationLockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_DOWN
          ).then(isSupported => {
            if (isSupported) {
              ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_DOWN
              )
              setLastPortraitOrientation(
                ScreenOrientation.OrientationLock.PORTRAIT_DOWN
              )
            ***REMOVED***
          ***REMOVED***)
        ***REMOVED*** else if (deviceRotation.beta > 0.7) {
          setLastPortraitOrientation(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
          )
          ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
          )
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [deviceRotation, video, trainingSource])

  useEffect(() => {
    if (fullscreenStatus === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT) {
      ScreenOrientation.supportsOrientationLockAsync(
        ScreenOrientation.OrientationLock.ALL
      ).then(isSupported => {
        if (isSupported)
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)
        else
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
      ***REMOVED***)
    ***REMOVED*** else {
      ScreenOrientation.lockAsync(lastPortraitOrientation)
    ***REMOVED***
  ***REMOVED***, [fullscreenStatus])

  useEffect(() => {
    setThisSetProgress(
      props.activeGroup.addedSets.filter(
        set => set.id === props.route.params.thisSet.id
      )[0].progress
    )
  ***REMOVED***, [props.activeGroup.addedSets])

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [thisSetProgress])

  // keeps the screen always awake on this screen
  useKeepAwake()

  //+ NAV OPTIONS

  function getNavOptions () {
    return {
      headerTitle: getLessonInfo('subtitle', props.route.params.thisLesson.id),
      headerRight: props.isRTL
        ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        : () => (
            <PlayScreenHeaderButtons
              shareOnPress={() => setShowShareLessonModal(true)***REMOVED***
              completeOnPress={changeCompleteStatus***REMOVED***
              completeCondition={thisSetProgress.includes(
                getLessonInfo('index', props.route.params.thisLesson.id)
              )***REMOVED***
            />
          ),
      headerLeft: props.isRTL
        ? () => (
            <PlayScreenHeaderButtons
              shareOnPress={() => setShowShareLessonModal(true)***REMOVED***
              completeOnPress={changeCompleteStatus***REMOVED***
              completeCondition={thisSetProgress.includes(
                getLessonInfo('index', props.route.params.thisLesson.id)
              )***REMOVED***
            />
          )
        : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  //+ CONSTRUCTOR

  useEffect(() => {
    // set some audio settings
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false
    ***REMOVED***)

    // set sources and download stuff if we need to
    setSources()

    // check if we can get any device motion data and if so, add a listener
    DeviceMotion.isAvailableAsync().then(isAvailable => {
      if (isAvailable) {
        DeviceMotion.setUpdateInterval(1000)
        DeviceMotion.addListener(({ rotation ***REMOVED***) => {
          setDeviceRotation(rotation)
        ***REMOVED***)
      ***REMOVED***
    ***REMOVED***)

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
      // re-lock orientation to portrait up
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    ***REMOVED***
  ***REMOVED***, [])

  // useEffect(() => {
  //   //set nav options
  //   console.log('setting nav options')

  // ***REMOVED***, [props.activeGroup])

  //+ LOADING FUNCTIONS

  //- sets the sources for all the chapters based on lesson type and whether
  //-   various chapters are downloaded or not
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

    var storyStream = getLessonInfo(
      'audioSource',
      props.route.params.thisLesson.id
    )

    var storyDummy =
      FileSystem.documentDirectory +
      props.activeGroup.language +
      '-' +
      'dummy-story.mp3'

    var trainingLocal =
      FileSystem.documentDirectory + props.route.params.thisLesson.id + 'v.mp4'

    var trainingStream = getLessonInfo(
      'videoSource',
      props.route.params.thisLesson.id
    )

    // set sources appropriately based on the lesson type
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
            getLessonInfo('audioSource', props.route.params.thisLesson.id)
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
            getLessonInfo('audioSource', props.route.params.thisLesson.id)
          )
          props.downloadVideo(
            props.route.params.thisLesson.id,
            getLessonInfo('videoSource', props.route.params.thisLesson.id)
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
            getLessonInfo('videoSource', props.route.params.thisLesson.id)
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

  //- once we set a chapter 1 source, load it up
  useEffect(() => {
    if (fellowshipSource) {
      loadMedia('audio', fellowshipSource)
    ***REMOVED***
  ***REMOVED***, [fellowshipSource])

  //- if we lose connection during a video-only lesson, reload it once we come
  //-  back online
  useEffect(() => {
    if (props.route.params.lessonType === 'v')
      if (props.isConnected && !isMediaLoaded && trainingSource)
        loadVideoFile('video', trainingSource)
  ***REMOVED***, [props.isConnected])

  //- loads an audio file, sets the length, and starts playing it
  async function loadMedia (type, source) {
    var media = type === 'video' ? video : audio
    try {
      await media
        .loadAsync({ uri: source ***REMOVED***, { progressUpdateIntervalMillis: 1000 ***REMOVED***)
        .then(playbackStatus => {
          setMediaLength(playbackStatus.durationMillis)
          media.setStatusAsync({
            progressUpdateIntervalMillis: 1000,
            shouldPlay: true
          ***REMOVED***)
          shouldThumbUpdate.current = true
          setIsMediaPlaying(true)
        ***REMOVED***)
    ***REMOVED*** catch (error) {
      console.log(error)
    ***REMOVED***
  ***REMOVED***

  //- load video once we have our video object and training source
  //! only for lessons with videos
  useEffect(() => {
    if (video && trainingSource) {
      loadMedia('video', trainingSource)
    ***REMOVED***
  ***REMOVED***, [video, trainingSource])

  //- load audio file for audio books once we have a story source
  //! only for audio book lesosns
  useEffect(() => {
    if (props.route.params.lessonType === 'a' && storySource) {
      loadMedia('audio', storySource)
    ***REMOVED***
  ***REMOVED***, [storySource])

  //+ PLAYBACK CONTROL FUNCTIONS

  //- plays the audio if it's currently paused and pauses the audio if it's currently playing
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

  //- plays media from a specified location
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

  //- interval for updating seeker
  useInterval(updateThumb, 1000)

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

  //- changes the active chapter
  function changeChapter (chapter) {
    if (chapter !== activeChapter) {
      audio.unloadAsync()
      shouldThumbUpdate.current = false
      if (chapter === 'fellowship') {
        setSeekPosition(0)
        loadMedia('audio', fellowshipSource)
      ***REMOVED*** else if (chapter === 'story') {
        setSeekPosition(0)
        if (storySource) {
          loadMedia('audio', storySource)
        ***REMOVED***
        // auto scroll to scripture if
        //  1. there's no audio source
        //  2. we're currently downloading the lesson
        //  3. there's an audio source, it's not downloading, and there's no
        //    internet
        if (!props.route.params.thisLesson.hasAudio) swipeToScripture()
      ***REMOVED*** else if (chapter === 'application') {
        setSeekPosition(0)
        loadMedia('audio', applicationSource)
      ***REMOVED*** else if (chapter === 'training') {
        setIsMediaLoaded(false)
        setSeekPosition(0)
      ***REMOVED***
      setActiveChapter(chapter)
    ***REMOVED***
  ***REMOVED***

  //- updates something on every api call to audio object and every second
  audio.setOnPlaybackStatusUpdate(playbackStatus => {
    if (playbackStatus.isLoaded) {
      setIsMediaLoaded(true)
    ***REMOVED***

    // depending on what chapter we're on, either jump to the next
    //  chapter once we finish or toggle the whole lesson as complete
    if (playbackStatus.didJustFinish) {
      if (activeChapter === 'fellowship') {
        if (!props.route.params.thisLesson.hasAudio) {
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
              setTimeout(() => changeChapter('application'), 1000)
            ***REMOVED***
            break
          case 'qav':
            if (!props.downloads[props.route.params.thisLesson.id + 'v']) {
              setTimeout(() => changeChapter('training'), 1000)
            ***REMOVED***
            break
          case 'a':
            if (
              !thisSetProgress.includes(
                getLessonInfo('index', props.route.params.thisLesson.id)
              )
            ) {
              changeCompleteStatus()
            ***REMOVED***
        ***REMOVED***
      ***REMOVED*** else if (
        activeChapter === 'application' &&
        !thisSetProgress.includes(
          getLessonInfo('index', props.route.params.thisLesson.id)
        )
      ) {
        changeCompleteStatus()
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***)

  //- pause lesson if we move to a different screen (i.e. when switching to
  //-   splash / game for security mode)
  useEffect(() => {
    if (isMediaPlaying) playHandler()
  ***REMOVED***, [props.navigation.isFocused()])

  //+ OTHER FUNCTIONS

  //- scrolls the album art swiper to the scripture pane
  function swipeToScripture () {
    if (albumArtSwiperRef)
      albumArtSwiperRef.scrollToIndex({
        animated: true,
        viewPosition: 0.5,
        viewOffset: -Dimensions.get('screen').width,
        index: 0
      ***REMOVED***)
  ***REMOVED***

  //- if a download finishes, remove it from download tracker
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

  //- switches the complete status of a lesson to the opposite of its current
  //-  status
  // and alerts the user of the change
  function changeCompleteStatus () {
    props.toggleComplete(
      props.activeGroup.name,
      props.route.params.thisSet,
      getLessonInfo('index', props.route.params.thisLesson.id)
    )

    props.navigation.setOptions(getNavOptions())

    if (checkForFullyComplete()) {
      setShowSetCompleteModal(true)
    ***REMOVED*** else {
      if (
        !thisSetProgress.includes(
          getLessonInfo('index', props.route.params.thisLesson.id)
        )
      ) {
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
  ***REMOVED***

  function checkForFullyComplete () {
    if (
      props.activeGroup.addedSets.filter(
        set => set.id === props.route.params.thisSet.id
      )[0].progress.length /
        (props.route.params.thisSet.lessons.length - 1) ===
      1
    ) {
      return true
    ***REMOVED*** else return false
  ***REMOVED***

  //+ RENDER

  var titleSection = (
    <View style={styles.titlesContainer***REMOVED***>
      <Text
        style={Typography(props, 'h3', 'black', 'center', colors.shark)***REMOVED***
        numberOfLines={2***REMOVED***
      >
        {props.route.params.thisLesson.title***REMOVED***
      </Text>
    </View>
  )

  return (
    <View style={styles.screen***REMOVED***>
      <View
        style={[
          styles.topHalfContainer,
          {
            marginBottom: props.route.params.lessonType === '' ? 10 : 0
          ***REMOVED***
        ]***REMOVED***
      >
        {/* <StatusBar hidden /> */***REMOVED***
        {/* don't display title section on audio book lessons */***REMOVED***
        {props.route.params.lessonType !== 'a' &&
        props.route.params.lessonType !== ''
          ? titleSection
          : null***REMOVED***

        {/* 
          MIDDLE SECTION 
          1. book reading view for audio book lessons
          2. video player for lessons with videos
          3. album art swiper to display album art, scripture, and questions
        */***REMOVED***
        {props.route.params.lessonType === 'a' ||
        props.route.params.lessonType === '' ? (
          <BookView
            thisLesson={props.route.params.thisLesson***REMOVED***
            titleSection={titleSection***REMOVED***
          />
        ) : activeChapter === 'training' ? (
          <VideoPlayer
            setVideo={setVideo***REMOVED***
            video={video***REMOVED***
            setIsMediaLoaded={setIsMediaLoaded***REMOVED***
            setIsMediaPlaying={setIsMediaPlaying***REMOVED***
            // setIsVideoBuffering={setIsVideoBuffering***REMOVED***
            changeChapter={changeChapter***REMOVED***
            isMediaLoaded={isMediaLoaded***REMOVED***
            lessonType={props.route.params.lessonType***REMOVED***
            isComplete={thisSetProgress.includes(
              getLessonInfo('index', props.route.params.thisLesson.id)
            )***REMOVED***
            changeCompleteStatus={changeCompleteStatus***REMOVED***
            setFullScreenStatus={status => setFullscreenStatus(status)***REMOVED***
            fullscreenStatus={fullscreenStatus***REMOVED***
            lastPortraitOrientation={lastPortraitOrientation***REMOVED***
          />
        ) : (
          <AlbumArtSwiper
            setAlbumArtSwiperRef={setAlbumArtSwiperRef***REMOVED***
            iconName={props.route.params.thisSet.iconName***REMOVED***
            thisLesson={props.route.params.thisLesson***REMOVED***
            playHandler={playHandler***REMOVED***
            playOpacity={playOpacity***REMOVED***
            animationZIndex={animationZIndex***REMOVED***
            isMediaPlaying={isMediaPlaying***REMOVED***
          />
        )***REMOVED***
      </View>

      {/* AUDIO CONTROLS */***REMOVED***
      {props.route.params.lessonType !== '' ? (
        isMediaLoaded ? (
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
              onSlidingComplete={playFromLocation***REMOVED***
              onValueChange={() => (shouldThumbUpdate.current = false)***REMOVED***
              maximumValue={mediaLength***REMOVED***
              seekPosition={seekPosition***REMOVED***
            />
            <PlayPauseSkip
              isMediaPlaying={isMediaPlaying***REMOVED***
              // isVideoBuffering={isVideoBuffering***REMOVED***
              onPlayPress={playHandler***REMOVED***
              onSkipPress={value => {
                playFromLocation(seekPosition + value)
              ***REMOVED******REMOVED***
            />
          </View>
        ) : (
          <View style={styles.audioControlContainer***REMOVED***>
            <ActivityIndicator size='large' color={colors.shark***REMOVED*** />
          </View>
        )
      ) : null***REMOVED***

      {/* MODALS */***REMOVED***
      <ShareModal
        isVisible={showShareLessonModal***REMOVED***
        hideModal={() => setShowShareLessonModal(false)***REMOVED***
        closeText={props.translations.general.close***REMOVED***
        lesson={props.route.params.thisLesson***REMOVED***
        lessonType={props.route.params.lessonType***REMOVED***
        set={props.route.params.thisSet***REMOVED***
      />
      <MessageModal
        isVisible={showSetCompleteModal***REMOVED***
        hideModal={() => setShowSetCompleteModal(false)***REMOVED***
        title={props.translations.general.popups.new_story_set_unlocked_title***REMOVED***
        body={props.translations.general.popups.new_story_set_unlocked_message***REMOVED***
        confirmText={props.translations.general.got_it***REMOVED***
        confirmOnPress={() => {
          setShowSetCompleteModal(false)
          props.navigation.goBack()
        ***REMOVED******REMOVED***
      >
        <Image
          source={require('../assets/gifs/new_set.gif')***REMOVED***
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
  titlesContainer: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    paddingHorizontal: 20
  ***REMOVED***,
  audioControlContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '33%'
  ***REMOVED***
***REMOVED***)

//+ REDUX

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

/* <HomeworkModal
        isVisible={showHomeworkModal***REMOVED***
        hideModal={() => setShowHomeworkModal(false)***REMOVED***
        homework={props.route.params.thisLesson.homework***REMOVED***
/> */
