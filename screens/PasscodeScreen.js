import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity
***REMOVED*** from 'react-native'
import * as FileSystem from 'expo-file-system'
import SetItem from '../components/SetItem'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { resumeDownload ***REMOVED*** from '../redux/actions/downloadActions'
import { setToolkitEnabled ***REMOVED*** from '../redux/actions/toolkitEnabledActions'
import BackButton from '../components/BackButton'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import MessageModal from '../components/MessageModal'
function PasscodeScreen (props) {
  //// STATE
  const [passcode, setPasscode] = useState('')
  const [pinRef, setPinRef] = useState()
  const [passcodeStatusText, setPasscodeStatusText] = useState('')
  const [unlockSuccessModal, setUnlockSuccessModal] = useState(false)
  const [unlockFailiureModal, setUnlockFailiureModal] = useState(false)

  //// CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  //// NAV OPTIONS
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

  //// FUNCTIONS

  function checkPasscode (passcode) {
    if (passcode === '281820') {
      setUnlockSuccessModal(true)
      props.setToolkitEnabled(true)
    ***REMOVED*** else {
      pinRef.shake().then(() => setPasscode(''))
      setUnlockFailiureModal(true)
      // setTimeout(() => setPasscodeStatusText(''), 3000)
    ***REMOVED***
  ***REMOVED***

  //// RENDER

  return (
    <View style={styles.screen***REMOVED***>
      <Text
        style={{
          fontFamily: props.font + '-regular',
          fontSize: 18,
          marginVertical: 30 * scaleMultiplier
        ***REMOVED******REMOVED***
      >
        {props.translations.labels.enterPasscode***REMOVED***
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
      />
      <Text
        style={{
          fontFamily: props.font + '-regular',
          fontSize: 18 * scaleMultiplier,
          color: '#FF0800',
          marginTop: 30 * scaleMultiplier,
          paddingHorizontal: 20,
          textAlign: 'center'
        ***REMOVED******REMOVED***
      >
        {passcodeStatusText***REMOVED***
      </Text>
      <MessageModal
        isVisible={unlockSuccessModal***REMOVED***
        hideModal={() => {
          setUnlockSuccessModal(false)
          props.navigation.goBack()
        ***REMOVED******REMOVED***
        title={props.translations.modals.enableMTContent.header***REMOVED***
        body={props.translations.modals.enableMTContent.text***REMOVED***
        imageSource={require('../assets/splash.png')***REMOVED***
      />
      <MessageModal
        isVisible={unlockFailiureModal***REMOVED***
        hideModal={() => {
          setUnlockFailiureModal(false)
        ***REMOVED******REMOVED***
        title={props.translations.modals.passcodeError.header***REMOVED***
        body={props.translations.modals.passcodeError.text***REMOVED***
        imageSource={require('../assets/splash.png')***REMOVED***
      />
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F9FA',
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

//// REDUX

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
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***
function mapDispatchToProps (dispatch) {
  return {
    setToolkitEnabled: toSet => {
      dispatch(setToolkitEnabled(toSet))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(PasscodeScreen)
