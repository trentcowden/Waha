import React from 'react'
import { Image, StyleSheet, View ***REMOVED*** from 'react-native'
import { colors, scaleMultiplier ***REMOVED*** from '../../constants'
import Separator from '../standard/Separator'

function Hero ({
  // passed from parent
  source
***REMOVED***) {
  return (
    <View style={{ width: '100%' ***REMOVED******REMOVED***>
      <Separator />
      <View style={styles.topPortion***REMOVED***>
        <Image style={styles.topImage***REMOVED*** source={source***REMOVED*** />
      </View>
      <Separator />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  topPortion: {
    backgroundColor: colors.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  topImage: {
    resizeMode: 'contain',
    height: 170 * scaleMultiplier,
    alignSelf: 'center'
  ***REMOVED***
***REMOVED***)

export default Hero
