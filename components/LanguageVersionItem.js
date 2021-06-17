import React from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import { getSystemIsRTL, scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { SystemTypography } from '../styles/typography'

/**
 *
 */
const LanguageVersionItem = ({
  // Props passed from a parent component.
  wahaID,
  logoSource,
  brandName,
  note,
  isSelected,
  onPress,
  playAudio,
  font
}) => (
  <TouchableOpacity
    style={[
      styles.languageVersionItemContainer,
      {
        backgroundColor: isSelected ? '#BFE5AF' : colors.white,
        flexDirection: getSystemIsRTL() ? 'row-reverse' : 'row'
        // height: 200 * scaleMultiplier
      }
    ]}
    onPress={onPress}
  >
    <View style={styles.mainAreaContainer}>
      <Image style={styles.headerImage} source={{ uri: logoSource }} />
      <View
        style={[
          styles.brandNameContainer,
          {
            flexDirection: getSystemIsRTL() ? 'row-reverse' : 'row'
          }
        ]}
      >
        <TouchableOpacity
          onPress={playAudio}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Icon name='volume' size={30} color={colors.tuna} />
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <Text
          style={[
            SystemTypography(false, 'h2', 'Bold', 'left', colors.shark, font),
            {
              flex: 1
            }
          ]}
        >
          {brandName}
        </Text>
      </View>
      <View
        style={[
          styles.noteContainer,
          {
            flexDirection: getSystemIsRTL() ? 'row-reverse' : 'row'
          }
        ]}
      >
        <View>
          <Icon name='info' size={30} color={colors.tuna} />
        </View>
        <View style={{ width: 10 }} />
        <Text
          style={[
            SystemTypography(false, 'h4', 'Regular', 'left', colors.shark),
            {
              flex: 1
            }
          ]}
        >
          {note}
        </Text>
      </View>
    </View>
    <View
      style={{
        position: 'absolute',
        right: getSystemIsRTL() ? 10 : null,
        left: getSystemIsRTL() ? null : 10,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {isSelected ? <Icon name='check' size={30} color={colors.apple} /> : null}
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
    paddingHorizontal: 20
  },
  mainAreaContainer: {
    flex: 1,
    height: '100%'
  },
  brandNameContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 5 * scaleMultiplier
  },
  noteContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 5 * scaleMultiplier
  },
  headerImage: {
    resizeMode: 'contain',
    marginVertical: 10,
    width: Dimensions.get('window').width - 80,
    height: (Dimensions.get('window').width - 80) * 0.14
  }
})

export default LanguageVersionItem
