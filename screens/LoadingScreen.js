import NetInfo from '@react-native-community/netinfo'
import i18n from 'i18n-js'
import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  setHasFetchedLanguageData,
  setHasOnboarded,
  setLanguageCoreFilesDownloadProgress,
  setTotalLanguageCoreFilesToDownload
***REMOVED*** from '../redux/actions/databaseActions'
import { setIsInstallingLanguageInstance ***REMOVED*** from '../redux/actions/isInstallingLanguageInstanceActions'
import { colors ***REMOVED*** from '../styles/colors'
import { SystemTypography ***REMOVED*** from '../styles/typography'
import ar from '../translations/ar.json'
import en from '../translations/en.json'

i18n.translations = {
  en,
  ar
***REMOVED***

function LoadingScreen ({
  navigation,
  // passed from redux
  languageCoreFilesDownloadProgress,
  totalLanguageCoreFilesToDownload,
  hasInstalledFirstLanguageInstance,
  storedDownloads,
  database,
  hasFetchedLanguageData,
  setIsInstallingLanguageInstance,
  setHasOnboarded,
  setTotalLanguageCoreFilesToDownload,
  setLanguageCoreFilesDownloadProgress,
  setHasFetchedLanguageData
***REMOVED***) {
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    ***REMOVED***)

    return function cleanup () {
      unsubscribe()
    ***REMOVED***
  ***REMOVED***, [])

  function cancelDownloads () {
    setLanguageCoreFilesDownloadProgress(0)
    setTotalLanguageCoreFilesToDownload(0)
    setIsInstallingLanguageInstance(false)
    setHasFetchedLanguageData(false)

    // only if adding language for the first time
    if (!hasInstalledFirstLanguageInstance) {
      setHasOnboarded(false)
      navigation.reset({
        index: 0,
        routes: [{ name: 'InitialLanguageInstanceInstall' ***REMOVED***]
      ***REMOVED***)
    ***REMOVED***
    storedDownloads.forEach(download => {
      download.pauseAsync().catch(() => console.log('error pausing download'))
    ***REMOVED***)
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40 * scaleMultiplier
        ***REMOVED******REMOVED***
      >
        <Image
          style={{
            width: Dimensions.get('window').width / 2,
            height: Dimensions.get('window').width / 2
          ***REMOVED******REMOVED***
          source={require('../assets/gifs/waha_loading.gif')***REMOVED***
          resizeMode='contain'
        />
        <View
          style={{
            width: Dimensions.get('window').width - 60,
            height: 40 * scaleMultiplier,
            borderRadius: 30,
            flexDirection: 'row',
            overflow: 'hidden',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: colors.porcelain
          ***REMOVED******REMOVED***
        >
          {languageCoreFilesDownloadProgress ? (
            <View
              style={{
                backgroundColor: '#e43c44',
                height: '100%',
                flex: languageCoreFilesDownloadProgress,
                borderRadius: 20
              ***REMOVED******REMOVED***
            />
          ) : null***REMOVED***
          {languageCoreFilesDownloadProgress ? (
            <View
              style={{
                backgroundColor: '#F1FAEE',
                height: '100%',
                flex:
                  totalLanguageCoreFilesToDownload -
                  languageCoreFilesDownloadProgress
              ***REMOVED******REMOVED***
            />
          ) : null***REMOVED***
        </View>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 60 * scaleMultiplier,
            paddingHorizontal: 20,
            justifyContent: 'center',
            flexDirection: 'row'
          ***REMOVED******REMOVED***
        >
          {isConnected ? null : (
            <Text
              style={SystemTypography(false, 'h4', '', 'center', colors.shark)***REMOVED***
            >
              {i18n.t('lostConnection')***REMOVED***
            </Text>
          )***REMOVED***
        </View>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center'
        ***REMOVED******REMOVED***
      >
        <View
          style={{
            width: '100%',
            height: 100,
            marginVertical: 20,
            justifyContent: 'center',
            alignItems: 'center'
          ***REMOVED******REMOVED***
        >
          {hasFetchedLanguageData ? (
            <TouchableOpacity
              onPress={cancelDownloads***REMOVED***
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              ***REMOVED******REMOVED***
            >
              <Icon name='cancel' color={colors.shark***REMOVED*** size={50***REMOVED*** />
              <Text>{i18n.t('cancel')***REMOVED***</Text>
            </TouchableOpacity>
          ) : null***REMOVED***
        </View>
      </View>
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1FAEE'
  ***REMOVED***,
  progressBarContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.aquaHaze,
    borderRadius: 10
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  return {
    languageCoreFilesDownloadProgress:
      state.database.languageCoreFilesDownloadProgress,
    totalLanguageCoreFilesToDownload:
      state.database.totalLanguageCoreFilesToDownload,
    hasInstalledFirstLanguageInstance:
      state.database.hasInstalledFirstLanguageInstance,
    storedDownloads: state.storedDownloads,
    database: state.database,
    hasFetchedLanguageData: state.database.hasFetchedLanguageData
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setIsInstallingLanguageInstance: status => {
      dispatch(setIsInstallingLanguageInstance(status))
    ***REMOVED***,
    setHasOnboarded: status => {
      dispatch(setHasOnboarded(status))
    ***REMOVED***,
    setTotalLanguageCoreFilesToDownload: totalLanguageCoreFilesToDownload => {
      dispatch(
        setTotalLanguageCoreFilesToDownload(totalLanguageCoreFilesToDownload)
      )
    ***REMOVED***,
    setLanguageCoreFilesDownloadProgress: progress => {
      dispatch(setLanguageCoreFilesDownloadProgress(progress))
    ***REMOVED***,
    setHasFetchedLanguageData: hasFetchedLanguageData =>
      dispatch(setHasFetchedLanguageData(hasFetchedLanguageData))
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
