import React from 'react'
import { View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    primaryColor: state.database[activeGroup.language].primaryColor
  ***REMOVED***
***REMOVED***

function ChapterSeparator ({
  // Props passed from redux.
  primaryColor
***REMOVED***) {
  return (
    <View
      style={{
        height: '100%',
        width: 2,
        backgroundColor: primaryColor
      ***REMOVED******REMOVED***
    />
  )
***REMOVED***

export default connect(mapStateToProps)(ChapterSeparator)
