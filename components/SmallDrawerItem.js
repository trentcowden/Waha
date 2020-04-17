import React from 'react';
import { Text, TouchableOpacity, StyleSheet ***REMOVED*** from 'react-native';
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'

function SmallDrawerItem(props) {

   //// RENDER

   return (
      <TouchableOpacity style={[styles.smallDrawerItemContainer, {flexDirection: props.isRTL ? "row-reverse" : "row"***REMOVED***]***REMOVED*** onPress={props.onPress***REMOVED***>
         <Text style={[styles.smallDrawerItemText, {textAlign: props.isRTL ? 'right' : 'left'***REMOVED***]***REMOVED***>{props.label***REMOVED***</Text>
      </TouchableOpacity>
   )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
   smallDrawerItemContainer: {
      margin: 5,
      padding: 5,
   ***REMOVED***,
   smallDrawerItemText: {
      fontFamily: 'medium',
      fontSize: 18 * scaleMultiplier,
      color: '#82868D',
   ***REMOVED***
***REMOVED***)

function mapStateToProps(state) {
   var activeGroup = state.groups.filter(item => item.name === state.activeGroup)[0];
   return {
      isRTL: state.database[activeGroup.language].isRTL,
   ***REMOVED***
***REMOVED***;

export default connect(mapStateToProps)(SmallDrawerItem);