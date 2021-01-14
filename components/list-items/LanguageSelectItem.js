import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { colors, getSystemIsRTL, scaleMultiplier ***REMOVED*** from '../../constants'
import { SystemTypography ***REMOVED*** from '../../styles/typography'

function LanguageSelectItem ({
  // passed from parent
  nativeName,
  localeName,
  font,
  logoSource,
  onPress,
  isSelected,
  playAudio
***REMOVED***) {
  // FUNCTIONS
  var iconComponent = isSelected ? (
    <View style={{ marginHorizontal: 20 ***REMOVED******REMOVED***>
      <Icon name='check' size={30***REMOVED*** color={colors.apple***REMOVED*** />
    </View>
  ) : (
    <TouchableOpacity
      onPress={playAudio***REMOVED***
      style={{
        height: '100%',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
      ***REMOVED******REMOVED***
    >
      <Icon name='volume' size={30***REMOVED*** color={colors.tuna***REMOVED*** />
    </TouchableOpacity>
  )

  return (
    <View
      style={{
        height: 80 * scaleMultiplier,
        // aspectRatio: 5,
        width: '100%',
        flexDirection: getSystemIsRTL() ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isSelected ? '#BFE5AF' : colors.white
      ***REMOVED******REMOVED***
    >
      {iconComponent***REMOVED***
      <TouchableOpacity
        style={{
          flex: 1,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: getSystemIsRTL() ? 'row-reverse' : 'row'
        ***REMOVED******REMOVED***
        onPress={onPress***REMOVED***
      >
        <View
          style={{
            justifyContent: 'center',
            flex: 1
          ***REMOVED******REMOVED***
        >
          <Text
            style={SystemTypography(
              false,
              'h3',
              'Bold',
              'left',
              colors.shark,
              font
            )***REMOVED***
          >
            {nativeName***REMOVED***
          </Text>
          <Text
            style={SystemTypography(
              false,
              'p',
              'Regular',
              'left',
              colors.shark
            )***REMOVED***
          >
            {localeName***REMOVED***
          </Text>
        </View>
        <Image
          style={styles.headerImage***REMOVED***
          source={{
            uri: logoSource
          ***REMOVED******REMOVED***
        />
      </TouchableOpacity>
    </View>
  )
***REMOVED***

// STYLES

const styles = StyleSheet.create({
  headerImage: {
    resizeMode: 'contain',
    width: 120 * scaleMultiplier,
    height: 16.8 * scaleMultiplier,
    marginHorizontal: 20
  ***REMOVED***
***REMOVED***)

export default LanguageSelectItem
