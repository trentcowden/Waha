import React from 'react'
import { Dimensions, Image, StyleSheet, View ***REMOVED*** from 'react-native'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'

function SplashScreen (props) {
  return (
    <View style={styles.screen***REMOVED***>
      <Image
        source={require('../assets/splash.png')***REMOVED***
        style={{
          resizeMode: 'contain',
          width: Dimensions.get('window').width - 100 * scaleMultiplier
        ***REMOVED******REMOVED***
      />
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e43c44'
  ***REMOVED***,
  loadingMessageText: {
    color: colors.shark,
    textAlign: 'center',
    fontSize: 30,
    padding: 10
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
    backgroundColor: colors.shark,
    borderRadius: 5
  ***REMOVED***,
  buttonTitle: {
    textAlign: 'center',
    fontSize: 24 * scaleMultiplier,
    color: colors.white
  ***REMOVED***
***REMOVED***)

export default SplashScreen
