import * as WebBrowser from 'expo-web-browser'
import React, { useEffect, useState } from 'react'
import {
  Clipboard,
  Platform,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import SnackBar from 'react-native-snackbar-component'
import { connect } from 'react-redux'
import WahaBackButton from '../components/WahaBackButton'
import { scaleMultiplier } from '../constants'
import { logShareApp } from '../LogEventFunctions'
import CopyrightsModal from '../modals/CopyrightsModal'
import { appVersion } from '../modeSwitch'
import {
  activeDatabaseSelector,
  activeGroupSelector
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { getLanguageFont, StandardTypography } from '../styles/typography'

function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    font: getLanguageFont(activeGroupSelector(state).language),
    isDark: state.settings.isDarkModeEnabled,
    activeGroup: activeGroupSelector(state),
    t: activeDatabaseSelector(state).translations
  }
}

/**
 * A screen that displays some miscellaneous information for Waha, like its version, with links to the privacy policy, donation page, and app store listing page.
 */
const InformationScreen = ({
  navigation: { setOptions, goBack },
  // Props passed from redux.
  isRTL,
  isDark,
  font,
  activeGroup,
  t
}) => {
  /** Keeps track of whether the snackbar that pops up is visible or not.  */
  const [showSnackbar, setShowSnackbar] = useState(false)

  const [showCopyrightsModal, setShowCopyrightsModal] = useState(false)

  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      headerRight: isRTL
        ? () => <WahaBackButton onPress={() => goBack()} />
        : () => {},
      headerLeft: isRTL
        ? () => {}
        : () => <WahaBackButton onPress={() => goBack()} />
    })
  }, [])

  /**
   * Opens up an in-app browser.
   * @param {string} url - The URL to open.
   */
  const openBrowser = async url =>
    await WebBrowser.openBrowserAsync(url, { dismissButtonStyle: 'close' })

  return (
    <SafeAreaView
      style={[
        styles.screen,
        { backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3 }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.informationItem,
          { flexDirection: isRTL ? 'row-reverse' : 'row' }
        ]}
        onPress={() => openBrowser('https://waha.app/privacy-policy/')}
      >
        <Text
          style={StandardTypography(
            { font, isRTL },
            'h3',
            'Bold',
            'left',
            colors(isDark).text
          )}
        >
          {t.information && t.information.privacy_policy}
        </Text>
        <Icon
          name='launch'
          color={colors(isDark).icons}
          size={25 * scaleMultiplier}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.informationItem,
          { flexDirection: isRTL ? 'row-reverse' : 'row' }
        ]}
        onPress={() =>
          openBrowser('https://kingdomstrategies.givingfuel.com/general-giving')
        }
      >
        <Text
          style={StandardTypography(
            { font, isRTL },
            'h3',
            'Bold',
            'left',
            colors(isDark).text
          )}
        >
          {t.information && t.information.donate_to_waha}
        </Text>
        <Icon
          name='launch'
          color={colors(isDark).icons}
          size={25 * scaleMultiplier}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.informationItem,
          { flexDirection: isRTL ? 'row-reverse' : 'row' }
        ]}
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
      >
        <Text
          style={StandardTypography(
            { font, isRTL },
            'h3',
            'Bold',
            'left',
            colors(isDark).text
          )}
        >
          {t.information && t.information.rate_waha}
        </Text>
        <Icon
          name='launch'
          color={colors(isDark).icons}
          size={25 * scaleMultiplier}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.informationItem,
          { flexDirection: isRTL ? 'row-reverse' : 'row' }
        ]}
        onPress={() =>
          Share.share({
            message:
              'iOS: https://apps.apple.com/us/app/waha-discover-gods-story/id1530116294\n\nAndroid: https://play.google.com/store/apps/details?id=com.kingdomstrategies.waha'
          }).then(() => {
            logShareApp(activeGroup.id)
          })
        }
      >
        <Text
          style={StandardTypography(
            { font, isRTL },
            'h3',
            'Bold',
            'left',
            colors(isDark).text
          )}
        >
          {t.general && t.general.share_app}
        </Text>
        <Icon
          name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'}
          color={colors(isDark).icons}
          size={25 * scaleMultiplier}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.informationItem,
          { flexDirection: isRTL ? 'row-reverse' : 'row' }
        ]}
        onPress={() => {
          setShowSnackbar(true)
          setTimeout(() => setShowSnackbar(false), 2000)
          Clipboard.setString(appVersion)
        }}
      >
        <View>
          <Text
            style={StandardTypography(
              { font, isRTL },
              'h3',
              'Bold',
              'left',
              colors(isDark).text
            )}
          >
            {t.general && t.general.version}
          </Text>
          <Text
            style={StandardTypography(
              { font, isRTL },
              'h4',
              'Bold',
              'left',
              colors(isDark).secondaryText
            )}
          >
            {appVersion}
          </Text>
        </View>
        <Icon
          name='clipboard'
          color={colors(isDark).icons}
          size={25 * scaleMultiplier}
        />
      </TouchableOpacity>
      {t.general.copyrights !== '' && (
        <TouchableOpacity
          style={[
            styles.informationItem,
            { flexDirection: isRTL ? 'row-reverse' : 'row' }
          ]}
          onPress={() => setShowCopyrightsModal(true)}
        >
          <Text
            style={StandardTypography(
              { font, isRTL },
              'h3',
              'Bold',
              'left',
              colors(isDark).text
            )}
          >
            {t.general && t.general.view_copyright}
          </Text>
          <Icon
            name={isRTL ? 'arrow-left' : 'arrow-right'}
            color={colors(isDark).icons}
            size={25 * scaleMultiplier}
          />
        </TouchableOpacity>
      )}
      {/* Cheeky little easter egg :) */}
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={styles.easterEggContainer}>
          <Text
            style={[
              StandardTypography(
                { font, isRTL },
                'd',
                'Regular',
                'center',
                colors(isDark).bg1
              ),
              { marginHorizontal: 2 }
            ]}
          >
            Made with
          </Text>
          <Icon name='heart' size={15} color={colors(isDark).bg1} />
          <Text
            style={[
              StandardTypography(
                { font, isRTL },
                'd',
                'Regular',
                'center',
                colors(isDark).bg1
              ),
              { marginHorizontal: 2 }
            ]}
          >
            by the Waha team
          </Text>
        </View>
      </View>
      <SnackBar
        visible={showSnackbar}
        textMessage={t.general && t.general.copied_to_clipboard}
        messageStyle={{
          color: colors(isDark).textOnColor,
          fontSize: 24 * scaleMultiplier,
          fontFamily: font + '-Black',
          textAlign: 'center'
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
    alignItems: 'center'
  },
  informationItem: {
    width: '100%',
    height: 60 * scaleMultiplier,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  easterEggContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    flexDirection: 'row'
  }
})

export default connect(mapStateToProps)(InformationScreen)
