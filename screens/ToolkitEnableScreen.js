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
  Alert
***REMOVED*** from 'react-native'
import * as FileSystem from 'expo-file-system'
import SetItem from '../components/SetItem'
import AvatarImage from '../components/AvatarImage'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { resumeDownload ***REMOVED*** from '../redux/actions/downloadActions'
import { getStateFromPath ***REMOVED*** from '@react-navigation/native'
import BackButton from '../components/BackButton'
import LanguageInstanceHeaderToolkit from '../components/LanguageInstanceHeaderToolkit'
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

  function getInstalledLanguageInstances () {
    var installedLanguageInstances = []
    for (key in props.database) {
      if (key.length === 2) {
        var languageObject = {***REMOVED***
        languageObject['languageName'] = props.database[key].displayName
        languageObject['languageID'] = key
        installedLanguageInstances.push(languageObject)
      ***REMOVED***
    ***REMOVED***
    return installedLanguageInstances
  ***REMOVED***

  //// RENDER

  function renderLanguageHeader (languageInstances) {
    return (
      <LanguageInstanceHeaderToolkit
        languageName={languageInstances.item.languageName***REMOVED***
        languageID={languageInstances.item.languageID***REMOVED***
      />
    )
  ***REMOVED***

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
            ? () =>
                Alert.alert('Toolkit Unlock Code:', '281820', [
                  {
                    text: props.translations.alerts.options.clipboard,
                    onPress: () => Clipboard.setString('281820')
                  ***REMOVED***,
                  {
                    text: props.translations.alerts.options.close,
                    onPress: () => {***REMOVED***
                  ***REMOVED***
                ])
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
      <View style={{ width: '100%', flex: 1 ***REMOVED******REMOVED***>
        <FlatList
          data={getInstalledLanguageInstances()***REMOVED***
          renderItem={renderLanguageHeader***REMOVED***
          keyExtractor={item => item.languageID***REMOVED***
        />
      </View>
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
    database: state.database,
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font,
    activeGroup: activeGroup,
    toolkitEnabled: state.toolkitEnabled
  ***REMOVED***
***REMOVED***
function mapDispatchToProps (dispatch) {
  return {***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(ToolkitEnableScreen)
