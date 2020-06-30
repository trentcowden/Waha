import React, { useState, useEffect ***REMOVED*** from 'react'
import {
  View,
  StyleSheet,
  Text,
  Picker,
  TouchableOpacity,
  TextInput,
  SectionList
***REMOVED*** from 'react-native'
import { Ionicons ***REMOVED*** from '@expo/vector-icons'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import { scaleMultiplier, languageT2S, languages ***REMOVED*** from '../constants'
import NetInfo from '@react-native-community/netinfo'
import ModalSelector from 'react-native-modal-selector'
import LanguageSelectItem from '../components/LanguageSelectItem'
import { FlatList ***REMOVED*** from 'react-native-gesture-handler'

function LanguageSelectScreen (props) {
  //// STATE

  // keeps track of language selected in picker (TODO: change default to user's default language)
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale)

  // keeps track of whether the uesr has an internet connection
  const [isConnected, setIsConnected] = useState(true)

  // sound for the text to speech

  // translations for language select
  i18n.translations = {
    en: {
      welcome: 'Hello and welcome!',
      selectLanguage: 'Please select your language.',
      letsBegin: "Let's begin!",
      noInternet: 'Error: an internet connection is required to set up the app',
      cancel: 'Cancel'
    ***REMOVED***,
    te: {
      welcome: 'morbi tristique senectus et!',
      selectLanguage: 'eget nulla facilisi etiam.',
      letsBegin: 'nibh ipsum!',
      noInternet: 'morbi tristique senectus et eget nulla facilisi etiam',
      cancel: 'Lecnac'
    ***REMOVED***
  ***REMOVED***

  const data = [
    {
      key: 'en',
      label: 'English',
      component: <LanguageSelectItem id='en' label='🇺🇸English' />
    ***REMOVED***,
    {
      key: 'te',
      label: 'Test',
      component: <LanguageSelectItem id='te' label='⭐️Test' />
    ***REMOVED***
  ]

  //// CONSTRUCTOR

  useEffect(() => {
    i18n.locale = Localization.locale
    i18n.fallbacks = true

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    ***REMOVED***)

    fetch('http://ip-api.com/json/')
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson)
      ***REMOVED***)
      .catch(error => {
        // console.error(error)
      ***REMOVED***)

    return function cleanup () {
      unsubscribe()
    ***REMOVED***
  ***REMOVED***, [])

  //// FUNCTIONS

  // plays text-to-speech audio file of language

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

  function renderLanguage (item) {
    console.log(item)
    return (
      <View>
        <Text>{item.item***REMOVED***</Text>
      </View>
    )
  ***REMOVED***

  function renderLanguageHeader (item) {
    return <View></View>
  ***REMOVED***

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
          padding: 20,
          flex: 1
        ***REMOVED******REMOVED***
      >
        {/* <SectionList
          sections={languages***REMOVED***
          keyExtractor={item => item.title***REMOVED***
          renderItem={renderLanguage***REMOVED***
          renderSectionHeader={({ section: { title ***REMOVED*** ***REMOVED***) => <Text>{title***REMOVED***</Text>***REMOVED***
        /> */***REMOVED***
        <ModalSelector
          data={data***REMOVED***
          animationType='fade'
          // initValue={
          //   data.filter(item => item.key === selectedLanguage)[0].value
          // ***REMOVED***
          // selectedKey={selectedLanguage***REMOVED***
          onChange={option => {
            onPickerChange(option.key)
          ***REMOVED******REMOVED***
          cancelText={i18n.t('cancel')***REMOVED***
          cancelStyle={{
            height: 70 * scaleMultiplier,
            justifyContent: 'center'
          ***REMOVED******REMOVED***
          backdropPressToClose={true***REMOVED***
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              backgroundColor: '#FFFFFF',
              height: 80 * scaleMultiplier,
              justifyContent: 'center',
              paddingHorizontal: 20
            ***REMOVED******REMOVED***
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24 * scaleMultiplier
              ***REMOVED******REMOVED***
            >
              {data.filter(item => item.key === selectedLanguage)[0].label***REMOVED***
            </Text>
          </View>
        </ModalSelector>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingTop: 50 * scaleMultiplier
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
    width: 250 * scaleMultiplier,
    height: 60 * scaleMultiplier,
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
