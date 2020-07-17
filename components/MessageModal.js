import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image ***REMOVED*** from 'react-native'
import Modal from 'react-native-modal'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { connect ***REMOVED*** from 'react-redux'

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
      <Text
        style={{
          fontFamily: props.font + '-medium',
          fontSize: 24 * scaleMultiplier,
          color: '#FF0800'
        ***REMOVED******REMOVED***
      >
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
      <View style={styles.buttonsContainer***REMOVED***>
        <Image
          source={props.imageSource***REMOVED***
          style={{
            height: 200 * scaleMultiplier,
            margin: 20,
            // padding: 20,
            resizeMode: 'contain'
          ***REMOVED******REMOVED***
        />
        <Text
          style={{
            fontFamily: props.font + '-black',
            fontSize: 36 * scaleMultiplier,
            marginVertical: 20,
            marginHorizontal: 15,
            textAlign: 'center'
          ***REMOVED******REMOVED***
        >
          {props.title***REMOVED***
        </Text>
        <Text
          style={{
            fontFamily: props.font + '-medium',
            fontSize: 18 * scaleMultiplier,
            marginHorizontal: 15,
            marginBottom: 20,
            textAlign: 'center'
          ***REMOVED******REMOVED***
        >
          {props.body***REMOVED***
        </Text>
        <TouchableOpacity
          style={{
            marginVertical: 15
            // marginBottom: 40 * scaleMultiplier
            // marginTop: 80 * scaleMultiplier
          ***REMOVED******REMOVED***
          onPress={props.confirmOnPress***REMOVED***
        >
          <Text
            style={{
              fontFamily: props.font + '-medium',
              fontSize: 24 * scaleMultiplier,
              color: '#60C239'
            ***REMOVED******REMOVED***
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
  buttonsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
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
