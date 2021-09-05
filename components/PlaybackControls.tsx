import React, { FC, ReactElement } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import { isTablet, scaleMultiplier } from '../constants'
import { AGProps, CommonProps } from '../redux/common'
import { Group } from '../redux/reducers/groups'
import { colors } from '../styles/colors'

interface Props extends CommonProps, AGProps {
  isMediaPlaying: boolean
  isMediaLoaded: boolean
  playHandler: () => void
  mediaProgress: number
  playFromLocation: (value: number) => void
  isDark: boolean
  activeGroup: Group
}

/**
 * A component that shows the play/pause and skip buttons on the Play Screen.
 */
const PlaybackControls: FC<Props> = ({
  isMediaPlaying,
  isMediaLoaded,
  playHandler,
  mediaProgress,
  playFromLocation,
  isDark,
  activeGroup,
}): ReactElement => (
  <View style={styles.playbackControlsContainer}>
    <TouchableOpacity
      style={styles.skipButtonContainer}
      // Skip back five seconds.
      onPress={() => playFromLocation(mediaProgress - 5000)}
    >
      <Icon
        name='skip-back-5'
        size={isTablet ? 89 * scaleMultiplier : 69 * scaleMultiplier}
        color={colors(isDark).icons}
      />
    </TouchableOpacity>
    {isMediaLoaded ? (
      <TouchableOpacity
        style={{
          ...styles.playButtonContainer,
          width: isTablet ? 130 * scaleMultiplier : 100 * scaleMultiplier,
          height: isTablet ? 130 * scaleMultiplier : 100 * scaleMultiplier,
        }}
        onPress={playHandler}
      >
        <Icon
          name={isMediaPlaying ? 'pause' : 'play'}
          size={isTablet ? 130 * scaleMultiplier : 100 * scaleMultiplier}
          color={colors(isDark, activeGroup.language).accent}
        />
      </TouchableOpacity>
    ) : (
      // Show a spinning activity indicator if the media is loading.
      <View
        style={{
          ...styles.playButtonContainer,
          width: isTablet ? 130 * scaleMultiplier : 100 * scaleMultiplier,
          height: isTablet ? 130 * scaleMultiplier : 100 * scaleMultiplier,
        }}
      >
        <ActivityIndicator size='large' color={colors(isDark).text} />
      </View>
    )}
    <TouchableOpacity
      style={styles.skipButtonContainer}
      // Skip forward five seconds.
      onPress={() => playFromLocation(mediaProgress + 5000)}
    >
      <Icon
        name='skip-forward-5'
        size={isTablet ? 89 * scaleMultiplier : 69 * scaleMultiplier}
        color={colors(isDark).icons}
      />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  playbackControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: -15,
  },
  playButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default PlaybackControls
