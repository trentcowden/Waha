import React, { useEffect, useState ***REMOVED*** from 'react'
import { ScrollView, StyleSheet, Switch, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import OptionsModalButton from '../components/OptionsModalButton'
import BackButton from '../components/standard/BackButton'
import Blurb from '../components/standard/Blurb'
import Hero from '../components/standard/Hero'
import Separator from '../components/standard/Separator'
import WahaItem from '../components/standard/WahaItem'
import WahaItemDescription from '../components/standard/WahaItemDescription'
import { scaleMultiplier ***REMOVED*** from '../constants'
import OptionsModal from '../modals/OptionsModal'
import {
  setIsTimedOut,
  setSecurityEnabled,
  setTimeoutDuration
***REMOVED*** from '../redux/actions/securityActions'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    database: state.database,
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language),
    activeGroup: activeGroup,
    areMobilizationToolsUnlocked: state.areMobilizationToolsUnlocked,
    security: state.security
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setSecurityEnabled: toSet => dispatch(setSecurityEnabled(toSet)),
    setIsTimedOut: toSet => dispatch(setIsTimedOut(toSet)),
    setTimeoutDuration: ms => dispatch(setTimeoutDuration(ms))
  ***REMOVED***
***REMOVED***

function SecurityModeScreen ({
  // Props passed from navigation.
  navigation: { setOptions, goBack, navigate ***REMOVED***,
  // Props passed from redux.
  database,
  activeDatabase,
  isRTL,
  translations,
  font,
  activeGroup,
  areMobilizationToolsUnlocked,
  security,
  setSecurityEnabled,
  setIsTimedOut,
  setTimeoutDuration
***REMOVED***) {
  //+ STATE
  const [showSecurityWarningModal, setShowSecurityWarningModal] = useState(
    false
  )

  const [showViewKeyOrderModal, setShowViewKeyOrderModal] = useState(false)

  const [showChangeTimeoutModal, setShowChangeTimeoutModal] = useState(false)
  //+ CONSTRUCTOR

  useEffect(() => {
    setOptions(getNavOptions())
  ***REMOVED***, [])

  function getTimeoutText () {
    if (security.timeoutDuration === 60000)
      return translations.security.one_minute_label
    else if (security.timeoutDuration === 300000)
      return translations.security.five_minutes_label
    else if (security.timeoutDuration === 900000)
      return translations.security.fifteen_minutes_label
    else if (security.timeoutDuration === 1800000)
      return translations.security.thirty_minutes_label
    else if (security.timeoutDuration === 3600000)
      return translations.security.one_hour_label
    else if (security.timeoutDuration === 0)
      return translations.security.instant_label
  ***REMOVED***

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

  // extra controls for if security mode is enabled
  var securityControls = security.code ? (
    <View style={{ width: '100%' ***REMOVED******REMOVED***>
      {/* <Separator />
      <WahaItem title={translations.security.enable_timeout_picker_label***REMOVED***>
        <Switch
          trackColor={{ false: colors.chateau, true: colors.apple ***REMOVED******REMOVED***
          thumbColor={colors.white***REMOVED***
          ios_backgroundColor={colors.chateau***REMOVED***
          onValueChange={() => {
            // toggle security mode on or off
            if (security.timeoutDuration === null)
              setTimeoutDuration(0)
            else setTimeoutDuration(null)
          ***REMOVED******REMOVED***
          value={security.timeoutDuration !== null ? true : false***REMOVED***
          disabled={security.securityEnabled ? false : true***REMOVED***
        />
      </WahaItem>
      <Separator />
      <WahaItemDescription
        text={translations.security.enable_timeout_picker_blurb***REMOVED***
      /> */***REMOVED***
      <Separator />
      <WahaItem
        title={translations.security.change_timeout_button_label***REMOVED***
        onPress={() => setShowChangeTimeoutModal(true)***REMOVED***
      >
        <View
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center'
          ***REMOVED******REMOVED***
        >
          <Text
            style={StandardTypography(
              { font, isRTL ***REMOVED***,
              'h4',
              'Regular',
              'left',
              colors.chateau
            )***REMOVED***
          >
            {getTimeoutText()***REMOVED***
          </Text>
          <Icon
            name={isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
            color={colors.tuna***REMOVED***
            size={50 * scaleMultiplier***REMOVED***
          />
        </View>
      </WahaItem>
      <Separator />
      <WahaItem
        title={translations.security.change_key_order_button_label***REMOVED***
        onPress={() => navigate('KeyOrderChange_Old')***REMOVED***
      >
        <Icon
          name={isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
          color={colors.tuna***REMOVED***
          size={50 * scaleMultiplier***REMOVED***
        />
      </WahaItem>
      <Separator />
      {/* <WahaItem
        title={translations.security.view_key_order_button_label***REMOVED***
        onPress={() => setShowViewKeyOrderModal(true)***REMOVED***
      >
        <Icon
          name={isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
          color={colors.tuna***REMOVED***
          size={50 * scaleMultiplier***REMOVED***
        />
      </WahaItem>
      <Separator /> */***REMOVED***
    </View>
  ) : null

  //+ RENDER

  return (
    <View style={styles.screen***REMOVED***>
      <ScrollView
        style={{
          width: '100%'
        ***REMOVED******REMOVED***
      >
        <Hero source={require('../assets/gifs/piano_unlock.gif')***REMOVED*** />

        <Blurb text={translations.security.security_mode_description_text***REMOVED*** />

        <Separator />
        <WahaItem title={translations.security.security_mode_picker_label***REMOVED***>
          <Switch
            trackColor={{ false: colors.chateau, true: colors.apple ***REMOVED******REMOVED***
            thumbColor={colors.white***REMOVED***
            ios_backgroundColor={colors.chateau***REMOVED***
            onValueChange={() => {
              // toggle security mode on or off for the active group
              if (security.code) {
                if (security.securityEnabled) {
                  setSecurityEnabled(false)
                ***REMOVED*** else setSecurityEnabled(true)
              ***REMOVED*** else {
                navigate('SecurityOnboardingSlides')
              ***REMOVED***
            ***REMOVED******REMOVED***
            value={security.securityEnabled***REMOVED***
          />
        </WahaItem>
        <Separator />
        <WahaItemDescription
          text={
            security.code
              ? translations.security.security_mode_picker_blurb_post_code
              : translations.security.security_mode_picker_blurb_pre_code
          ***REMOVED***
        />
        {securityControls***REMOVED***
      </ScrollView>
      {/* <MessageModal
        isVisible={showViewKeyOrderModal***REMOVED***
        hideModal={() => setShowViewKeyOrderModal(false)***REMOVED***
        title={translations.security.your_key_order_label***REMOVED***
        body={translations.security.security_mode_description_text***REMOVED***
        confirmText={translations.general.close***REMOVED***
        confirmOnPress={() => setShowViewKeyOrderModal(false)***REMOVED***
      >
        <Piano setPattern={() => {***REMOVED******REMOVED*** />
        <KeyLabels keyOrder={security.code***REMOVED*** />
      </MessageModal> */***REMOVED***
      <OptionsModal
        isVisible={showChangeTimeoutModal***REMOVED***
        hideModal={() => setShowChangeTimeoutModal(false)***REMOVED***
        closeText={translations.general.cancel***REMOVED***
      >
        <OptionsModalButton
          title={translations.security.instant_label***REMOVED***
          onPress={() => {
            setTimeoutDuration(0), setShowChangeTimeoutModal(false)
          ***REMOVED******REMOVED***
        >
          {security.timeoutDuration === 0 ? (
            <Icon
              name='check'
              color={colors.apple***REMOVED***
              size={30 * scaleMultiplier***REMOVED***
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                paddingHorizontal: 20
              ***REMOVED******REMOVED***
            />
          ) : null***REMOVED***
        </OptionsModalButton>
        <Separator />
        <OptionsModalButton
          title={translations.security.one_minute_label***REMOVED***
          onPress={() => {
            setTimeoutDuration(60000), setShowChangeTimeoutModal(false)
          ***REMOVED******REMOVED***
        >
          {security.timeoutDuration === 60000 ? (
            <Icon
              name='check'
              color={colors.apple***REMOVED***
              size={30 * scaleMultiplier***REMOVED***
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                paddingHorizontal: 20
              ***REMOVED******REMOVED***
            />
          ) : null***REMOVED***
        </OptionsModalButton>
        <Separator />
        <OptionsModalButton
          title={translations.security.five_minutes_label***REMOVED***
          onPress={() => {
            setTimeoutDuration(300000), setShowChangeTimeoutModal(false)
          ***REMOVED******REMOVED***
        >
          {security.timeoutDuration === 300000 ? (
            <Icon
              name='check'
              color={colors.apple***REMOVED***
              size={30 * scaleMultiplier***REMOVED***
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                paddingHorizontal: 20
              ***REMOVED******REMOVED***
            />
          ) : null***REMOVED***
        </OptionsModalButton>
        <Separator />
        <OptionsModalButton
          title={translations.security.fifteen_minutes_label***REMOVED***
          onPress={() => {
            setTimeoutDuration(900000), setShowChangeTimeoutModal(false)
          ***REMOVED******REMOVED***
        >
          {security.timeoutDuration === 900000 ? (
            <Icon
              name='check'
              color={colors.apple***REMOVED***
              size={30 * scaleMultiplier***REMOVED***
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                paddingHorizontal: 20
              ***REMOVED******REMOVED***
            />
          ) : null***REMOVED***
        </OptionsModalButton>
        <Separator />
        <OptionsModalButton
          title={translations.security.one_hour_label***REMOVED***
          onPress={() => {
            setTimeoutDuration(3600000), setShowChangeTimeoutModal(false)
          ***REMOVED******REMOVED***
        >
          {security.timeoutDuration === 3600000 ? (
            <Icon
              name='check'
              color={colors.apple***REMOVED***
              size={30 * scaleMultiplier***REMOVED***
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                paddingHorizontal: 20
              ***REMOVED******REMOVED***
            />
          ) : null***REMOVED***
        </OptionsModalButton>
      </OptionsModal>
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps, mapDispatchToProps)(SecurityModeScreen)
