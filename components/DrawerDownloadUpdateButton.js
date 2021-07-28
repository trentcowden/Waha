import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { scaleMultiplier } from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

function mapStateToProps (state) {
  return {
    activeGroup: activeGroupSelector(state),
    activeDatabase: activeDatabaseSelector(state),
    t: activeDatabaseSelector(state).translations,
    isRTL: getLanguageInfo(activeGroupSelector(state).language).isRTL,

    isDark: state.settings.isDarkModeEnabled,

    isConnected: state.network.isConnected,
    languageCoreFilesToUpdate: state.database.languageCoreFilesToUpdate
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

/**
 * Button that prompts the user to download new language core files should they be available/needed.
 * @param {Function} updateHandler - Handles the updating of language core files.
 */
const DrawerDownloadUpdateButton = ({
  // Props passed from a parent component.
  updateHandler,
  // Props passed from redux.
  activeGroup,
  activeDatabase,
  t,
  isRTL,
  isDark,
  isConnected,
  languageCoreFilesToUpdate
}) => (
  <TouchableOpacity
    style={styles.drawerDownloadUpdateButtonContainer}
    onPress={() => {
      Alert.alert(
        t.general && t.general.download_update_title,
        t.general && t.general.download_update_message,
        [
          {
            text: t.general && t.general.cancel,
            onPress: () => {},
            style: 'cancel'
          },
          {
            text: t.general && t.general.ok,
            onPress: updateHandler
          }
        ]
      )
    }}
    activeOpacity={isConnected ? 0.2 : 1}
  >
    <View
      style={[
        styles.innerContainer,
        {
          backgroundColor: isConnected
            ? colors(isDark).success
            : colors(isDark).bg1,
          flexDirection: isRTL ? 'row' : 'row-reverse',
          borderBottomColor: isConnected
            ? colors(isDark).successShadow
            : colors(isDark).bg1Shadow
        }
      ]}
    >
      <Text
        style={[
          { paddingHorizontal: 10 },
          type(
            activeGroup.language,
            'h3',
            'Bold',
            'center',
            isConnected ? colors(isDark).textOnColor : colors(isDark).disabled
          )
        ]}
      >
        {t.general && t.general.download_update}
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
)

const styles = StyleSheet.create({
  drawerDownloadUpdateButtonContainer: {
    overflow: 'hidden',
    borderRadius: 15,
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 0
    // height: 50 * scaleMultiplier
  },
  innerContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 4,
    paddingHorizontal: 5,
    paddingVertical: 10 * scaleMultiplier
  },
  iconContainer: {
    width: 50 * scaleMultiplier,
    alignItems: 'center'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerDownloadUpdateButton)
