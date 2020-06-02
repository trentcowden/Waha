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
  Share
***REMOVED*** from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { scaleMultiplier, setImages ***REMOVED*** from '../constants'
import { Audio ***REMOVED*** from 'expo-av'
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
  removeDownload
***REMOVED*** from '../redux/actions/downloadActions'
import SVG from '../assets/svg'

console.disableYellowBox = true

function PlayScreen (props) {
  //// STATE

  // stores loaded audio file
  const [soundObject, setSoundObject] = useState(new Audio.Sound())

  // stores the length of the current audio file in milliseconds (loaded by sound object)
  const [audioFileLength, setAudioFileLength] = useState(null)

  // keeps track of if the audio file is loaded
  const [isLoaded, setIsLoaded] = useState(false)

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
  const [chapter1Source, setChapter1Source] = useState()
  const [chapter2Source, setChapter2Source] = useState()
  const [chapter3Source, setChapter3Source] = useState()

  const [videoSource, setVideoSource] = useState()

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
      svgName:
        'set' +
        props.activeDatabase.sets.filter(
          set => set.id === props.route.params.thisLesson.setid
        )[0].index
    ***REMOVED***,
    {
      key: '2',
      type: 'text'
    ***REMOVED***
  ]

  //// CONSTRUCTOR

  useEffect(() => {
    //set nav options
    props.navigation.setOptions(getNavOptions())

    // set chapters 1 and 3 according the questions type of this lesson
    setChapter1Source(
      FileSystem.documentDirectory +
        props.activeGroup.language +
        '-' +
        props.route.params.thisLesson.questionsType +
        '-chapter1.mp3'
    )
    setChapter3Source(
      FileSystem.documentDirectory +
        props.activeGroup.language +
        '-' +
        props.route.params.thisLesson.questionsType +
        '-chapter3.mp3'
    )

    // check if this lesson has an audio source
    if (props.thisLesson.audioSource) {
      // if it does, set the source to it
      FileSystem.documentDirectory + props.route.params.thisLesson.id + '.mp3'

      // if an audio file is not donwloading and not currently downloading, download it
      if (
        !props.route.params.isDownloaded &&
        !(props.route.params.thisLesson.id in props.downloads)
      ) {
        props.downloadLesson(
          props.route.params.thisLesson.id,
          props.route.params.thisLesson.audioSource
        )
      ***REMOVED***
      // otherwise, set the source to our dummy mp3 file
    ***REMOVED*** else {
      setChapter2Source(
        FileSystem.documentDirectory +
          props.activeGroup.language +
          '-' +
          'dummy-chapter2.mp3'
      )
    ***REMOVED***

    // TODO: video stuff
    if (props.thisLesson.videoSource) {
    ***REMOVED***

    //set up our timer tick for updating the seeker every second
    const interval = setInterval(updateSeekerTick, 1000)

    //when leaving the screen, cancel the interval timer and unload the audio file
    return function cleanup () {
      clearInterval(interval)
      if (soundObject) {
        soundObject.unloadAsync()
        setSoundObject(null)
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [])

  // once we set a chapter 1 source, load it up
  useEffect(() => {
    if (chapter1Source) {
      try {
        loadAudioFile(chapter1Source)
      ***REMOVED*** catch (error) {
        console.log(error)
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [chapter1Source])

  // if a download finishes, remove it from download tracking object
  useEffect(() => {
    if (props.downloads[props.route.params.thisLesson.id] == 1) {
      props.removeDownload(props.route.params.thisLesson.id)
    ***REMOVED***
  ***REMOVED***, [props.downloads])

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
        changeChapter('passage')
      ***REMOVED*** else if (activeChapter === 'passage') {
        FileSystem.getInfoAsync(
          FileSystem.documentDirectory +
            props.route.params.thisLesson.id +
            '.mp3'
        ).then(({ exists ***REMOVED***) => {
          // only switch to chapter 2 if it's downloaded
          if (exists && !(props.route.params.thisLesson.id in props.downloads))
            changeChapter('application')
        ***REMOVED***)
      ***REMOVED*** else if (activeChapter === 'application') {
        if (
          !props.activeGroup.progress.includes(
            props.route.params.thisLesson.index
          )
        ) {
          changeCompleteStatus()
        ***REMOVED***
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

  // gets called every second by our timer and updates the seeker position based on the progress through the audio file
  async function updateSeekerTick () {
    if (shouldTickUpdate.current) {
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

  // plays the audio if it's currently paused and pauses the audio if it's currently playing
  function playHandler () {
    if (isLoaded) {
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
      setIsPlaying(currentStatus => !currentStatus)
    ***REMOVED***
  ***REMOVED***

  // starts playing loaded audio from the position the user releases the thumb at
  // note: catchs are empty because of a weird ios-only warning appearing
  // that doesn't seem to affect any functionality--it's being ignored
  function onSeekRelease (value) {
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
    shouldTickUpdate.current = true
    setSeekPosition(value)
  ***REMOVED***

  // sets shouldTickUpdate to flase to prevent the seeker from updating while dragging
  function onSeekDrag (value) {
    shouldTickUpdate.current = false
  ***REMOVED***

  // skips an amount of milliseconds through the audio track
  function skip (amount) {
    isPlaying
      ? soundObject.setStatusAsync({
          shouldPlay: true,
          positionMillis: seekPosition + amount
        ***REMOVED***)
      : soundObject.setStatusAsync({
          shouldPlay: false,
          positionMillis: seekPosition + amount
        ***REMOVED***)
    setSeekPosition(seekPosition => seekPosition + amount)
  ***REMOVED***

  //// OTHER FUNCTIONS

  // changes the active chapter
  function changeChapter (chapter) {
    shouldTickUpdate.current = false
    setSeekPosition(0)
    soundObject.unloadAsync()
    setActiveChapter(chapter)

    if (chapter === 'fellowship') {
      loadAudioFile(chapter1Source)
    ***REMOVED*** else if (chapter === 'passage') {
      loadAudioFile(chapter2Source)
    ***REMOVED*** else if (chapter === 'application') {
      loadAudioFile(chapter3Source)
    ***REMOVED***
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
        props.translations.alerts.markedAsIncomplete.body,
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
        props.translations.alerts.markedAsComplete.body,
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
          style={[styles.albumArtText, { fontFamily: props.font + '-medium' ***REMOVED***]***REMOVED***
        >
          {textList.item.header***REMOVED***
        </Text>
        <Text
          style={[styles.albumArtText, { fontFamily: props.font + '-regular' ***REMOVED***]***REMOVED***
        >
          {textList.item.text + '\n'***REMOVED***
        </Text>
      </View>
    )
  ***REMOVED***

  // renders the play/pause/skip container conditionally because we don't want to show controls when the audio is loading
  // if we're loading, render a loading circle; otherwise load the audio controls
  var audioControlContainer = isLoaded ? (
    <View style={styles.audioControlContainer***REMOVED***>
      <ChapterSelect
        activeChapter={activeChapter***REMOVED***
        lessonID={props.route.params.thisLesson.id***REMOVED***
        onPress={chapter => changeChapter(chapter)***REMOVED***
      />
      <Scrubber
        value={seekPosition***REMOVED***
        onSlidingComplete={onSeekRelease***REMOVED***
        onValueChange={onSeekDrag***REMOVED***
        maximumValue={audioFileLength***REMOVED***
        seekPosition={seekPosition***REMOVED***
      />
      <PlayPauseSkip
        isPlaying={isPlaying***REMOVED***
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
        <View style={styles.albumArtListContainer***REMOVED***>
          <FlatList
            data={albumArtData***REMOVED***
            renderItem={renderAlbumArtItem***REMOVED***
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
        </View>
      </View>
      {audioControlContainer***REMOVED***

      {/* MODALS */***REMOVED***
      <OptionsModal
        isVisible={showShareLessonModal***REMOVED***
        hideModal={() => setShowShareLessonModal(false)***REMOVED***
        closeText={props.translations.modals.lessonOptions.close***REMOVED***
      >
        <ModalButton
          title={props.translations.modals.lessonOptions.shareApp***REMOVED***
          onPress={() => share('app')***REMOVED***
        />
        <ModalButton
          title={props.translations.modals.lessonOptions.sharePassageText***REMOVED***
          onPress={() => share('text')***REMOVED***
        />
        <ModalButton
          isLast={true***REMOVED***
          title={props.translations.modals.lessonOptions.sharePassageAudio***REMOVED***
          onPress={() => share('audio')***REMOVED***
        />
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
    fontSize: 18 * scaleMultiplier,
    textAlign: 'justify'
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
    setBookmark: groupName => {
      dispatch(setBookmark(groupName))
    ***REMOVED***,
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen)
