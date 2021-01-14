import React, { useEffect, useState ***REMOVED*** from 'react'
import { Alert, Image, Keyboard, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/standard/BackButton'
import { colors, getLanguageFont, scaleMultiplier ***REMOVED*** from '../constants'
import MessageModal from '../modals/MessageModal'
import { setAreMobilizationToolsUnlocked ***REMOVED*** from '../redux/actions/areMobilizationToolsUnlockedActions'
import {
  setMTUnlockAttempts,
  setMTUnlockTimeout
***REMOVED*** from '../redux/actions/securityActions'
import { logUnlockMobilizationTools ***REMOVED*** from '../redux/LogEventFunctions'
import { StandardTypography ***REMOVED*** from '../styles/typography'
function PasscodeScreen ({
  navigation: { setOptions, goBack ***REMOVED***,
  // passed from redux
  activeDatabase,
  isRTL,
  translations,
  font,
  activeGroup,
  security,
  mtUnlockAttempts,
  setAreMobilizationToolsUnlocked,
  setMTUnlockTimeout,
  setMTUnlockAttempts
***REMOVED***) {
  //+ STATE
  const [passcode, setPasscode] = useState('')
  const [pinRef, setPinRef] = useState()
  // const [passcodeStatusText, setPasscodeStatusText] = useState('')
  const [unlockSuccessModal, setUnlockSuccessModal] = useState(false)
  // const [numAttempts, setNumAttempts] = useState(0)

  //+ CONSTRUCTOR

  useEffect(() => {
    setOptions(getNavOptions())
  ***REMOVED***, [])

  //+ NAV OPTIONS
  function getNavOptions () {
    return {
      headerRight: isRTL
        ? () => <BackButton onPress={() => goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  useEffect(() => {
    if (mtUnlockAttempts === 5) {
      setMTUnlockAttempts(0)
      setMTUnlockTimeout(Date.now() + 1800000)
    ***REMOVED***
  ***REMOVED***, [mtUnlockAttempts])

  //+ FUNCTIONS

  function checkPasscode (passcode) {
    if (passcode === '281820') {
      Keyboard.dismiss()
      logUnlockMobilizationTools(activeGroup.language)
      setUnlockSuccessModal(true)
      setAreMobilizationToolsUnlocked(true)
    ***REMOVED*** else {
      setMTUnlockAttempts(mtUnlockAttempts + 1)
      pinRef.shake().then(() => setPasscode(''))
      Alert.alert(
        translations.passcode.popups.unlock_unsucessful_title,
        translations.passcode.popups.unlock_unsucessful_message,
        [
          {
            text: translations.general.ok,
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
          StandardTypography(
            { font, isRTL ***REMOVED***,
            'h3',
            'Regular',
            'center',
            colors.shark
          ),
          {
            marginVertical: 30 * scaleMultiplier,
            paddingHorizontal: 20
          ***REMOVED***
        ]***REMOVED***
      >
        {translations.passcode.enter_passcode_text***REMOVED***
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
          security.mtUnlockTimeout
            ? Date.now() - security.mtUnlockTimeout > 0
              ? true
              : false
            : true
        ***REMOVED***
      />
      <Text
        style={[
          StandardTypography(
            { font, isRTL ***REMOVED***,
            'h3',
            'Regular',
            'center',
            colors.red
          ),
          {
            marginTop: 30 * scaleMultiplier,
            paddingHorizontal: 20
          ***REMOVED***
        ]***REMOVED***
      >
        {/* conditional text based on how many attempts user has left / if they're currently locked out */***REMOVED***
        {Date.now() - security.mtUnlockTimeout < 0
          ? translations.passcode.too_many_attempts_label +
            ' ' +
            Math.round((security.mtUnlockTimeout - Date.now()) / 60000) +
            ' ' +
            translations.passcode.minutes_label
          : mtUnlockAttempts === 3
          ? translations.passcode.two_attempt_remaining_label
          : mtUnlockAttempts === 4
          ? translations.passcode.one_attempt_remaining_label
          : ''***REMOVED***
      </Text>
      <MessageModal
        isVisible={unlockSuccessModal***REMOVED***
        hideModal={() => {
          setUnlockSuccessModal(false)
          goBack()
        ***REMOVED******REMOVED***
        title={translations.passcode.popups.unlock_successful_title***REMOVED***
        body={translations.passcode.popups.unlock_successful_message***REMOVED***
        confirmText={translations.general.got_it***REMOVED***
        confirmOnPress={() => {
          setUnlockSuccessModal(false)
          goBack()
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
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language),
    activeGroup: activeGroup,
    security: state.security,
    mtUnlockAttempts: state.mtUnlockAttempts
  ***REMOVED***
***REMOVED***
function mapDispatchToProps (dispatch) {
  return {
    setAreMobilizationToolsUnlocked: toSet => {
      dispatch(setAreMobilizationToolsUnlocked(toSet))
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
