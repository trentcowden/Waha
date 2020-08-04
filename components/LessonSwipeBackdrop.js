import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
// component rendered behind a lesson item that shows the swipe options
function LessonSwipeBackdrop (props) {
  //// RENDER

  // render complete button conditionally since it could be complete or incomplete
  var completeButton = props.isComplete ? (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: colors.chateau,
          alignItems: props.isRTL ? 'flex-end' : 'flex-start'
        ***REMOVED***
      ]***REMOVED***
      onPress={props.toggleComplete***REMOVED***
    >
      <View style={styles.iconContainer***REMOVED***>
        <Icon name='cancel-filled' size={20***REMOVED*** color={colors.white***REMOVED*** />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: colors.apple,
          alignItems: props.isRTL ? 'flex-end' : 'flex-start'
        ***REMOVED***
      ]***REMOVED***
      onPress={props.toggleComplete***REMOVED***
    >
      <View style={styles.iconContainer***REMOVED***>
        <Icon name='check-filled' size={20***REMOVED*** color={colors.white***REMOVED*** />
      </View>
    </TouchableOpacity>
  )

  return (
    <View
      style={[
        styles.lessonSwipeBackdropContainer,
        { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
      ]***REMOVED***
    >
      {completeButton***REMOVED***
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor: colors.blue,
            alignItems: props.isRTL ? 'flex-start' : 'flex-end'
          ***REMOVED***
        ]***REMOVED***
        onPress={props.showShareModal***REMOVED***
      >
        <View style={styles.iconContainer***REMOVED***>
          <Icon
            name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'***REMOVED***
            size={20***REMOVED***
            color={colors.white***REMOVED***
          />
        </View>
      </TouchableOpacity>
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  lessonSwipeBackdropContainer: {
    width: '100%',
    flex: 1
  ***REMOVED***,
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  ***REMOVED***,
  iconContainer: {
    width: 50 * scaleMultiplier,
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(LessonSwipeBackdrop)
