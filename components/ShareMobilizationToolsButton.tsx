import React, { FC, ReactElement } from 'react'
import {
  Clipboard,
  Platform,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { AGProps, CommonProps, TProps } from 'redux/common'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, TProps, AGProps {
  setShowSnackbar: (toSet: boolean) => void
}

/**
 * A component that allows the user to share the Mobilization Tools either by tapping on the unlock code to copy it to their clipboard or share instructions by tapping the share button.
 */
const ShareMobilizationToolsButton: FC<Props> = ({
  isDark,
  t,
  activeGroup,
  setShowSnackbar,
}): ReactElement => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25 * scaleMultiplier,
      }}
    >
      <View style={{ justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            borderRadius: 15,
            overflow: 'hidden',
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
                : colors(isDark).bg1Shadow,
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
            right: -45 * scaleMultiplier,
          }}
          onPress={() =>
            Share.share({
              message: `${t.mobilization_tools.share_message_1}\n${t.mobilization_tools.share_message_2}\n${t.mobilization_tools.share_message_3}\n${t.mobilization_tools.share_message_4}\n${t.mobilization_tools.share_message_5}`,
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

export default ShareMobilizationToolsButton
