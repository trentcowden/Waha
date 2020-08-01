import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
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
                fontFamily: props.font ? props.font + '-medium' : null,
                color: props.color,
                fontWeight: props.font ? null : 'bold'
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
                fontFamily: props.font ? props.font + '-medium' : null,
                color: colors.white,
                textAlign: 'center',
                fontWeight: props.font ? null : 'bold'
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
                fontFamily: props.font ? props.font + '-medium' : null,
                fontWeight: props.font ? null : 'bold'
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
    marginVertical: 20 * scaleMultiplier,
    height: 55 * scaleMultiplier,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row'
  ***REMOVED***,
  buttonText: {
    textAlign: 'center',
    fontSize: 18 * scaleMultiplier,
    flex: 1
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
