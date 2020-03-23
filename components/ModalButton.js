import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text ***REMOVED*** from 'react-native';

function ModalButton(props) {
    return (
        <TouchableOpacity 
            style={styles.modalButtonStyle***REMOVED***
            onPress={props.onPress***REMOVED***
        >
            <Text style={{...styles.text, ...props.style***REMOVED******REMOVED***>{props.title***REMOVED***</Text>
        </TouchableOpacity>
    )
***REMOVED***

const styles = StyleSheet.create({
    modalButtonStyle: {
      width: "100%",
      height: 60,
      justifyContent: "center"
    ***REMOVED***,
    text: {
        textAlign: "center",
        fontFamily: 'open-sans-regular',
        fontSize: 21
    ***REMOVED***
  ***REMOVED***)

export default ModalButton