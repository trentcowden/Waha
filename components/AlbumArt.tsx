import React, { FC, ReactElement } from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import { gutterSize, isTablet, scaleMultiplier } from '../constants'
import { CommonProps } from '../interfaces/common'
import { colors } from '../styles/colors'
import SVG from './SVG'

interface Props extends CommonProps {
  // The name of the icon associated with the set this lesson is a part of to display as the album art.
  iconName: string
  // Plays/pauses a lesson. Needed because the user can tap on the album art pane to play/pause the lesson.
  playHandler: () => void
  // Opacity and Z-index for the play/pause animation feedback that appears whenever the lesson is played or paused.
  playFeedbackOpacity: Animated.Value
  playFeedbackZIndex: number
  isMediaPlaying: boolean
}

/**
 * A component that shows the album art for a lesson as well as the text on either side of it in a swipable carousel.
 */
const AlbumArt: FC<Props> = ({
  iconName,
  playHandler,
  playFeedbackOpacity,
  playFeedbackZIndex,
  isMediaPlaying,
  isDark,
  isRTL,
}): ReactElement => (
  <View
    style={{
      ...styles.albumArtContainer,
      backgroundColor: isDark ? colors(isDark).icons : colors(isDark).bg2,
      borderColor: colors(isDark).icons,
      maxWidth: isTablet
        ? Dimensions.get('window').width * 0.7
        : Dimensions.get('window').width - gutterSize * 2,
      maxHeight: isTablet
        ? Dimensions.get('window').width * 0.7
        : Dimensions.get('window').width - gutterSize * 2,
    }}
  >
    <TouchableHighlight
      style={styles.touchableContainer}
      onPress={playHandler}
      underlayColor={colors(isDark).bg4 + '00'}
      activeOpacity={1}
    >
      <SVG
        name={iconName}
        width='100%'
        height='100%'
        color={isDark ? colors(isDark).bg4 : colors(isDark).icons}
      />
    </TouchableHighlight>
    <Animated.View
      style={{
        position: 'absolute',
        opacity: playFeedbackOpacity,
        transform: [
          {
            scale: playFeedbackOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [2, 1],
            }),
          },
        ],
        zIndex: playFeedbackZIndex,
      }}
    >
      <Icon
        name={isMediaPlaying ? 'play' : 'pause'}
        size={100 * scaleMultiplier}
        color={isDark ? colors(isDark).text : colors(isDark).bg4}
      />
    </Animated.View>
  </View>
)

const styles = StyleSheet.create({
  albumArtContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
    aspectRatio: 1,
  },
  touchableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
})

export default AlbumArt
