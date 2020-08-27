//basic imports
import React from 'react'
import { Animated, StyleSheet, View ***REMOVED*** from 'react-native'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'

function SwipeBar (props) {
  return (
    <View
      style={[
        styles.scrollBarContainer,
        { alignSelf: props.side === 'right' ? 'flex-end' : 'flex-start' ***REMOVED***
      ]***REMOVED***
    >
      <Animated.View style={[styles.scrollBar, { opacity: props.opacity ***REMOVED***]***REMOVED*** />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  scrollBarContainer: {
    height: '100%',
    width: 24,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    marginLeft: -4
  ***REMOVED***,
  scrollBar: {
    width: 4,
    height: 75 * scaleMultiplier,
    backgroundColor: colors.chateau,
    borderRadius: 10
  ***REMOVED***
***REMOVED***)

export default SwipeBar
