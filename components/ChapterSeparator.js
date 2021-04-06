import React from 'react'
import { View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { activeDatabaseSelector ***REMOVED*** from '../redux/reducers/activeGroup'

function mapStateToProps (state) {
  return {
    primaryColor: activeDatabaseSelector(state).primaryColor
  ***REMOVED***
***REMOVED***

const ChapterSeparator = ({
  // Props passed from redux.
  primaryColor
***REMOVED***) => {
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
