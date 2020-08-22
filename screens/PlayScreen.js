import useInterval from '@use-it/interval'
import { Audio, Video ***REMOVED*** from 'expo-av'
import * as FileSystem from 'expo-file-system'
import { useKeepAwake ***REMOVED*** from 'expo-keep-awake'
import { DeviceMotion ***REMOVED*** from 'expo-sensors'
import * as Sharing from 'expo-sharing'
import React, { useEffect, useRef, useState ***REMOVED*** from 'react'
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Share,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import SVG from '../assets/svg'
import BackButton from '../components/BackButton'
import ChapterSelect from '../components/ChapterSelect'
import HomeworkModal from '../components/HomeworkModal'
import ModalButton from '../components/ModalButton'
import OptionsModal from '../components/OptionsModal'
import PlayPauseSkip from '../components/PlayPauseSkip'
import PlayScreenHeaderButtons from '../components/PlayScreenHeaderButtons'
import Scrubber from '../components/Scrubber'
import Separator from '../components/Separator'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import {
  downloadLesson,
  downloadVideo,
  removeDownload
***REMOVED*** from '../redux/actions/downloadActions'
import { toggleComplete ***REMOVED*** from '../redux/actions/groupsActions'

console.disableYellowBox = true

function PlayScreen (props) {
  //// STATE

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

  // keeps track of whether the video controls overlay is visible
  const [showVideoControls, setShowVideoControls] = useState(false)

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
  const [albumArtRef, setAlbumArtRef] = useState()
  const [isMiddle, setIsMiddle] = useState(true)
  const [middleScrollBarOpacity, setMiddleScrollBarOpacity] = useState(
    new Animated.Value(0)
  )
  const [sideScrollBarOpacity, setSideScrollBarOpacity] = useState(
    new Animated.Value(0.8)
  )

  const onViewRef = useRef(info => {
    if (info.viewableItems.some(item => item.index === 0)) setIsMiddle(true)
    else setIsMiddle(false)
  ***REMOVED***)
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 ***REMOVED***)

  // keeps the screen always awake on this screen
  useKeepAwake()

  useEffect(() => {
    if (isMiddle)
      Animated.sequence([
        Animated.timing(middleScrollBarOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        ***REMOVED***),
        Animated.timing(sideScrollBarOpacity, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true
        ***REMOVED***)
      ]).start()
    else {
      Animated.sequence([
        Animated.timing(sideScrollBarOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        ***REMOVED***),
        Animated.timing(middleScrollBarOpacity, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true
        ***REMOVED***)
      ]).start()
    ***REMOVED***
  ***REMOVED***, [isMiddle])

  // pause lesson if we move to a different screen (i.e. when switching to
  //  splash / game for security mode)
  useEffect(() => {
    if (isPlaying) playHandler()
  ***REMOVED***, [props.navigation.isFocused()])

  //// OTHER STATE

  // share modal
  const [showShareLessonModal, setShowShareLessonModal] = useState(false)

  // homework modal
  const [showHomeworkModal, setShowHomeworkModal] = useState(false)

  // animation state
  const [playOpacity, setPlayOpacity] = useState(new Animated.Value(0))
  const [animationZIndex, setAnimationZIndex] = useState(0)

  // data for album art flatlist
  const albumArtData = [
    {
      key: '0',
      type: 'text'
    ***REMOVED***,
    {
      key: '1',
      type: 'image',
      svgName: props.route.params.thisSet.iconName
    ***REMOVED***,
    {
      key: '2',
      type: 'text'
    ***REMOVED***
  ]

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
      if (props.isConnected) if (!isLoaded) loadVideoFile(trainingSource)
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
      props.route.params.thisLesson.questionsType +
      '-fellowship.mp3'

    var applicationLocal =
      FileSystem.documentDirectory +
      props.activeGroup.language +
      '-' +
      props.route.params.thisLesson.questionsType +
      '-application.mp3'

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
    console.log('loading audio')
    //console.log(source);
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
    if (albumArtRef)
      albumArtRef.scrollToIndex({
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
            props.route.params.thisLesson.scriptureHeader +
            ': ' +
            props.route.params.thisLesson.scriptureText
        ***REMOVED***)
        break
      case 'audio':
        FileSystem.getInfoAsync(
          FileSystem.documentDirectory +
            props.route.params.thisLesson.id +
            '.mp3'
        ).then(({ exists ***REMOVED***) => {
          exists
            ? Sharing.shareAsync(
                FileSystem.documentDirectory +
                  props.route.params.thisLesson.id +
                  '.mp3'
              )
            : Alert.alert(
                props.translations.general.popups
                  .share_undownloaded_lesson_title,
                props.translations.general.popups
                  .share_undownloaded_lesson_message,
                [
                  {
                    text: props.translations.general.ok,
                    onPress: () => {***REMOVED***
                  ***REMOVED***
                ]
              )
        ***REMOVED***)
        break
      case 'video':
        Share.share({
          message: props.route.params.thisLesson.videoSource
        ***REMOVED***)
        break
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

  // renders the album art section in the middle of the screen
  function renderAlbumArtItem ({ item ***REMOVED***) {
    var scrollBarLeft = (
      <View
        style={[
          styles.scrollBarContainer,
          {
            alignSelf: 'flex-start'
          ***REMOVED***
        ]***REMOVED***
      >
        <Animated.View
          style={[
            styles.scrollBar,
            {
              opacity:
                item.key === '1' ? middleScrollBarOpacity : sideScrollBarOpacity
            ***REMOVED***
          ]***REMOVED***
        />
      </View>
    )
    var scrollBarRight = (
      <View
        style={[
          styles.scrollBarContainer,
          {
            alignSelf: 'flex-end'
          ***REMOVED***
        ]***REMOVED***
      >
        <Animated.View
          style={[
            styles.scrollBar,
            {
              opacity:
                item.key === '1' ? middleScrollBarOpacity : sideScrollBarOpacity
            ***REMOVED***
          ]***REMOVED***
        />
      </View>
    )

    if (item.type === 'text') {
      return (
        <View style={styles.albumArtContainer***REMOVED***>
          {scrollBarLeft***REMOVED***
          {scrollBarRight***REMOVED***
          <FlatList
            data={
              // render questions on the first pane and scripture on the last
              item.key === '0'
                ? props.activeDatabase.questions[
                    props.route.params.thisLesson.questionsType
                  ]
                : props.route.params.thisLesson.scripture
            ***REMOVED***
            renderItem={renderTextContent***REMOVED***
            keyExtractor={item => item.header***REMOVED***
            showsVerticalScrollIndicator={false***REMOVED***
            ListHeaderComponent={() => <View style={{ height: 10 ***REMOVED******REMOVED*** />***REMOVED***
          />
        </View>
      )
    ***REMOVED*** else {
      return (
        <View style={styles.albumArtContainer***REMOVED***>
          {scrollBarLeft***REMOVED***
          {scrollBarRight***REMOVED***
          <View
            style={{
              zIndex: 1,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            ***REMOVED******REMOVED***
          >
            <TouchableHighlight
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              ***REMOVED******REMOVED***
              onPress={playHandler***REMOVED***
              underlayColor={colors.white + '00'***REMOVED***
              activeOpacity={1***REMOVED***
            >
              <SVG
                name={item.svgName***REMOVED***
                width={Dimensions.get('window').width - 80***REMOVED***
                height={Dimensions.get('window').width - 80***REMOVED***
                fill='#1D1E20'
              />
            </TouchableHighlight>
          </View>
          <Animated.View
            style={{
              position: 'absolute',
              opacity: playOpacity,
              transform: [
                {
                  scale: playOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, 1]
                  ***REMOVED***)
                ***REMOVED***
              ],
              zIndex: animationZIndex
            ***REMOVED******REMOVED***
          >
            <Icon
              name={isPlaying ? 'play' : 'pause'***REMOVED***
              size={100 * scaleMultiplier***REMOVED***
              color={colors.white***REMOVED***
            />
          </Animated.View>
        </View>
      )
    ***REMOVED***
  ***REMOVED***

  // renders the questions/scripture text content
  function renderTextContent (textList) {
    return (
      <View style={{ paddingHorizontal: 20 ***REMOVED******REMOVED***>
        <Text
          style={{
            color: colors.shark,
            fontSize: 18 * scaleMultiplier,
            fontFamily: props.font + '-medium',
            textAlign: props.isRTL ? 'right' : 'left'
          ***REMOVED******REMOVED***
        >
          {textList.item.header***REMOVED***
        </Text>
        <Text
          style={{
            color: colors.shark,
            fontSize: 18 * scaleMultiplier,
            fontFamily: props.font + '-regular',
            textAlign: props.isRTL ? 'right' : 'left'
          ***REMOVED******REMOVED***
        >
          {textList.item.text + '\n'***REMOVED***
        </Text>
      </View>
    )
  ***REMOVED***

  // render the middle section of the screen conditionally
  // if fellowship, story, or application are the active chapter, show album
  //  art
  // if training is the active chapter, show the video player
  var middleSection =
    activeChapter === 'training' ? (
      <TouchableWithoutFeedback
        onPress={() => {
          if (!showVideoControls) {
            setShowVideoControls(true)
            setTimeout(() => setShowVideoControls(false), 1000)
          ***REMOVED***
        ***REMOVED******REMOVED***
        style={{ width: '100%' ***REMOVED******REMOVED***
      >
        <View
          style={{
            height: Dimensions.get('window').width - 80,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center'
            // backgroundColor: 'black'
          ***REMOVED******REMOVED***
        >
          <Video
            ref={ref => setVideoObject(ref)***REMOVED***
            rate={1.0***REMOVED***
            volume={1.0***REMOVED***
            isMuted={false***REMOVED***
            resizeMode='contain'
            shouldPlay
            usePoster
            onLoad={() => setIsLoaded(true)***REMOVED***
            style={{ flex: 1 ***REMOVED******REMOVED***
            onPlaybackStatusUpdate={status => {
              // match up so there's a single source of truth between
              // waha controls and native video controls
              if (status.isPlaying) setIsPlaying(true)
              else if (!status.isPlaying) setIsPlaying(false)

              // if we're buffering, turn play icon into activity indicator
              if (!status.isBuffering) setIsVideoBuffering(false)
              else if (status.isBuffering) setIsVideoBuffering(true)

              // if video finishes, switch to last chapter
              if (status.didJustFinish && props.route.params.lessonType !== 'v')
                changeChapter('application')
            ***REMOVED******REMOVED***
            onLoadStart={() => setIsLoaded(false)***REMOVED***
            onLoad={() => setIsLoaded(true)***REMOVED***
            onFullscreenUpdate={({ fullscreenUpdate, status ***REMOVED***) => {
              console.log(fullscreenUpdate)
            ***REMOVED******REMOVED***
          />
          {/* display a video icon placeholder when we're loading */***REMOVED***
          {isLoaded ? null : (
            <View
              style={{
                alignSelf: 'center',
                width: '100%',
                position: 'absolute',
                alignItems: 'center'
              ***REMOVED******REMOVED***
            >
              <Icon
                name='video'
                size={100 * scaleMultiplier***REMOVED***
                color={colors.oslo***REMOVED***
              />
            </View>
          )***REMOVED***
          {/* video controls overlay */***REMOVED***
          {showVideoControls ? (
            <View
              style={{
                width: '100%',
                height: 65 * scaleMultiplier,
                position: 'absolute',
                alignSelf: 'flex-end',
                backgroundColor: colors.shark + '50',
                justifyContent: 'center'
              ***REMOVED******REMOVED***
            >
              <TouchableOpacity
                style={{ alignSelf: 'flex-end' ***REMOVED******REMOVED***
                onPress={() => {
                  videoObject.presentFullscreenPlayer()
                ***REMOVED******REMOVED***
              >
                <Icon
                  name='fullscreen-enter'
                  size={50 * scaleMultiplier***REMOVED***
                  color={colors.white***REMOVED***
                />
              </TouchableOpacity>
            </View>
          ) : null***REMOVED***
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        ***REMOVED******REMOVED***
      >
        <FlatList
          data={albumArtData***REMOVED***
          renderItem={renderAlbumArtItem***REMOVED***
          ref={ref => setAlbumArtRef(ref)***REMOVED***
          horizontal={true***REMOVED***
          pagingEnabled={true***REMOVED***
          snapToAlignment={'start'***REMOVED***
          snapToInterval={Dimensions.get('window').width - 60***REMOVED***
          decelerationRate={'fast'***REMOVED***
          showsHorizontalScrollIndicator={false***REMOVED***
          ItemSeparatorComponent={() => (
            <View style={{ width: 20, height: '100%' ***REMOVED******REMOVED*** />
          )***REMOVED***
          ListHeaderComponent={() => <View style={{ width: 40 ***REMOVED******REMOVED*** />***REMOVED***
          ListFooterComponent={() => <View style={{ width: 40 ***REMOVED******REMOVED*** />***REMOVED***
          getItemLayout={(data, index) => ({
            length: Dimensions.get('window').width - 60,
            offset: Dimensions.get('window').width - 60 * index,
            index
          ***REMOVED***)***REMOVED***
          initialScrollIndex={1***REMOVED***
          viewabilityConfig={viewConfigRef.current***REMOVED***
          onViewableItemsChanged={onViewRef.current***REMOVED***
        />
      </View>
    )

  // entire playback control section
  // isLoaded ?
  //  true: show scrubber
  //        show play/pause
  //        isLessonType = video only ?
  //          true: hide chapter select
  //          false: show chapter select
  //  false: show loading circle
  var audioControlContainer = isLoaded ? (
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
        hasHomework={props.route.params.thisLesson.homework ? true : false***REMOVED***
        showHomeworkModal={() => setShowHomeworkModal(true)***REMOVED***
      />
    </View>
  ) : (
    <View style={styles.audioControlContainer***REMOVED***>
      <ActivityIndicator size='large' color={colors.shark***REMOVED*** />
    </View>
  )

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.topHalfContainer***REMOVED***>
        <View style={styles.titlesContainer***REMOVED***>
          <Text
            numberOfLines={1***REMOVED***
            style={[styles.title, { fontFamily: props.font + '-black' ***REMOVED***]***REMOVED***
          >
            {props.route.params.thisLesson.title***REMOVED***
          </Text>
        </View>
        {middleSection***REMOVED***
      </View>
      {audioControlContainer***REMOVED***

      {/* MODALS */***REMOVED***
      <OptionsModal
        isVisible={showShareLessonModal***REMOVED***
        hideModal={() => setShowShareLessonModal(false)***REMOVED***
        closeText={props.translations.general.close***REMOVED***
      >
        <ModalButton
          title={props.translations.general.share_app***REMOVED***
          onPress={() => share('app')***REMOVED***
        />
        {props.route.params.lessonType !== 'v' ? (
          <View>
            <Separator />
            <ModalButton
              title={props.translations.general.share_passage_text***REMOVED***
              onPress={() => share('text')***REMOVED***
            />
          </View>
        ) : null***REMOVED***
        {(props.route.params.lessonType === 'qa' ||
          props.route.params.lessonType === 'qav') &&
        !props.downloads[props.route.params.thisLesson.id] ? (
          <View>
            <Separator />
            <ModalButton
              title={props.translations.general.share_passage_audio***REMOVED***
              onPress={() => share('audio')***REMOVED***
            />
          </View>
        ) : null***REMOVED***
        {props.route.params.lessonType !== 'qa' &&
        props.route.params.lessonType !== 'q' ? (
          <View>
            <Separator />
            <ModalButton
              title={props.translations.general.share_video_link***REMOVED***
              onPress={() => share('video')***REMOVED***
            />
          </View>
        ) : null***REMOVED***
      </OptionsModal>
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
  title: {
    color: colors.shark,
    textAlign: 'center',
    fontSize: 24 * scaleMultiplier,
    flexWrap: 'nowrap'
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
  scrollBarContainer: {
    height: '100%',
    width: 24,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    marginLeft: -4
  ***REMOVED***,
  scrollBar: {
    width: 4,
    height: 75 * scaleMultiplier,
    backgroundColor: colors.chateau,
    borderRadius: 10
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
