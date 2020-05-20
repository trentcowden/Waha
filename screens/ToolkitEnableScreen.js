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
import AvatarImage from '../components/AvatarImage'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { resumeDownload ***REMOVED*** from '../redux/actions/downloadActions'
import { getStateFromPath ***REMOVED*** from '@react-navigation/native'
import BackButton from '../components/BackButton'
function ToolkitEnableScreen (props) {
  //// STATE

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
      <Text
        style={{
          fontFamily: props.font + '-regular',
          fontSize: 14 * scaleMultiplier,
          marginTop: 10
        ***REMOVED******REMOVED***
      >
        {props.toolkitEnabled
          ? 'toolkit is currently enabled'
          : 'toolkit is currently disabled'***REMOVED***
      </Text>
      <TouchableOpacity
        style={[
          styles.unlockButton,
          { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
        ]***REMOVED***
        onPress={
          props.toolkitEnabled
            ? () => {***REMOVED***
            : () => props.navigation.navigate('Passcode')
        ***REMOVED***
      >
        <Text
          style={{
            fontFamily: props.font + '-medium',
            fontSize: 18 * scaleMultiplier
          ***REMOVED******REMOVED***
        >
          {props.toolkitEnabled ? 'View code' : 'Unlock toolkit'***REMOVED***
        </Text>
        <Icon
          name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
          color='#3A3C3F'
          size={50 * scaleMultiplier***REMOVED***
        />
      </TouchableOpacity>
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F9FA',
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
    marginVertical: 40 * scaleMultiplier,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
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
  return {***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(ToolkitEnableScreen)
