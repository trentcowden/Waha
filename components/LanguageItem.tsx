import { LanguageID } from 'languages'
import React, { FC, ReactElement } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CommonProps } from 'redux/common'
import Icon from '../assets/fonts/icon_font_config'
import { getFileSource, isInOfflineMode, scaleMultiplier } from '../constants'
import { LanguageMetadata } from '../languages'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps {
  languageID: LanguageID
  // The name of the language in its native script.
  nativeName: string
  // The name of the language in the active group's language.
  localeName: string
  headers: LanguageMetadata['headers']
  versions: LanguageMetadata['versions']
  onLanguageItemPress: () => void
  isSelected: boolean
  playAudio: () => void
  // Function that plays audio of the name of the language.
  screenLanguage: LanguageID
}

/**
 * A pressable item used to display a language instance on the LanguageInstanceInstallScreen.
 */
const LanguageItem: FC<Props> = ({
  languageID,
  nativeName,
  localeName,
  isDark,
  headers,
  versions,
  onLanguageItemPress,
  isSelected,
  playAudio,
  isRTL,
  screenLanguage,
}): ReactElement => {
  return (
    <View
      style={{
        ...styles.languageItemContainer,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        backgroundColor: isSelected
          ? colors(isDark).success + '40'
          : isDark
          ? colors(isDark).bg2
          : colors(isDark).bg4,
        height:
          versions !== undefined
            ? 80 * scaleMultiplier +
              (versions.length - 1) * 20 * scaleMultiplier
            : 80 * scaleMultiplier,
      }}
    >
      {/* The icon component is either a check mark if the language item is selected or a touchable volume icon which plays the name of the language if the language item isn't selected. */}
      {isSelected ? (
        <View style={{ marginHorizontal: 20 }}>
          <Icon name='check' size={30} color={colors(isDark).success} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={playAudio}
          style={{
            height: '100%',
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name='volume' size={30} color={colors(isDark).icons} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{
          ...styles.touchableAreaContainer,
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
        onPress={onLanguageItemPress}
      >
        <View style={styles.namesContainer}>
          <Text
            style={{
              ...type(languageID, 'h3', 'Bold', 'left', colors(isDark).text),
              textAlign: isRTL ? 'right' : 'left',
            }}
          >
            {nativeName}
          </Text>
          <Text
            style={{
              ...type(
                screenLanguage,
                'p',
                'Regular',
                'left',
                colors(isDark).text
              ),
              textAlign: isRTL ? 'right' : 'left',
            }}
          >
            {localeName}
          </Text>
        </View>
        <View>
          {versions !== undefined ? (
            versions.map((version, index) => (
              <Image
                key={index}
                style={styles.headerImage}
                source={{
                  uri: isDark ? version.headers.dark : version.headers.light,
                }}
              />
            ))
          ) : (
            <Image
              style={styles.headerImage}
              source={
                isInOfflineMode
                  ? isDark
                    ? getFileSource(languageID + '-header-dark.png')
                    : getFileSource(languageID + '-header.png')
                  : { uri: isDark ? headers.dark : headers.light }
              }
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  languageItemContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchableAreaContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  namesContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  headerImage: {
    resizeMode: 'contain',
    marginVertical: 10,
    width: 120 * scaleMultiplier,
    height: 16.8 * scaleMultiplier,
    marginHorizontal: 20,
  },
})

export default LanguageItem
