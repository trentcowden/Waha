import React from 'react'
import { Image, TouchableOpacity, View ***REMOVED*** from 'react-native'
import Icon from '../assets/fonts/icons'
import { groupIconSources ***REMOVED*** from '../assets/groupIcons/groupIcons'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { colors ***REMOVED*** from '../styles/colors'

// component for a group's avatar
function GroupAvatar ({
  style,
  emoji,
  size,
  onPress = null,
  isActive = false
***REMOVED***) {
  //+ RENDER

  // renders the emoji in a group icon
  // if it's default, show the standard group icon
  // otherwise, show the custom icon that's stored in the group redux
  var emoji =
    emoji === 'default' ? (
      <Icon
        name='group'
        size={(size / 1.7) * scaleMultiplier***REMOVED***
        color={colors.tuna***REMOVED***
      />
    ) : (
      <View
        style={{
          width: size * 0.65 * scaleMultiplier,
          height: size * 0.65 * scaleMultiplier,
          justifyContent: 'center',
          alignItems: 'center'
        ***REMOVED******REMOVED***
      >
        <Image
          style={{
            width: size * 0.65 * scaleMultiplier,
            height: size * 0.65 * scaleMultiplier
          ***REMOVED******REMOVED***
          source={groupIconSources[emoji]***REMOVED***
        />
      </View>
    )

  // if we have something for onPress, make the avatar image touchable
  // note: only time it's touchable is when used in the set screen header to
  //  open the drawer
  return onPress ? (
    <TouchableOpacity
      style={[
        style,
        {
          borderColor: isActive ? colors.blue : null,
          borderWidth: isActive ? 2 : null,
          width: size * scaleMultiplier + 5,
          height: size * scaleMultiplier + 5,
          borderRadius: (size * scaleMultiplier) / 2 + 5,
          alignItems: 'center',
          justifyContent: 'center'
        ***REMOVED***
      ]***REMOVED***
      onPress={onPress***REMOVED***
    >
      {emoji***REMOVED***
    </TouchableOpacity>
  ) : (
    <View
      style={[
        style,
        {
          borderColor: isActive ? colors.blue : null,
          borderWidth: isActive ? 2 : null,
          width: size * scaleMultiplier + 5,
          height: size * scaleMultiplier + 5,
          borderRadius: (size * scaleMultiplier) / 2 + 5,
          alignItems: 'center',
          justifyContent: 'center'
        ***REMOVED***
      ]***REMOVED***
      onPress={onPress***REMOVED***
    >
      {emoji***REMOVED***
    </View>
  )
***REMOVED***

export default GroupAvatar
