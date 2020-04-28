import React from 'react';
import { TouchableOpacity, StyleSheet, Text ***REMOVED*** from 'react-native';
import { scaleMultiplier ***REMOVED*** from '../constants'

function ModalButton(props) {

   //// RETURN

   return (
      <TouchableOpacity
         style={[styles.modalButtonStyle, {borderBottomWidth: props.isLast ? 0 : 1***REMOVED***]***REMOVED***
         onPress={props.onPress***REMOVED***
      >
         <Text style={{ ...styles.text, ...props.style ***REMOVED******REMOVED***>{props.title***REMOVED***</Text>
      </TouchableOpacity>
   )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
   modalButtonStyle: {
      width: "100%",
      height: 70 * scaleMultiplier,
      justifyContent: "center",
      borderBottomColor: "#dedede"
   ***REMOVED***,
   text: {
      textAlign: "center",
      fontFamily: 'light',
      fontSize: 19.5 * scaleMultiplier
   ***REMOVED***
***REMOVED***)

export default ModalButton