import React, { useEffect, useState ***REMOVED*** from 'react'
import { Alert, Image, Keyboard, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/BackButton'
import MessageModal from '../components/MessageModal'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import {
  setMTUnlockAttempts,
  setMTUnlockTimeout
***REMOVED*** from '../redux/actions/securityActions'
import { setToolkitEnabled ***REMOVED*** from '../redux/actions/toolkitEnabledActions'
import { logUnlockMobilizationTools ***REMOVED*** from '../redux/LogEventFunctions'
function PasscodeScreen (props) {
  //+ STATE
  const [passcode, setPasscode] = useState('')
  const [pinRef, setPinRef] = useState()
  // const [passcodeStatusText, setPasscodeStatusText] = useState('')
  const [unlockSuccessModal, setUnlockSuccessModal] = useState(false)
  // const [numAttempts, setNumAttempts] = useState(0)

  //+ CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  //+ NAV OPTIONS
  function getNavOptions () {
    return {
      headerRight: props.isRTL
        ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: props.isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  useEffect(() => {
    if (props.mtUnlockAttempts === 5) {
      props.setMTUnlockAttempts(0)
      props.setMTUnlockTimeout(Date.now() + 1800000)
    ***REMOVED***
  ***REMOVED***, [props.mtUnlockAttempts])

  //+ FUNCTIONS

  function checkPasscode (passcode) {
    if (passcode === '281820') {
      Keyboard.dismiss()
      logUnlockMobilizationTools(props.activeGroup.language)
      setUnlockSuccessModal(true)
      props.setToolkitEnabled(true)
    ***REMOVED*** else {
      props.setMTUnlockAttempts(props.mtUnlockAttempts + 1)
      pinRef.shake().then(() => setPasscode(''))
      Alert.alert(
        props.translations.passcode.popups.unlock_unsucessful_title,
        props.translations.passcode.popups.unlock_unsucessful_message,
        [
          {
            text: props.translations.general.ok,
            onPress: () => {***REMOVED***
          ***REMOVED***
        ]
      )
      // setTimeout(() => setPasscodeStatusText(''), 3000)
    ***REMOVED***
  ***REMOVED***

  //+ RENDER

  return (
    <View style={styles.screen***REMOVED***>
      <Text
        style={[
          Typography(props, 'h3', 'regular', 'center', colors.shark),
          {
            marginVertical: 30 * scaleMultiplier,
            paddingHorizontal: 20
          ***REMOVED***
        ]***REMOVED***
      >
        {props.translations.passcode.enter_passcode_text***REMOVED***
      </Text>
      <SmoothPinCodeInput
        ref={ref => setPinRef(ref)***REMOVED***
        value={passcode***REMOVED***
        codeLength={6***REMOVED***
        autoFocus={true***REMOVED***
        restrictToNumbers={true***REMOVED***
        animationFocused=''
        onTextChange={passcode => setPasscode(passcode)***REMOVED***
        onFulfill={checkPasscode***REMOVED***
        onBackspace={() => {***REMOVED******REMOVED***
        editable={
          props.security.mtUnlockTimeout
            ? Date.now() - props.security.mtUnlockTimeout > 0
              ? true
              : false
            : true
        ***REMOVED***
      />
      <Text
        style={[
          Typography(props, 'h3', 'regular', 'center', colors.red),
          {
            marginTop: 30 * scaleMultiplier,
            paddingHorizontal: 20
          ***REMOVED***
        ]***REMOVED***
      >
        {/* conditional text based on how many attempts user has left / if they're currently locked out */***REMOVED***
        {Date.now() - props.security.mtUnlockTimeout < 0
          ? props.translations.passcode.too_many_attempts_label +
            ' ' +
            Math.round((props.security.mtUnlockTimeout - Date.now()) / 60000) +
            ' ' +
            props.translations.passcode.minutes_label
          : props.mtUnlockAttempts === 3
          ? props.translations.passcode.two_attempt_remaining_label
          : props.mtUnlockAttempts === 4
          ? props.translations.passcode.one_attempt_remaining_label
          : ''***REMOVED***
      </Text>
      <MessageModal
        isVisible={unlockSuccessModal***REMOVED***
        hideModal={() => {
          setUnlockSuccessModal(false)
          props.navigation.goBack()
        ***REMOVED******REMOVED***
        title={props.translations.passcode.popups.unlock_successful_title***REMOVED***
        body={props.translations.passcode.popups.unlock_successful_message***REMOVED***
        confirmText={props.translations.general.got_it***REMOVED***
        confirmOnPress={() => {
          setUnlockSuccessModal(false)
          props.navigation.goBack()
        ***REMOVED******REMOVED***
      >
        <Image
          source={require('../assets/gifs/unlock_mob_tools.gif')***REMOVED***
          style={{
            height: 200 * scaleMultiplier,
            margin: 20,
            // padding: 20,
            resizeMode: 'contain'
          ***REMOVED******REMOVED***
        />
      </MessageModal>
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font,
    activeGroup: activeGroup,
    security: state.security,
    mtUnlockAttempts: state.mtUnlockAttempts
  ***REMOVED***
***REMOVED***
function mapDispatchToProps (dispatch) {
  return {
    setToolkitEnabled: toSet => {
      dispatch(setToolkitEnabled(toSet))
    ***REMOVED***,
    setMTUnlockTimeout: time => {
      dispatch(setMTUnlockTimeout(time))
    ***REMOVED***,
    setMTUnlockAttempts: numAttempts => {
      dispatch(setMTUnlockAttempts(numAttempts))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(PasscodeScreen)
