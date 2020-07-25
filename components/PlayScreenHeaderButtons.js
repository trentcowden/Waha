import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
function PlayScreenHeaderButtons (props) {
  //// RENDER

  return (
    <View
      style={[
        styles.headerButtonsContainer,
        {
          flexDirection: props.isRTL ? 'row-reverse' : 'row',
          marginHorizonal: 5
        ***REMOVED***
      ]***REMOVED***
    >
      <TouchableOpacity onPress={props.shareOnPress***REMOVED***>
        <Icon
          name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'***REMOVED***
          size={32 * scaleMultiplier***REMOVED***
          color={colors.oslo***REMOVED***
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginHorizontal: 5 ***REMOVED******REMOVED***
        onPress={props.completeOnPress***REMOVED***
      >
        <Icon
          name={props.completeCondition ? 'check-filled' : 'check-outline'***REMOVED***
          size={35 * scaleMultiplier***REMOVED***
          color={colors.oslo***REMOVED***
        />
      </TouchableOpacity>
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(PlayScreenHeaderButtons)
