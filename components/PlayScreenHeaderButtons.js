import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { colors ***REMOVED*** from '../styles/colors'

function PlayScreenHeaderButtons ({
  // Props passed from a parent component.
  shareOnPress,
  completeOnPress,
  completeCondition,
  // Props passed from redux.
  isRTL
***REMOVED***) {
  //+ RENDER

  return (
    <View
      style={[
        styles.headerButtonsContainer,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginHorizonal: 5
        ***REMOVED***
      ]***REMOVED***
    >
      <TouchableOpacity onPress={shareOnPress***REMOVED***>
        <Icon
          name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'***REMOVED***
          size={32 * scaleMultiplier***REMOVED***
          color={colors.oslo***REMOVED***
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginHorizontal: 5 ***REMOVED******REMOVED***
        onPress={completeOnPress***REMOVED***
      >
        <Icon
          name={completeCondition ? 'check-filled' : 'check-outline'***REMOVED***
          size={35 * scaleMultiplier***REMOVED***
          color={colors.oslo***REMOVED***
        />
      </TouchableOpacity>
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(PlayScreenHeaderButtons)
