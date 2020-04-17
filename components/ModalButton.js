import React from 'react';
import { TouchableOpacity, StyleSheet, Text ***REMOVED*** from 'react-native';
import { scaleMultiplier ***REMOVED*** from '../constants'

function ModalButton(props) {

   //// RETURN

   return (
      <TouchableOpacity
         style={styles.modalButtonStyle***REMOVED***
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
      height: 60 * scaleMultiplier,
      justifyContent: "center"
   ***REMOVED***,
   text: {
      textAlign: "center",
      fontFamily: 'medium',
      fontSize: 21 * scaleMultiplier
   ***REMOVED***
***REMOVED***)

export default ModalButton