import React from 'react'
import { StyleSheet, TouchableOpacity ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
// simple back button that is shown in almost every screen's header
function BackButton (props) {
  //+ RENDER

  return (
    <TouchableOpacity
      style={[
        styles.backButtonContainer,
        { justifyContent: props.isRTL ? 'flex-end' : 'flex-start' ***REMOVED***
      ]***REMOVED***
      onPress={props.onPress***REMOVED***
    >
      <Icon
        name={props.isRTL ? 'arrow-right' : 'arrow-left'***REMOVED***
        size={45 * scaleMultiplier***REMOVED***
        color={props.color ? props.color : colors.oslo***REMOVED***
      />
    </TouchableOpacity>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  backButtonContainer: {
    flexDirection: 'row',
    width: 100
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

export default connect(mapStateToProps)(BackButton)
