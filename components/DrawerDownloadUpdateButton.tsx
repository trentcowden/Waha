import { AGProps, CommonProps, NetworkProps, TProps } from 'interfaces/common'
import React, { FC, ReactElement } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps, TProps, NetworkProps {
  updateHandler: Function
  languageCoreFilesToUpdate: string[]
}

/**
 * Button that prompts the user to download new language core files should they be available/needed.
 * @param {Function} updateHandler - Handles the updating of language core files.
 */
const DrawerDownloadUpdateButton: FC<Props> = ({
  // Props passed from a parent component.
  updateHandler,
  activeGroup,
  isRTL,
  t,
  isDark,
  isConnected,
  languageCoreFilesToUpdate,
}): ReactElement => {
  return languageCoreFilesToUpdate.length !== 0 ? (
    <TouchableOpacity
      style={styles.drawerDownloadUpdateButtonContainer}
      onPress={() => {
        Alert.alert(
          t.general.download_update_title,
          t.general.download_update_message,
          [
            {
              text: t.general.cancel,
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: t.general.ok,
              onPress: () => updateHandler(),
            },
          ]
        )
      }}
      activeOpacity={isConnected ? 0.2 : 1}
    >
      <View
        style={{
          ...styles.innerContainer,
          backgroundColor: isConnected
            ? colors(isDark).success
            : colors(isDark).bg1,
          flexDirection: isRTL ? 'row' : 'row-reverse',
          borderBottomColor: isConnected
            ? colors(isDark).successShadow
            : colors(isDark).bg1Shadow,
        }}
      >
        <Text
          style={{
            ...type(
              activeGroup.language,
              'h3',
              'Bold',
              'center',
              isConnected ? colors(isDark).textOnColor : colors(isDark).disabled
            ),
            paddingHorizontal: 10,
          }}
        >
          {t.general.download_update}
        </Text>
        {isConnected ? (
          <View style={styles.iconContainer}>
            <Icon
              name='error-filled'
              size={30 * scaleMultiplier}
              color={colors(isDark).bg4}
            />
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <Icon
              name='cloud-slash'
              size={30 * scaleMultiplier}
              color={colors(isDark).disabled}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  ) : (
    <View />
  )
}

const styles = StyleSheet.create({
  drawerDownloadUpdateButtonContainer: {
    overflow: 'hidden',
    borderRadius: 15,
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 0,
  },
  innerContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 4,
    paddingHorizontal: 5,
    paddingVertical: 10 * scaleMultiplier,
  },
  iconContainer: {
    width: 50 * scaleMultiplier,
    alignItems: 'center',
  },
})

export default DrawerDownloadUpdateButton
