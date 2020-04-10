import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform ***REMOVED*** from 'react-native';
import { scaleMultiplier ***REMOVED*** from '../constants'

function HeaderButtons(props) {
   return (
      <View style={styles.headerButtonsContainer***REMOVED***>
         <TouchableOpacity
            onPress={props.shareOnPress***REMOVED***
         >
            <Icon
               name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'***REMOVED***
               size={32 * scaleMultiplier***REMOVED***
               color="#828282"
            />
         </TouchableOpacity>
         <TouchableOpacity
            style={{marginHorizontal: 5***REMOVED******REMOVED***
            onPress={props.completeOnPress***REMOVED***
         >
            <Icon
               name={props.completeCondition ? "check-filled" : "check-unfilled"***REMOVED***
               size={35 * scaleMultiplier***REMOVED***
               color='#828282'
            />
         </TouchableOpacity>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   headerButtonsContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
   ***REMOVED***,
   headerButton: {
      alignItems: "flex-start",
      marginHorizontal: 5,
   ***REMOVED***
***REMOVED***)

export default HeaderButtons