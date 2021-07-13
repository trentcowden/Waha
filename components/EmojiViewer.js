import React, { useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { groupIcons, groupIconSources } from '../assets/groupIcons/_groupIcons'
import { scaleMultiplier } from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { getLanguageFont, StandardTypography } from '../styles/typography'

function mapStateToProps (state) {
  return {
    activeGroup: activeGroupSelector(state),
    activeDatabase: activeDatabaseSelector(state),
    isRTL: activeDatabaseSelector(state).isRTL,
    font: getLanguageFont(activeGroupSelector(state).language),
    isDark: state.settings.isDarkModeEnabled,

    t: activeDatabaseSelector(state).translations
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

/**
 * A component that shows a list of emojis available to be set for a group's avatar.
 * @param {string} emojiInput - The name of the currently selected emoji.
 * @param {Function} setEmojiInput - Sets the name of the currently selected emoji.
 */
const EmojiViewer = ({
  // Props passed from a parent component.
  emojiInput,
  setEmojiInput,
  // Props passed from redux.
  activeGroup,
  activeDatabase,
  isRTL,
  isDark,
  font,

  t
}) => {
  const [emojiViewerWidth, setEmojiViewerWidth] = useState(0)

  /** Renders an emoji for the emoji select <FlatList />. */
  const renderEmoji = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.emojiContainer,
          {
            borderWidth: item === emojiInput ? 2 : 0,
            borderColor: item === emojiInput ? colors(isDark).highlight : null,
            backgroundColor:
              item === emojiInput ? colors(isDark).highlight + '38' : null
          }
        ]}
        onPress={() => setEmojiInput(item)}
      >
        <Image
          style={{
            width: 40 * scaleMultiplier,
            height: 40 * scaleMultiplier,
            tintColor:
              item === 'default' && isDark ? colors(isDark).icons : null
          }}
          source={groupIconSources[item]}
        />
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.emojiViewerContainer}>
      <Text
        style={[
          StandardTypography(
            { font, isRTL },
            'p',
            'Regular',
            'left',
            colors(isDark).disabled
          ),
          { marginTop: 20 * scaleMultiplier }
        ]}
      >
        {t.groups && t.groups.avatar}
      </Text>
      <View
        style={[
          styles.emojiListContainer,
          {
            borderColor: colors(isDark).bg2,
            backgroundColor: colors(isDark).bg4
          }
        ]}
        onLayout={({ nativeEvent }) =>
          setEmojiViewerWidth(nativeEvent.layout.width)
        }
      >
        <FlatList
          horizontal={false}
          data={groupIcons}
          nestedScrollEnabled
          renderItem={renderEmoji}
          keyExtractor={item => item}
          numColumns={Math.floor(
            (emojiViewerWidth - 50) / (50 * scaleMultiplier)
          )}
          key={Math.floor((emojiViewerWidth - 50) / (50 * scaleMultiplier))}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  emojiContainer: {
    width: 50 * scaleMultiplier,
    height: 50 * scaleMultiplier,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 10
  },
  emojiViewerContainer: {
    width: '100%',
    flex: 1,
    maxHeight: 300 * scaleMultiplier,
    paddingHorizontal: 20,
    maxWidth: 500
  },
  emojiListContainer: {
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    flex: 1,
    marginTop: 5
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EmojiViewer)
