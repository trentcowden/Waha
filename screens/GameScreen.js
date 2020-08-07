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
import { setIsMuted ***REMOVED*** from '../redux/actions/securityActions'

function GameScreen (props) {
  //// STATE

  const [pattern, setPattern] = useState('')
  const [isMuted, setIsMuted] = useState(false)

  //// CONSTRUCTOR

  useEffect(() => {
    console.log(pattern)
    if (pattern.includes(props.security.code)) {
      var note = new Audio.Sound()
      note
        .loadAsync(require('../assets/notes/Success.mp3'))
        .then(() => note.playAsync())
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'SetsRoot' ***REMOVED***]
      ***REMOVED***)
    ***REMOVED***
  ***REMOVED***, [pattern])

  //// RENDER

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
          style={{
            fontFamily: props.font + '-medium',
            paddingHorizontal: 10,
            fontSize: 32 * scaleMultiplier
          ***REMOVED******REMOVED***
        >
          {props.translations.security.game_screen_title***REMOVED***
        </Text>
      </View>
      <View>
        <Piano setPattern={setPattern***REMOVED*** isMuted={props.security.isMuted***REMOVED*** />
        <View
          style={{
            width: Dimensions.get('window').width,
            alignItems: 'flex-end'
          ***REMOVED******REMOVED***
        >
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

//// STYLES

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
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)
