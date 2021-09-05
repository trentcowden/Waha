import Slider from '@react-native-community/slider'
import React, { FC, MutableRefObject, ReactElement } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import TimeDisplay from '../components/TimeDisplay'
import { gutterSize, isTablet } from '../constants'
import { CommonProps } from '../redux/common'
import { colors } from '../styles/colors'

interface Props extends CommonProps {
  playFromLocation: (value: number) => void
  shouldThumbUpdate: MutableRefObject<boolean>
  mediaLength: number
  mediaProgress: number
}

/**
 * A component on the Play Screen that shows the current progress through the loaded media and allows the user to "scrub" to a different position.
 * @param {Function} playFromLocation - Function that plays the media from a specific location in milliseconds.
 * @param {boolean} shouldThumbUpdate - Whether the "thumb", or draggable circle, of the scrubber should update (i.e. "tick").
 * @param {number} mediaLength - The length of the loaded media in milliseconds.
 * @param {number} mediaProgress - The progress in milliseconds through the current media.
 */
const Scrubber: FC<Props> = ({
  playFromLocation,
  shouldThumbUpdate,
  mediaLength,
  mediaProgress,
  isDark,
  isRTL,
}): ReactElement => (
  <View
    style={{
      ...styles.scrubberContainer,
      marginTop: isTablet ? 20 : 10,
      marginBottom: isTablet ? 10 : 0,
    }}
  >
    <View style={styles.sliderContainer}>
      <Slider
        value={mediaProgress}
        onSlidingComplete={(value) => playFromLocation(value)}
        onValueChange={() => (shouldThumbUpdate.current = false)}
        minimumValue={0}
        maximumValue={mediaLength}
        step={100}
        minimumTrackTintColor={colors(isDark).icons}
        maximumTrackTintColor={
          Platform.OS === 'ios' && !isDark
            ? colors(isDark).bg1
            : colors(isDark).disabled
        }
        thumbTintColor={colors(isDark).icons}
      />
    </View>
    <View style={styles.timeInfoContainer}>
      <TimeDisplay
        time={mediaProgress}
        max={mediaLength}
        side='left'
        isDark={isDark}
        isRTL={isRTL}
      />
      <TimeDisplay
        time={mediaLength}
        max={mediaLength}
        side='right'
        isDark={isDark}
        isRTL={isRTL}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  scrubberContainer: {
    // Padding here and on timeInfoContainer are different per platform because the slider on Android has 10px of padding by default while on iOS it has 0.
    paddingHorizontal: Platform.OS === 'ios' ? gutterSize : 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  sliderContainer: {
    width: '100%',
  },
  timeInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: Platform.OS === 'ios' ? 5 : 15,
  },
})

export default Scrubber
