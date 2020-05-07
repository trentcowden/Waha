import React, { useState, useEffect ***REMOVED*** from 'react'
import { View, StyleSheet, Text, Picker, TouchableOpacity ***REMOVED*** from 'react-native'
import { Ionicons ***REMOVED*** from '@expo/vector-icons'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import { Audio ***REMOVED*** from 'expo-av'
import { scaleMultiplier, languageT2S ***REMOVED*** from '../constants'
import NetInfo from '@react-native-community/netinfo'

function LanguageSelectScreen (props) {
  //// STATE

  // keeps track of language selected in picker (TODO: change default to user's default language)
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale)

  // keeps track of whether the uesr has an internet connection
  const [isConnected, setIsConnected] = useState(true)

  // sound for the text to speech
  const soundObject = new Audio.Sound()

  // translations for language select
  i18n.translations = {
    en: {
      welcome: 'Hello and welcome!',
      selectLanguage: 'Please select your language.',
      letsBegin: "Let's begin!",
      noInternet: 'Error: an internet connection is required to set up the app'
    ***REMOVED***,
    te: {
      welcome: 'morbi tristique senectus et!',
      selectLanguage: 'eget nulla facilisi etiam.',
      letsBegin: 'nibh ipsum!',
      noInternet: 'morbi tristique senectus et eget nulla facilisi etiam'
    ***REMOVED***
  ***REMOVED***

  //// CONSTRUCTOR

  useEffect(() => {
    i18n.locale = Localization.locale
    i18n.fallbacks = true

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    ***REMOVED***)

    return function cleanup () {
      unsubscribe()
    ***REMOVED***
  ***REMOVED***, [])

  //// FUNCTIONS

  // plays text-to-speech audio file of language
  async function playAudio () {
    soundObject.unloadAsync()
    await soundObject.loadAsync(languageT2S[i18n.locale]).then(() => {
      soundObject.playAsync()
    ***REMOVED***)
  ***REMOVED***

  // updates language on picker change
  function onPickerChange (language) {
    setSelectedLanguage(language)
    i18n.locale = language
  ***REMOVED***

  //// RENDER

  // render start button conditionally as the user can't start if they don't have internet
  var startButton = isConnected ? (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('OnboardingSlides', {
          selectedLanguage: selectedLanguage
        ***REMOVED***)
      ***REMOVED***
      style={styles.button***REMOVED***
    >
      <Text style={styles.buttonTitle***REMOVED***>{i18n.t('letsBegin')***REMOVED*** </Text>
    </TouchableOpacity>
  ) : (
    <View style={[styles.button, { backgroundColor: '#828282' ***REMOVED***]***REMOVED***>
      <Text style={styles.buttonTitle***REMOVED***>{i18n.t('letsBegin')***REMOVED*** </Text>
    </View>
  )

  var errorMessage = isConnected ? (
    <View style={styles.errorMessageContainer***REMOVED***></View>
  ) : (
    <View style={styles.errorMessageContainer***REMOVED***>
      <Text style={styles.errorMessage***REMOVED***>{i18n.t('noInternet')***REMOVED***</Text>
    </View>
  )

  return (
    <View style={styles.screen***REMOVED***>
      <View>
        <Text style={styles.title***REMOVED***> {i18n.t('welcome')***REMOVED***</Text>
        <Text style={styles.subtitle***REMOVED***> {i18n.t('selectLanguage')***REMOVED***</Text>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20
        ***REMOVED******REMOVED***
      >
        <View style={{ flex: 1 ***REMOVED******REMOVED***>
          <Picker
            selectedValue={selectedLanguage***REMOVED***
            onValueChange={language => onPickerChange(language)***REMOVED***
            mode='dropdown'
          >
            <Picker.Item label='🇺🇸English' value='en' />
            <Picker.Item label='⭐️Test Language' value='te' />
          </Picker>
        </View>
        <View style={{***REMOVED******REMOVED***>
          <Ionicons.Button
            name='ios-volume-high'
            size={30***REMOVED***
            backgroundColor='rgba(0,0,0,0)'
            color='black'
            onPress={playAudio***REMOVED***
          />
        </View>
      </View>
      {startButton***REMOVED***
      {errorMessage***REMOVED***
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7'
  ***REMOVED***,
  title: {
    textAlign: 'center',
    fontSize: 36 * scaleMultiplier,
    fontWeight: 'bold',
    margin: 5
  ***REMOVED***,
  subtitle: {
    textAlign: 'center',
    fontSize: 24 * scaleMultiplier
  ***REMOVED***,
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1E20',
    borderRadius: 5
  ***REMOVED***,
  buttonTitle: {
    textAlign: 'center',
    fontSize: 24 * scaleMultiplier,
    color: '#FFFFFF'
  ***REMOVED***,
  errorMessageContainer: {
    height: '10%',
    width: '100%'
  ***REMOVED***,
  errorMessage: {
    textAlign: 'center',
    fontSize: 16 * scaleMultiplier,
    color: '#828282',
    marginTop: 10
  ***REMOVED***
***REMOVED***)

export default LanguageSelectScreen
