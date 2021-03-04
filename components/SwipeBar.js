//basic imports
import React from 'react'
import { Animated, StyleSheet, View ***REMOVED*** from 'react-native'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { colors ***REMOVED*** from '../styles/colors'

function SwipeBar ({ opacity, side ***REMOVED***) {
  return (
    <View
      style={[
        styles.swipeBarContainer,
        { alignSelf: side === 'right' ? 'flex-start' : 'flex-end' ***REMOVED***
      ]***REMOVED***
    >
      <Animated.View style={[styles.swipeBar, { opacity: opacity ***REMOVED***]***REMOVED*** />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  swipeBarContainer: {
    height: '100%',
    width: 24,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    marginLeft: -4
  ***REMOVED***,
  swipeBar: {
    width: 4,
    height: 75 * scaleMultiplier,
    backgroundColor: colors.chateau,
    borderRadius: 10
  ***REMOVED***
***REMOVED***)

export default SwipeBar
