import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import Modal from 'react-native-modal'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    font: getLanguageFont(activeGroupSelector(state).language),
    isRTL: activeDatabaseSelector(state).isRTL
  ***REMOVED***
***REMOVED***

function OptionsModal ({
  // Props passed from a parent component.
  isVisible,
  hideModal,
  closeText,
  children = null,
  // Props passed from redux.
  font,
  isRTL
***REMOVED***) {
  //+ RENDER
  return (
    <Modal
      isVisible={isVisible***REMOVED***
      hasBackdrop={true***REMOVED***
      onBackdropPress={hideModal***REMOVED***
      backdropOpacity={0.3***REMOVED***
      style={{ justifyContent: 'flex-end' ***REMOVED******REMOVED***
      onSwipeComplete={hideModal***REMOVED***
      swipeDirection={['down']***REMOVED***
      propagateSwipe={true***REMOVED***
      useNativeDriver
    >
      <View style={{***REMOVED******REMOVED***>
        <View style={styles.buttonsContainer***REMOVED***>{children***REMOVED***</View>
        <View style={styles.closeButtonContainer***REMOVED***>
          <TouchableOpacity
            onPress={hideModal***REMOVED***
            style={styles.closeButtonContainer***REMOVED***
          >
            <Text
              style={StandardTypography(
                { font, isRTL ***REMOVED***,
                'h3',
                'Bold',
                'center',
                colors.red
              )***REMOVED***
            >
              {closeText***REMOVED***
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
***REMOVED***

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 10
  ***REMOVED***,
  closeButtonContainer: {
    width: '100%',
    height: 70 * scaleMultiplier,
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 10
    // marginTop: 5
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(OptionsModal)
