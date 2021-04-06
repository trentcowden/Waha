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
    activeGroup: activeGroupSelector(state),
    isRTL: activeDatabaseSelector(state).isRTL
  ***REMOVED***
***REMOVED***

// modal variant that shows some information
const MessageModal = ({
  // Props passed from a parent component.s
  isVisible,
  hideModal,
  title,
  body,
  confirmText,
  confirmOnPress,
  cancelText = '',
  children = null,
  // Props passed from redux.
  font,
  activeGroup,
  isRTL
***REMOVED***) => {
  var cancelButton = cancelText ? (
    <TouchableOpacity
      style={{
        marginVertical: 15
        // marginBottom: 40 * scaleMultiplier,
        // marginTop: 80 * scaleMultiplier
      ***REMOVED******REMOVED***
      onPress={cancelOnPress***REMOVED***
    >
      <Text
        style={StandardTypography(
          { font, isRTL ***REMOVED***,
          'h2',
          'Bold',
          'left',
          colors.red
        )***REMOVED***
      >
        {cancelText***REMOVED***
      </Text>
    </TouchableOpacity>
  ) : null

  //+ RENDER

  return (
    <Modal
      isVisible={isVisible***REMOVED***
      hasBackdrop={true***REMOVED***
      onBackdropPress={hideModal***REMOVED***
      backdropOpacity={0.3***REMOVED***
      style={{ justifyContent: 'flex-end', flex: 1, margin: 0 ***REMOVED******REMOVED***
      onSwipeComplete={hideModal***REMOVED***
      swipeDirection={['down']***REMOVED***
      propagateSwipe={true***REMOVED***
    >
      <View style={styles.contentContainer***REMOVED***>
        {children***REMOVED***
        <Text
          style={[
            StandardTypography(
              { font, isRTL ***REMOVED***,
              'h2',
              'Black',
              'center',
              colors.shark
            ),
            { marginVertical: 10 ***REMOVED***
          ]***REMOVED***
        >
          {title***REMOVED***
        </Text>
        <Text
          style={[
            StandardTypography(
              { font, isRTL ***REMOVED***,
              'h4',
              'Bold',
              'center',
              colors.shark
            ),
            { paddingHorizontal: 20 ***REMOVED***
          ]***REMOVED***
        >
          {body***REMOVED***
        </Text>

        <TouchableOpacity
          style={{
            // marginVertical: 10,
            width: '100%',
            height: 80 * scaleMultiplier,
            justifyContent: 'center'
            // backgroundColor: 'blue'
          ***REMOVED******REMOVED***
          onPress={confirmOnPress***REMOVED***
        >
          <Text
            style={StandardTypography(
              { font, isRTL ***REMOVED***,
              'h2',
              'Bold',
              'center',
              colors.apple
            )***REMOVED***
          >
            {confirmText***REMOVED***
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
    paddingHorizontal: 20,
    paddingBottom: 10
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(MessageModal)
