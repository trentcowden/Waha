import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text ***REMOVED*** from 'react-native';
import { Ionicons, MaterialCommunityIcons ***REMOVED*** from '@expo/vector-icons';

function HeaderButtons(props) {
   var secondButton;
   if (props.hasCompleteButton) {
      secondButton =
         <TouchableOpacity
            style={styles.headerButton***REMOVED***
            onPress={props.completeOnPress***REMOVED***
         >
            <Ionicons
               name={props.completeCondition ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"***REMOVED***
               size={30***REMOVED***
               color='white'
            />
         </TouchableOpacity>
   ***REMOVED*** else {
      secondButton = null
   ***REMOVED***
   return (
      <View style={styles.headerButtonsContainer***REMOVED***>
         <TouchableOpacity
            style={styles.headerButton***REMOVED***
            onPress={props.onPress1***REMOVED***
         >
            <Ionicons
               name={props.name***REMOVED***
               size={30***REMOVED***
               color="white"
            />
         </TouchableOpacity>
         {secondButton***REMOVED***
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   headerButtonsContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
   ***REMOVED***,
   headerButton: {
      alignItems: "center",
      marginHorizontal: 10
   ***REMOVED***
***REMOVED***)

export default HeaderButtons