import { useBackHandler ***REMOVED*** from '@react-native-community/hooks'
import { Audio ***REMOVED*** from 'expo-av'
import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View
***REMOVED*** from 'react-native'
import { TouchableOpacity ***REMOVED*** from 'react-native-gesture-handler'
import { connect ***REMOVED*** from 'react-redux'
import Piano from '../components/piano-stuff/Piano'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { setIsMuted, setIsTimedOut ***REMOVED*** from '../redux/actions/securityActions'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function PianoAppScreen ({
  // Props passed from navigation.
  navigation: { canGoBack, goBack, reset ***REMOVED***,
  // Props passed from redux.
  security,
  font,
  activeGroup,
  translations,
  isRTL,
  setIsMuted,
  setIsTimedOut
***REMOVED***) {
  //+ STATE

  const [pattern, setPattern] = useState('')
  const [countdown, setCountdown] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  //+ CONSTRUCTOR

  useEffect(() => {
    Keyboard.dismiss()

    if (pattern.includes(security.code)) {
      if (!security.isMuted) {
        var note = new Audio.Sound()
        note
          .loadAsync(require('../assets/unlock_security_mode_sound.mp3'))
          .then(() => note.playAsync())
      ***REMOVED***
      setIsTimedOut(false)
      if (canGoBack()) {
        if (Platform.OS === 'ios') goBack()
        goBack()
      ***REMOVED*** else
        reset({
          index: 0,
          routes: [{ name: 'StorySetTabs' ***REMOVED***]
        ***REMOVED***)
    ***REMOVED***
  ***REMOVED***, [pattern])

  // disable back button on this screen
  useBackHandler(() => {
    return true
  ***REMOVED***)

  //+ RENDER

  return (
    <SafeAreaView style={styles.screen***REMOVED***>
      <View
        style={{
          height: '25%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        ***REMOVED******REMOVED***
      >
        <Image
          source={require('../assets/icons/waha_icon.png')***REMOVED***
          style={{
            resizeMode: 'contain',
            width: 50,
            height: 50,
            borderRadius: 10
          ***REMOVED******REMOVED***
        />
        <Text
          style={[
            StandardTypography(
              { font, isRTL ***REMOVED***,
              'h1',
              'Bold',
              'center',
              colors.shark
            ),
            { paddingHorizontal: 10 ***REMOVED***
          ]***REMOVED***
        >
          {translations.security.game_screen_title***REMOVED***
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'center',
            alignItems: 'center'
          ***REMOVED******REMOVED***
        >
          <TouchableOpacity
            onPress={
              countdown === ''
                ? () => {
                    setCountdown('3')
                    setTimeout(() => setCountdown('2'), 1000)
                    setTimeout(() => setCountdown('1'), 2000)
                    setTimeout(() => setCountdown('!'), 3000)
                  ***REMOVED***
                : () => {
                    setCountdown('')
                  ***REMOVED***
              // security.isMuted
              //   ? () => setIsMuted(false)
              //   : () => setIsMuted(true)
            ***REMOVED***
            style={{
              margin: 20
            ***REMOVED******REMOVED***
          >
            <View
              style={{
                backgroundColor: colors.red,
                width: 50 * scaleMultiplier,
                height: 50 * scaleMultiplier,
                borderRadius: (50 * scaleMultiplier) / 2,
                borderWidth: 2,
                borderColor: colors.tuna,
                justifyContent: 'center',
                alignItems: 'center'
              ***REMOVED******REMOVED***
            >
              <Text
                style={StandardTypography(
                  { font, isRTL ***REMOVED***,
                  'h2',
                  'Regular',
                  'center',
                  colors.white
                )***REMOVED***
              >
                {countdown***REMOVED***
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              isPlaying ? () => setIsPlaying(false) : () => setIsPlaying(true)
            ***REMOVED***
            style={{
              margin: 20
            ***REMOVED******REMOVED***
          >
            <Icon
              name={isPlaying ? 'pause' : 'play'***REMOVED***
              size={60 * scaleMultiplier***REMOVED***
              color={colors.tuna***REMOVED***
            />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            style={{
              resizeMode: 'contain',
              width: Dimensions.get('window').width,
              height: 60 * scaleMultiplier,
              borderRadius: 10
            ***REMOVED******REMOVED***
            source={require('../assets/piano.png')***REMOVED***
          />
          <Piano setPattern={setPattern***REMOVED*** isMuted={security.isMuted***REMOVED*** />
        </View>
        <View
          style={{
            width: Dimensions.get('window').width,
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          ***REMOVED******REMOVED***
        >
          <TouchableOpacity
            onPress={() => {***REMOVED******REMOVED***
            style={{
              margin: 20
            ***REMOVED******REMOVED***
          >
            <Icon name={'settings'***REMOVED*** size={50***REMOVED*** color={colors.tuna***REMOVED*** />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              security.isMuted
                ? () => setIsMuted(false)
                : () => setIsMuted(true)
            ***REMOVED***
            style={{
              margin: 20
            ***REMOVED******REMOVED***
          >
            <Icon
              name={security.isMuted ? 'volume-off' : 'volume'***REMOVED***
              size={50***REMOVED***
              color={colors.tuna***REMOVED***
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze,
    alignItems: 'center',
    justifyContent: 'space-around'
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    security: state.security,
    font: getLanguageFont(activeGroup.language),
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setIsMuted: toSet => {
      dispatch(setIsMuted(toSet))
    ***REMOVED***,
    setIsTimedOut: toSet => {
      dispatch(setIsTimedOut(toSet))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(PianoAppScreen)
