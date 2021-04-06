import React from 'react'
import { Dimensions, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { colors ***REMOVED*** from '../../styles/colors'
import { StandardTypography ***REMOVED*** from '../../styles/typography'

const KeyLabel = ({ backgroundColor, style, number ***REMOVED***) => {
  // RENDER

  return (
    <View style={[styles.circle, { backgroundColor: backgroundColor ***REMOVED***, style]***REMOVED***>
      <Text
        style={StandardTypography(
          { font: 'Roboto' ***REMOVED***,
          'h2',
          'Bold',
          'center',
          colors.shark
        )***REMOVED***
      >
        {number***REMOVED***
      </Text>
    </View>
  )
***REMOVED***

// STYLES

const styles = StyleSheet.create({
  circle: {
    width: Dimensions.get('window').width / 12,
    height: Dimensions.get('window').width / 12,
    borderRadius: Dimensions.get('window').width / 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    zIndex: 3,
    marginBottom: 10
  ***REMOVED***
***REMOVED***)

export default KeyLabel
