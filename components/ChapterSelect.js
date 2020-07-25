import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
// chapter select on play screen
//  1. allows switching of lessons
//  2. shows what your current chapter is
function ChapterSelect (props) {
  // order of chapters is
  //  1. fellowship
  //  2. story
  //  3. (if applicable) training, which is always a video
  //  4. application

  // RENDER

  // render story icon conditionally based off if it's not active, active, or completed
  var storyIcon
  if (props.activeChapter === 'fellowship') {
    storyIcon = 'number-2-filled'
  ***REMOVED*** else if (props.activeChapter === 'story') {
    storyIcon = 'number-2-outline'
  ***REMOVED*** else {
    storyIcon = 'check-filled'
  ***REMOVED***

  // render training button based on a lot of factors
  var trainingButton

  // if our lesson type shows that we have a video, render the video button
  // otherwise, render nothing for training button
  if (props.lessonType === 'qav' || props.lessonType === 'qv') {
    // if we're not connected to the internet, and the video is not downloaded,
    //  then show a cloud slash icon. the user cannot play the video in this
    //    case, so it's not touchable
    if (!props.isConnected && !props.isDownloaded) {
      trainingButton = (
        <View
          style={[
            styles.chapterSelect,
            {
              borderColor: colors.chateau,
              backgroundColor: colors.athens
            ***REMOVED***
          ]***REMOVED***
        >
          <Icon
            name='cloud-slash'
            size={25 * scaleMultiplier***REMOVED***
            color={colors.chateau***REMOVED***
          />
          <Text
            style={[
              styles.chapterSelectText,
              {
                color: colors.shark,
                fontFamily: props.font + '-black'
              ***REMOVED***
            ]***REMOVED***
          >
            {props.translations.play.training***REMOVED***
          </Text>
        </View>
      )
      // if the video is currently downloading, show the progress bar
    ***REMOVED*** else if (
      props.downloads[props.lessonID + 'v'] &&
      props.downloads[props.lessonID + 'v'] < 1
    ) {
      trainingButton = (
        <View
          style={[
            styles.chapterSelect,
            {
              borderColor: colors.chateau,
              backgroundColor: colors.athens
            ***REMOVED***
          ]***REMOVED***
        >
          <AnimatedCircularProgress
            size={20 * scaleMultiplier***REMOVED***
            width={4***REMOVED***
            fill={props.downloads[props.lessonID + 'v'] * 100***REMOVED***
            tintColor={props.primaryColor***REMOVED***
            rotation={0***REMOVED***
            backgroundColor={colors.white***REMOVED***
            style={{ margin: 5 ***REMOVED******REMOVED***
          />
          <Text
            style={[
              styles.chapterSelectText,
              {
                color: colors.shark,
                fontFamily: props.font + '-black'
              ***REMOVED***
            ]***REMOVED***
          >
            {props.translations.play.training***REMOVED***
          </Text>
        </View>
      )
      // if our video is downloaded or we have the internet to stream it, then
      //  show the button as normal
    ***REMOVED*** else {
      trainingButton = (
        <TouchableOpacity
          style={[
            styles.chapterSelect,
            {
              borderColor: props.primaryColor,
              backgroundColor:
                props.activeChapter === 'training'
                  ? props.primaryColor
                  : colors.athens
            ***REMOVED***
          ]***REMOVED***
          onPress={() => props.onPress('training')***REMOVED***
        >
          <Icon
            name={
              props.activeChapter === 'application'
                ? 'check-filled'
                : props.activeChapter === 'training'
                ? 'number-3-outline'
                : 'number-3-filled'
            ***REMOVED***
            size={25 * scaleMultiplier***REMOVED***
            color={
              props.activeChapter === 'training'
                ? colors.white
                : props.primaryColor
            ***REMOVED***
          />
          <Text
            style={[
              styles.chapterSelectText,
              {
                color:
                  props.activeChapter === 'training'
                    ? colors.white
                    : props.primaryColor,
                fontFamily: props.font + '-black'
              ***REMOVED***
            ]***REMOVED***
          >
            {props.translations.play.training***REMOVED***
          </Text>
        </TouchableOpacity>
      )
    ***REMOVED***
  ***REMOVED*** else {
    trainingButton = null
  ***REMOVED***

  // render chapter 2 button based on a lot of factors
  var storyButton

  // if our lesson type shows we have an audio source, and we are not connected
  //  and the lesson isn't downloaded, show the cloud slash icon. the user
  //  can't listen to the audio, so it's not touchable
  if (
    (props.lessonType === 'qa' || props.lessonType === 'qav') &&
    !props.isConnected &&
    !props.isDownloaded
  )
    storyButton = (
      <View
        style={[
          styles.chapterSelect,
          {
            borderColor: Colors.darkGrey1,
            backgroundColor: Colors.lightGray3
          ***REMOVED***
        ]***REMOVED***
      >
        <Icon
          name='cloud-slash'
          size={25 * scaleMultiplier***REMOVED***
          color={colors.chateau***REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color: colors.chateau,

              fontFamily: props.font + '-black'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.play.story***REMOVED***
        </Text>
      </View>
    )
  // if the audio is downloading, show the progress
  else if (
    props.downloads[props.lessonID] &&
    props.downloads[props.lessonID] < 1
  )
    storyButton = (
      // if the lesson is downloading, show the progress in the chapter button
      <View
        style={[
          styles.chapterSelect,
          {
            borderColor: colors.chateau,
            backgroundColor: colors.athens
          ***REMOVED***
        ]***REMOVED***
      >
        <AnimatedCircularProgress
          size={20 * scaleMultiplier***REMOVED***
          width={4***REMOVED***
          fill={props.downloads[props.lessonID] * 100***REMOVED***
          tintColor={props.primaryColor***REMOVED***
          rotation={0***REMOVED***
          backgroundColor={colors.white***REMOVED***
          style={{ margin: 5 ***REMOVED******REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color: colors.chateau,
              fontFamily: props.font + '-black'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.play.story***REMOVED***
        </Text>
      </View>
    )
  // otherwise, show the button as normal
  else
    storyButton = (
      <TouchableOpacity
        style={[
          styles.chapterSelect,
          {
            borderColor: props.primaryColor,
            backgroundColor:
              props.activeChapter === 'story'
                ? props.primaryColor
                : colors.athens
          ***REMOVED***
        ]***REMOVED***
        onPress={() => props.onPress('story')***REMOVED***
      >
        <Icon
          name={storyIcon***REMOVED***
          size={25 * scaleMultiplier***REMOVED***
          color={
            props.activeChapter === 'story' ? colors.white : props.primaryColor
          ***REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color:
                props.activeChapter === 'story'
                  ? colors.white
                  : props.primaryColor,
              fontFamily: props.font + '-black'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.play.story***REMOVED***
        </Text>
      </TouchableOpacity>
    )

  // other 2 buttons are always rendered, so they aren't dynamic
  return (
    <View style={styles.chapterSelectContainer***REMOVED***>
      {/* fellowship button */***REMOVED***
      <TouchableOpacity
        style={[
          styles.chapterSelect,
          {
            borderColor: props.primaryColor,
            backgroundColor:
              props.activeChapter === 'fellowship'
                ? props.primaryColor
                : colors.athens
          ***REMOVED***
        ]***REMOVED***
        onPress={() => props.onPress('fellowship')***REMOVED***
      >
        <Icon
          name={
            props.activeChapter === 'fellowship'
              ? 'number-1-outline'
              : 'check-filled'
          ***REMOVED***
          size={25 * scaleMultiplier***REMOVED***
          color={
            props.activeChapter === 'fellowship'
              ? colors.white
              : props.primaryColor
          ***REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color:
                props.activeChapter === 'fellowship'
                  ? colors.white
                  : props.primaryColor,
              fontFamily: props.font + '-black'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.play.fellowship***REMOVED***
        </Text>
      </TouchableOpacity>

      {/* story button (defined earlier) */***REMOVED***
      {storyButton***REMOVED***

      {/* training button (defined earlier) */***REMOVED***
      {trainingButton***REMOVED***

      {/* application button */***REMOVED***
      <TouchableOpacity
        style={[
          styles.chapterSelect,
          {
            borderColor: props.primaryColor,
            backgroundColor:
              props.activeChapter === 'application'
                ? props.primaryColor
                : colors.athens
          ***REMOVED***
        ]***REMOVED***
        onPress={() => props.onPress('application')***REMOVED***
      >
        <Icon
          name={
            props.lessonType === 'qav' || props.lessonType === 'qv'
              ? props.activeChapter === 'application'
                ? 'number-4-outline'
                : 'number-4-filled'
              : props.activeChapter === 'application'
              ? 'number-3-outline'
              : 'number-3-filled'
          ***REMOVED***
          size={25 * scaleMultiplier***REMOVED***
          color={
            props.activeChapter === 'application'
              ? colors.white
              : props.primaryColor
          ***REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color:
                props.activeChapter === 'application'
                  ? colors.white
                  : props.primaryColor,
              fontFamily: props.font + '-black'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.play.application***REMOVED***
        </Text>
      </TouchableOpacity>
    </View>
  )
***REMOVED***

// STYLES

const styles = StyleSheet.create({
  chapterSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  ***REMOVED***,
  chapterSelect: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 55 * scaleMultiplier,
    justifyContent: 'center',
    borderWidth: 2
  ***REMOVED***,
  chapterSelectText: {
    fontSize: 14 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    primaryColor: state.database[activeGroup.language].primaryColor,
    downloads: state.downloads,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font,
    isConnected: state.network.isConnected
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(ChapterSelect)
