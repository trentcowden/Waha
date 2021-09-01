import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import { getSystemIsRTL, scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { SystemTypography } from '../styles/typography'

/**
 * A pressable item used to display a language instance on the LanguageSelectScreen.
 * @param {string} nativeName - The name of the langauge in its native script, e.g. Español.
 * @param {string} localeName - The name of the language in the current phone language, e.g. Spanish.
 * @param {string} font - The font to display the text in. Either the font for the system language or the font from the active language. See typography.js for more info.
 * @param {string} logoSource - The URL for the logo for this language instance.
 * @param {Function} onPress - Function to fire when the user presses the item.
 * @param {boolean} isSelected - Whether this language instance is selected or not.
 * @param {Function} playAudio - Function that plays audio of the name of the language.
 */
const LanguageItem = ({
  // Props passed from a parent component.
  nativeName,
  localeName,
  font,
  logoSource,
  onPress,
  isSelected,
  playAudio,
  versions = null
}) => {
  const [isRTL, setIsRTL] = useState(getSystemIsRTL())
  return (
    <View
      style={[
        styles.languageItemContainer,
        {
          backgroundColor: isSelected ? '#BFE5AF' : colors.white,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          height:
            versions !== null
              ? 80 * scaleMultiplier +
                (versions.length - 1) * 20 * scaleMultiplier
              : 80 * scaleMultiplier
        }
      ]}
    >
      {/* The icon component is either a check mark if the language item is selected or a touchable volume icon which plays the name of the language if the language item isn't selected. */}
      {isSelected ? (
        <View style={{ marginHorizontal: 20 }}>
          <Icon name='check' size={30} color={colors.apple} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={playAudio}
          style={{
            height: '100%',
            width: 70,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Icon name='volume' size={30} color={colors.tuna} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[
          styles.touchableAreaContainer,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }
        ]}
        onPress={onPress}
      >
        <View style={styles.namesContainer}>
          <Text
            style={SystemTypography(
              false,
              'h3',
              'Bold',
              'left',
              colors.shark,
              font
            )}
          >
            {nativeName}
          </Text>
          <Text
            style={SystemTypography(
              false,
              'p',
              'Regular',
              'left',
              colors.shark
            )}
          >
            {localeName}
          </Text>
        </View>
        <View>
          {versions !== null ? (
            versions.map((version, index) => (
              <Image
                key={index}
                style={styles.headerImage}
                source={{ uri: version.logoSource }}
              />
            ))
          ) : (
            <Image style={styles.headerImage} source={{ uri: logoSource }} />
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
    alignItems: 'center'
  },
  touchableAreaContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  namesContainer: {
    justifyContent: 'center',
    flex: 1
  },
  headerImage: {
    resizeMode: 'contain',
    marginVertical: 10,
    width: 120 * scaleMultiplier,
    height: 16.8 * scaleMultiplier,
    marginHorizontal: 20
  }
})

export default LanguageItem
