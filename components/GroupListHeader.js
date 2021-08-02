import * as FileSystem from 'expo-file-system'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

/**
 * The header for the groups section list used on the Groups screen. Displays the name of the language and the language instance's logo.
 * @param {string} languageName - The name of the language.
 * @param {string} languageID - The ID for the language instance.
 * @param {boolean} isEditing - Whether the Groups screen is in editing mode or not.
 */
const GroupListHeader = ({
  // Props passed from a parent component.
  nativeName,
  languageID,
  isEditing,
  isRTL,
  t,
  isDark,
  groups,
  activeGroup,
  deleteLanguageInstance
}) => {
  /** Keeps track of the animated position of the left icon, in this case the trash can icon. */
  const [leftIconXPos, setLeftIconXPos] = useState(
    new Animated.Value(
      isRTL ? 25 * scaleMultiplier + 20 : -25 * scaleMultiplier - 20
    )
  )

  /** useEffect function used to update the animated value of the left icon position. The default value must update whenever isRTL changes.*/
  useEffect(() => {
    if (activeGroup.language !== languageID)
      setLeftIconXPos(
        new Animated.Value(
          isRTL ? 25 * scaleMultiplier + 20 : -25 * scaleMultiplier - 20
        )
      )
  }, [activeGroup, isRTL])

  /** Animated the position of the trash icon whenever isEditing changes. This pushes the whole component over to the right. */
  useEffect(() => {
    if (isEditing && activeGroup.language !== languageID) {
      Animated.spring(leftIconXPos, {
        toValue: 0
      }).start()
    } else if (!isEditing) {
      Animated.spring(leftIconXPos, {
        toValue: isRTL ? 25 * scaleMultiplier + 20 : -25 * scaleMultiplier - 20
      }).start()
    }
  }, [activeGroup, isEditing])

  // The trash button shows up next to the name of the language in editing mode only. Only language instance's that don't contain the currently active group have this button.
  if (!(activeGroup.language === languageID))
    var trashButtonComponent = (
      <TouchableOpacity
        style={styles.trashButtonContainer}
        onPress={() =>
          Alert.alert(
            t.groups.delete_language_title,
            t.groups.delete_language_message,
            [
              {
                text: t.general.cancel,
                onPress: () => {},
                style: 'cancel'
              },
              {
                text: t.general.ok,
                onPress: () => deleteLanguageInstance(languageID),
                style: 'destructive'
              }
            ]
          )
        }
      >
        <Icon
          name='trash'
          size={25 * scaleMultiplier}
          color={colors(isDark).error}
        />
      </TouchableOpacity>
    )
  // For the language instance that contains the active group, render an empty view for this button so the layout still lines up.
  else if (activeGroup.language === languageID)
    var trashButtonComponent = <View style={styles.trashButtonContainer} />

  return (
    <View
      style={{
        ...styles.groupListHeaderContainer,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3
      }}
    >
      <Animated.View
        style={{
          transform: [{ translateX: leftIconXPos }],
          flexDirection: isRTL ? 'row-reverse' : 'row',
          flex: 1,
          height: '100%',
          alignItems: 'center'
        }}
      >
        {trashButtonComponent}
        <Text
          style={{
            ...type(
              languageID,
              'h3',
              'Regular',
              'left',
              colors(isDark).secondaryText
            ),
            textAlign: isRTL ? 'right' : 'left',
            flex: 1
          }}
        >
          {nativeName}
        </Text>
      </Animated.View>
      <Image
        style={styles.languageLogoImage}
        source={{
          uri: isDark
            ? FileSystem.documentDirectory + languageID + '-header-dark.png'
            : FileSystem.documentDirectory + languageID + '-header.png'
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  groupListHeaderContainer: {
    alignItems: 'center',
    // width: '100%',
    height: 40 * scaleMultiplier
  },
  languageLogoImage: {
    resizeMode: 'contain',
    width: 120 * scaleMultiplier,
    height: 16.8 * scaleMultiplier,
    marginHorizontal: 20
  },
  trashButtonContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24 * scaleMultiplier
  }
})

export default GroupListHeader
