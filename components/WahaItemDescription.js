import React from 'react'
import { Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'

function WahaItemDescription (props) {
  return (
    <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 5 ***REMOVED******REMOVED***>
      <Text
        style={{
          fontFamily: props.font + '-regular',
          fontSize: 14 * scaleMultiplier,
          color: colors.chateau
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

export default connect(mapStateToProps)(WahaItemDescription)
