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
import KeyLabelGroup from '../components/piano-stuff/KeyLabelGroup'
import Piano from '../components/piano-stuff/Piano'
import BackButton from '../components/standard/BackButton'
import WahaButton from '../components/standard/WahaButton'
import { colors, getLanguageFont ***REMOVED*** from '../constants'
import { setCode, setSecurityEnabled ***REMOVED*** from '../redux/actions/securityActions'
import { StandardTypography ***REMOVED*** from '../styles/typography'
function KeyOrderSetScreen (props) {
  //+ STATE

  const [keyOrder, setKeyOrder] = useState('')
  const [instructionText, setInstructionText] = useState('')
  //+ CONSTRUCTOR

  useEffect(() => {
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
    if (keyOrder.length === 12) {
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

  //+ RENDER

  return (
    <SafeAreaView style={styles.screen***REMOVED***>
      <View style={{ width: '100%', alignItems: 'center' ***REMOVED******REMOVED***>
        <View style={{ width: '100%', paddingHorizontal: 20 ***REMOVED******REMOVED***>
          <Text
            style={StandardTypography(
              props,
              'h2',
              'Bold',
              'center',
              colors.shark
            )***REMOVED***
          >
            {instructionText***REMOVED***
          </Text>
        </View>
        <KeyLabelGroup keyOrder={keyOrder***REMOVED*** />
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

//+ STYLES

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
    font: getLanguageFont(activeGroup.language),
    security: state.security,
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setSecurityEnabled: toSet => dispatch(setSecurityEnabled(toSet)),
    setCode: code => dispatch(setCode(code))
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(KeyOrderSetScreen)
