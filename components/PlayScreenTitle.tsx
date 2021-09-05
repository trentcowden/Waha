// import { LinearGradient } from 'expo-linear-gradient'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scaleMultiplier } from '../constants'
import { AGProps, CommonProps } from '../redux/common'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  text: string
}
/**
 * A component that shows the title of a Lesson on the <PlayScreen />.
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
})

export default PlayScreenTitle
