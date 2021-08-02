import LottieView from 'lottie-react-native'
import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { isTablet } from '../constants'
import { colors } from '../styles/colors'

const OnboardingImage = ({ source, imageType, isDark }) => {
  return (
    <View
      style={{
        ...styles.imageContainer,
        borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg2,
        backgroundColor:
          imageType === 'png'
            ? isDark
              ? colors(isDark).bg2
              : colors(isDark).bg4
            : null,
        maxWidth: isTablet
          ? Dimensions.get('window').width * 0.7
          : Dimensions.get('window').width - 40,
        maxHeight: isTablet
          ? Dimensions.get('window').width * 0.7
          : Dimensions.get('window').width - 40
      }}
    >
      {imageType === 'lottie' ? (
        <LottieView
          style={{
            ...styles.image,
            backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4
          }}
          autoPlay
          loop
          resizeMode='cover'
          source={source}
        />
      ) : (
        <Image
          style={{ ...styles.image, resizeMode: 'contain' }}
          source={source}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 3,
    aspectRatio: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  }
})

export default OnboardingImage
