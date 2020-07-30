import React, { useEffect, useState ***REMOVED*** from 'react'
import { Image, ScrollView, StyleSheet, Switch, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/BackButton'
import Blurb from '../components/Blurb'
import KeyLabels from '../components/KeyLabels'
import MessageModal from '../components/MessageModal'
import Piano from '../components/Piano'
import Separator from '../components/Separator'
import WahaItem from '../components/WahaItem'
import WahaItemDescription from '../components/WahaItemDescription'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import {
  setActivateOnSwitch,
  setSecurityEnabled
***REMOVED*** from '../redux/actions/securityActions'
function SecurityScreen (props) {
  //// STATE
  const [showSecurityWarningModal, setShowSecurityWarningModal] = useState(
    false
  )

  const [showViewKeyOrderModal, setShowViewKeyOrderModal] = useState(false)
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

  // extra controls for if security mode is enabled
  var securityControls = props.security.code ? (
    <View style={{ width: '100%', marginTop: 20 * scaleMultiplier ***REMOVED******REMOVED***>
      <Separator />
      <WahaItem
        title={props.translations.security.change_key_order_button_label***REMOVED***
        onPress={() => props.navigation.navigate('KeyOrderChange_Old')***REMOVED***
      >
        <Icon
          name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
          color={colors.tuna***REMOVED***
          size={50 * scaleMultiplier***REMOVED***
        />
      </WahaItem>
      <Separator />
      <WahaItem
        title={props.translations.security.view_key_order_button_label***REMOVED***
        onPress={() => setShowViewKeyOrderModal(true)***REMOVED***
      >
        <Icon
          name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
          color={colors.tuna***REMOVED***
          size={50 * scaleMultiplier***REMOVED***
        />
      </WahaItem>
      <Separator />
    </View>
  ) : null

  //// RENDER

  return (
    <ScrollView style={styles.screen***REMOVED***>
      <Separator />
      <View style={styles.topPortion***REMOVED***>
        <Image
          style={styles.topImage***REMOVED***
          source={require('../assets/gifs/piano_unlock.gif')***REMOVED***
        />
      </View>
      <Separator />
      <View
        style={{
          width: '100%',
          alignItems: 'center'
        ***REMOVED******REMOVED***
      >
        <Blurb
          text={props.translations.security.security_mode_description_text***REMOVED***
        />
        <Separator />
        <WahaItem
          title={props.translations.security.security_mode_picker_label***REMOVED***
        >
          <View
            style={{
              flexDirection: props.isRTL ? 'row-reverse' : 'row',
              alignItems: 'center'
            ***REMOVED******REMOVED***
          >
            <Icon
              name='error-filled'
              size={40 * scaleMultiplier***REMOVED***
              color={colors.red***REMOVED***
              style={{ marginHorizontal: 20 ***REMOVED******REMOVED***
            />
            <Switch
              trackColor={{ false: colors.chateau, true: colors.apple ***REMOVED******REMOVED***
              thumbColor={colors.white***REMOVED***
              ios_backgroundColor={colors.chateau***REMOVED***
              onValueChange={() => {
                // toggle security mode on or off for the active group
                if (props.security.code) {
                  if (props.security.securityEnabled) {
                    props.setSecurityEnabled(false)
                    props.setActivateOnSwitch(false)
                  ***REMOVED*** else props.setSecurityEnabled(true)
                ***REMOVED*** else {
                  props.navigation.navigate('SecurityOnboarding')
                ***REMOVED***
              ***REMOVED******REMOVED***
              value={props.security.securityEnabled***REMOVED***
            />
          </View>
        </WahaItem>
        <Separator />
        <WahaItemDescription
          text={props.translations.security.security_mode_picker_blurb***REMOVED***
        />
        {securityControls***REMOVED***
      </View>
      <MessageModal
        isVisible={showViewKeyOrderModal***REMOVED***
        hideModal={() => setShowViewKeyOrderModal(false)***REMOVED***
        title={props.translations.security.your_key_order_label***REMOVED***
        body={props.translations.security.security_mode_description_text***REMOVED***
        confirmText={props.translations.general.close***REMOVED***
        confirmOnPress={() => setShowViewKeyOrderModal(false)***REMOVED***
      >
        <Piano setPattern={() => {***REMOVED******REMOVED*** />
        <KeyLabels keyOrder={props.security.code***REMOVED*** />
      </MessageModal>
    </ScrollView>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze
  ***REMOVED***,
  topPortion: {
    backgroundColor: colors.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  topImage: {
    resizeMode: 'contain',
    height: 175 * scaleMultiplier,
    alignSelf: 'center'
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  console.log(state.security)
  return {
    database: state.database,
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font,
    activeGroup: activeGroup,
    toolkitEnabled: state.toolkitEnabled,
    security: state.security
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setSecurityEnabled: toSet => dispatch(setSecurityEnabled(toSet)),
    setActivateOnSwitch: toSet => dispatch(setActivateOnSwitch(toSet))
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(SecurityScreen)

{
  /* <MessageModal
        isVisible={showSecurityWarningModal***REMOVED***
        hideModal={() => setShowSecurityWarningModal(false)***REMOVED***
        title={
          props.translations.security.popups
            .activate_security_mode_confirmation_title
        ***REMOVED***
        body={
          props.translations.security.popups
            .activate_security_mode_confirmation_message
        ***REMOVED***
        confirmText={props.translations.general.i_understand***REMOVED***
        confirmOnPress={() => {
          props.setSecurityEnabled(true)
          setShowSecurityWarningModal(false)
        ***REMOVED******REMOVED***
        cancelText={props.translations.general.cancel***REMOVED***
        cancelOnPress={() => setShowSecurityWarningModal(false)***REMOVED***
        imageSource={require('../assets/gifs/unlock_mob_tools.gif')***REMOVED***
      /> */
***REMOVED***

{
  /* <WahaItem
        title={props.translations.security.activate_on_switch_picker_label***REMOVED***
      >
        <Switch
          trackColor={{ false: colors.chateau, true: colors.apple ***REMOVED******REMOVED***
          thumbColor={colors.white***REMOVED***
          ios_backgroundColor={colors.chateau***REMOVED***
          onValueChange={() => {
            // toggle security mode on or off
            if (props.security.activateOnSwitch)
              props.setActivateOnSwitch(false)
            else props.setActivateOnSwitch(true)
          ***REMOVED******REMOVED***
          value={props.security.activateOnSwitch***REMOVED***
          disabled={props.security.securityEnabled ? false : true***REMOVED***
        />
      </WahaItem>
      <Separator /> */
***REMOVED***
