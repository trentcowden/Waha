import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../../constants'
import { StandardTypography ***REMOVED*** from '../../styles/typography'

// renders a simple touchable item within the main navigation drawer
function DrawerItem (props) {
  // RENDER

  return (
    <TouchableOpacity
      style={[
        styles.settingsItem,
        { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
      ]***REMOVED***
      onPress={props.onPress***REMOVED***
    >
      <View style={styles.iconContainer***REMOVED***>
        <Icon
          name={props.iconName***REMOVED***
          size={45 * scaleMultiplier***REMOVED***
          color={colors.tuna***REMOVED***
        />
      </View>
      <Text
        style={[
          StandardTypography(props, 'h3', 'medium', 'left', colors.shark),
          { paddingHorizontal: 10 ***REMOVED***
        ]***REMOVED***
      >
        {props.text***REMOVED***
      </Text>
    </TouchableOpacity>
  )
***REMOVED***

// STYLES

const styles = StyleSheet.create({
  settingsItem: {
    height: 55 * scaleMultiplier,
    // aspectRatio: 5.5,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  ***REMOVED***,
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50 * scaleMultiplier
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

export default connect(mapStateToProps)(DrawerItem)
