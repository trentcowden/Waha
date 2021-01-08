//basic imports
import React from 'react'
import { Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, getLanguageFont ***REMOVED*** from '../constants'
import { StandardTypography ***REMOVED*** from '../styles/typography'
function TimeDisplay (props) {
  //function to convert a time in milliseconds to a
  //nicely formatted string (for the scrubber)
  function msToTime (duration) {
    if (duration > 0 && duration <= props.max) {
      if (duration >= 3600000) {
        var seconds = Math.floor((duration / 1000) % 60)
        var minutes = Math.floor((duration / (1000 * 60)) % 60)
        var hours = Math.floor((duration / (1000 * 60 * 60)) % 60)

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        return hours + ':' + minutes + ':' + seconds
      ***REMOVED*** else {
        var seconds = Math.floor((duration / 1000) % 60)
        var minutes = Math.floor((duration / (1000 * 60)) % 60)

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        return minutes + ':' + seconds
      ***REMOVED***
    ***REMOVED*** else if (duration > props.max) {
      return msToTime(props.max)
    ***REMOVED*** else {
      return '00:00'
    ***REMOVED***
  ***REMOVED***

  return (
    <View styles={props.style***REMOVED***>
      <Text
        style={StandardTypography(
          { font: 'Roboto' ***REMOVED***,
          'd',
          'Regular',
          'center',
          colors.shark
        )***REMOVED***
      >
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
    font: getLanguageFont(activeGroup.language),
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(TimeDisplay)
