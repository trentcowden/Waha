import React from 'react'
import {
  Clipboard,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

const ShareMobilizationToolsButton = ({
  // Props passed from a parent component.
  isDark,
  t,
  activeGroup,
  setShowSnackbar
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25 * scaleMultiplier
      }}
    >
      <View style={{ justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            borderRadius: 15,
            overflow: 'hidden'
          }}
          onPress={() => {
            setShowSnackbar(true)
            setTimeout(() => setShowSnackbar(false), 1500)
            Clipboard.setString(
              `${t.mobilization_tools.share_message_1}\n${t.mobilization_tools.share_message_2}\n${t.mobilization_tools.share_message_3}\n${t.mobilization_tools.share_message_4}\n${t.mobilization_tools.share_message_5}`
            )
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              backgroundColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
              borderBottomWidth: 4,
              borderBottomColor: isDark
                ? colors(isDark).bg2
                : colors(isDark).bg1Shadow
            }}
          >
            <Text
              style={type(
                activeGroup.language,
                'h4',
                'Regular',
                'center',
                colors(isDark).text
              )}
            >
              {t.mobilization_tools.unlock_code}
            </Text>
            <Text
              style={type(
                activeGroup.language,
                'h1',
                'Bold',
                'center',
                colors(isDark).text
              )}
            >
              2 8 1 8 2 0
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: -45 * scaleMultiplier
          }}
          onPress={() =>
            Share.share({
              message: `${t.mobilization_tools.share_message_1}\n${t.mobilization_tools.share_message_2}\n${t.mobilization_tools.share_message_3}\n${t.mobilization_tools.share_message_4}\n${t.mobilization_tools.share_message_5}`
            })
          }
        >
          <Icon
            name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'}
            color={colors(isDark).icons}
            size={30 * scaleMultiplier}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  touchableAreaContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: 55 * scaleMultiplier,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  }
})

export default ShareMobilizationToolsButton
