import React, { useState, useEffect, useRef ***REMOVED*** from 'react'
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
  Share,
  TouchableWithoutFeedback,
  TouchableOpacity
***REMOVED*** from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { Audio, Video ***REMOVED*** from 'expo-av'
import OptionsModal from '../components/OptionsModal'
import ModalButton from '../components/ModalButton'
import Scrubber from '../components/Scrubber'
import PlayPauseSkip from '../components/PlayPauseSkip'
import ChapterSelect from '../components/ChapterSelect'
import PlayScreenHeaderButtons from '../components/PlayScreenHeaderButtons'
import BackButton from '../components/BackButton'
import { toggleComplete, setBookmark ***REMOVED*** from '../redux/actions/groupsActions'
import { connect ***REMOVED*** from 'react-redux'
import {
  downloadLesson,
  removeDownload,
  downloadVideo
***REMOVED*** from '../redux/actions/downloadActions'
import SVG from '../assets/svg'
import useInterval from '@use-it/interval'
import { DeviceMotion ***REMOVED*** from 'expo-sensors'

console.disableYellowBox = true

function PlayScreen (props) {
  //// STATE

  // stores loaded audio file
  const [soundObject, setSoundObject] = useState(new Audio.Sound())
  const [videoObject, setVideoObject] = useState()

  // stores the length of the current audio file in milliseconds (loaded by sound object)
  const [audioFileLength, setAudioFileLength] = useState(null)

  // keeps track of if the audio file is loaded
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVideoBuffering, setIsVideoBuffering] = useState(false)
  const [showVideoControls, setShowVideoControls] = useState(false)
  const [fullscreenStatus, setFullScreenStatus] = useState(3)
  const [screenOrientation, setScreenOrientation] = useState(0)

  // keeps track of whether the audio file is playing or paused
  const [isPlaying, setIsPlaying] = useState(false)

  // keeps track of the current position of the seeker
  const [seekPosition, setSeekPosition] = useState(0)

  // keeps track of if the seeker should update every second
  // note: only time it shouldn't is during seeking, skipping, or loading a new chapter
  const shouldTickUpdate = useRef(false)

  // keeps track of currently playing chapter
  const [activeChapter, setActiveChapter] = useState('fellowship')

  // sources for all 3 audio files
  const [fellowshipSource, setFellowshipSource] = useState()
  const [storySource, setStorySource] = useState()
  const [trainingSource, setTrainingSource] = useState()
  const [applicationSource, setApplicationSource] = useState()

  const [albumArtRef, setAlbumArtRef] = useState()

  //share modal
  const [showShareLessonModal, setShowShareLessonModal] = useState(false)

  // data for album art flatlist
  const albumArtData = [
    {
      key: '0',
      type: 'text'
    ***REMOVED***,
    {
      key: '1',
      type: 'image',
      svgName: props.route.params.thisSet.icon
    ***REMOVED***,
    {
      key: '2',
      type: 'text'
    ***REMOVED***
  ]

  //// CONSTRUCTOR

  // interval for updating seeker
  useInterval(updateSeekerTick, 1000)

  function setSources () {
    // set all possible sources for ease of use later
    var fellowshipLocal =
      FileSystem.documentDirectory +
      props.activeGroup.language +
      '-' +
      props.route.params.thisLesson.questionsType +
      '-chapter1.mp3'

    var applicationLocal =
      FileSystem.documentDirectory +
      props.activeGroup.language +
      '-' +
      props.route.params.thisLesson.questionsType +
      '-chapter3.mp3'

    var storyLocal =
      FileSystem.documentDirectory + props.route.params.thisLesson.id + '.mp3'

    var storyDummy =
      FileSystem.documentDirectory +
      props.activeGroup.language +
      '-' +
      'dummy-chapter2.mp3'

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
    ***REMOVED***
  ***REMOVED***

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

  //// AUDIO CONTROL FUNCTIONS

  // updates something on every api call to audio object and every second
  soundObject.setOnPlaybackStatusUpdate(playbackStatus => {
    if (playbackStatus.isLoaded) {
      setIsLoaded(true)
    ***REMOVED***

    // depending on what chapter we're on, either jump to the next
    // chapter once we finish or toggle the whole lesson as complete
    if (playbackStatus.didJustFinish) {
      if (activeChapter === 'fellowship') {
        if (!props.downloads[props.route.params.thisLesson.id]) {
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

  // loads an audio file, sets the length, and starts playing it
  async function loadAudioFile (source) {
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

  useEffect(() => {
    if (screenOrientation === -90 || screenOrientation === 90) {
      videoObject.presentFullscreenPlayer()
    ***REMOVED***
  ***REMOVED***, [screenOrientation])

  // async function changeOrientation () {
  //   if (fullscreenStatus === 3) await
  //   else if (fullscreenStatus === 1) await videoObject.dismissFullScreenPlayer()
  // ***REMOVED***

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

  // useEffect(() => {
  //   console.log(videoObject)
  // ***REMOVED***, [videoObject])

  //// OTHER FUNCTIONS

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
        loadAudioFile(storySource)
        if (albumArtRef)
          albumArtRef.scrollToIndex({
            animated: true,
            viewPosition: 0.5,
            viewOffset: -Dimensions.get('screen').width,
            index: 0
          ***REMOVED***)
      ***REMOVED*** else if (chapter === 'application') {
        setSeekPosition(0)
        loadAudioFile(applicationSource)
      ***REMOVED*** else if (chapter === 'training') {
        setIsLoaded(false)
        setSeekPosition(0)
      ***REMOVED***
      setActiveChapter(chapter)
    ***REMOVED***

    // else if (chapter === 'training') {
    //   loadVideoFile(props.route.params.thisLesson.videoSource)
    // ***REMOVED***
  ***REMOVED***

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
        props.translations.alerts.markedAsIncomplete.header,
        props.translations.alerts.markedAsIncomplete.text,
        [
          {
            text: props.translations.alerts.ok,
            onPress: () => props.navigation.goBack()
          ***REMOVED***
        ]
      )
    ***REMOVED*** else {
      Alert.alert(
        props.translations.alerts.markedAsComplete.header,
        props.translations.alerts.markedAsComplete.text,
        [
          {
            text: props.translations.alerts.ok,
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
      case 'video':
        Share.share({
          message: props.route.params.thisLesson.videoSource
        ***REMOVED***)
        break
    ***REMOVED***
  ***REMOVED***

  //// RENDER

  function renderAlbumArtItem ({ item ***REMOVED***) {
    if (item.type === 'text') {
      var scrollBarLeft =
        item.key === '0' ? null : <View style={styles.scrollBar***REMOVED*** />
      var scrollBarRight =
        item.key === '0' ? <View style={styles.scrollBar***REMOVED*** /> : null
      return (
        <View
          style={[
            styles.albumArtContainer,
            {
              marginLeft: item.key === '0' ? 30 : 10,
              marginRight: item.key === '2' ? 30 : 10,
              paddingHorizontal: item.key === '1' ? 0 : 10
            ***REMOVED***
          ]***REMOVED***
        >
          {scrollBarLeft***REMOVED***
          <FlatList
            style={[
              styles.textContainer,
              {
                marginLeft: item.key === '2' ? 10 : 0,
                marginRight: item.key === '0' ? 10 : 0,
                marginVertical: 10
              ***REMOVED***
            ]***REMOVED***
            data={
              item.key === '0'
                ? props.activeDatabase.questions[
                    props.route.params.thisLesson.questionsType
                  ]
                : props.route.params.thisLesson.scripture
            ***REMOVED***
            renderItem={renderTextContent***REMOVED***
            keyExtractor={item => item.header***REMOVED***
            showsVerticalScrollIndicator={false***REMOVED***
          />
          {scrollBarRight***REMOVED***
        </View>
      )
    ***REMOVED*** else {
      return (
        <View
          style={[
            styles.albumArtContainer,
            { justifyContent: 'center', alignItems: 'center' ***REMOVED***
          ]***REMOVED***
        >
          <SVG
            name={item.svgName***REMOVED***
            width={Dimensions.get('window').width - 80***REMOVED***
            height={Dimensions.get('window').width - 80***REMOVED***
            color='#1D1E20'
          />
        </View>
      )
    ***REMOVED***
  ***REMOVED***

  function renderTextContent (textList) {
    return (
      <View>
        <Text
          style={[
            styles.albumArtText,
            {
              fontFamily: props.font + '-medium',
              textAlign: props.isRTL ? 'right' : 'left'
            ***REMOVED***
          ]***REMOVED***
        >
          {textList.item.header***REMOVED***
        </Text>
        <Text
          style={[
            styles.albumArtText,
            {
              fontFamily: props.font + '-regular',
              textAlign: props.isRTL ? 'right' : 'left'
            ***REMOVED***
          ]***REMOVED***
        >
          {textList.item.text + '\n'***REMOVED***
        </Text>
      </View>
    )
  ***REMOVED***

  var videoPlayer = (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!showVideoControls) {
          setShowVideoControls(true)
          setTimeout(() => setShowVideoControls(false), 1000)
        ***REMOVED***
      ***REMOVED******REMOVED***
    >
      <View
        style={{
          height: Dimensions.get('window').width - 80,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'black'
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

            if (status.didJustFinish && props.route.params.lessonType !== 'v')
              changeChapter('application')
          ***REMOVED******REMOVED***
          onLoadStart={() => setIsLoaded(false)***REMOVED***
          onLoad={() => setIsLoaded(true)***REMOVED***
          onFullscreenUpdate={({ fullscreenUpdate, status ***REMOVED***) => {
            setFullScreenStatus(fullscreenUpdate)
            console.log(fullscreenUpdate)
          ***REMOVED******REMOVED***
        />
        {isLoaded ? null : (
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              position: 'absolute',
              alignItems: 'center'
            ***REMOVED******REMOVED***
          >
            <Icon name='video' size={100 * scaleMultiplier***REMOVED*** color='#828282' />
          </View>
        )***REMOVED***
        {showVideoControls ? (
          <View
            style={{
              width: '100%',
              height: 65 * scaleMultiplier,
              position: 'absolute',
              alignSelf: 'flex-end',
              backgroundColor: '#00000050',
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
                color='#FFF'
              />
            </TouchableOpacity>
          </View>
        ) : null***REMOVED***
      </View>
    </TouchableWithoutFeedback>
  )

  var middleSection =
    activeChapter === 'training' ? (
      videoPlayer
    ) : (
      <FlatList
        data={albumArtData***REMOVED***
        renderItem={renderAlbumArtItem***REMOVED***
        ref={ref => setAlbumArtRef(ref)***REMOVED***
        horizontal={true***REMOVED***
        pagingEnabled={true***REMOVED***
        snapToAlignment={'start'***REMOVED***
        snapToInterval={Dimensions.get('window').width - 70***REMOVED***
        decelerationRate={'fast'***REMOVED***
        showsHorizontalScrollIndicator={false***REMOVED***
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').width - 70,
          offset: Dimensions.get('window').width - 70 * index,
          index
        ***REMOVED***)***REMOVED***
        initialScrollIndex={1***REMOVED***
      />
    )

  // renders the play/pause/skip container conditionally because we don't want to show controls when the audio is loading
  // if we're loading, render a loading circle; otherwise load the audio controls
  var audioControlContainer = isLoaded ? (
    <View style={styles.audioControlContainer***REMOVED***>
      {props.route.params.lessonType !== 'v' ? (
        <ChapterSelect
          activeChapter={activeChapter***REMOVED***
          lessonID={props.route.params.thisLesson.id***REMOVED***
          onPress={chapter => changeChapter(chapter)***REMOVED***
          lessonType={props.route.params.lessonType***REMOVED***
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
      <ActivityIndicator size='large' color='black' />
    </View>
  )

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.topHalfContainer***REMOVED***>
        <View style={styles.titlesContainer***REMOVED***>
          <Text style={[styles.title, { fontFamily: props.font + '-black' ***REMOVED***]***REMOVED***>
            {props.route.params.thisLesson.title***REMOVED***
          </Text>
        </View>
        <View style={styles.albumArtListContainer***REMOVED***>{middleSection***REMOVED***</View>
      </View>
      {audioControlContainer***REMOVED***

      {/* MODALS */***REMOVED***
      <OptionsModal
        isVisible={showShareLessonModal***REMOVED***
        hideModal={() => setShowShareLessonModal(false)***REMOVED***
        closeText={props.translations.modals.shareOptions.close***REMOVED***
      >
        <ModalButton
          title={props.activeDatabase.translations.modals.shareOptions.shareApp***REMOVED***
          onPress={() => share('app')***REMOVED***
        />
        {props.route.params.lessonType !== 'v' ? (
          <ModalButton
            title={
              props.activeDatabase.translations.modals.shareOptions
                .sharePassageText
            ***REMOVED***
            onPress={() => share('text')***REMOVED***
          />
        ) : null***REMOVED***
        {(props.route.params.lessonType === 'qa' ||
          props.route.params.lessonType === 'qav') &&
        !props.downloads[props.route.params.thisLesson.id] ? (
          <ModalButton
            title={
              props.activeDatabase.translations.modals.shareOptions
                .sharePassageAudio
            ***REMOVED***
            onPress={() => share('audio')***REMOVED***
          />
        ) : null***REMOVED***
        {props.route.params.lessonType !== 'qa' &&
        props.route.params.lessonType !== 'q' ? (
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
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF'
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
    flexWrap: 'nowrap'
  ***REMOVED***,
  title: {
    textAlign: 'center',
    fontSize: 30 * scaleMultiplier,
    flexWrap: 'nowrap'
  ***REMOVED***,
  albumArtListContainer: {
    width: '100%'
  ***REMOVED***,
  albumArtContainer: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').width - 80,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#DEE3E9',
    flexDirection: 'row',
    overflow: 'hidden'
  ***REMOVED***,
  textContainer: {
    flexDirection: 'column',
    flex: 1
  ***REMOVED***,
  albumArtText: {
    fontSize: 18 * scaleMultiplier
  ***REMOVED***,
  scrollBar: {
    width: 4,
    height: 150 * scaleMultiplier,
    backgroundColor: '#9FA5AD',
    borderRadius: 10,
    alignSelf: 'center'
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
    font: state.database[activeGroup.language].font
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
    setBookmark: groupName => {
      dispatch(setBookmark(groupName))
    ***REMOVED***,
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen)
