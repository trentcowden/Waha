import React from 'react'
import { StyleSheet, Text, TouchableOpacity ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'

function WahaButton (props) {
  switch (props.type) {
    case 'outline':
      return (
        <TouchableOpacity
          style={[
            {
              width: props.width
            ***REMOVED***,
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
              styles.buttonText,
              {
                textAlign: props.isRTL ? 'right' : 'left',
                fontFamily: props.font + '-medium',
                color: props.color
              ***REMOVED***,
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
              styles.buttonText,
              {
                textAlign: props.isRTL ? 'right' : 'left',
                fontFamily: props.font + '-medium',
                color: colors.white
              ***REMOVED***,
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
              width: props.width
            ***REMOVED***,
            { borderWidth: 2, borderColor: colors.chateau ***REMOVED***,
            props.style
          ]***REMOVED***
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: 14 * scaleMultiplier,
                color: colors.chateau,
                textAlign: props.isRTL ? 'right' : 'left',
                fontFamily: props.font + '-medium'
              ***REMOVED***,
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
    marginVertical: 20,
    height: 55 * scaleMultiplier,
    justifyContent: 'center',
    paddingHorizontal: 15,
    alignItems: 'center'
  ***REMOVED***,
  buttonText: {
    textAlign: 'center',
    fontSize: 18 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: state.database[activeGroup.language].font,
    isRTL: state.database[activeGroup.language].isRTL
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(WahaButton)
