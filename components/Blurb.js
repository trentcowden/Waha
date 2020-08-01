import React from 'react'
import { Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'

function Blurb (props) {
  return (
    <View style={{ width: '100%', padding: 20 * scaleMultiplier ***REMOVED******REMOVED***>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14 * scaleMultiplier,
          fontFamily: props.font + '-regular',
          color: colors.shark
        ***REMOVED******REMOVED***
      >
        {props.text***REMOVED***
      </Text>
    </View>
  )
***REMOVED***

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(Blurb)
