import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text ***REMOVED*** from 'react-native';
import { Ionicons, MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';

function BackButton(props) {
   return (
         <TouchableOpacity
            style={[styles.backButtonContainer, {justifyContent: props.isRTL ? 'flex-end' : 'flex-start'***REMOVED***]***REMOVED***
            onPress={props.onPress***REMOVED***
         >
            <Ionicons
               name={props.isRTL ? 'ios-arrow-forward' : 'ios-arrow-back'***REMOVED***
               size={30***REMOVED***
               color="#828282"
            />
         </TouchableOpacity>
   )
***REMOVED***

const styles = StyleSheet.create({
   backButtonContainer: {
      flexDirection: "row",
      marginHorizontal: 10,
      width: 100,
   ***REMOVED***
***REMOVED***)

export default BackButton