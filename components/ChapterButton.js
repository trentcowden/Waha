import React from 'react'
import { StyleSheet, Text, TouchableOpacity ***REMOVED*** from 'react-native'
import { AnimatedCircularProgress ***REMOVED*** from 'react-native-circular-progress'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import { StandardTypography ***REMOVED*** from '../styles/typography'

function ChapterButton (props) {
  // styles for the different modes

  const buttonStyles = {
    active: {
      backgroundColor: props.primaryColor,
      borderColor: props.primaryColor
    ***REMOVED***,
    inactive: {
      borderColor: props.primaryColor,
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
    active: StandardTypography(props, 'p', 'black', 'center', colors.white),
    inactive: StandardTypography(
      props,
      'p',
      'black',
      'center',
      props.primaryColor
    ),
    downloading: StandardTypography(
      props,
      'p',
      'black',
      'center',
      colors.chateau
    ),
    disabled: StandardTypography(props, 'p', 'black', 'center', colors.chateau)
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
    if (props.activeNumber > props.number) return 'check-filled'
    else if (props.mode === 'active') return iconNamesOutline[props.number]
    else return iconNamesFilled[props.number]
  ***REMOVED***

  return (
    <TouchableOpacity
      style={[styles.chapterButton, buttonStyles[props.mode]]***REMOVED***
      // no onPress if button is disabled
      onPress={
        props.mode === 'disabled' || props.mode === 'downloading'
          ? () => {***REMOVED***
          : () => props.onPress(props.name)
      ***REMOVED***
      activeOpacity={
        props.mode === 'disabled' || props.mode === 'downloading' ? 1 : 0.2
      ***REMOVED***
    >
      {props.mode === 'downloading' ? (
        <AnimatedCircularProgress
          size={22 * scaleMultiplier***REMOVED***
          width={4***REMOVED***
          fill={props.downloadProgress * 100***REMOVED***
          tintColor={props.primaryColor***REMOVED***
          rotation={0***REMOVED***
          backgroundColor={colors.white***REMOVED***
          padding={4***REMOVED***
        />
      ) : (
        <Icon
          name={props.mode === 'disabled' ? 'cloud-slash' : getNumberIcon()***REMOVED***
          size={25 * scaleMultiplier***REMOVED***
          color={
            props.mode === 'disabled'
              ? colors.chateau
              : props.mode === 'active'
              ? colors.white
              : props.primaryColor
          ***REMOVED***
        />
      )***REMOVED***
      <Text style={textStyles[props.mode]***REMOVED***>
        {props.translations.play[props.name]***REMOVED***
      </Text>
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

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: state.database[activeGroup.language].font,
    primaryColor: state.database[activeGroup.language].primaryColor,
    translations: state.database[activeGroup.language].translations
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(ChapterButton)
