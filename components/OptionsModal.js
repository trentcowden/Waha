import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native'
import Modal from 'react-native-modal'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { connect ***REMOVED*** from 'react-redux'

function OptionsModal (props) {
  //// RENDER
  return (
    <Modal
      isVisible={props.isVisible***REMOVED***
      hasBackdrop={true***REMOVED***
      onBackdropPress={props.hideModal***REMOVED***
      backdropOpacity={0.3***REMOVED***
      style={{ justifyContent: 'flex-end' ***REMOVED******REMOVED***
    >
      <View>
        <View style={styles.buttonsContainer***REMOVED***>{props.children***REMOVED***</View>
        <View style={styles.closeButtonContainer***REMOVED***>
          <TouchableOpacity
            onPress={props.hideModal***REMOVED***
            style={styles.closeButtonContainer***REMOVED***
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: props.font + '-medium',
                fontSize: 21 * scaleMultiplier,
                color: '#FF0800'
              ***REMOVED******REMOVED***
            >
              {props.closeText***REMOVED***
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
***REMOVED***

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10
  ***REMOVED***,
  closeButtonContainer: {
    width: '100%',
    height: 70 * scaleMultiplier,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 5
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

export default connect(mapStateToProps)(OptionsModal)
