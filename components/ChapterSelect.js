import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress'
import { scaleMultiplier ***REMOVED*** from '../constants'

function ChapterSelect (props) {
  // RENDER

  // render chapter 2 icon conditionally based off if it's not active, active, or completed
  var chapter2IconName
  if (props.activeChapter === 'fellowship') {
    chapter2IconName = 'number-2-fill'
  ***REMOVED*** else if (props.activeChapter === 'passage') {
    chapter2IconName = 'number-2-outline'
  ***REMOVED*** else {
    chapter2IconName = 'check-fill'
  ***REMOVED***

  // render chapter 2 button
  var chapter2Button =
    props.downloads[props.lessonID] && props.downloads[props.lessonID] < 1 ? (
      // if the lesson is downloading, show the progress in the chapter button
      <View
        style={[
          styles.chapterSelect,
          {
            flexDirection: 'row',
            borderColor: '#82868D',
            backgroundColor: '#EFF2F4'
          ***REMOVED***
        ]***REMOVED***
      >
        <AnimatedCircularProgress
          size={20***REMOVED***
          width={4***REMOVED***
          fill={props.downloads[props.lessonID] * 100***REMOVED***
          tintColor={props.primaryColor***REMOVED***
          rotation={0***REMOVED***
          backgroundColor='#FFFFFF'
          style={{ margin: 5 ***REMOVED******REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color: '#82868D',
              fontFamily: props.font + '-black'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.labels.passage***REMOVED***
        </Text>
      </View>
    ) : (
      // otherwise, show the button as normal
      <TouchableOpacity
        style={[
          styles.chapterSelect,
          {
            borderColor: props.primaryColor,
            backgroundColor:
              props.activeChapter === 'passage' ? props.primaryColor : '#EFF2F4'
          ***REMOVED***
        ]***REMOVED***
        onPress={
          props.hasAudioSource
            ? () => props.onPress('passage')
            : () => {
                props.onPress('passage')
                props.goToScripture()
              ***REMOVED***
        ***REMOVED***
      >
        <Icon
          name={chapter2IconName***REMOVED***
          size={25***REMOVED***
          color={
            props.activeChapter === 'passage' ? 'white' : props.primaryColor
          ***REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color:
                props.activeChapter === 'passage'
                  ? 'white'
                  : props.primaryColor,
              fontFamily: props.font + '-black'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.labels.passage***REMOVED***
        </Text>
      </TouchableOpacity>
    )

  return (
    <View style={styles.chapterSelectContainer***REMOVED***>
      {/* chapter 1 button */***REMOVED***
      <TouchableOpacity
        style={[
          styles.chapterSelect,
          {
            borderColor: props.primaryColor,
            backgroundColor:
              props.activeChapter === 'fellowship'
                ? props.primaryColor
                : '#EFF2F4'
          ***REMOVED***
        ]***REMOVED***
        onPress={() => props.onPress('fellowship')***REMOVED***
      >
        <Icon
          name={
            props.activeChapter === 'fellowship'
              ? 'number-1-outline'
              : 'check-fill'
          ***REMOVED***
          size={25***REMOVED***
          color={
            props.activeChapter === 'fellowship' ? 'white' : props.primaryColor
          ***REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color:
                props.activeChapter === 'fellowship'
                  ? 'white'
                  : props.primaryColor,
              fontFamily: props.font + '-black'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.labels.fellowship***REMOVED***
        </Text>
      </TouchableOpacity>

      {/* chapter 2 button (defined earlier) */***REMOVED***
      {chapter2Button***REMOVED***

      {/* chapter 3 button */***REMOVED***
      <TouchableOpacity
        style={[styles.chapterSelect, { borderColor: props.primaryColor ***REMOVED***]***REMOVED***
        onPress={() => props.onPress('application')***REMOVED***
      >
        <Icon
          name={
            props.activeChapter === 'application'
              ? 'number-3-outline'
              : 'number-3-fill'
          ***REMOVED***
          size={25***REMOVED***
          color={
            props.activeChapter === 'application' ? 'white' : props.primaryColor
          ***REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color:
                props.activeChapter === 'application'
                  ? 'white'
                  : props.primaryColor,
              fontFamily: props.font + '-black'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.labels.application***REMOVED***
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
    flexDirection: 'row',
    alignItems: 'center',
    height: 50 * scaleMultiplier,
    justifyContent: 'center',
    borderWidth: 2
  ***REMOVED***,
  chapterSelectText: {
    fontSize: 16 * scaleMultiplier
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
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(ChapterSelect)
