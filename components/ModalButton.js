import React from 'react'
import { StyleSheet, Text, TouchableOpacity ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
// button rendered on the options modal component
function ModalButton (props) {
  //+ RETURN

  return (
    <TouchableOpacity style={styles.modalButtonStyle***REMOVED*** onPress={props.onPress***REMOVED***>
      <Text
        style={[
          props.style,
          Typography(props, 'h3', 'regular', 'center', colors.shark)
        ]***REMOVED***
      >
        {props.title***REMOVED***
      </Text>
      {props.children***REMOVED***
    </TouchableOpacity>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  modalButtonStyle: {
    width: '100%',
    height: 70 * scaleMultiplier,
    justifyContent: 'center',
    borderBottomColor: colors.athens,
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: state.database[activeGroup.language].font,
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(ModalButton)
