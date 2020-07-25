import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
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
          size={50 * scaleMultiplier***REMOVED***
          color={colors.tuna***REMOVED***
        />
      </View>
      <Text
        style={[
          styles.title,
          {
            color: colors.shark,
            textAlign: props.isRTL ? 'right' : 'left',
            fontFamily: props.font + '-medium'
          ***REMOVED***
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
    height: 57 * scaleMultiplier,
    paddingLeft: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  ***REMOVED***,
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50 * scaleMultiplier
  ***REMOVED***,
  title: {
    color: colors.tuna,
    fontSize: 18 * scaleMultiplier,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    textAlign: 'center'
  ***REMOVED***
***REMOVED***)

//// REDUX

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
