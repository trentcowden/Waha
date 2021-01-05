import React from 'react'
import { Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../../constants'
import { StandardTypography ***REMOVED*** from '../../styles/typography'

function WahaItemDescription (props) {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 20 * scaleMultiplier,
        flexDirection: props.isRTL ? 'row-reverse' : 'row'
      ***REMOVED******REMOVED***
    >
      <Text
        style={StandardTypography(props, 'p', 'regular', 'left', colors.oslo)***REMOVED***
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
    font: state.database[activeGroup.language].font,
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(WahaItemDescription)
