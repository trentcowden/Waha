import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import Modal from 'react-native-modal'
import { connect ***REMOVED*** from 'react-redux'
import { colors, getLanguageFont, scaleMultiplier ***REMOVED*** from '../constants'
import { StandardTypography ***REMOVED*** from '../styles/typography'
function OptionsModal (props) {
  //+ RENDER
  return (
    <Modal
      isVisible={props.isVisible***REMOVED***
      hasBackdrop={true***REMOVED***
      onBackdropPress={props.hideModal***REMOVED***
      backdropOpacity={0.3***REMOVED***
      style={{ justifyContent: 'flex-end' ***REMOVED******REMOVED***
    >
      <View style={{***REMOVED******REMOVED***>
        <View style={styles.buttonsContainer***REMOVED***>{props.children***REMOVED***</View>
        <View style={styles.closeButtonContainer***REMOVED***>
          <TouchableOpacity
            onPress={props.hideModal***REMOVED***
            style={styles.closeButtonContainer***REMOVED***
          >
            <Text
              style={StandardTypography(
                props,
                'h3',
                'Bold',
                'center',
                colors.red
              )***REMOVED***
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

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: getLanguageFont(activeGroup.language),
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(OptionsModal)
