import React from 'react'
import { StyleSheet, Text, TouchableOpacity ***REMOVED*** from 'react-native'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    font: getLanguageFont(activeGroupSelector(state).language),
    activeGroup: activeGroupSelector(state),
    primaryColor: activeDatabaseSelector(state).primaryColor,
    translations: activeDatabaseSelector(state).translations,
    isRTL: activeDatabaseSelector(state).isRTL
  ***REMOVED***
***REMOVED***

function ChapterButton ({
  // Props passed from a parent component.
  name,
  mode,
  number,
  activeNumber,
  onPress,
  downloadProgress,
  // Props passed from redux.
  font,
  activeGroup,
  primaryColor,
  translations,
  isRTL
***REMOVED***) {
  // styles for the different modes

  const buttonStyles = {
    active: {
      backgroundColor: primaryColor,
      borderColor: primaryColor
    ***REMOVED***,
    inactive: {
      borderColor: primaryColor,
      backgroundColor: colors.athens
    ***REMOVED***,
    downloading: {
      borderColor: colors.chateau,
      backgroundColor: colors.athens
    ***REMOVED***,
    disabled: {
      borderColor: colors.chateau,
      backgroundColor: colors.athens
    ***REMOVED***
  ***REMOVED***

  const textStyles = {
    active: StandardTypography(
      { font, isRTL ***REMOVED***,
      'p',
      'Black',
      'center',
      colors.white
    ),
    inactive: StandardTypography(
      { font, isRTL ***REMOVED***,
      'p',
      'Black',
      'center',
      primaryColor
    ),
    downloading: StandardTypography(
      { font, isRTL ***REMOVED***,
      'p',
      'Black',
      'center',
      colors.chateau
    ),
    disabled: StandardTypography(
      { font, isRTL ***REMOVED***,
      'p',
      'Black',
      'center',
      colors.chateau
    )
  ***REMOVED***

  // get the icon name depending on the mode/if this button is active or not
  function getNumberIcon () {
    const iconNamesOutline = {
      1: 'number-1-outline',
      2: 'number-2-outline',
      3: 'number-3-outline',
      4: 'number-4-outline'
    ***REMOVED***
    const iconNamesFilled = {
      1: 'number-1-filled',
      2: 'number-2-filled',
      3: 'number-3-filled',
      4: 'number-4-filled'
    ***REMOVED***
    if (activeNumber > number) return 'check-filled'
    else if (mode === 'active') return iconNamesOutline[number]
    else return iconNamesFilled[number]
  ***REMOVED***

  return (
    <TouchableOpacity
      style={[styles.chapterButton, buttonStyles[mode]]***REMOVED***
      // no onPress if button is disabled
      onPress={
        mode === 'disabled' || mode === 'downloading'
          ? () => {***REMOVED***
          : () => onPress(name)
      ***REMOVED***
      activeOpacity={mode === 'disabled' || mode === 'downloading' ? 1 : 0.2***REMOVED***
    >
      {mode === 'downloading' ? (
        <AnimatedCircularProgress
          size={22 * scaleMultiplier***REMOVED***
          width={4***REMOVED***
          fill={downloadProgress * 100***REMOVED***
          tintColor={primaryColor***REMOVED***
          rotation={0***REMOVED***
          backgroundColor={colors.white***REMOVED***
          padding={4***REMOVED***
        />
      ) : (
        <Icon
          name={mode === 'disabled' ? 'cloud-slash' : getNumberIcon()***REMOVED***
          size={25 * scaleMultiplier***REMOVED***
          color={
            mode === 'disabled'
              ? colors.chateau
              : mode === 'active'
              ? colors.white
              : primaryColor
          ***REMOVED***
        />
      )***REMOVED***
      <Text style={textStyles[mode]***REMOVED***>{translations.play[name]***REMOVED***</Text>
    </TouchableOpacity>
  )
***REMOVED***

const styles = StyleSheet.create({
  chapterButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 62 * scaleMultiplier,
    justifyContent: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(ChapterButton)
