import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'

function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    font: getLanguageFont(activeGroupSelector(state).language),
    activeGroup: activeGroupSelector(state)
  ***REMOVED***
***REMOVED***

/**
 * A pressable item used in Waha's navigation drawer.
 * @param {function***REMOVED*** props.onPress - The function to call when the user presses the drawer item.
 * @param {string***REMOVED*** props.icon - The name of the icon to display on the drawer item.
 * @param {string***REMOVED*** props.label - The label to display on the drawer item.
 */
function DrawerItem ({
  // Props passed from a parent component.
  onPress,
  icon,
  label,
  // Props passed from redux.
  isRTL,
  font,
  activeGroup
***REMOVED***) {
  return (
    <TouchableOpacity
      style={[
        styles.drawerItemContainer,
        { flexDirection: isRTL ? 'row-reverse' : 'row' ***REMOVED***
      ]***REMOVED***
      onPress={onPress***REMOVED***
    >
      <View style={styles.iconContainer***REMOVED***>
        <Icon name={icon***REMOVED*** size={30 * scaleMultiplier***REMOVED*** color={colors.tuna***REMOVED*** />
      </View>
      <Text
        style={[
          StandardTypography(
            { font, isRTL ***REMOVED***,
            'h3',
            'Bold',
            'left',
            colors.shark
          ),
          { paddingHorizontal: 10 ***REMOVED***
        ]***REMOVED***
      >
        {label***REMOVED***
      </Text>
    </TouchableOpacity>
  )
***REMOVED***

const styles = StyleSheet.create({
  drawerItemContainer: {
    height: 50 * scaleMultiplier,
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

export default connect(mapStateToProps)(DrawerItem)
