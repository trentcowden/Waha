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
    chapter2IconName = '2-filled'
  ***REMOVED*** else if (props.activeChapter === 'passage') {
    chapter2IconName = '2-outline'
  ***REMOVED*** else {
    chapter2IconName = 'check-filled'
  ***REMOVED***

  // render chapter 2 button conditionally based off whether it's downloaded or not
  var chapter2Button =
    props.downloads[props.lessonID] && props.downloads[props.lessonID] < 1 ? (
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
          tintColor={props.colors.primary***REMOVED***
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
      <TouchableOpacity
        style={[
          styles.chapterSelect,
          {
            borderColor: props.colors.primary,
            backgroundColor:
              props.activeChapter === 'passage'
                ? props.colors.primary
                : '#EFF2F4'
          ***REMOVED***
        ]***REMOVED***
        onPress={() => props.onPress('passage')***REMOVED***
      >
        <Icon
          name={chapter2IconName***REMOVED***
          size={25***REMOVED***
          color={
            props.activeChapter === 'passage' ? 'white' : props.colors.primary
          ***REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color:
                props.activeChapter === 'passage'
                  ? 'white'
                  : props.colors.primary,
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
      <TouchableOpacity
        style={[
          styles.chapterSelect,
          {
            borderColor: props.colors.primary,
            backgroundColor:
              props.activeChapter === 'fellowship'
                ? props.colors.primary
                : '#EFF2F4'
          ***REMOVED***
        ]***REMOVED***
        onPress={() => props.onPress('fellowship')***REMOVED***
      >
        <Icon
          name={
            props.activeChapter === 'fellowship' ? '1-outline' : 'check-filled'
          ***REMOVED***
          size={25***REMOVED***
          color={
            props.activeChapter === 'fellowship'
              ? 'white'
              : props.colors.primary
          ***REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color:
                props.activeChapter === 'fellowship'
                  ? 'white'
                  : props.colors.primary,
              fontFamily: props.font + '-black'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.labels.fellowship***REMOVED***
        </Text>
      </TouchableOpacity>
      {chapter2Button***REMOVED***
      <TouchableOpacity
        style={[
          styles.chapterSelect,
          {
            borderColor: props.colors.primary,
            backgroundColor:
              props.activeChapter === 'application'
                ? props.colors.primary
                : '#EFF2F4'
          ***REMOVED***
        ]***REMOVED***
        onPress={() => props.onPress('application')***REMOVED***
      >
        <Icon
          name={
            props.activeChapter === 'application' ? '3-outline' : '3-filled'
          ***REMOVED***
          size={25***REMOVED***
          color={
            props.activeChapter === 'application'
              ? 'white'
              : props.colors.primary
          ***REMOVED***
        />
        <Text
          style={[
            styles.chapterSelectText,
            {
              color:
                props.activeChapter === 'application'
                  ? 'white'
                  : props.colors.primary,
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
    colors: state.database[activeGroup.language].colors,
    downloads: state.downloads,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(ChapterSelect)
