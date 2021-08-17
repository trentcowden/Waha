import * as FileSystem from 'expo-file-system'
import { AGProps, CommonProps, TProps } from 'interfaces/common'
import { LanguageID } from 'languages'
import React, { FC, ReactElement } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { scaleMultiplier } from '../constants'
import { WahaButtonMode } from '../interfaces/components'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import WahaButton from './WahaButton'
import WahaSeparator from './WahaSeparator'

interface Props extends CommonProps, TProps, AGProps {
  // The name of the language in its native script.
  nativeName: string
  languageID: LanguageID
  // The number of megabytes this language's downloaded lessons take up.
  megabytes: number
  onClearLanguageDownloadsButtonPress: () => void
}

/**
 * A list item used to display a language and the amount of storage all of its downloaded lessons take up. Used on the StorageScreen.
 * @param {string} languageName - The name of the language.
 * @param {string} languageID - The ID of the language.
 * @param {number} megabytes -
 * @param {Function} clearDownloads - Function that clears all of the downloaded lessons for this language.
 */
const LanguageStorageItem: FC<Props> = ({
  nativeName,
  languageID,
  megabytes,
  onClearLanguageDownloadsButtonPress,
  isRTL,
  isDark,
  t,
  activeGroup,
}): ReactElement => {
  return (
    <View style={styles.languageStorageItemContainer}>
      <View
        style={{
          ...styles.languageStorageHeaderContainer,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
        }}
      >
        <Text
          style={type(
            languageID,
            'h3',
            'Regular',
            'left',
            colors(isDark).secondaryText
          )}
        >
          {nativeName}
        </Text>
        <Image
          style={styles.languageLogo}
          source={{
            uri: isDark
              ? FileSystem.documentDirectory + languageID + '-header-dark.png'
              : FileSystem.documentDirectory + languageID + '-header.png',
          }}
        />
      </View>
      <WahaSeparator isDark={isDark} />
      <View
        style={{
          ...styles.mainAreaContainer,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
        }}
      >
        <Text
          style={type(
            activeGroup.language,
            'h3',
            'Bold',
            'left',
            colors(isDark).icons
          )}
        >
          {`${megabytes} ${t.storage.megabyte}`}
        </Text>
        <Text
          style={{
            ...type(
              activeGroup.language,
              'h3',
              'Regular',
              'left',
              colors(isDark).icons
            ),
            flex: 1,
            paddingHorizontal: 20,
          }}
        >
          {t.storage.storage_used}
        </Text>
        <WahaButton
          mode={WahaButtonMode.ERROR_SECONDARY}
          label={t.general.clear}
          onPress={onClearLanguageDownloadsButtonPress}
          extraContainerStyles={{
            width: 92 * scaleMultiplier,
            height: 45 * scaleMultiplier,
          }}
          extraLabelStyles={{ fontSize: 14 * scaleMultiplier }}
          isDark={isDark}
          isRTL={isRTL}
          screenLanguage={activeGroup.language}
        />
      </View>
      <WahaSeparator isDark={isDark} />
    </View>
  )
}

const styles = StyleSheet.create({
  languageStorageItemContainer: {
    width: '100%',
  },
  languageStorageHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 40 * scaleMultiplier,
    paddingHorizontal: 20,
  },
  languageLogo: {
    resizeMode: 'contain',
    width: 120 * scaleMultiplier,
    height: 16.8 * scaleMultiplier,
  },
  mainAreaContainer: {
    width: '100%',
    height: 80 * scaleMultiplier,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
})

export default LanguageStorageItem
