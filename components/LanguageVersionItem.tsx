import { LanguageID, LanguageMetadata } from 'languages'
import React, { FC, ReactElement } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { CommonProps } from 'redux/common'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

// The following should use the attributes from the Language Version, not its parent Language.
interface Props extends CommonProps {
  languageID: LanguageID
  headers: LanguageMetadata['headers']
  brandName: string
  note: string
  isSelected: boolean
  onPress: () => void
  playAudio: () => void
}

/**
 * Component that shows a specific version available for a Language.
 */
const LanguageVersionItem: FC<Props> = ({
  languageID,
  headers,
  brandName,
  note,
  isSelected,
  onPress,
  playAudio,
  isDark,
  isRTL,
}): ReactElement => (
  <TouchableOpacity
    style={[
      styles.languageVersionItemContainer,
      {
        backgroundColor: isSelected
          ? colors(isDark).success + '40'
          : isDark
          ? colors(isDark).bg2
          : colors(isDark).bg4,
        flexDirection: isRTL ? 'row-reverse' : 'row',
      },
    ]}
    onPress={onPress}
  >
    <View style={styles.mainAreaContainer}>
      <Image
        style={styles.headerImage}
        source={{ uri: isDark ? headers.dark : headers.light }}
      />
      <View
        style={[
          styles.brandNameContainer,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row',
          },
        ]}
      >
        <TouchableOpacity
          onPress={playAudio}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name='volume' size={30} color={colors(isDark).icons} />
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <Text
          style={type(languageID, 'h2', 'Bold', 'left', colors(isDark).text)}
        >
          {brandName}
        </Text>
      </View>
      <View
        style={{
          ...styles.noteContainer,
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
      >
        <View>
          <Icon name='info' size={30} color={colors(isDark).icons} />
        </View>
        <View style={{ width: 10 }} />
        <Text
          style={{
            ...type(languageID, 'h4', 'Regular', 'left', colors(isDark).text),
            flex: 1,
            textAlign: isRTL ? 'right' : 'left',
          }}
        >
          {note}
        </Text>
      </View>
    </View>
    <View
      style={{
        position: 'absolute',
        right: 10,
      }}
    >
      {isSelected ? (
        <Icon name='check' size={30} color={colors(isDark).success} />
      ) : (
        <View />
      )}
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  languageVersionItemContainer: {
    width: Dimensions.get('window').width - 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 20 * scaleMultiplier,
    paddingHorizontal: 20,
  },
  mainAreaContainer: {
    flex: 1,
    height: '100%',
  },
  brandNameContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 5 * scaleMultiplier,
  },
  noteContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 5 * scaleMultiplier,
  },
  headerImage: {
    resizeMode: 'contain',
    marginVertical: 10,
    width: Dimensions.get('window').width - 80,
    height: (Dimensions.get('window').width - 80) * 0.14,
  },
})

export default LanguageVersionItem
