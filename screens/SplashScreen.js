import React from 'react'
import { Dimensions, Image, StyleSheet, View ***REMOVED*** from 'react-native'
import { scaleMultiplier ***REMOVED*** from '../constants'

/**
 * Screen that gets navigated to whenever the app enters "background" mode on iOS. This is so the app preview is hidden in the iOS multitasking view.
 */
function SplashScreen ({***REMOVED***) {
  return (
    <View style={styles.screen***REMOVED***>
      <Image
        source={require('../assets/icons/splash.png')***REMOVED***
        style={{
          resizeMode: 'contain',
          width: Dimensions.get('window').width - 100 * scaleMultiplier
        ***REMOVED******REMOVED***
      />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E63946'
  ***REMOVED***
***REMOVED***)

export default SplashScreen
