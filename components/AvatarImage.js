import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image ***REMOVED*** from 'react-native'
import { scaleMultiplier ***REMOVED*** from '../constants'
import Icon from '../assets/fonts/icons'

function AvatarImage (props) {
  //// RENDER

  // render camer icon conditionally because we only want it to show when we can change the image
  // note: can only change image on add group screen or edit group screen
  var cameraIcon = props.isChangeable ? (
    <View
      style={{
        width: 40 * scaleMultiplier,
        height: 40 * scaleMultiplier,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -10
      ***REMOVED******REMOVED***
    >
      <Icon name='camera' size={35 * scaleMultiplier***REMOVED*** color='#FF0800' />
    </View>
  ) : null

  // render the image conditionally because if no source is provided, we want to use the
  // default image (the group icon)
  var avatarImage =
    props.source === '' ? (
      <Icon name='group' size={(props.size / 2) * scaleMultiplier***REMOVED*** />
    ) : (
      <Image
        style={{
          ...styles.avatarContainer,
          ...{
            width: props.size * scaleMultiplier,
            height: props.size * scaleMultiplier,
            borderRadius: (props.size * scaleMultiplier) / 2
          ***REMOVED***
        ***REMOVED******REMOVED***
        source={{ uri: props.source ***REMOVED******REMOVED***
      />
    )

  // if we have something for props.onPress, make it touchable, otherwise make it
  // not touchable
  return props.onPress ? (
    <TouchableOpacity
      style={{
        borderColor: props.isActive ? '#2D9CDB' : null,
        borderWidth: props.isActive ? 5 : null,
        width: props.size * scaleMultiplier + 5,
        height: props.size * scaleMultiplier + 5,
        borderRadius: (props.size * scaleMultiplier) / 2 + 5,
        alignItems: 'center',
        justifyContent: 'center'
      ***REMOVED******REMOVED***
      source={{ uri: props.source ***REMOVED******REMOVED***
      onPress={props.onPress***REMOVED***
    >
      <View
        style={{
          ...styles.avatarContainer,
          ...{
            width: props.size * scaleMultiplier,
            height: props.size * scaleMultiplier,
            borderRadius: (props.size * scaleMultiplier) / 2
          ***REMOVED***
        ***REMOVED******REMOVED***
      >
        {avatarImage***REMOVED***
      </View>
      <View
        style={{
          marginTop: props.isChangeable ? -30 : 0,
          width: '100%'
        ***REMOVED******REMOVED***
      >
        {cameraIcon***REMOVED***
      </View>
    </TouchableOpacity>
  ) : (
    <View
      style={{
        borderColor: props.isActive ? '#2D9CDB' : null,
        borderWidth: props.isActive ? 5 : null,
        width: props.size * scaleMultiplier + 5,
        height: props.size * scaleMultiplier + 5,
        borderRadius: (props.size * scaleMultiplier) / 2 + 5,
        alignItems: 'center',
        justifyContent: 'center'
      ***REMOVED******REMOVED***
      source={{ uri: props.source ***REMOVED******REMOVED***
      onPress={props.onPress***REMOVED***
    >
      <View
        style={{
          ...styles.avatarContainer,
          ...{
            width: props.size * scaleMultiplier,
            height: props.size * scaleMultiplier,
            borderRadius: (props.size * scaleMultiplier) / 2
          ***REMOVED***
        ***REMOVED******REMOVED***
      >
        {avatarImage***REMOVED***
      </View>
      <View
        style={{
          marginTop: props.isChangeable ? -30 : 0,
          width: '100%'
        ***REMOVED******REMOVED***
      >
        {cameraIcon***REMOVED***
      </View>
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: '#DEE3E9',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

export default AvatarImage
