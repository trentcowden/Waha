//basic imports
import React from 'react'
import { Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors ***REMOVED*** from '../constants'
function TimeDisplay (props) {
  //function to convert a time in milliseconds to a
  //nicely formatted string (for the scrubber)
  function msToTime (duration) {
    if (duration > 0 && duration <= props.max) {
      var seconds = Math.floor((duration / 1000) % 60)
      var minutes = Math.floor((duration / (1000 * 60)) % 60)

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      return minutes + ':' + seconds
    ***REMOVED*** else if (duration > props.max) {
      return msToTime(props.max)
    ***REMOVED*** else {
      return '00:00'
    ***REMOVED***
  ***REMOVED***

  return (
    <View styles={props.style***REMOVED***>
      <Text style={Typography(props, 'd', 'regular', 'center', colors.shark)***REMOVED***>
        {msToTime(props.time)***REMOVED***
      </Text>
    </View>
  )
***REMOVED***

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(TimeDisplay)
