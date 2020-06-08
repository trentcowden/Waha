import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image ***REMOVED*** from 'react-native'
import Modal from 'react-native-modal'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { connect ***REMOVED*** from 'react-redux'

// modal variant that shows some information
function MessageModal (props) {
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
            height: 200,
            margin: 20,
            padding: 20,
            resizeMode: 'center'
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
            textAlign: 'center'
          ***REMOVED******REMOVED***
        >
          {props.body***REMOVED***
        </Text>
        <TouchableOpacity
          style={{ marginBottom: 40, marginTop: 80 * scaleMultiplier ***REMOVED******REMOVED***
          onPress={props.hideModal***REMOVED***
        >
          <Text
            style={{
              fontFamily: props.font + '-medium',
              fontSize: 24 * scaleMultiplier,
              color: '#60C239'
            ***REMOVED******REMOVED***
          >
            Got it!
          </Text>
        </TouchableOpacity>
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
    alignItems: 'center'
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
