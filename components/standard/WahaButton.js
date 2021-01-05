import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../../constants'
import { StandardTypography, SystemTypography ***REMOVED*** from '../../styles/typography'

function WahaButton (props) {
  switch (props.type) {
    case 'outline':
      return (
        <TouchableOpacity
          style={[
            { width: props.width ***REMOVED***,
            styles.buttonContainer,
            {
              borderWidth: 2,
              borderColor: props.color
            ***REMOVED***,
            props.style
          ]***REMOVED***
          onPress={props.onPress***REMOVED***
        >
          <Text
            style={[
              props.useDefaultFont
                ? SystemTypography(false, 'h3', 'medium', 'center', props.color)
                : StandardTypography(
                    props,
                    'h3',
                    'medium',
                    'center',
                    props.color
                  ),
              { fontWeight: props.font ? null : 'bold' ***REMOVED***,
              props.textStyle
            ]***REMOVED***
          >
            {props.label***REMOVED***
          </Text>
          {props.extraComponent***REMOVED***
        </TouchableOpacity>
      )
      break
    case 'filled':
      return (
        <TouchableOpacity
          style={[
            {
              width: props.width
            ***REMOVED***,
            styles.buttonContainer,
            {
              backgroundColor: props.color
            ***REMOVED***,
            props.style
          ]***REMOVED***
          onPress={props.onPress***REMOVED***
        >
          <Text
            style={[
              props.useDefaultFont
                ? SystemTypography(
                    false,
                    'h3',
                    'medium',
                    'center',
                    colors.white
                  )
                : StandardTypography(
                    props,
                    'h3',
                    'medium',
                    'center',
                    colors.white
                  ),
              { fontWeight: props.font ? null : 'bold' ***REMOVED***,
              props.textStyle
            ]***REMOVED***
          >
            {props.label***REMOVED***
          </Text>
          {props.extraComponent***REMOVED***
        </TouchableOpacity>
      )
      break
    case 'inactive':
      return (
        <View
          style={[
            styles.buttonContainer,
            {
              width: props.width,
              backgroundColor: props.color
            ***REMOVED***,
            props.style
          ]***REMOVED***
        >
          <Text
            style={[
              props.useDefaultFont
                ? SystemTypography(
                    false,
                    'p',
                    'medium',
                    'center',
                    colors.chateau
                  )
                : StandardTypography(
                    props,
                    'p',
                    'medium',
                    'center',
                    colors.chateau
                  ),
              props.textStyle
            ]***REMOVED***
          >
            {props.label***REMOVED***
          </Text>
          {props.extraComponent***REMOVED***
        </View>
      )
      break
  ***REMOVED***
***REMOVED***

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    marginVertical: 20 * scaleMultiplier,
    // paddingVertical: 10 * scaleMultiplier,
    height: 65 * scaleMultiplier,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return activeGroup
    ? {
        font: state.database[activeGroup.language].font,
        isRTL: state.database[activeGroup.language].isRTL
      ***REMOVED***
    : {***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(WahaButton)
