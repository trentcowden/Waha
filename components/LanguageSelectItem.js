import React, { useEffect ***REMOVED*** from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image ***REMOVED*** from 'react-native'
import { scaleMultiplier, languageT2S ***REMOVED*** from '../constants'
import * as FileSystem from 'expo-file-system'

function LanguageSelectItem (props) {
  // FUNCTIONS

  iconComponent = props.isSelected ? (
    <View>
      <Icon name='check' size={30***REMOVED*** color='#60C239' />
    </View>
  ) : (
    <TouchableOpacity onPress={props.playAudio***REMOVED***>
      <Icon name='volume' size={30***REMOVED*** color='black' />
    </TouchableOpacity>
  )

  return (
    <View
      style={{
        height: 70 * scaleMultiplier,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#EFF2F4',
        backgroundColor: props.isSelected ? '#BFE5AF' : '#FFFFFF'
      ***REMOVED******REMOVED***
    >
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
              fontSize: 18 * scaleMultiplier,
              fontWeight: 'bold',
              textAlign: 'left'
            ***REMOVED******REMOVED***
          >
            {props.nativeName***REMOVED***
          </Text>
          <Text
            style={{
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
      {iconComponent***REMOVED***
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
