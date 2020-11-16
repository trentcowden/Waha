import React from 'react'
import { Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../../constants'
import { BrandTypography ***REMOVED*** from '../../styles/typography'

function Blurb (props) {
  return (
    <View style={{ width: '100%', padding: 20 * scaleMultiplier ***REMOVED******REMOVED***>
      <Text
        style={BrandTypography(props, 'p', 'regular', 'center', colors.shark)***REMOVED***
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
