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
import { setSecurityEnabled ***REMOVED*** from '../redux/actions/securityEnabledActions'

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
          alignItems: 'center',
          marginVertical: 50
        ***REMOVED******REMOVED***
      >
        <View
          style={[
            styles.unlockButton,
            { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
          ]***REMOVED***
        >
          <Text
            style={{
              fontFamily: props.font + '-medium',
              fontSize: 18 * scaleMultiplier
            ***REMOVED******REMOVED***
          >
            {props.translations.labels.securityMode***REMOVED***
          </Text>
          <Switch
            trackColor={{ false: '#DEE3E9', true: '#60C239' ***REMOVED******REMOVED***
            thumbColor='#FFFFFF'
            ios_backgroundColor='#DEE3E9'
            onValueChange={() => {
              // toggle security mode on or off for the active group
              if (props.securityEnabled) props.setSecurityEnabled(false)
              else setShowSecurityWarningModal(true)
            ***REMOVED******REMOVED***
            value={props.securityEnabled***REMOVED***
          />
        </View>
      </View>
      <MessageModal
        isVisible={showSecurityWarningModal***REMOVED***
        hideModal={() => setShowSecurityWarningModal(false)***REMOVED***
        title={props.translations.modals.securityWarning.header***REMOVED***
        body={props.translations.modals.securityWarning.text***REMOVED***
        confirmText={props.translations.modals.securityWarning.confirm***REMOVED***
        confirmOnPress={() => {
          props.setSecurityEnabled(true)
          setShowSecurityWarningModal(false)
        ***REMOVED******REMOVED***
        cancelText={props.translations.modals.securityWarning.cancel***REMOVED***
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
    height: 80 * scaleMultiplier,
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
    securityEnabled: state.securityEnabled
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setSecurityEnabled: toSet => dispatch(setSecurityEnabled(toSet))
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(SecurityScreen)
