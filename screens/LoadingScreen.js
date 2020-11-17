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
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import {
  setCurrentFetchProgress,
  setFinishedOnboarding,
  setTotalToDownload
***REMOVED*** from '../redux/actions/databaseActions'
import { setIsFetching ***REMOVED*** from '../redux/actions/isFetchingActions'
import { SystemTypography ***REMOVED*** from '../styles/typography'
import ar from '../translations/ar.json'
import en from '../translations/en.json'

i18n.translations = {
  en,
  ar
***REMOVED***

function LoadingScreen (props) {
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
    props.setCurrentFetchProgress(0)
    props.setTotalToDownload(0)
    props.setIsFetching(false)

    // only if adding language for the first time
    if (!props.haveFinishedInitialFetch) {
      props.setFinishedOnboarding(false)
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'LanguageSelect' ***REMOVED***]
      ***REMOVED***)
    ***REMOVED***
    props.storedDownloads.forEach(download => {
      download.pauseAsync()
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
          {props.currentFetchProgress ? (
            <View
              style={{
                backgroundColor: '#e43c44',
                height: '100%',
                flex: props.currentFetchProgress,
                borderRadius: 20
              ***REMOVED******REMOVED***
            />
          ) : null***REMOVED***
          {props.currentFetchProgress ? (
            <View
              style={{
                backgroundColor: '#F1FAEE',
                height: '100%',
                flex: props.totalToDownload - props.currentFetchProgress
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
          {isConnected ? null : (
            <TouchableOpacity
              style={{ width: 100, height: 30 ***REMOVED******REMOVED***
              onPress={retryDownloads***REMOVED***
            >
              <Text>Retry</Text>
            </TouchableOpacity>
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
        <TouchableOpacity
          onPress={cancelDownloads***REMOVED***
          style={{
            width: '100%',
            height: 100,
            marginVertical: 20,
            justifyContent: 'center',
            alignItems: 'center'
          ***REMOVED******REMOVED***
        >
          <Icon name='cancel' color={colors.shark***REMOVED*** size={50***REMOVED*** />
          <Text>{i18n.t('cancel')***REMOVED***</Text>
        </TouchableOpacity>
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
    currentFetchProgress: state.database.currentFetchProgress,
    totalToDownload: state.database.totalToDownload,
    haveFinishedInitialFetch: state.database.haveFinishedInitialFetch,
    storedDownloads: state.storedDownloads,
    database: state.database
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setIsFetching: status => {
      dispatch(setIsFetching(status))
    ***REMOVED***,
    setFinishedOnboarding: status => {
      dispatch(setFinishedOnboarding(status))
    ***REMOVED***,
    setTotalToDownload: totalToDownload => {
      dispatch(setTotalToDownload(totalToDownload))
    ***REMOVED***,
    setCurrentFetchProgress: progress => {
      dispatch(setCurrentFetchProgress(progress))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
