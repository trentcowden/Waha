import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import Modal from 'react-native-modal'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
// modal variant that shows some information
function MessageModal (props) {
  var cancelButton = props.cancelText ? (
    <TouchableOpacity
      style={{
        marginVertical: 15
        // marginBottom: 40 * scaleMultiplier,
        // marginTop: 80 * scaleMultiplier
      ***REMOVED******REMOVED***
      onPress={props.cancelOnPress***REMOVED***
    >
      <Text style={Typography(props, 'h2', 'medium', 'left', colors.red)***REMOVED***>
        {props.cancelText***REMOVED***
      </Text>
    </TouchableOpacity>
  ) : null

  //// RENDER
  return (
    <Modal
      isVisible={props.isVisible***REMOVED***
      hasBackdrop={true***REMOVED***
      onBackdropPress={props.hideModal***REMOVED***
      backdropOpacity={0.3***REMOVED***
      style={{ justifyContent: 'flex-end', flex: 1, margin: 0 ***REMOVED******REMOVED***
    >
      <View style={styles.contentContainer***REMOVED***>
        {props.children***REMOVED***
        <Text
          style={[
            Typography(props, 'h1', 'black', 'center', colors.shark),
            { marginVertical: 10 ***REMOVED***
          ]***REMOVED***
        >
          {props.title***REMOVED***
        </Text>
        <Text
          style={[
            Typography(props, 'h3', 'medium', 'center', colors.shark),
            { paddingHorizontal: 20 ***REMOVED***
          ]***REMOVED***
        >
          {props.body***REMOVED***
        </Text>
        <TouchableOpacity
          style={{
            // marginVertical: 10,
            width: '100%',
            height: 80 * scaleMultiplier,
            justifyContent: 'center'
            // backgroundColor: 'blue'
          ***REMOVED******REMOVED***
          onPress={props.confirmOnPress***REMOVED***
        >
          <Text
            style={Typography(props, 'h2', 'medium', 'center', colors.apple)***REMOVED***
          >
            {props.confirmText***REMOVED***
          </Text>
        </TouchableOpacity>
        {cancelButton***REMOVED***
      </View>
    </Modal>
  )
***REMOVED***

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(MessageModal)
