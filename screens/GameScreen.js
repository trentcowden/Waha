import { Audio ***REMOVED*** from 'expo-av'
import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
***REMOVED*** from 'react-native'
import { TouchableOpacity ***REMOVED*** from 'react-native-gesture-handler'
import { connect ***REMOVED*** from 'react-redux'
import Piano from '../components/Piano'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import { setIsMuted, setIsTimedOut ***REMOVED*** from '../redux/actions/securityActions'

function GameScreen (props) {
  //+ STATE

  const [pattern, setPattern] = useState('')
  const [countdown, setCountdown] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  //+ CONSTRUCTOR

  useEffect(() => {
    if (pattern.includes(props.security.code)) {
      if (!props.security.isMuted) {
        var note = new Audio.Sound()
        note
          .loadAsync(require('../assets/notes/Success.mp3'))
          .then(() => note.playAsync())
      ***REMOVED***
      props.setIsTimedOut(false)
      if (props.navigation.canGoBack()) {
        props.navigation.goBack()
        props.navigation.goBack()
      ***REMOVED*** else
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'SetsRoot' ***REMOVED***]
        ***REMOVED***)
    ***REMOVED***
  ***REMOVED***, [pattern])

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
          source={require('../assets/wahaIcon.png')***REMOVED***
          style={{
            resizeMode: 'contain',
            width: 50,
            height: 50,
            borderRadius: 10
          ***REMOVED******REMOVED***
        />
        <Text
          style={[
            Typography(props, 'h1', 'medium', 'center', colors.shark),
            { paddingHorizontal: 10 ***REMOVED***
          ]***REMOVED***
        >
          {props.translations.security.game_screen_title***REMOVED***
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: props.isRTL ? 'row-reverse' : 'row',
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
              // props.security.isMuted
              //   ? () => props.setIsMuted(false)
              //   : () => props.setIsMuted(true)
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
                style={Typography(
                  props,
                  'h2',
                  'regular',
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
          <Piano setPattern={setPattern***REMOVED*** isMuted={props.security.isMuted***REMOVED*** />
        </View>
        <View
          style={{
            width: Dimensions.get('window').width,
            flexDirection: props.isRTL ? 'row-reverse' : 'row',
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
              props.security.isMuted
                ? () => props.setIsMuted(false)
                : () => props.setIsMuted(true)
            ***REMOVED***
            style={{
              margin: 20
            ***REMOVED******REMOVED***
          >
            <Icon
              name={props.security.isMuted ? 'volume-off' : 'volume'***REMOVED***
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
    font: state.database[activeGroup.language].font,
    translations: state.database[activeGroup.language].translations
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

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)
