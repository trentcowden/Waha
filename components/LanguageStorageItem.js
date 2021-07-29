import * as FileSystem from 'expo-file-system'
import { t } from 'i18n-js'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { scaleMultiplier } from '../constants'
import { info } from '../languages'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import WahaButton from './WahaButton'
import WahaSeparator from './WahaSeparator'

function mapStateToProps (state) {
  return {
    isDark: state.settings.isDarkModeEnabled,
    isRTL: info(activeGroupSelector(state).language).isRTL,

    activeGroup: activeGroupSelector(state)
  }
}

/**
 * A list item used to display a language and the amount of storage all of its downloaded lessons take up. Used on the StorageScreen.
 * @param {string} languageName - The name of the language.
 * @param {string} languageID - The ID of the language.
 * @param {number} megabytes - The number of megabytes this language's downloaded lessons take up.
 * @param {Function} clearDownloads - Function that clears all of the downloaded lessons for this language.
 */
const LanguageStorageItem = ({
  // Props passed from a parent component.
  languageName,
  languageID,
  megabytes,
  clearDownloads,
  // Props passed from redux.
  isRTL,
  isDark,
  activeGroup
}) => {
  return (
    <View style={styles.languageStorageItemContainer}>
      <View
        style={[
          styles.languageStorageHeaderContainer,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3
          }
        ]}
      >
        <Text
          style={type(
            activeGroup.language,
            'h3',
            'Regular',
            'left',
            colors(isDark).secondaryText
          )}
        >
          {languageName}
        </Text>
        <Image
          style={styles.languageLogo}
          source={{
            uri: isDark
              ? FileSystem.documentDirectory + languageID + '-header-dark.png'
              : FileSystem.documentDirectory + languageID + '-header.png'
          }}
        />
      </View>
      <WahaSeparator />
      <View
        style={[
          styles.mainAreaContainer,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4
          }
        ]}
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
          {`${megabytes} ${t('storage.megabyte')}`}
        </Text>
        <Text
          style={[
            type(
              activeGroup.language,
              'h3',
              'Regular',
              'left',
              colors(isDark).icons
            ),
            {
              flex: 1,
              paddingHorizontal: 20
            }
          ]}
        >
          {t('storage.storage_used')}
        </Text>
        <WahaButton
          mode='outline'
          color={colors(isDark).error}
          label={t('general.clear')}
          width={92 * scaleMultiplier}
          onPress={clearDownloads}
          style={{ height: 45 * scaleMultiplier }}
          textStyle={{
            fontFamily: info(activeGroup.language).font + '-Regular'
          }}
        />
      </View>
      <WahaSeparator />
    </View>
  )
}

const styles = StyleSheet.create({
  languageStorageItemContainer: {
    width: '100%'
  },
  languageStorageHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 40 * scaleMultiplier,
    paddingHorizontal: 20
  },
  languageLogo: {
    resizeMode: 'contain',
    width: 120 * scaleMultiplier,
    height: 16.8 * scaleMultiplier
  },
  mainAreaContainer: {
    width: '100%',
    height: 80 * scaleMultiplier,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  }
})

export default connect(mapStateToProps)(LanguageStorageItem)
