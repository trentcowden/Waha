import React, { useEffect, useState ***REMOVED*** from 'react'
import { Alert, Image, Keyboard, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/standard/BackButton'
import { scaleMultiplier ***REMOVED*** from '../constants'
import MessageModal from '../modals/MessageModal'
import { setAreMobilizationToolsUnlocked ***REMOVED*** from '../redux/actions/areMobilizationToolsUnlockedActions'
import { setMTUnlockAttempts ***REMOVED*** from '../redux/actions/mtUnlockAttemptsActions'
import { setMTUnlockTimeout ***REMOVED*** from '../redux/actions/securityActions'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    translations: activeDatabaseSelector(state).translations,
    font: getLanguageFont(activeGroupSelector(state).language),
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

/**
 * Screen that shows a simple passcode entry and allows the user to unlock the Mobilization Tools.
 */
function MobilizationToolsUnlockScreen ({
  // Props passed from navigation.
  navigation: { setOptions, goBack ***REMOVED***,
  // Props passed from redux.
  isRTL,
  translations,
  font,
  security,
  mtUnlockAttempts,
  setAreMobilizationToolsUnlocked,
  setMTUnlockTimeout,
  setMTUnlockAttempts
***REMOVED***) {
  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      headerRight: isRTL
        ? () => <BackButton onPress={() => goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => goBack()***REMOVED*** />
    ***REMOVED***)
  ***REMOVED***, [])

  /** Keeps track of the user input of the passcode entry area. */
  const [passcode, setPasscode] = useState('')

  /** A reference to the passcode entry component. */
  const [pinRef, setPinRef] = useState()

  /** Keeps track of whether the unlock success modal is visible. */
  const [unlockSuccessModal, setUnlockSuccessModal] = useState(false)

  /**
   * useEffect function that updates every time the passcode input changes. If the user gets to 5 attempts without unlocking successfully, the app will lock them out from attempting to unlock again for 30 minutes.
   */
  useEffect(() => {
    if (mtUnlockAttempts === 5) {
      setMTUnlockAttempts(0)
      setMTUnlockTimeout(Date.now() + 1800000)
    ***REMOVED***
  ***REMOVED***, [mtUnlockAttempts])

  /**
   * Checks if the passcode the user enters is correct. If it is, show the success modal. If not, add one to the attempts tracker and show an alert that the code is incorrect.
   */
  function checkPasscode (fullPasscode) {
    if (fullPasscode === '281820') {
      Keyboard.dismiss()
      setUnlockSuccessModal(true)
      setAreMobilizationToolsUnlocked(true)
    ***REMOVED*** else {
      setMTUnlockAttempts(mtUnlockAttempts + 1)
      // Make the input component "shake" when they enter in a wrong code.
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
    ***REMOVED***
  ***REMOVED***

  /**
   * Gets a string of the amount of attempts the user has left OR, if they're already locked out, the time they have left until they can attempt again.
   * @return {string***REMOVED*** - The text to display.
   */
  function getTimeoutText () {
    if (Date.now() - security.mtUnlockTimeout < 0)
      return (
        translations.passcode.too_many_attempts_label +
        ' ' +
        Math.round((security.mtUnlockTimeout - Date.now()) / 60000) +
        ' ' +
        translations.passcode.minutes_label
      )
    else if (mtUnlockAttempts === 3)
      return translations.passcode.two_attempt_remaining_label
    else if (mtUnlockAttempts === 4)
      return translations.passcode.one_attempt_remaining_label
    else return ''
  ***REMOVED***

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
            marginTop: 50 * scaleMultiplier,
            marginBottom: 30 * scaleMultiplier,
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
        onFulfill={fullPasscode => checkPasscode(fullPasscode)***REMOVED***
        onBackspace={() => {***REMOVED******REMOVED***
        // Disable entry if the user is locked out.
        editable={
          security.mtUnlockTimeout
            ? Date.now() - security.mtUnlockTimeout > 0
              ? true
              : false
            : true
        ***REMOVED***
        cellSize={50 * scaleMultiplier***REMOVED***
        cellStyle={{
          borderRadius: 25,
          borderColor: colors.chateau,
          borderWidth: 2,
          marginLeft: 3,
          marginRight: 3
        ***REMOVED******REMOVED***
        cellStyleFocused={{
          borderColor: colors.shark,
          borderRadius: 25,
          borderWidth: 2
        ***REMOVED******REMOVED***
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
        {getTimeoutText()***REMOVED***
      </Text>
      {/* Modals */***REMOVED***
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
            resizeMode: 'contain'
          ***REMOVED******REMOVED***
        />
      </MessageModal>
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobilizationToolsUnlockScreen)
