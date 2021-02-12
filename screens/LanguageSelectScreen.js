import NetInfo from '@react-native-community/netinfo'
import { Audio ***REMOVED*** from 'expo-av'
import * as FileSystem from 'expo-file-system'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  Alert,
  Dimensions,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { languageT2S ***REMOVED*** from '../assets/languageT2S/languageT2S'
import LanguageSelectItem from '../components/list-items/LanguageSelectItem'
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

function LanguageSelectScreen (props) {
  //+ STATE

  // keeps track of language selected in picker (TODO: change default to user's default language)
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [isListEmpty, setIsListEmpty] = useState(false)

  // keeps track of whether the uesr has an internet connection
  const [isConnected, setIsConnected] = useState(true)

  i18n.locale = Localization.locale
  i18n.fallbacks = true

  // sound for the text to speech

  const soundObject = new Audio.Sound()

  async function playAudio (key) {
    soundObject.unloadAsync()
    await soundObject.loadAsync(languageT2S[key]).then(() => {
      soundObject.playAsync()
    ***REMOVED***)
  ***REMOVED***

  //+ CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())

    // Clear out the database and downloaded files in case we somehow come back to the Language Select screen after installing anything.
    if (props.route.name === 'LanguageSelect') {
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
        contents => {
          console.log('Files:')
          console.log(contents)
        ***REMOVED***
      )

      console.log(`Groups: ${props.groups ? props.groups : null***REMOVED***`)

      console.log(
        `Languages in DB: ${Object.keys(props.database).filter(
          key => key.length === 2
        )***REMOVED***`
      )

      // Object.keys(props.database).forEach(key => {
      //   if (key.length === 2) {
      //     props.deleteLanguageData(key)
      //     FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
      //       contents => {
      //         for (const item of contents) {
      //           if (item.slice(0, 2) === key) {
      //             FileSystem.deleteAsync(FileSystem.documentDirectory + item)
      //           ***REMOVED***
      //         ***REMOVED***
      //       ***REMOVED***
      //     )
      //   ***REMOVED***
      // ***REMOVED***)
    ***REMOVED***

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    ***REMOVED***)

    return function cleanup () {
      unsubscribe()
    ***REMOVED***
  ***REMOVED***, [])

  function getNavOptions () {
    return props.route.name === 'AddLanguage'
      ? {
          headerTitle: i18n.t('newLanguage')
        ***REMOVED***
      : null
  ***REMOVED***

  //+ FUNCTIONS

  async function fetchFirebaseData () {
    // props.storeDownloads([])
    props.setIsInstallingLanguageInstance(true)
    //- get sets first

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
        props.storeLanguageSets(sets, selectedLanguage)
      ***REMOVED***)
      .catch(error => {
        console.log(error)
        throw error
      ***REMOVED***)

    //- then get language object from database and throw all of it in redux
    await db
      .collection('languages')
      .doc(selectedLanguage)
      .get()
      .then(async doc => {
        if (doc.exists) {
          props.storeLanguageData(doc.data(), selectedLanguage)
        ***REMOVED***
      ***REMOVED***)
      .catch(error => {
        console.log(error)
        throw error
      ***REMOVED***)
    return
  ***REMOVED***

  function onStartPress () {
    if (selectedLanguage) {
      fetchFirebaseData()
        .then(() => {
          props.setHasFetchedLanguageData(true)
          props.downloadLanguageCoreFiles(selectedLanguage)
        ***REMOVED***)
        .catch(error => {
          Alert.alert(i18n.t('fetchErrorTitle'), i18n.t('fetchErrorMessage'), [
            {
              text: i18n.t('ok'),
              onPress: () => {
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: 'LanguageSelect' ***REMOVED***]
                ***REMOVED***)
              ***REMOVED***
            ***REMOVED***
          ])
        ***REMOVED***)
      if (props.route.name === 'LanguageSelect') {
        props.navigation.navigate('OnboardingSlides', {
          selectedLanguage: selectedLanguage
        ***REMOVED***)
      ***REMOVED***
    ***REMOVED*** else {
      Alert.alert(
        i18n.t('pleaseSelectLanguageTitle'),
        i18n.t('pleaseSelectLanguageMessage'),
        [
          {
            text: i18n.t('ok'),
            onPress: () => {***REMOVED***
          ***REMOVED***
        ]
      )
    ***REMOVED***
  ***REMOVED***

  // updates language on picker change
  function onPickerChange (language) {
    setSelectedLanguage(language)
  ***REMOVED***

  //+ RENDER

  // render start button conditionally as the user can't start if they don't have internet
  var startButton = isListEmpty ? (
    <WahaButton
      type='inactive'
      color={colors.aquaHaze***REMOVED***
      style={{
        marginHorizontal: 20,
        height: 68 * scaleMultiplier
      ***REMOVED******REMOVED***
      label={i18n.t('noMoreLanguages')***REMOVED***
      useDefaultFont={true***REMOVED***
    />
  ) : isConnected ? (
    <WahaButton
      type='filled'
      color={colors.apple***REMOVED***
      onPress={onStartPress***REMOVED***
      label={
        props.route.name === 'LanguageSelect'
          ? i18n.t('letsBegin')
          : i18n.t('addLanguage') + ' '
      ***REMOVED***
      style={{
        width: Dimensions.get('window').width - 40,
        marginHorizontal: 20,
        height: 68 * scaleMultiplier
      ***REMOVED******REMOVED***
      useDefaultFont={true***REMOVED***
    />
  ) : (
    <WahaButton
      type='inactive'
      color={colors.geyser***REMOVED***
      style={{
        width: Dimensions.get('window').width - 40,
        height: 68 * scaleMultiplier
      ***REMOVED******REMOVED***
      label={''***REMOVED***
      useDefaultFont={true***REMOVED***
      extraComponent={
        <View>
          <Icon name='cloud-slash' size={40***REMOVED*** color={colors.chateau***REMOVED*** />
        </View>
      ***REMOVED***
    />
  )

  var headerText =
    props.route.name === 'LanguageSelect' ? (
      <View
        style={{
          marginVertical: 20 * scaleMultiplier,
          paddingHorizontal: 20
        ***REMOVED******REMOVED***
      >
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

  function renderLanguage (item) {
    return (
      <LanguageSelectItem
        nativeName={item.section.data[item.index].nativeName***REMOVED***
        localeName={i18n.t(item.section.data[item.index].i18nName)***REMOVED***
        font={item.section.font***REMOVED***
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
          // aspectRatio: 8.7,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor:
            props.route.name === 'LanguageSelect'
              ? colors.aquaHaze
              : colors.white
        ***REMOVED******REMOVED***
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
          {i18n.t(section.i18nName)***REMOVED***
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
            props.route.name === 'LanguageSelect'
              ? colors.aquaHaze
              : colors.white
        ***REMOVED***
      ]***REMOVED***
    >
      {headerText***REMOVED***
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
          style={{ height: '100%' ***REMOVED******REMOVED***
          sections={
            props.route.name === 'LanguageSelect'
              ? languages.sort((a, b) => {
                  if (i18n.locale.includes(a.languageCode)) return -1
                  else if (i18n.locale.includes(b.languageCode)) return 1
                  else return 0
                ***REMOVED***)
              : languages
                  // sort based on closeness to phone language
                  .sort((a, b) => {
                    if (i18n.locale.includes(a.languageCode)) return -1
                    else if (i18n.locale.includes(b.languageCode)) return 1
                    else return 0
                  ***REMOVED***)
                  // filter out languages that are already installed
                  .map(languageFamily => {
                    return {
                      ...languageFamily,
                      // filter out languages that are in
                      //  installedLanguageInstances which came from previous
                      //  screen
                      data: languageFamily.data.filter(language => {
                        if (
                          props.route.params.installedLanguageInstances.some(
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
                  // if a language family has every language installed, don't
                  //  show it
                  .filter(languageFamily => {
                    if (languageFamily.data.length !== 0) return true
                    else return false
                  ***REMOVED***)
          ***REMOVED***
          ItemSeparatorComponent={() => <Separator />***REMOVED***
          SectionSeparatorComponent={() => <Separator />***REMOVED***
          ListEmptyComponent={() => {
            setIsListEmpty(true)
            return null
          ***REMOVED******REMOVED***
          keyExtractor={item => item.wahaID***REMOVED***
          renderItem={renderLanguage***REMOVED***
          renderSectionHeader={({ section ***REMOVED***) => renderLanguageHeader(section)***REMOVED***
          renderSectionFooter={() => (
            <View style={{ height: 20 * scaleMultiplier, width: '100%' ***REMOVED******REMOVED*** />
          )***REMOVED***
        />
      </View>
      {startButton***REMOVED***
    </SafeAreaView>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
    // paddingTop: 40 * scaleMultiplier
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
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  return {
    database: state.database,
    groups: state.groups
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    downloadLanguageCoreFiles: languageInstanceID =>
      dispatch(downloadLanguageCoreFiles(languageInstanceID)),
    storeLanguageData: (data, languageInstanceID) =>
      dispatch(storeLanguageData(data, languageInstanceID)),
    deleteLanguageData: languageInstanceID =>
      dispatch(deleteLanguageData(languageInstanceID)),
    storeLanguageSets: (sets, languageInstanceID) =>
      dispatch(storeLanguageSets(sets, languageInstanceID)),
    setIsInstallingLanguageInstance: toSet =>
      dispatch(setIsInstallingLanguageInstance(toSet)),
    storeDownloads: downloads => dispatch(storeDownloads(downloads)),
    setHasFetchedLanguageData: hasFetchedLanguageData =>
      dispatch(setHasFetchedLanguageData(hasFetchedLanguageData))
  ***REMOVED***
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelectScreen)
