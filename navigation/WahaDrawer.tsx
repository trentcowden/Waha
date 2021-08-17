import { DrawerContentComponentProps } from '@react-navigation/drawer'
import React, { FC, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import DrawerDownloadUpdateButton from '../components/DrawerDownloadUpdateButton'
import DrawerItem from '../components/DrawerItem'
import GroupAvatar from '../components/GroupAvatar'
import WahaSeparator from '../components/WahaSeparator'
import { scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { selector, useAppDispatch } from '../hooks'
import AddEditGroupModal from '../modals/AddEditGroupModal'
import { updateLanguageCoreFiles } from '../redux/actions/databaseActions'
import { setIsInstallingLanguageInstance } from '../redux/actions/isInstallingLanguageInstanceActions'
import { setIsDarkModeEnabled } from '../redux/actions/settingsActions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

/**
 * A component that acts as the navigation drawer for Waha. Accessible via the SetsTabs screens.
 */
const WahaDrawer: FC<DrawerContentComponentProps> = ({
  navigation: { navigate },
}) => {
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const activeGroup = selector((state) => activeGroupSelector(state))
  const t = getTranslations(activeGroup.language)
  const isRTL = info(activeGroup.language).isRTL
  const isConnected = selector((state) => state.network.isConnected)
  const languageCoreFilesToUpdate = selector(
    (state) => state.languageInstallation.languageCoreFilesToUpdate
  )

  const dispatch = useAppDispatch()

  /** Keeps track of whether the edit group modal is visible. */
  const [showEditGroupModal, setShowEditGroupModal] = useState(false)

  /** Handles the updating of language core files. */
  const handleUpdateButtonPress = () => {
    // Set setIsInstallingLanguageInstance redux variable to true so that the app knows to switch to the loading screen.
    dispatch(setIsInstallingLanguageInstance(true))

    // Even though we're not fetching any Firebase data here, set this variable to true anyways just to allow the user to cancel the update if they want.
    // setHasFetchedLanguageData(true)

    // Update the language core files.
    dispatch(updateLanguageCoreFiles())
  }

  return (
    <SafeAreaView
      style={{
        ...styles.wahaDrawerContainer,
        backgroundColor: colors(isDark, activeGroup.language).accent,
      }}
      forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' }}
    >
      <View style={styles.drawerHeaderContainer}>
        <View style={styles.groupIconContainer}>
          <GroupAvatar
            style={{ backgroundColor: colors(isDark).bg2 }}
            emoji={activeGroup.emoji}
            size={120}
            onPress={() => setShowEditGroupModal(true)}
            isDark={isDark}
            isRTL={isRTL}
          />
        </View>
        <Text
          style={type(
            activeGroup.language,
            'h2',
            'Black',
            'center',
            colors(isDark).bg4
          )}
          numberOfLines={2}
        >
          {activeGroup.name}
        </Text>
      </View>
      <ScrollView
        bounces={false}
        style={{
          backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
          flex: 1,
        }}
      >
        {/* Show an update button if we have any core files to update. */}
        <DrawerDownloadUpdateButton
          onUpdateButtonPress={handleUpdateButtonPress}
          activeGroup={activeGroup}
          isRTL={isRTL}
          t={t}
          isDark={isDark}
          isConnected={isConnected}
          languageCoreFilesToUpdate={languageCoreFilesToUpdate}
        />
        <View style={{ width: '100%', height: 5 }} />
        <DrawerItem
          icon='group'
          label={t.groups.groups_and_languages}
          onPress={() => navigate('Groups')}
          isRTL={isRTL}
          isDark={isDark}
          activeGroup={activeGroup}
        />
        <DrawerItem
          icon='security'
          label={t.security.security}
          onPress={() => navigate('SecurityMode')}
          isRTL={isRTL}
          isDark={isDark}
          activeGroup={activeGroup}
        />
        <DrawerItem
          icon='boat'
          label={t.mobilization_tools.mobilization_tools}
          onPress={() => navigate('MobilizationTools')}
          isRTL={isRTL}
          isDark={isDark}
          activeGroup={activeGroup}
        />
        <View style={{ width: '100%', height: 5 }} />
        <WahaSeparator isDark={isDark} />
        <Text
          style={{
            ...type(
              activeGroup.language,
              'p',
              'Regular',
              'left',
              colors(isDark).secondaryText
            ),
            marginHorizontal: 20,
            marginTop: 20 * scaleMultiplier,
            marginBottom: 15 * scaleMultiplier,
          }}
        >
          {t.general.other}
        </Text>
        <DrawerItem
          icon='storage'
          label={t.storage.storage}
          onPress={() => navigate('Storage')}
          isRTL={isRTL}
          isDark={isDark}
          activeGroup={activeGroup}
        />
        <DrawerItem
          icon={isDark ? 'sun' : 'moon'}
          onPress={() => dispatch(setIsDarkModeEnabled(isDark ? false : true))}
          label={isDark ? t.general.light_mode : t.general.dark_mode}
          isRTL={isRTL}
          isDark={isDark}
          activeGroup={activeGroup}
        />
        <DrawerItem
          icon='email'
          label={t.contact_us.contact_us}
          onPress={() => navigate('ContactUs')}
          isRTL={isRTL}
          isDark={isDark}
          activeGroup={activeGroup}
        />
        <DrawerItem
          icon='info'
          onPress={() => navigate('Information')}
          label={t.information.information}
          isRTL={isRTL}
          isDark={isDark}
          activeGroup={activeGroup}
        />
      </ScrollView>
      <AddEditGroupModal
        isVisible={showEditGroupModal}
        hideModal={() => setShowEditGroupModal(false)}
        mode='EditGroup'
        thisGroup={activeGroup}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wahaDrawerContainer: {
    flex: 1,
  },
  drawerHeaderContainer: {
    width: '100%',
    height: 225 * scaleMultiplier,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 35,
  },
  groupIconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
})

export default WahaDrawer
