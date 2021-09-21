import * as WebBrowser from 'expo-web-browser'
import { LanguageID } from 'languages'
import React, { FC, ReactElement, useState } from 'react'
import {
  Clipboard,
  Platform,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import SnackBar from 'react-native-snackbar-component'
import Icon from '../assets/fonts/icon_font_config'
import InformationItem from '../components/InformationItem'
import { scaleMultiplier } from '../constants'
import { logShareApp } from '../functions/analyticsFunctions'
import { deleteLanguage, info } from '../functions/languageDataFunctions'
import CopyrightsModal from '../modals/CopyrightsModal'
import { appVersion, resetButtonMode } from '../modeSwitch'
import { selector, useAppDispatch } from '../redux/hooks'
import {
  activeGroupSelector,
  changeActiveGroup,
} from '../redux/reducers/activeGroup'
import { setAreMobilizationToolsUnlocked } from '../redux/reducers/areMobilizationToolsUnlocked'
import {
  setHasInstalledFirstLanguageInstance,
  setHasOnboarded,
} from '../redux/reducers/languageInstallation'
import {
  setHasUsedPlayScreen,
  setLessonCounter,
  setNumLessonsTilReview,
  setReviewTimeout,
  setShowTrailerHighlights,
} from '../redux/reducers/persistedPopups'
import {
  setCode,
  setIsMuted,
  setIsTimedOut,
  setSecurityEnabled,
} from '../redux/reducers/security'
import { setIsDarkModeEnabled } from '../redux/reducers/settings'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

/**
 * A screen that displays some miscellaneous information for Waha, like its version, with links to the privacy policy, donation page, and app store listing page.
 */
const InformationScreen: FC = ({}): ReactElement => {
  // Redux state/dispatch.
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const activeGroup = selector((state) => activeGroupSelector(state))
  const t = getTranslations(activeGroup.language)
  const isRTL = info(activeGroup.language).isRTL
  const database = selector((state) => state.database)
  const groups = selector((state) => state.groups)
  const dispatch = useAppDispatch()

  /** Keeps track of whether the snackbar that pops up is visible or not.  */
  const [showSnackbar, setShowSnackbar] = useState(false)

  /** Keeps track of whether the copyrights modal is visible. */
  const [showCopyrightsModal, setShowCopyrightsModal] = useState(false)

  /**
   * Opens up an in-app browser.
   */
  const openBrowser = async (url: string) =>
    await WebBrowser.openBrowserAsync(url, { dismissButtonStyle: 'close' })

  /**
   * Dev-mode only function that deletes all languages and resets the app as if it's been opened for the first time.
   */
  const handleResetButtonPress = () => {
    // Reset some redux variables.
    dispatch(setHasInstalledFirstLanguageInstance({ toSet: false }))
    dispatch(setHasOnboarded({ toSet: false }))
    dispatch(changeActiveGroup({ groupName: '' }))
    dispatch(setAreMobilizationToolsUnlocked({ toSet: false }))
    dispatch(setShowTrailerHighlights({ toSet: false }))
    dispatch(setHasUsedPlayScreen({ toSet: false }))
    dispatch(setReviewTimeout({ timeout: undefined }))
    dispatch(setLessonCounter({ counter: 0 }))
    dispatch(setNumLessonsTilReview({ numLessons: 2 }))
    dispatch(setCode({ code: undefined }))
    dispatch(setIsMuted({ toSet: false }))
    dispatch(setSecurityEnabled({ toSet: false }))
    dispatch(setIsTimedOut({ toSet: false }))
    dispatch(setIsDarkModeEnabled({ toSet: false }))

    // Delete every installed language.
    Object.keys(database).forEach((languageID) => {
      deleteLanguage(languageID as LanguageID, groups, dispatch)
    })
  }

  return (
    <SafeAreaView
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
      }}
    >
      <InformationItem
        onPress={() => openBrowser('https://waha.app/privacy-policy/')}
        label={t.information.privacy_policy}
        icon='launch'
        isRTL={isRTL}
        isDark={isDark}
        activeGroup={activeGroup}
      />
      {t.general.copyrights !== '' && (
        <InformationItem
          onPress={() =>
            openBrowser(
              'https://kingdomstrategies.givingfuel.com/general-giving'
            )
          }
          label={t.information.donate_to_waha}
          icon='launch'
          isRTL={isRTL}
          isDark={isDark}
          activeGroup={activeGroup}
        />
      )}
      <InformationItem
        onPress={
          Platform.OS === 'ios'
            ? () =>
                openBrowser(
                  'https://apps.apple.com/us/app/waha-discover-gods-story/id1530116294'
                )
            : () =>
                openBrowser(
                  'https://play.google.com/store/apps/details?id=com.kingdomstrategies.waha'
                )
        }
        label={t.information.rate_waha}
        icon='launch'
        isRTL={isRTL}
        isDark={isDark}
        activeGroup={activeGroup}
      />
      <InformationItem
        onPress={() =>
          Share.share({
            message:
              'iOS: https://apps.apple.com/us/app/waha-discover-gods-story/id1530116294\n\nAndroid: https://play.google.com/store/apps/details?id=com.kingdomstrategies.waha',
          }).then(() => {
            logShareApp(activeGroup.id)
          })
        }
        label={t.general.share_app}
        icon={Platform.OS === 'ios' ? 'share-ios' : 'share-android'}
        isRTL={isRTL}
        isDark={isDark}
        activeGroup={activeGroup}
      />
      <InformationItem
        onPress={() => {
          setShowSnackbar(true)
          setTimeout(() => setShowSnackbar(false), 2000)
          Clipboard.setString(appVersion)
        }}
        label={t.general.version}
        secondaryLabel={appVersion}
        icon='clipboard'
        isRTL={isRTL}
        isDark={isDark}
        activeGroup={activeGroup}
      />
      <InformationItem
        onPress={() => setShowCopyrightsModal(true)}
        label={t.general.view_copyright}
        icon={isRTL ? 'arrow-left' : 'arrow-right'}
        isRTL={isRTL}
        isDark={isDark}
        activeGroup={activeGroup}
      />
      {resetButtonMode === 'test' && (
        <InformationItem
          onPress={handleResetButtonPress}
          label='Reset App & Delete Everything'
          icon={isRTL ? 'arrow-left' : 'arrow-right'}
          isRTL={isRTL}
          isDark={isDark}
          activeGroup={activeGroup}
        />
      )}
      {/* Cheeky little easter egg :) */}
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={styles.easterEggContainer}>
          <Text
            style={{
              ...type(
                activeGroup.language,
                'd',
                'Regular',
                'center',
                colors(isDark).bg1
              ),
              marginHorizontal: 2,
            }}
          >
            Made with
          </Text>
          <Icon name='heart' size={15} color={colors(isDark).bg1} />
          <Text
            style={{
              ...type(
                activeGroup.language,
                'd',
                'Regular',
                'center',
                colors(isDark).bg1
              ),
              marginHorizontal: 2,
            }}
          >
            by the Waha team
          </Text>
        </View>
      </View>
      <SnackBar
        visible={showSnackbar}
        textMessage={t.general.copied_to_clipboard}
        messageStyle={{
          color: colors(isDark).textOnColor,
          fontSize: 24 * scaleMultiplier,
          fontFamily: info(activeGroup.language).font + '-Black',
          textAlign: 'center',
        }}
        backgroundColor={colors(isDark).success}
      />
      <CopyrightsModal
        isVisible={showCopyrightsModal}
        hideModal={() => setShowCopyrightsModal(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  informationItem: {
    width: '100%',
    height: 60 * scaleMultiplier,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  easterEggContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    flexDirection: 'row',
  },
})

export default InformationScreen
