import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/BackButton'
import KeyLabel from '../components/KeyLabel'
import KeyLabels from '../components/KeyLabels'
import Piano from '../components/Piano'
import WahaButton from '../components/WahaButton'
import { colors, keyColors, scaleMultiplier ***REMOVED*** from '../constants'
import { setCode, setSecurityEnabled ***REMOVED*** from '../redux/actions/securityActions'
function KeyOrderSetScreen (props) {
  //// STATE

  const [keyOrder, setKeyOrder] = useState('')
  const [instructionText, setInstructionText] = useState('')
  //// CONSTRUCTOR

  useEffect(() => {
    console.log(props.route.name)
    switch (props.route.name) {
      case 'KeyOrderSet_Initial':
        setInstructionText(props.translations.security.choose_key_order_label)
        break
      case 'KeyOrderSet_Confirm':
        setInstructionText(props.translations.security.confirm_key_order_label)
        break
      case 'KeyOrderChange_Old':
        setInstructionText(
          props.translations.security.enter_old_key_order_label
        )
        break
      case 'KeyOrderChange_Initial':
        setInstructionText(
          props.translations.security.choose_new_key_order_label
        )
        break
      case 'KeyOrderChange_Confirm':
        setInstructionText(
          props.translations.security.confirm_new_key_order_label
        )
        break
    ***REMOVED***
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  useEffect(() => {
    console.log(keyOrder)

    if (keyOrder.length === 8) {
      switch (props.route.name) {
        case 'KeyOrderSet_Initial':
          props.navigation.navigate('KeyOrderSet_Confirm', {
            keyOrder: keyOrder
          ***REMOVED***)
          setKeyOrder('')
          break
        case 'KeyOrderSet_Confirm':
          if (keyOrder === props.route.params.keyOrder) {
            Alert.alert(
              props.translations.security.popups
                .key_order_set_confirmation_title,
              props.translations.security.popups
                .key_order_set_confirmation_message,
              [{ text: props.translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
            )
            props.setSecurityEnabled(true)
            props.setCode(keyOrder)
            props.navigation.goBack()
            props.navigation.goBack()
            props.navigation.goBack()
          ***REMOVED*** else {
            Alert.alert(
              props.translations.security.popups.no_match_title,
              props.translations.security.popups.no_match_message,
              [{ text: props.translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
            )
            props.navigation.goBack()
          ***REMOVED***
          break
        case 'KeyOrderChange_Old':
          if (keyOrder === props.security.code) {
            props.navigation.navigate('KeyOrderChange_Initial')
          ***REMOVED*** else {
            setKeyOrder('')
            Alert.alert(
              props.translations.security.popups
                .incorrect_key_order_enetered_title,
              props.translations.security.popups
                .incorrect_key_order_enetered_message,
              [{ text: props.translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
            )
          ***REMOVED***
          break
        case 'KeyOrderChange_Initial':
          props.navigation.navigate('KeyOrderChange_Confirm', {
            keyOrder: keyOrder
          ***REMOVED***)
          setKeyOrder('')
          break
        case 'KeyOrderChange_Confirm':
          if (keyOrder === props.route.params.keyOrder) {
            Alert.alert(
              props.translations.security.popups
                .key_order_set_confirmation_title,
              props.translations.security.popups
                .key_order_set_confirmation_message,
              [{ text: props.translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
            )
            props.setSecurityEnabled(true)
            props.setCode(keyOrder)
            props.navigation.goBack()
            props.navigation.goBack()
            props.navigation.goBack()
          ***REMOVED*** else {
            Alert.alert(
              props.translations.security.popups.no_match_title,
              props.translations.security.popups.no_match_message,
              [{ text: props.translations.general.ok, onPress: () => {***REMOVED*** ***REMOVED***]
            )
            props.navigation.goBack()
          ***REMOVED***
          break
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [keyOrder])

  function getNavOptions () {
    return {
      title: props.route.name.includes('Set')
        ? props.translations.security.header_set_key_order
        : props.translations.security.header_change_key_order,
      headerRight: props.isRTL
        ? () => (
            <BackButton
              onPress={() => {
                props.navigation.goBack()

                if (
                  props.route.name === 'KeyOrderSet_Initial' ||
                  props.route.name === 'KeyOrderChange_Initial'
                )
                  props.navigation.goBack()
              ***REMOVED******REMOVED***
            />
          )
        : () => <View></View>,
      headerLeft: props.isRTL
        ? () => <View></View>
        : () => (
            <BackButton
              onPress={() => {
                props.navigation.goBack()

                if (
                  props.route.name === 'KeyOrderSet_Initial' ||
                  props.route.name === 'KeyOrderChange_Initial'
                )
                  props.navigation.goBack()
              ***REMOVED******REMOVED***
            />
          )
    ***REMOVED***
  ***REMOVED***

  var keyLabel1 = keyOrder[1] ? (
    <KeyLabel
      backgroundColor={keyColors[keyOrder.substr(0, 2).replace(/^0+/, '')]***REMOVED***
      number={keyOrder.substr(0, 2).replace(/^0+/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel2 = keyOrder[3] ? (
    <KeyLabel
      backgroundColor={keyColors[keyOrder.substr(2, 2).replace(/^0+/, '')]***REMOVED***
      number={keyOrder.substr(2, 2).replace(/^0+/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel3 = keyOrder[5] ? (
    <KeyLabel
      backgroundColor={keyColors[keyOrder.substr(4, 2).replace(/^0+/, '')]***REMOVED***
      number={keyOrder.substr(4, 2).replace(/^0+/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  var keyLabel4 = keyOrder[7] ? (
    <KeyLabel
      backgroundColor={keyColors[keyOrder.substr(6, 2).replace(/^0+/, '')]***REMOVED***
      number={keyOrder.substr(6, 2).replace(/^0+/, '')***REMOVED***
      style={{ alignSelf: null, marginBottom: 0 ***REMOVED******REMOVED***
    />
  ) : null

  //// RENDER

  return (
    <SafeAreaView style={styles.screen***REMOVED***>
      <View style={{ width: '100%', alignItems: 'center' ***REMOVED******REMOVED***>
        <View style={{ width: '100%' ***REMOVED******REMOVED***>
          <Text
            style={{
              color: colors.shark,
              fontFamily: props.font + '-medium',
              fontSize: 24 * scaleMultiplier,
              textAlign: 'center'
            ***REMOVED******REMOVED***
          >
            {instructionText***REMOVED***
          </Text>
        </View>
        <KeyLabels keyOrder={keyOrder***REMOVED*** />
        <WahaButton
          type='outline'
          onPress={() => setKeyOrder('')***REMOVED***
          color={colors.red***REMOVED***
          label={props.translations.security.clear_button_label***REMOVED***
          width={Dimensions.get('window').width / 3***REMOVED***
          style={{ marginVertical: 0 ***REMOVED******REMOVED***
        />
      </View>
      <Piano setPattern={setKeyOrder***REMOVED*** />
    </SafeAreaView>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-around'
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font,
    security: state.security,
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setSecurityEnabled: toSet => dispatch(setSecurityEnabled(toSet)),
    setCode: code => dispatch(setCode(code))
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(KeyOrderSetScreen)
