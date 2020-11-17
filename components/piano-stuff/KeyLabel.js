import React from 'react'
import { Dimensions, StyleSheet, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors ***REMOVED*** from '../../constants'
import { BrandTypography ***REMOVED*** from '../../styles/typography'
function KeyLabel (props) {
  // RENDER

  return (
    <View
      style={[
        styles.circle,
        { backgroundColor: props.backgroundColor ***REMOVED***,
        props.style
      ]***REMOVED***
    >
      <Text
        style={BrandTypography(
          { font: 'roboto' ***REMOVED***,
          'h2',
          'medium',
          'center',
          colors.shark
        )***REMOVED***
      >
        {props.number***REMOVED***
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

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    isRTL: state.database[activeGroup.language].isRTL,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(KeyLabel)
