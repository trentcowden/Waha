import { AGProps, CommonProps, TProps } from 'interfaces/common'
import React, { FC, ReactElement, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Emoji,
  groupIcons,
  groupIconSources,
} from '../assets/groupIcons/_groupIcons'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps, TProps {
  // The name of the currently selected emoji.
  emojiInput: string
  onEmojiPress: (emoji: Emoji) => void
}

/**
 * A component that shows a list of emojis available to be set for a group's avatar.
 */
const EmojiViewer: FC<Props> = ({
  emojiInput,
  onEmojiPress,
  activeGroup,
  isDark,
  t,
}): ReactElement => {
  const [emojiViewerWidth, setEmojiViewerWidth] = useState(0)

  /** Renders an emoji for the emoji select <FlatList />. */
  const renderEmoji = ({ item }: { item: Emoji }) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.emojiContainer,
          borderWidth: item === emojiInput ? 2 : 0,
          borderColor:
            item === emojiInput ? colors(isDark).highlight : undefined,
          backgroundColor:
            item === emojiInput ? colors(isDark).highlight + '38' : undefined,
        }}
        onPress={() => onEmojiPress(item)}
      >
        <Image
          style={{
            width: 40 * scaleMultiplier,
            height: 40 * scaleMultiplier,
            tintColor:
              item === 'default' && isDark ? colors(isDark).icons : undefined,
          }}
          source={groupIconSources[item]}
        />
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.emojiViewerContainer}>
      <Text
        style={{
          ...type(
            activeGroup.language,
            'p',
            'Regular',
            'left',
            colors(isDark).secondaryText
          ),
          marginTop: 20 * scaleMultiplier,
        }}
      >
        {t.groups.avatar}
      </Text>
      <View
        style={{
          ...styles.emojiListContainer,
          borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
          backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
        }}
        onLayout={({ nativeEvent }) =>
          setEmojiViewerWidth(nativeEvent.layout.width)
        }
      >
        <FlatList
          horizontal={false}
          data={groupIcons}
          nestedScrollEnabled
          renderItem={renderEmoji}
          keyExtractor={(item) => item}
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
    borderRadius: 10,
  },
  emojiViewerContainer: {
    width: '100%',
    flex: 1,
    maxHeight: 300 * scaleMultiplier,
    paddingHorizontal: 20,
    maxWidth: 500,
  },
  emojiListContainer: {
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    flex: 1,
    marginTop: 5,
  },
})

export default EmojiViewer
