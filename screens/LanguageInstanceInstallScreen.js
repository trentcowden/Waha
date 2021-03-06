import NetInfo from '@react-native-community/netinfo'
import { Audio ***REMOVED*** from 'expo-av'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  Alert,
  Animated,
  Dimensions,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { languageT2S ***REMOVED*** from '../assets/languageT2S/_languageT2S'
import LanguageItem from '../components/list-items/LanguageItem'
import Separator from '../components/standard/Separator'
import WahaButton from '../components/standard/WahaButton'
import { scaleMultiplier ***REMOVED*** from '../constants'
import db from '../firebase/db'
import { languages ***REMOVED*** from '../languages'
import {
  deleteLanguageData,
  downloadLanguageCoreFiles,
  setHasFetchedLanguageData,
  storeLanguageData,
  storeLanguageSets
***REMOVED*** from '../redux/actions/databaseActions'
import { deleteGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { setIsInstallingLanguageInstance ***REMOVED*** from '../redux/actions/isInstallingLanguageInstanceActions'
import { storeDownloads ***REMOVED*** from '../redux/actions/storedDownloadsActions'
import { colors ***REMOVED*** from '../styles/colors'
import { SystemTypography ***REMOVED*** from '../styles/typography'
import ar from '../translations/ar.json'
import en from '../translations/en.json'

i18n.translations = {
  en,
  ar
***REMOVED***

function mapStateToProps (state) {
  return {
    groups: state.groups,
    database: state.database
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    downloadLanguageCoreFiles: languageInstanceID =>
      dispatch(downloadLanguageCoreFiles(languageInstanceID)),
    storeLanguageData: (data, languageInstanceID) =>
      dispatch(storeLanguageData(data, languageInstanceID)),
    setIsInstallingLanguageInstance: toSet =>
      dispatch(setIsInstallingLanguageInstance(toSet)),
    storeDownloads: downloads => dispatch(storeDownloads(downloads)),
    setHasFetchedLanguageData: hasFetchedLanguageData =>
      dispatch(setHasFetchedLanguageData(hasFetchedLanguageData)),
    storeLanguageSets: (sets, languageInstanceID) =>
      dispatch(storeLanguageSets(sets, languageInstanceID)),
    deleteLanguageData: languageInstanceID =>
      dispatch(deleteLanguageData(languageInstanceID)),
    deleteGroup: groupName => dispatch(deleteGroup(groupName))
  ***REMOVED***
***REMOVED***

/**
 * A screen that displays a list of language instances to install. This appears as the first screen the user sees when they open the app for the first time, as well as later if they want to install another language instance.
 * @param {string***REMOVED*** routeName - The name of the screen variant. In this case, can either be "InitialLanguageInstanceInstall" or "SubsequentLanguageInstanceInstall" since this screen component is used twice.
 * @param {Object[]***REMOVED*** installedLanguageInstances - (Optional) An array of languages instances that are currently installed. Defaults to null since there aren't any installed language instances when the user opens the app for the first time. This variable is only relevant when the user is installing a subsequent language instance.
 * @param {string***REMOVED*** installedLanguageInstances[].languageID - The ID of the language.
 * @param {string***REMOVED*** installedLanguageInstances[].languageName - The name of the language.
 */
function LanguageInstanceInstallScreen ({
  // Props passed from navigation.
  navigation: { setOptions, goBack, reset, navigate ***REMOVED***,
  route: {
    name: routeName,
    // Props passed from previous screen.
    params: { installedLanguageInstances ***REMOVED*** = {
      installedLanguageInstances: null
    ***REMOVED***
  ***REMOVED***,
  // Props passed from redux.
  groups,
  database,
  downloadLanguageCoreFiles,
  storeLanguageData,
  setIsInstallingLanguageInstance,
  storeDownloads,
  setHasFetchedLanguageData,
  storeLanguageSets,
  deleteLanguageData,
  deleteGroup
***REMOVED***) {
  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions(
      routeName === 'SubsequentlLanguageInstanceInstall'
        ? {
            headerTitle: i18n.t('newLanguage')
          ***REMOVED***
        : null
    )
  ***REMOVED***, [])

  // Set the i18n locale to the locale of the user's phone.
  i18n.locale = Localization.locale

  // Setting fallbacks to true means that if the user's phone language isn't in i18n, it defaults to English.
  i18n.fallbacks = true

  /** Keeps track of the language that is currently selected. */
  const [selectedLanguage, setSelectedLanguage] = useState('')

  /** Keeps track of whether the list of languages to install is empty. */
  const [isListEmpty, setIsListEmpty] = useState(false)

  /** Keeps track of whether the user is connected to the internet. Note: we don't use the redux isConnected variable because if this is the first time the user has opened the app, that redux variable hasn't been created yet. */
  const [isConnected, setIsConnected] = useState(true)

  /** Keeps track of the Y position of the start button for animating. */
  const [buttonYPos, setButtonYPos] = useState(
    new Animated.Value(68 * scaleMultiplier + 20)
  )

  /** The sound object for playing the language text-to-speech files. */
  const [audio, setAudio] = useState(new Audio.Sound())

  /** useEffect function sets the isConnected state with the status of the user's internet connection. */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    ***REMOVED***)

    return function cleanup () {
      unsubscribe()
    ***REMOVED***
  ***REMOVED***, [])

  /**
   * Plays the text-to-speech audio file for a language.
   * @param {string***REMOVED*** languageID - The ID of the language to play.
   */
  async function playAudio (languageID) {
    audio.unloadAsync()
    await audio.loadAsync(languageT2S[languageID]).then(() => {
      audio.playAsync()
    ***REMOVED***)
  ***REMOVED***

  /** Fetches all the data for a language from Firebase. This includes the various Story Sets from the 'sets' collection and the language info from the 'languages' collection. It's an async function and doesn't resolve until all the information has been fetched and stored. If any fetch fails, it throws an error. */
  async function fetchFirebaseData () {
    // Set the installingLanguageInstance redux variable to true since we're now installing a language instance.
    setIsInstallingLanguageInstance(true)

    // Fetch all the Story Sets whith the language ID of the selected language and store them in redux.
    await db
      .collection('sets')
      .where('languageID', '==', selectedLanguage)
      .get()
      .then(response => {
        var sets = []
        response.forEach(set => {
          sets.push({
            id: set.id,
            ...set.data()
          ***REMOVED***)
        ***REMOVED***)
        storeLanguageSets(sets, selectedLanguage)
      ***REMOVED***)
      .catch(error => {
        console.log(error)
        throw error
      ***REMOVED***)

    // Fetch the language info for the selected language and store it in redux.
    await db
      .collection('languages')
      .doc(selectedLanguage)
      .get()
      .then(async doc => {
        if (doc.exists) {
          storeLanguageData(doc.data(), selectedLanguage)
        ***REMOVED***
      ***REMOVED***)
      .catch(error => {
        console.log(error)
        throw error
      ***REMOVED***)

    return
  ***REMOVED***

  /**
   * Handles the user pressing the start button after they select a language instance to install. Involves fetching the necessary Firebase data, setting the hasFetchedLanguageData to true, and starting the download of the language core files. If this is the first language instance they've installed, we want to nagivate to the onboarding slides too.
   */
  function onStartPress () {
    fetchFirebaseData()
      .then(() => {
        setHasFetchedLanguageData(true)
        downloadLanguageCoreFiles(selectedLanguage)
      ***REMOVED***)
      .catch(error => {
        Alert.alert(i18n.t('fetchErrorTitle'), i18n.t('fetchErrorMessage'), [
          {
            text: i18n.t('ok'),
            onPress: () => {
              reset({
                index: 0,
                routes: [{ name: 'InitialLanguageInstanceInstall' ***REMOVED***]
              ***REMOVED***)
            ***REMOVED***
          ***REMOVED***
        ])
      ***REMOVED***)
    // Navigate to the onboarding slides if this is the first language instance install.
    if (routeName === 'InitialLanguageInstanceInstall') {
      navigate('WahaOnboardingSlides', {
        selectedLanguage: selectedLanguage
      ***REMOVED***)
    ***REMOVED***
  ***REMOVED***

  /**
   * Gets a list of all the languages and language families available in Waha. These are stored in the languages.js file.
   * @return {Object[]***REMOVED*** - An array of language family objects.
   */
  function getLanguageData () {
    var sections
    if (routeName === 'InitialLanguageInstanceInstall')
      sections = languages.sort((a, b) => {
        // Sort so that the language family associated with the phone's language is at the top of the list.
        if (i18n.locale.includes(a.languageCode)) return -1
        else if (i18n.locale.includes(b.languageCode)) return 1
        else return 0
      ***REMOVED***)
    else
      sections = languages
        .sort((a, b) => {
          if (i18n.locale.includes(a.languageCode)) return -1
          else if (i18n.locale.includes(b.languageCode)) return 1
          else return 0
        ***REMOVED***)
        // If installing a subsequent language instance, we need to filter out the languages that are already installed.
        .map(languageFamily => {
          return {
            ...languageFamily,
            data: languageFamily.data.filter(language => {
              if (
                installedLanguageInstances.some(
                  installedLanguage =>
                    installedLanguage.languageID === language.wahaID
                )
              ) {
                return false
              ***REMOVED*** else {
                return true
              ***REMOVED***
            ***REMOVED***)
          ***REMOVED***
        ***REMOVED***)
        // Similarly, if a language family has every language instance installed, filter it out too.
        .filter(languageFamily => {
          if (languageFamily.data.length !== 0) return true
          else return false
        ***REMOVED***)
    // If, after all of our filtering, the list is empty, we've installed every language instance and want to set isListEmpty to true.
    if (sections.length === 0 && !isListEmpty) setIsListEmpty(true)

    // Finally, return the sorted and filtered array of languages.
    return sections
  ***REMOVED***

  // Determine what to render for the header text. If it's our first install, its the first time opening the app, so display a welcome message. Otherwise, display nothing.
  var welcomeText =
    routeName === 'InitialLanguageInstanceInstall' ? (
      <View style={styles.headerTextContainer***REMOVED***>
        <Text
          style={[
            SystemTypography(false, 'h1', 'Bold', 'center', colors.shark)
          ]***REMOVED***
        >
          {i18n.t('welcome')***REMOVED***
        </Text>
        <Text
          style={SystemTypography(
            false,
            'h2',
            'Regular',
            'center',
            colors.shark
          )***REMOVED***
        >
          {i18n.t('selectLanguage')***REMOVED***
        </Text>
      </View>
    ) : (
      <View style={{ width: '100%', height: 20 * scaleMultiplier ***REMOVED******REMOVED*** />
    )

  /**
   * Renders a LanguageSelectItem component used for the Languages SectionList item.
   * @param {Object***REMOVED*** language - The object for the language to render.
   * @param {Object***REMOVED*** languageFamily - The object for the language family that this language is a part of.
   * @return {Component***REMOVED*** - The LanguageSelectItem component.
   */
  function renderLanguageItem (language, languageFamily) {
    return (
      <LanguageItem
        nativeName={language.nativeName***REMOVED***
        localeName={i18n.t(language.i18nName)***REMOVED***
        font={languageFamily.font***REMOVED***
        logoSource={language.logoSource***REMOVED***
        onPress={() => {
          if (!selectedLanguage) {
            Animated.spring(buttonYPos, {
              toValue: 0
            ***REMOVED***).start()
          ***REMOVED***
          setSelectedLanguage(language.wahaID)
        ***REMOVED******REMOVED***
        isSelected={selectedLanguage === language.wahaID ? true : false***REMOVED***
        playAudio={() => playAudio(language.wahaID)***REMOVED***
      />
    )
  ***REMOVED***

  /**
   * Renders a component used for the Languages SectionList header.
   * @param {Object***REMOVED*** language - The object for the language to render.
   * @param {Object***REMOVED*** languageFamily - The object for the language family that this language is a part of.
   * @return {Component***REMOVED*** - The LanguageSelectItem component.
   */
  function renderLanguageHeader (languageFamily) {
    return (
      <View
        style={[
          styles.languageHeaderContainer,
          {
            backgroundColor:
              routeName === 'InitialLanguageInstanceInstall'
                ? colors.aquaHaze
                : colors.white
          ***REMOVED***
        ]***REMOVED***
      >
        <Text
          style={SystemTypography(
            false,
            'h3',
            'Regular',
            'left',
            colors.chateau
          )***REMOVED***
        >
          {i18n.t(languageFamily.i18nName)***REMOVED***
        </Text>
      </View>
    )
  ***REMOVED***

  return (
    <SafeAreaView
      style={[
        styles.screen,
        {
          backgroundColor:
            routeName === 'InitialLanguageInstanceInstall'
              ? colors.aquaHaze
              : colors.white
        ***REMOVED***
      ]***REMOVED***
    >
      {welcomeText***REMOVED***
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
          style={{ height: '100%' ***REMOVED******REMOVED***
          sections={getLanguageData()***REMOVED***
          ItemSeparatorComponent={() => <Separator />***REMOVED***
          SectionSeparatorComponent={() => <Separator />***REMOVED***
          ListEmptyComponent={() => (
            <View>
              <View
                style={{ width: '100%', marginBottom: 18 * scaleMultiplier ***REMOVED******REMOVED***
              >
                <Text
                  style={SystemTypography(
                    false,
                    'p',
                    'Regular',
                    'center',
                    colors.chateau
                  )***REMOVED***
                >
                  {i18n.t('noMoreLanguages')***REMOVED***
                </Text>
              </View>
              <Separator />
            </View>
          )***REMOVED***
          keyExtractor={item => item.wahaID***REMOVED***
          renderItem={({ item, section ***REMOVED***) => renderLanguageItem(item, section)***REMOVED***
          renderSectionHeader={({ section ***REMOVED***) => renderLanguageHeader(section)***REMOVED***
          renderSectionFooter={() => (
            <View style={{ height: 20 * scaleMultiplier, width: '100%' ***REMOVED******REMOVED*** />
          )***REMOVED***
        />
      </View>
      <Animated.View
        style={[
          styles.startButtonContainer,
          {
            transform: [{ translateY: buttonYPos ***REMOVED***]
          ***REMOVED***
        ]***REMOVED***
      >
        <WahaButton
          type={isConnected ? 'filled' : 'inactive'***REMOVED***
          color={isConnected ? colors.apple : colors.geyser***REMOVED***
          onPress={isConnected ? onStartPress : null***REMOVED***
          label={
            isConnected
              ? routeName === 'InitialLanguageInstanceInstall'
                ? i18n.t('letsBegin')
                : i18n.t('addLanguage') + ' '
              : ''
          ***REMOVED***
          style={{
            width: Dimensions.get('window').width - 40,
            marginHorizontal: 20,
            height: 68 * scaleMultiplier
          ***REMOVED******REMOVED***
          useDefaultFont={true***REMOVED***
          extraComponent={
            isConnected ? null : (
              <Icon name='cloud-slash' size={40***REMOVED*** color={colors.chateau***REMOVED*** />
            )
          ***REMOVED***
        />
      </Animated.View>
    </SafeAreaView>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  ***REMOVED***,
  buttonContainer: {
    borderRadius: 10,
    width: Dimensions.get('window').width - 40,
    marginVertical: 20 * scaleMultiplier,
    marginHorizontal: 20,
    height: 65 * scaleMultiplier,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  ***REMOVED***,
  headerTextContainer: {
    marginVertical: 20 * scaleMultiplier,
    paddingHorizontal: 20
  ***REMOVED***,
  startButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  ***REMOVED***,
  languageHeaderContainer: {
    height: 40 * scaleMultiplier,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  ***REMOVED***
***REMOVED***)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageInstanceInstallScreen)
