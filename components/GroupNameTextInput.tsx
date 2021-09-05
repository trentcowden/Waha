import React, { FC, ReactElement, RefObject } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { AGProps, CommonProps, TProps } from 'redux/common'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps, TProps {
  // The current inputted group name for the group name text input.
  groupNameInput: string
  onGroupNameInputChangeText: (text: string) => void
  groupNameInputRef?: RefObject<TextInput>
  // Whether the inputted group name is a duplicate of another existing group.
  isDuplicate?: boolean
}

/**
 * Component that renders a form and allows the user to type in a Group name.
 */
const GroupNameTextInput: FC<Props> = ({
  groupNameInput,
  onGroupNameInputChangeText,
  groupNameInputRef = null,
  isDuplicate = false,
  activeGroup,
  isRTL,
  isDark,
  t,
}): ReactElement => {
  return (
    <View style={styles.groupNameAreaContainer}>
      <Text
        style={type(
          activeGroup.language,
          'p',
          'Regular',
          'left',
          colors(isDark).secondaryText
        )}
      >
        {t.groups.group_name}
      </Text>
      <View
        style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <TextInput
          ref={groupNameInputRef}
          style={{
            ...styles.groupNameTextInputContainer,
            backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
            borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
            ...type(
              activeGroup.language,
              'h3',
              'Regular',
              'left',
              colors(isDark).text
            ),
          }}
          onChangeText={(text) => onGroupNameInputChangeText(text)}
          value={groupNameInput}
          autoCapitalize='words'
          autoCorrect={false}
          placeholder={t.groups.group_name_here}
          placeholderTextColor={colors(isDark).disabled}
          maxLength={50}
          returnKeyType='done'
        />
        {isDuplicate && (
          <View
            style={{
              width: 50 * scaleMultiplier,
              height: 50 * scaleMultiplier,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon
              name='cancel'
              color={colors(isDark).error}
              size={45 * scaleMultiplier}
            />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  groupNameAreaContainer: {
    width: '100%',
    paddingHorizontal: 20,
    maxWidth: 500,
  },
  groupNameTextInputContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    height: 50 * scaleMultiplier,
    fontSize: 18 * scaleMultiplier,
    marginTop: 5,
    alignItems: 'center',
    flex: 1,
  },
})

export default GroupNameTextInput
