import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity,
  Alert
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
      Alert.alert(
        props.translations.passcode.popups.unlock_unsucessful_message,
        props.translations.passcode.popups.unlock_unsucessful_title,
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

  //// RENDER

  return (
    <View style={styles.screen***REMOVED***>
      <Text
        style={{
          fontFamily: props.font + '-regular',
          fontSize: 18,
          marginVertical: 30 * scaleMultiplier,
          textAlign: 'center',
          paddingHorizontal: 20
        ***REMOVED******REMOVED***
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
        title={props.translations.passcode.popups.unlock_successful_title***REMOVED***
        body={props.translations.passcode.popups.unlock_successful_message***REMOVED***
        confirmText={props.translations.general.got_it***REMOVED***
        confirmOnPress={() => setUnlockSuccessModal(false)***REMOVED***
        imageSource={require('../assets/gifs/unlock_mob_tools.gif')***REMOVED***
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
