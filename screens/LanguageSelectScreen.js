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

function LanguageSelectScreen (props) {
  //// STATE

  // keeps track of language selected in picker (TODO: change default to user's default language)
  const [selectedLanguage, setSelectedLanguage] = useState('')

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
      cancel: 'Cancel',
      // waha language headers
      english: 'English',
      french: 'French',
      arabic: 'Arabic',
      // waha languages
      englishGlobal: 'English (Global)',
      englishUK: 'English (UK)',
      englishAustralia: 'English (Australia)',
      french: 'French',
      darija: 'Darija',
      laarbia: 'Laarbia'
    ***REMOVED***,
    fr: {
      welcome: 'Bonjour et bienvenue!',
      selectLanguage: 'Veuillez sélectionner votre langue.',
      letsBegin: 'Commençons!',
      noInternet:
        "Erreur: une connexion Internet est requise pour configurer l'application",
      cancel: 'Annuler',
      // waha language headers
      english: 'Anglais',
      french: 'Français',
      arabic: 'Arabe',
      // waha languages
      englishGlobal: 'Anglais (Mondial)',
      englishUK: 'Anglais (Royaume-Uni)',
      englishAustralia: 'Anglais (Australie)',
      french: 'Français',
      darija: 'Accent Marocain',
      laarbia: 'Libyen'
    ***REMOVED***,
    ar: {
      welcome: 'أهلا ومرحبا!',
      selectLanguage: 'الرجاء اختيار لغتك.',
      letsBegin: 'هيا نبدأ!',
      noInternet: 'خطأ: مطلوب اتصال بالإنترنت لإعداد التطبيق',
      cancel: 'إلغاء',
      // waha language headers
      english: 'الإنجليزية',
      french: 'فرنسي',
      arabic: 'العربية',
      // waha languages
      englishGlobal: 'الإنجليزية (عالميًا)',
      englishUK: 'الإنجليزية (المملكة المتحدة)',
      englishAustralia: 'الإنجليزية (أستراليا)',
      french: 'فرنسي',
      darija: 'اللهجة المغربية',
      laarbia: 'ليبي‎'
    ***REMOVED***
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

  var errorMessage = isConnected ? (
    <View
      style={{ height: 50 * scaleMultiplier, paddingHorizontal: 10 ***REMOVED******REMOVED***
    ></View>
  ) : (
    <View style={{ height: 50 * scaleMultiplier, paddingHorizontal: 10 ***REMOVED******REMOVED***>
      <Text style={styles.errorMessage***REMOVED***>{i18n.t('noInternet')***REMOVED***</Text>
    </View>
  )

  function renderLanguage (item) {
    return (
      <LanguageSelectItem
        nativeName={item.section.data[item.index].nativeName***REMOVED***
        localeName={i18n.t(item.section.data[item.index].i18nName)***REMOVED***
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
          backgroundColor: '#EAEEF0',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10
        ***REMOVED******REMOVED***
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginRight: 20
          ***REMOVED******REMOVED***
        >
          <Text>{section.title***REMOVED***</Text>
          <Text>{i18n.t(section.i18nName)***REMOVED***</Text>
        </View>
        <TouchableOpacity onPress={() => playAudio(section.i18nName)***REMOVED***>
          <Icon name='volume' size={30***REMOVED*** color='black' />
        </TouchableOpacity>
      </View>
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <View style={{ marginVertical: 20 ***REMOVED******REMOVED***>
        <Text style={styles.title***REMOVED***> {i18n.t('welcome')***REMOVED***</Text>
        <Text style={styles.subtitle***REMOVED***> {i18n.t('selectLanguage')***REMOVED***</Text>
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#EAEEF0',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          flex: 1
        ***REMOVED******REMOVED***
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1
          ***REMOVED******REMOVED***
        >
          <SectionList
            sections={languages***REMOVED***
            keyExtractor={item => item.wahaID***REMOVED***
            renderItem={renderLanguage***REMOVED***
            renderSectionHeader={({ section ***REMOVED***) => renderLanguageHeader(section)***REMOVED***
            renderSectionFooter={() => (
              <View style={{ height: 20 * scaleMultiplier, width: '100%' ***REMOVED******REMOVED*** />
            )***REMOVED***
          />
          {/* <ModalSelector
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
        </ModalSelector> */***REMOVED***
        </View>
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
    backgroundColor: '#F7F7F7',
    paddingTop: 20 * scaleMultiplier
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
    borderRadius: 5,
    marginVertical: 10
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
