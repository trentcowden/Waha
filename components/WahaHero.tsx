import LottieView from 'lottie-react-native'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { CommonProps } from 'redux/common'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import WahaSeparator from './WahaSeparator'

interface Props extends CommonProps {
  source: string
}

/**
 * A component that displays a full-width image. Used to display gifs on the Mobilization Tools and Security Mode screens.
 */
const WahaHero: FC<Props> = ({ source, isDark }): ReactElement => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
        alignItems: 'center',
      }}
    >
      <WahaSeparator isDark={isDark} />
      <View style={styles.imageContainer}>
        <LottieView style={styles.heroImage} autoPlay loop source={source} />
      </View>
      <WahaSeparator isDark={isDark} />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    maxWidth: 600 * scaleMultiplier,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '80%',
    alignSelf: 'center',
  },
})

export default WahaHero
