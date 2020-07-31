import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
function LanguageSelectItem (props) {
  // FUNCTIONS

  iconComponent = props.isSelected ? (
    <View style={{ marginHorizontal: 20 ***REMOVED******REMOVED***>
      <Icon name='check' size={30***REMOVED*** color={colors.apple***REMOVED*** />
    </View>
  ) : (
    <TouchableOpacity
      onPress={props.playAudio***REMOVED***
      style={{ marginHorizontal: 20 ***REMOVED******REMOVED***
    >
      <Icon name='volume' size={30***REMOVED*** color={colors.tuna***REMOVED*** />
    </TouchableOpacity>
  )

  return (
    <View
      style={{
        height: 80 * scaleMultiplier,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: props.isSelected ? '#BFE5AF' : colors.white
      ***REMOVED******REMOVED***
    >
      {iconComponent***REMOVED***
      <TouchableOpacity
        style={{
          flex: 1,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row'
        ***REMOVED******REMOVED***
        onPress={props.onPress***REMOVED***
      >
        <View
          style={{
            justifyContent: 'center',
            flex: 1
          ***REMOVED******REMOVED***
        >
          <Text
            style={{
              color: colors.shark,
              fontSize: 18 * scaleMultiplier,
              fontWeight: 'bold',
              textAlign: 'left'
            ***REMOVED******REMOVED***
          >
            {props.nativeName***REMOVED***
          </Text>
          <Text
            style={{
              color: colors.shark,
              fontSize: 14 * scaleMultiplier
            ***REMOVED******REMOVED***
          >
            {props.localeName***REMOVED***
          </Text>
        </View>
        <Image
          style={styles.headerImage***REMOVED***
          source={{
            uri: props.logoSource
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
    height: 40 * scaleMultiplier,
    alignSelf: 'center',
    marginHorizontal: 20
  ***REMOVED***
***REMOVED***)

export default LanguageSelectItem
