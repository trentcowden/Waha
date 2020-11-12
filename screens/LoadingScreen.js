import NetInfo from '@react-native-community/netinfo'
import i18n from 'i18n-js'
import React, { useEffect, useState ***REMOVED*** from 'react'
import { Dimensions, Image, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { TouchableOpacity ***REMOVED*** from 'react-native-gesture-handler'
import { connect ***REMOVED*** from 'react-redux'
import { colors ***REMOVED*** from '../constants'
import {
  addLanguage,
  setCurrentFetchProgress,
  setFetchError,
  setFinishedInitialFetch,
  setFinishedOnboarding,
  setIsFetching,
  setTotalToDownload
***REMOVED*** from '../redux/actions/databaseActions'
import ar from '../translations/ar.json'
// translations import
import en from '../translations/en.json'

function LoadingScreen (props) {
  const [proTipNum, setProTipNum] = useState(1)
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    // if (proTipNum !== 3)
    //   setTimeout(() => setProTipNum(current => current + 1), 8000)
    // else setTimeout(() => setProTipNum(1), 8000)
  ***REMOVED***, [proTipNum])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    ***REMOVED***)

    return function cleanup () {
      unsubscribe()
    ***REMOVED***
  ***REMOVED***, [])
  i18n.translations = {
    en,
    ar
  ***REMOVED***

  function retry () {
    props.setFetchError(false, null)
    props.addLanguage(props.errorLanguage)
  ***REMOVED***

  return props.fetchError ? (
    <View style={styles.screen***REMOVED***>
      <Text
        style={[
          Typography(props, 'h2', '', 'center', colors.shark),
          { padding: 10 ***REMOVED***
        ]***REMOVED***
      >
        {i18n.t('errorMessage')***REMOVED***
      </Text>
      <TouchableOpacity onPress={retry***REMOVED*** style={styles.button***REMOVED***>
        <Text style={Typography(props, 'h2', '', 'center', colors.white)***REMOVED***>
          {i18n.t('retry')***REMOVED***
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.screen***REMOVED***>
      {/* <View style={{ flex: 2, justifyContent: 'flex-end' ***REMOVED******REMOVED***>
        <Image
          style={{
            resizeMode: 'center',
            width: 200 * scaleMultiplier,
            height: 200 * scaleMultiplier,
            tintColor: '#e43c44'
          ***REMOVED******REMOVED***
          source={require('../assets/icon_transparent.png')***REMOVED***
        />
      </View> */***REMOVED***
      {/* <View style={{ flex: 1 ***REMOVED******REMOVED*** /> */***REMOVED***
      <Image
        style={{
          width: Dimensions.get('window').width / 2,
          height: Dimensions.get('window').width / 2,
          tintColor: '#e43c44'
        ***REMOVED******REMOVED***
        source={require('../assets/adaptive-icon-foreground.png')***REMOVED***
        resizeMode='contain'
      />

      {/* <View
        style={{
          flex: 2,
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center'
        ***REMOVED******REMOVED***
      > */***REMOVED***
      {/* <ActivityIndicator
          size='large'
          color={colors.shark***REMOVED***
          style={{ margin: 5 ***REMOVED******REMOVED***
        /> */***REMOVED***

      {/* <Text style={Typography(props, 'h2', '', 'center', colors.shark)***REMOVED***>
          {i18n.t('loadingMessage')***REMOVED***
        </Text> */***REMOVED***
      <View
        style={{
          width: Dimensions.get('window').width - 40,
          height: 20,
          borderRadius: 20,
          flexDirection: 'row',
          overflow: 'hidden',
          justifyContent: 'center'
        ***REMOVED******REMOVED***
      >
        <View
          style={{
            backgroundColor: '#e43c44',
            height: '100%',
            flex: props.currentFetchProgress,
            borderRadius: 20
          ***REMOVED******REMOVED***
        />
        <View
          style={{
            backgroundColor: colors.white,
            height: '100%',
            flex: props.totalToDownload - props.currentFetchProgress
          ***REMOVED******REMOVED***
        />
      </View>
      <Image
        style={{
          height: 50
        ***REMOVED******REMOVED***
        source={require('../assets/gifs/equalizer.gif')***REMOVED***
        resizeMode='contain'
      />
      {/* <Text style={Typography(props, 'h1', '', 'center', colors.shark)***REMOVED***>
          {props.totalToDownload
            ? props.currentFetchProgress + '/' + props.totalToDownload
            : ''***REMOVED***
        </Text> */***REMOVED***
      {isConnected ? null : <Text>Trying to reconnect...</Text>***REMOVED***
      <TouchableOpacity
        onPress={() => {
          props.setCurrentFetchProgress(0)
          props.setTotalToDownload(0)
          props.setIsFetching(false)
          // only if adding language for the first time
          if (!props.haveFinishedInitialFetch) {
            console.log('go to language select')
            props.setFinishedOnboarding(false)
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'LanguageSelect' ***REMOVED***]
            ***REMOVED***)
          ***REMOVED***
          props.storedDownloads.forEach(download => {
            download.pauseAsync()
          ***REMOVED***)
        ***REMOVED******REMOVED***
        style={{ width: '100%', height: 100, marginVertical: 20 ***REMOVED******REMOVED***
      >
        <Icon name='cancel' size={50***REMOVED*** color={colors.shark***REMOVED*** />
      </TouchableOpacity>
      {/* </View> */***REMOVED***
      {/* <View style={styles.progressBarContainer***REMOVED***>
        <Progress.Bar
          progress={props.progress***REMOVED***
          width={Dimensions.get('window').width - 50***REMOVED***
          color={colors.chateau***REMOVED***
          borderWidth={2***REMOVED***
          borderColor={colors.shark***REMOVED***
        />
      </View> */***REMOVED***
      {/* <View
        style={{
          paddingHorizontal: 20,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        ***REMOVED******REMOVED***
      >
        <Text style={Typography(props, 'h3', '', 'center', colors.chateau)***REMOVED***>
          {i18n.t('protip' + proTipNum)***REMOVED***
        </Text>
      </View> */***REMOVED***
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
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
    fetchError: state.fetchingStatus.fetchError,
    errorLanguage: state.fetchingStatus.errorLanguage,
    haveFinishedInitialFetch: state.database.haveFinishedInitialFetch,
    storedDownloads: state.storedDownloads,
    database: state.database
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addLanguage: language => {
      dispatch(addLanguage(language))
    ***REMOVED***,
    setFetchError: (status, language) => {
      dispatch(setFetchError(status, language))
    ***REMOVED***,
    setIsFetching: status => {
      dispatch(setIsFetching(status))
    ***REMOVED***,
    setFinishedOnboarding: status => {
      dispatch(setFinishedOnboarding(status))
    ***REMOVED***,
    setFinishedInitialFetch: status => {
      dispatch(setFinishedInitialFetch(status))
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
