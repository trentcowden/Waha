import * as FileSystem from 'expo-file-system'
import LottieView from 'lottie-react-native'
import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { changeActiveGroup } from '../redux/actions/activeGroupActions'
import {
  deleteLanguageData,
  setHasFetchedLanguageData,
  setHasOnboarded,
  setLanguageCoreFilesDownloadProgress,
  setTotalLanguageCoreFilesToDownload
} from '../redux/actions/databaseActions'
import { deleteGroup } from '../redux/actions/groupsActions'
import { setIsInstallingLanguageInstance } from '../redux/actions/isInstallingLanguageInstanceActions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

function mapStateToProps (state) {
  var activeGroup = state.activeGroup ? activeGroupSelector(state) : null
  var translations = state.activeGroup
    ? getTranslations(activeGroupSelector(state).language)
    : null
  return {
    languageCoreFilesDownloadProgress:
      state.database.languageCoreFilesDownloadProgress,
    totalLanguageCoreFilesToDownload:
      state.database.totalLanguageCoreFilesToDownload,
    hasInstalledFirstLanguageInstance:
      state.database.hasInstalledFirstLanguageInstance,
    storedDownloads: state.storedDownloads,
    hasFetchedLanguageData: state.database.hasFetchedLanguageData,
    actingLanguageID: state.database.actingLanguageID,
    activeGroup: activeGroup,
    groups: state.groups,
    recentActiveGroup: state.database.recentActiveGroup,
    isDark: state.settings.isDarkModeEnabled,
    t: translations,
    isConnected: state.network.isConnected
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setIsInstallingLanguageInstance: status => {
      dispatch(setIsInstallingLanguageInstance(status))
    },
    setHasOnboarded: status => {
      dispatch(setHasOnboarded(status))
    },
    setTotalLanguageCoreFilesToDownload: totalLanguageCoreFilesToDownload => {
      dispatch(
        setTotalLanguageCoreFilesToDownload(totalLanguageCoreFilesToDownload)
      )
    },
    setLanguageCoreFilesDownloadProgress: progress => {
      dispatch(setLanguageCoreFilesDownloadProgress(progress))
    },
    setHasFetchedLanguageData: hasFetchedLanguageData => {
      dispatch(setHasFetchedLanguageData(hasFetchedLanguageData))
    },
    deleteLanguageData: language => {
      dispatch(deleteLanguageData(language))
    },
    deleteGroup: groupName => dispatch(deleteGroup(groupName)),
    changeActiveGroup: groupName => dispatch(changeActiveGroup(groupName))
  }
}

/**
 * A screen that shows the download progress of a language's core files. The user sits on this screen if they finish onboarding before the downloads are done.
 */
const LoadingScreen = ({
  // Props passed from navigation.
  navigation,
  // Props passed from redux.
  languageCoreFilesDownloadProgress,
  totalLanguageCoreFilesToDownload,
  hasInstalledFirstLanguageInstance,
  storedDownloads,
  actingLanguageID,
  activeGroup,
  groups,
  recentActiveGroup,
  hasFetchedLanguageData,
  isDark,
  t,
  isConnected,
  setIsInstallingLanguageInstance,
  setHasOnboarded,
  setTotalLanguageCoreFilesToDownload,
  setLanguageCoreFilesDownloadProgress,
  setHasFetchedLanguageData,
  deleteLanguageData,
  deleteGroup,
  changeActiveGroup
}) => {
  /** Cancels the language core files downloads, does a few cleanup actions, and sends the user back to the language instance install screen. */
  const cancelDownloads = () => {
    // Set the core files download progress to 0.
    setLanguageCoreFilesDownloadProgress(0)

    // Set this to 1 to avoid strange divide by zero errors.
    setTotalLanguageCoreFilesToDownload(1)

    // Set the isInstalling and hasFetched redux states to false since we're no longer installing.
    setIsInstallingLanguageInstance(false)
    setHasFetchedLanguageData(false)

    // Cancel all of the downloads.
    storedDownloads.forEach(download =>
      download.pauseAsync().catch(() => console.log('Error pausing a download'))
    )

    // If we're adding a language for the first time, set hasOnboarded to false so that the user must go through onboarding again and reset them back to the language instance install screen.
    if (!hasInstalledFirstLanguageInstance) {
      setHasOnboarded(false)
      navigation.reset({
        index: 0,
        routes: [{ name: 'InitialLanguageInstanceInstall' }]
      })
    }

    // If this is a subsequent language instance install, if we cancel, we need to switch back to our most recent active group since we're going to delete all the groups for the language we cancelled the installation of.
    if (recentActiveGroup) changeActiveGroup(recentActiveGroup)
    // If this is the initial language instance install, set active group back to null since there should be no active group before you install your first language instance.
    else changeActiveGroup(null)

    // Delete any groups from the cancelled language.
    groups.forEach(group => {
      if (group.language === actingLanguageID) {
        deleteGroup(group.name)
      }
    })

    // Delete the language data of the cancelled language.
    deleteLanguageData(actingLanguageID)

    // Delete any files that have alreayd finished downloading for the cancelled language.
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
      contents => {
        for (const item of contents) {
          if (item.slice(0, 2) === actingLanguageID) {
            FileSystem.deleteAsync(FileSystem.documentDirectory + item)
          }
        }
      }
    )
  }

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40 * scaleMultiplier
        }}
      >
        <LottieView
          style={{
            width: Dimensions.get('window').width / 2,
            maxWidth: 300,
            marginBottom: 30
          }}
          colorFilters={[
            {
              keypath: '*',
              color: colors(isDark).brand
            }
          ]}
          autoPlay
          loop
          source={require('../assets/lotties/loading.json')}
        />
        <View
          style={{
            ...styles.progressBarContainer,
            borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
            backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4
          }}
        >
          {languageCoreFilesDownloadProgress ? (
            <View
              style={{
                ...styles.progress,
                flex: languageCoreFilesDownloadProgress,
                backgroundColor: colors(isDark).brand
              }}
            />
          ) : null}
          {languageCoreFilesDownloadProgress ? (
            <View
              style={{
                ...styles.progressToGo,
                backgroundColor: isDark
                  ? colors(isDark).bg2
                  : colors(isDark).bg4,
                flex:
                  totalLanguageCoreFilesToDownload -
                  languageCoreFilesDownloadProgress
              }}
            />
          ) : null}
        </View>
        <View style={styles.noConnectionContainer}>
          {!isConnected && (
            <Icon name='cloud-slash' color={colors(isDark).icons} size={30} />
          )}
        </View>
      </View>
      <View style={styles.cancelButtonContainer}>
        {/* Show the cancel button after the Firebase data has been fetched. */}
        {hasFetchedLanguageData && (
          <TouchableOpacity
            onPress={cancelDownloads}
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon name='cancel' color={colors(isDark).icons} size={50} />
            <Text
              style={type(
                activeGroup.language,
                'h4',
                'Bold',
                'center',
                colors(isDark).icons
              )}
            >
              {t.general.cancel}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressBarContainer: {
    width: Dimensions.get('window').width - 60,
    height: 40 * scaleMultiplier,
    borderRadius: 30,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 2
  },
  progress: {
    height: '100%',
    borderRadius: 20
  },
  progressToGo: {
    height: '100%'
  },
  noConnectionContainer: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  cancelButtonContainer: {
    width: '100%',
    height: 100,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
