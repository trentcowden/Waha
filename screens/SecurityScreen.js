import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity,
  Clipboard,
  Alert,
  Switch
***REMOVED*** from 'react-native'
import * as FileSystem from 'expo-file-system'
import SetItem from '../components/SetItem'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { resumeDownload ***REMOVED*** from '../redux/actions/downloadActions'
import { getStateFromPath ***REMOVED*** from '@react-navigation/native'
import BackButton from '../components/BackButton'
import GroupListHeaderMT from '../components/GroupListHeaderMT'
import MessageModal from '../components/MessageModal'
import {
  setSecurityEnabled,
  setActivateOnSwitch
***REMOVED*** from '../redux/actions/securityActions'

function SecurityScreen (props) {
  //// STATE
  const [showSecurityWarningModal, setShowSecurityWarningModal] = useState(
    false
  )

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

  //// RENDER

  return (
    <View style={styles.screen***REMOVED***>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: '#EFF2F4',
          height: 180 * scaleMultiplier,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        ***REMOVED******REMOVED***
      >
        <Text>animation here</Text>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center'
        ***REMOVED******REMOVED***
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14 * scaleMultiplier,
            fontFamily: props.font + '-regular',
            paddingHorizontal: 20,
            marginVertical: 10,
            color: '#1D1E20'
          ***REMOVED******REMOVED***
        >
          {props.translations.security.security_mode_description_text***REMOVED***
        </Text>
        <View
          style={[
            styles.unlockButton,
            { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
          ]***REMOVED***
        >
          <View style={{ justifyContent: 'center', flex: 1 ***REMOVED******REMOVED***>
            <Text
              style={{
                fontFamily: props.font + '-medium',
                fontSize: 18 * scaleMultiplier,
                color: '#1D1E20'
              ***REMOVED******REMOVED***
            >
              {props.translations.security.security_mode_picker_label***REMOVED***
            </Text>
            <Text
              style={{
                fontFamily: props.font + '-regular',
                fontSize: 14 * scaleMultiplier,
                color: '#82868D'
              ***REMOVED******REMOVED***
              numberOfLines={2***REMOVED***
            >
              {props.translations.security.security_mode_picker_blurb***REMOVED***
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            ***REMOVED******REMOVED***
          >
            <Icon
              name='error-filled'
              size={40 * scaleMultiplier***REMOVED***
              color='#FF0800'
              style={{ marginHorizontal: 20 ***REMOVED******REMOVED***
            />
            <Switch
              trackColor={{ false: '#DEE3E9', true: '#60C239' ***REMOVED******REMOVED***
              thumbColor='#FFFFFF'
              ios_backgroundColor='#DEE3E9'
              onValueChange={() => {
                // toggle security mode on or off for the active group
                if (props.security.securityEnabled) {
                  props.setSecurityEnabled(false)
                  props.setActivateOnSwitch(false)
                ***REMOVED*** else setShowSecurityWarningModal(true)
              ***REMOVED******REMOVED***
              value={props.security.securityEnabled***REMOVED***
            />
          </View>
        </View>
        <View
          style={[
            styles.unlockButton,
            { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
          ]***REMOVED***
        >
          <View style={{ justifyContent: 'center', flex: 1 ***REMOVED******REMOVED***>
            <Text
              style={{
                fontFamily: props.font + '-medium',
                fontSize: 18 * scaleMultiplier,
                color: '#1D1E20'
              ***REMOVED******REMOVED***
            >
              {props.translations.security.activate_on_switch_picker_label***REMOVED***
            </Text>
            <Text
              style={{
                fontFamily: props.font + '-regular',
                fontSize: 14 * scaleMultiplier,
                color: '#82868D'
              ***REMOVED******REMOVED***
              numberOfLines={2***REMOVED***
            >
              {props.translations.security.activate_on_switch_picker_blurb***REMOVED***
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#DEE3E9', true: '#60C239' ***REMOVED******REMOVED***
            thumbColor='#FFFFFF'
            ios_backgroundColor='#DEE3E9'
            onValueChange={() => {
              // toggle security mode on or off for the active group
              if (props.security.activateOnSwitch)
                props.setActivateOnSwitch(false)
              else props.setActivateOnSwitch(true)
            ***REMOVED******REMOVED***
            value={props.security.activateOnSwitch***REMOVED***
            disabled={props.security.securityEnabled ? false : true***REMOVED***
          />
        </View>
      </View>
      <MessageModal
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
      />
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center'
  ***REMOVED***,
  unlockButton: {
    width: '100%',
    height: 100 * scaleMultiplier,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#EFF2F4',
    flexDirection: 'row',
    alignItems: 'center',
    //marginVertical: 40 * scaleMultiplier,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
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
