import React, { useState, useEffect ***REMOVED*** from 'react'
import {
  View,
  StyleSheet,
  Text,
  Picker,
  TouchableOpacity,
  TextInput,
  SectionList,
  Dimensions
***REMOVED*** from 'react-native'
import { Ionicons ***REMOVED*** from '@expo/vector-icons'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import { scaleMultiplier, languageT2S, languages ***REMOVED*** from '../constants'
import NetInfo from '@react-native-community/netinfo'
import ModalSelector from 'react-native-modal-selector'
import LanguageSelectItem from '../components/LanguageSelectItem'
import { FlatList ***REMOVED*** from 'react-native-gesture-handler'
import { Audio ***REMOVED*** from 'expo-av'

// translations import
import en from '../translations/en.json'
import fr from '../translations/fr.json'
import ar from '../translations/ar.json'

function LanguageSelectScreen (props) {
  //// STATE

  // keeps track of language selected in picker (TODO: change default to user's default language)
  const [selectedLanguage, setSelectedLanguage] = useState('')

  // keeps track of whether the uesr has an internet connection
  const [isConnected, setIsConnected] = useState(true)

  i18n.locale = Localization.locale
  i18n.fallbacks = true

  // sound for the text to speech

  // translations for language select
  i18n.translations = {
    en,
    fr,
    ar
  ***REMOVED***

  const soundObject = new Audio.Sound()

  async function playAudio (key) {
    soundObject.unloadAsync()
    await soundObject.loadAsync(languageT2S[key]).then(() => {
      soundObject.playAsync()
    ***REMOVED***)
  ***REMOVED***

  //// CONSTRUCTOR

  useEffect(() => {
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
      style={[styles.button, { backgroundColor: '#60C239' ***REMOVED***]***REMOVED***
    >
      <Text style={styles.buttonTitle***REMOVED***>{i18n.t('letsBegin')***REMOVED*** </Text>
    </TouchableOpacity>
  ) : (
    <View style={[styles.button, { backgroundColor: '#828282' ***REMOVED***]***REMOVED***>
      <Text style={styles.buttonTitle***REMOVED***>{i18n.t('letsBegin')***REMOVED*** </Text>
    </View>
  )

  var errorMessage = isConnected ? null : (
    <View style={{ height: 50 * scaleMultiplier, paddingHorizontal: 10 ***REMOVED******REMOVED***>
      <Text style={styles.errorMessage***REMOVED***>{i18n.t('noInternet')***REMOVED***</Text>
    </View>
  )

  function renderLanguage (item) {
    return (
      <LanguageSelectItem
        nativeName={item.section.data[item.index].nativeName***REMOVED***
        localeName={i18n.t(item.section.data[item.index].i18nName)***REMOVED***
        logoSource={item.section.data[item.index].logoSource***REMOVED***
        onPress={() =>
          setSelectedLanguage(item.section.data[item.index].wahaID)
        ***REMOVED***
        isSelected={
          selectedLanguage === item.section.data[item.index].wahaID
            ? true
            : false
        ***REMOVED***
        playAudio={() => playAudio(item.section.data[item.index].wahaID)***REMOVED***
      />
    )
  ***REMOVED***

  function renderLanguageHeader (section) {
    return (
      <View
        style={{
          height: 40 * scaleMultiplier,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor: '#F7F9FA'
        ***REMOVED******REMOVED***
      >
        <Text>{i18n.t(section.i18nName)***REMOVED***</Text>
      </View>
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <View style={{ marginVertical: 40 * scaleMultiplier ***REMOVED******REMOVED***>
        <Text style={styles.title***REMOVED***> {i18n.t('welcome')***REMOVED***</Text>
        <Text style={styles.subtitle***REMOVED***> {i18n.t('selectLanguage')***REMOVED***</Text>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flex: 1
        ***REMOVED******REMOVED***
      >
        <SectionList
          // sort sections to put brands associated with phone language at the
          //  top
          sections={languages.sort((a, b) => {
            if (i18n.locale.includes(a.languageCode)) return -1
            else if (i18n.locale.includes(b.languageCode)) return 1
            else return 0
          ***REMOVED***)***REMOVED***
          keyExtractor={item => item.wahaID***REMOVED***
          renderItem={renderLanguage***REMOVED***
          renderSectionHeader={({ section ***REMOVED***) => renderLanguageHeader(section)***REMOVED***
          renderSectionFooter={() => (
            <View style={{ height: 20 * scaleMultiplier, width: '100%' ***REMOVED******REMOVED*** />
          )***REMOVED***
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 130 * scaleMultiplier
        ***REMOVED******REMOVED***
      >
        {startButton***REMOVED***
        {errorMessage***REMOVED***
      </View>
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F9FA',
    paddingTop: 40 * scaleMultiplier
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
    height: 60 * scaleMultiplier,
    width: Dimensions.get('window').width - 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1E20',
    borderRadius: 10
  ***REMOVED***,
  buttonTitle: {
    textAlign: 'center',
    fontSize: 24 * scaleMultiplier,
    color: '#FFFFFF'
  ***REMOVED***,
  errorMessage: {
    textAlign: 'center',
    fontSize: 16 * scaleMultiplier,
    color: '#828282'
  ***REMOVED***
***REMOVED***)

export default LanguageSelectScreen
