import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../../constants'
import { activeDatabaseSelector ***REMOVED*** from '../../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../../styles/colors'

function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL
  ***REMOVED***
***REMOVED***

// component rendered behind a lesson item that shows the swipe options

const LessonSwipeBackdrop = ({
  // Props passed from a parent component.s
  isComplete,
  toggleComplete,
  showShareModal,
  // Props passed from redux.
  isRTL
***REMOVED***) => {
  //+ RENDER

  // render complete button conditionally since it could be complete or incomplete
  var completeButton = isComplete ? (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: colors.chateau,
          alignItems: isRTL ? 'flex-end' : 'flex-start'
        ***REMOVED***
      ]***REMOVED***
      onPress={toggleComplete***REMOVED***
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
          alignItems: isRTL ? 'flex-end' : 'flex-start'
        ***REMOVED***
      ]***REMOVED***
      onPress={toggleComplete***REMOVED***
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
        { flexDirection: isRTL ? 'row-reverse' : 'row' ***REMOVED***
      ]***REMOVED***
    >
      {completeButton***REMOVED***
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor: colors.blue,
            alignItems: isRTL ? 'flex-start' : 'flex-end'
          ***REMOVED***
        ]***REMOVED***
        onPress={showShareModal***REMOVED***
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

//+ STYLES

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

export default connect(mapStateToProps)(LessonSwipeBackdrop)
