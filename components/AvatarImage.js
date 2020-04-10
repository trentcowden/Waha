import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image ***REMOVED*** from 'react-native';
import { scaleMultiplier ***REMOVED*** from '../constants'
import Icon from '../assets/fonts/icons'

function AvatarImage(props) {

   var cameraIcon = props.isChangeable ?
      <View style={{
         width: 40 * scaleMultiplier,
         height: 40 * scaleMultiplier,
         alignSelf: 'flex-start',
         alignItems: 'center',
         justifyContent: 'center',
         marginLeft: -10
      ***REMOVED******REMOVED***>
         <Icon name='camera' size={35 * scaleMultiplier***REMOVED*** color='#FF0800' />
      </View> : null

   var avatarImage = (props.source === '') ?
      <Icon name='group' size={props.size / 2 * scaleMultiplier***REMOVED*** /> :
      <Image style={{
         ...styles.avatarContainer,
         ...{
            width: props.size * scaleMultiplier,
            height: props.size * scaleMultiplier,
            borderRadius: props.size * scaleMultiplier / 2
         ***REMOVED***
      ***REMOVED******REMOVED*** source={{ uri: props.source ***REMOVED******REMOVED*** />

   return (
      <View>
         <View style={{
            borderColor: props.isActive ? '#2D9CDB' : null,
            borderWidth: props.isActive ? 5 : null,
            width: props.size * scaleMultiplier + 5,
            height: props.size * scaleMultiplier + 5,
            borderRadius: props.size * scaleMultiplier / 2 + 5,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
            marginBottom: props.isChangeable ? -30 : null,
            marginLeft: props.isChangeable ? -5 : null
         ***REMOVED******REMOVED***
         >
            <TouchableOpacity style={{
               ...styles.avatarContainer,
               ...{
                  width: props.size * scaleMultiplier,
                  height: props.size * scaleMultiplier,
                  borderRadius: props.size * scaleMultiplier / 2,
               ***REMOVED***
            ***REMOVED******REMOVED*** source={{ uri: props.source ***REMOVED******REMOVED*** onPress={props.onPress***REMOVED***>
               {avatarImage***REMOVED***
            </TouchableOpacity>
         </View>
         {cameraIcon***REMOVED***
      </View>
   )
***REMOVED***

const styles = StyleSheet.create({
   avatarContainer: {
      backgroundColor: '#DEE3E9',
      justifyContent: "center",
      alignItems: "center",
   ***REMOVED***,
***REMOVED***)

export default AvatarImage