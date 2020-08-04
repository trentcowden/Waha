import React from 'react'
import { Image, StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import Separator from '../components/Separator'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'

function Hero (props) {
  return (
    <View style={{ width: '100%' ***REMOVED******REMOVED***>
      <Separator />
      <View style={styles.topPortion***REMOVED***>
        <Image style={styles.topImage***REMOVED*** source={props.source***REMOVED*** />
      </View>
      <Separator />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  topPortion: {
    backgroundColor: colors.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  topImage: {
    resizeMode: 'contain',
    height: 170 * scaleMultiplier,
    alignSelf: 'center'
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

export default connect(mapStateToProps)(Hero)
