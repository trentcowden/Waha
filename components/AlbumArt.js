// import SvgUri from 'expo-svg-uri'
import React from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { gutterSize, isTablet, scaleMultiplier } from '../constants'
import { getLanguageInfo } from '../languages'
import {
  activeDatabaseSelector,
  activeGroupSelector
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import SVG from './SVG'

function mapStateToProps (state) {
  return {
    activeGroup: activeGroupSelector(state),
    activeDatabase: activeDatabaseSelector(state),

    isDark: state.settings.isDarkModeEnabled,

    t: activeDatabaseSelector(state).translations,
    isRTL: getLanguageInfo(activeGroupSelector(state).language).isRTL
  }
}

/**
 * A component that shows the album art for a lesson as well as the text on either side of it in a swipable carousel.
 * @param {string} iconName - The name of the icon associated with the set this lesson is a part of.
 * @param {Function} playHandler - Plays/pauses a lesson. Needed because the user can tap on the album art pane to play/pause the lesson.
 * @param {number} playFeedbackOpacity - Opacity for the play/pause animation feedback that appears whenever the lesson is played or paused.
 * @param {number} playFeedbackZIndex - Z-index for the play/pause animation feedback that appears whenever the lesson is played or paused.
 * @param {boolean} isMediaPlaying - Whether the current media (audio or video) is currently playing.
 */
const AlbumArt = ({
  // Props passed from a parent component.
  iconName,
  playHandler,
  playFeedbackOpacity,
  playFeedbackZIndex,
  isMediaPlaying,
  // Props passed from redux.
  activeGroup,
  activeDatabase,
  isDark,
  t,
  isRTL
}) => (
  <View
    style={[
      styles.albumArtContainer,
      {
        backgroundColor: isDark ? colors(isDark).icons : colors(isDark).bg2,
        // borderWidth: isDark ? 5 : 0,
        borderColor: colors(isDark).icons,
        maxWidth: isTablet
          ? Dimensions.get('window').width * 0.7
          : Dimensions.get('window').width - gutterSize * 2,
        maxHeight: isTablet
          ? Dimensions.get('window').width * 0.7
          : Dimensions.get('window').width - gutterSize * 2
      }
    ]}
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
              outputRange: [2, 1]
            })
          }
        ],
        zIndex: playFeedbackZIndex
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
    aspectRatio: 1
  },
  touchableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: '100%',
    height: '100%'
  }
})

export default connect(mapStateToProps)(AlbumArt)
