import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Text ***REMOVED*** from 'react-native'
import { scaleMultiplier, groupIcons, groupIconSources ***REMOVED*** from '../constants'
import Icon from '../assets/fonts/icons'

function AvatarImage (props) {
  //// RENDER

  // render camer icon conditionally because we only want it to show when we can change the image
  // note: can only change image on add group screen or edit group screen

  // render the image conditionally because if no source is provided, we want to use the
  // default image (the group icon)
  // var avatarImage =
  //   props.source === '' ? (
  //     <Icon name='group' size={(props.size / 2) * scaleMultiplier***REMOVED*** />
  //   ) : (
  //     <Image
  //       style={{
  //         ...styles.avatarContainer,
  //         ...{
  //           width: props.size * scaleMultiplier,
  //           height: props.size * scaleMultiplier,
  //           borderRadius: (props.size * scaleMultiplier) / 2
  //         ***REMOVED***
  //       ***REMOVED******REMOVED***
  //       source={{ uri: props.source ***REMOVED******REMOVED***
  //     />
  //   )

  var emoji =
    props.emoji === 'default' ? (
      <Icon
        name='group'
        size={(props.size / 2) * scaleMultiplier***REMOVED***
        color='#3A3C3F'
      />
    ) : (
      <View
        style={{
          width: props.size * 0.65 * scaleMultiplier,
          height: props.size * 0.65 * scaleMultiplier,
          justifyContent: 'center',
          alignItems: 'center'
        ***REMOVED******REMOVED***
      >
        <Image
          style={{
            width: props.size * 0.65 * scaleMultiplier,
            height: props.size * 0.65 * scaleMultiplier
          ***REMOVED******REMOVED***
          source={groupIconSources[props.emoji]***REMOVED***
        />
      </View>
    )

  // if we have something for props.onPress, make it touchable, otherwise
  // make it not touchable
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
      onPress={props.onPress***REMOVED***
    >
      <View
        style={{
          width: props.size * scaleMultiplier,
          height: props.size * scaleMultiplier,
          borderRadius: (props.size * scaleMultiplier) / 2,
          backgroundColor: '#DEE3E9',
          alignItems: 'center',
          justifyContent: 'center'
          // paddingTop: 5
        ***REMOVED******REMOVED***
      >
        {emoji***REMOVED***
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
          width: props.size * scaleMultiplier,
          height: props.size * scaleMultiplier,
          borderRadius: (props.size * scaleMultiplier) / 2,
          backgroundColor: '#DEE3E9',
          justifyContent: 'center',
          alignItems: 'center'
        ***REMOVED******REMOVED***
      >
        {emoji***REMOVED***
      </View>
    </View>
  )
***REMOVED***

export default AvatarImage
