// import { LinearGradient } from 'expo-linear-gradient'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scaleMultiplier } from '../constants'
import { AGProps, CommonProps } from '../interfaces/common'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  text: string
}
/**
 * A component that shows the title of a lesson on the Play Screen. Ticks across the screen if it's long and fades out at the edges of the screen.
 * @param {string} text - The text to display.
 * @param {string} backgroundColor - The color behind the Play Screen title. Important because the "fading out" at the edge of this component has to match the color behind it.
 */
const PlayScreenTitle: FC<Props> = ({
  text,
  activeGroup,
  isDark,
  isRTL,
}): ReactElement => {
  return (
    <View style={styles.titleContainer}>
      <Text
        style={{
          ...type(
            activeGroup.language,
            'h3',
            'Black',
            'center',
            colors(isDark).text
          ),
          fontSize: 21 * scaleMultiplier,
        }}
      >
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15 * scaleMultiplier,
  },
  rightGradient: {
    position: 'absolute',
    right: 0,
    width: 15,
    height: '100%',
    marginHorizontal: 10,
  },
  leftGradient: {
    position: 'absolute',
    left: 0,
    width: 15,
    height: '100%',
    marginHorizontal: 10,
  },
})

export default PlayScreenTitle
