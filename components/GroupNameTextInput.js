import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import { scaleMultiplier } from '../constants'
import { getLanguageInfo } from '../languages'
import {
  activeDatabaseSelector,
  activeGroupSelector
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { StandardTypography } from '../styles/typography'

function mapStateToProps (state) {
  return {
    activeGroup: activeGroupSelector(state),
    activeDatabase: activeDatabaseSelector(state),
    isRTL: getLanguageInfo(activeGroupSelector(state).language).isRTL,

    isDark: state.settings.isDarkModeEnabled,

    t: activeDatabaseSelector(state).translations
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

/**
 *
 */
const GroupNameTextInput = ({
  // Props passed from a parent component.
  groupNameInput,
  setGroupNameInput,
  groupNameInputRef = null,
  isDuplicate = false,
  // Props passed from redux.
  activeGroup,
  activeDatabase,
  isRTL,
  isDark,
  t
}) => {
  return (
    <View style={styles.groupNameAreaContainer}>
      <Text
        style={StandardTypography(
          activeGroup.language,
          'p',
          'Regular',
          'left',
          colors(isDark).secondaryText
        )}
      >
        {t.groups && t.groups.group_name}
      </Text>
      <View
        style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
          width: '100%',
          alignItems: 'center'
        }}
      >
        <TextInput
          ref={groupNameInputRef}
          style={[
            styles.groupNameTextInputContainer,
            {
              backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
              borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1
            },
            StandardTypography(
              activeGroup.language,
              'h3',
              'Regular',
              'left',
              colors(isDark).text
            )
          ]}
          onChangeText={text => setGroupNameInput(text)}
          value={groupNameInput}
          autoCapitalize='words'
          autoCorrect={false}
          placeholder={t.groups && t.groups.group_name_here}
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
              alignItems: 'center'
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
    maxWidth: 500
  },
  groupNameTextInputContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    height: 50 * scaleMultiplier,
    fontSize: 18 * scaleMultiplier,
    marginTop: 5,
    alignItems: 'center',
    flex: 1
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupNameTextInput)
