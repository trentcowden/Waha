import React from 'react'
import { View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'

function ChapterSeparator (props) {
  return (
    <View
      style={{
        height: '100%',
        width: 2,
        backgroundColor: props.primaryColor
      ***REMOVED******REMOVED***
    />
  )
***REMOVED***

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    primaryColor: state.database[activeGroup.language].primaryColor
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(ChapterSeparator)
