import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image ***REMOVED*** from 'react-native';
import { MaterialIcons ***REMOVED*** from '@expo/vector-icons';
import { scaleMultiplier ***REMOVED*** from '../constants'

function AvatarImage(props) {

   var avatarImage = (props.source === '') ?
      <MaterialIcons name='group' size={props.size / 2 * scaleMultiplier***REMOVED*** /> :
      <Image style={{...styles.avatarContainer, 
         ...{
            width: props.size * scaleMultiplier, 
            height: props.size * scaleMultiplier, 
            borderRadius: props.size * scaleMultiplier / 2
         ***REMOVED******REMOVED******REMOVED*** source={{ uri: props.source ***REMOVED******REMOVED*** />

   return (
      <View style={{
         borderColor: props.isActive ? '#2D9CDB' : null,
         borderWidth: props.isActive ? 5 : null,
         width: props.size * scaleMultiplier + 5, 
         height: props.size * scaleMultiplier + 5,
         borderRadius: props.size * scaleMultiplier / 2 + 5,
         alignItems: "center",
         justifyContent: "center",
         marginHorizontal: 10,
         ***REMOVED******REMOVED***
      >
      <TouchableOpacity style={{...styles.avatarContainer, 
         ...{
            width: props.size * scaleMultiplier, 
            height: props.size * scaleMultiplier, 
            borderRadius: props.size * scaleMultiplier / 2,
            
         ***REMOVED******REMOVED******REMOVED*** source={{ uri: props.source ***REMOVED******REMOVED*** onPress={props.onPress***REMOVED***>
         {avatarImage***REMOVED***
      </TouchableOpacity>
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   avatarContainer: {
      backgroundColor: '#a5a8ad',
      justifyContent: "center",
      alignItems: "center",
   ***REMOVED***, 
***REMOVED***)

export default AvatarImage