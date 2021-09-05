import { StackNavigationProp } from '@react-navigation/stack'
import { Emoji } from 'assets/groupIcons/_groupIcons'
import { MainStackParams } from 'navigation/MainStack'
import React, { FC, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import SnackBar from 'react-native-snackbar-component'
import Icon from '../assets/fonts/icon_font_config'
import GroupItemMT from '../components/GroupItemMT'
import ShareMobilizationToolsButton from '../components/ShareMobilizationToolsButton'
import WahaBlurb from '../components/WahaBlurb'
import WahaHero from '../components/WahaHero'
import WahaItem from '../components/WahaItem'
import WahaSeparator from '../components/WahaSeparator'
import { scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { selector, useAppDispatch } from '../redux/hooks'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { editGroup, Group } from '../redux/reducers/groups'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

type MobilizationToolsScreenNavigationProp = StackNavigationProp<
  MainStackParams,
  'MobilizationTools'
>

interface Props {
  navigation: MobilizationToolsScreenNavigationProp
}

/**
 * Screen that shows information about the Mobilization Tools and a button to unlock them.
 */
const MobilizationToolsScreen: FC<Props> = ({ navigation: { navigate } }) => {
  // Redux state/dispatch.
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const activeGroup = selector((state) => activeGroupSelector(state))
  const t = getTranslations(activeGroup.language)
  const isRTL = info(activeGroup.language).isRTL
  const areMobilizationToolsUnlocked = selector(
    (state) => state.areMobilizationToolsUnlocked
  )
  const groups = selector((state) => state.groups)
  const database = selector((state) => state.database)
  const dispatch = useAppDispatch()

  /** Keeps track of whether the */
  const [showCopiedToClipboardSnackbar, setShowCopiedToClipboardSnackbar] =
    useState(false)

  /**
   * Handles when the user taps the switch that shows/hides the Mobilization Tools tab for a Group.
   */
  const handleSwitchChange = (
    oldGroupName: string,
    newGroupName: string,
    emoji: Emoji,
    shouldShowMobilizationToolsTab: boolean
  ) => {
    dispatch(
      editGroup({
        oldGroupName: oldGroupName,
        newGroupName: newGroupName,
        emoji: emoji,
        shouldShowMobilizationToolsTab: shouldShowMobilizationToolsTab,
      })
    )
  }

  /**
   * Renders a <GroupItemMT /> component.
   */
  const renderGroupItem = ({ item }: { item: Group }) => {
    return (
      <GroupItemMT
        thisGroup={item}
        isRTL={isRTL}
        isDark={isDark}
        areMobilizationToolsUnlocked={areMobilizationToolsUnlocked}
        activeGroup={activeGroup}
        onSwitchChange={handleSwitchChange}
      />
    )
  }

  // The components to display at the top of the <MobilizationToolsScreen /> only after it's unlocked.
  const topComponents = (
    <View style={{ width: '100%' }}>
      <WahaHero
        source={require('../assets/lotties/mob_tools_unlocked.json')}
        isDark={isDark}
        isRTL={isRTL}
      />
      <WahaBlurb
        text={
          areMobilizationToolsUnlocked
            ? t.mobilization_tools.blurb_post_unlock
            : t.mobilization_tools.blurb_pre_unlock
        }
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      />
    </View>
  )

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
      }}
    >
      {!areMobilizationToolsUnlocked && topComponents}
      {areMobilizationToolsUnlocked ? (
        <FlatList
          bounces={false}
          data={groups
            .slice()
            .sort((group1, group2) => {
              if (group1.id && group2.id) return group1.id - group2.id
              else return 1
            })
            .sort(
              (group1, group2) =>
                database[group1.language].installTime -
                database[group2.language].installTime
            )}
          renderItem={renderGroupItem}
          style={{ width: '100%' }}
          ListHeaderComponent={() => (
            <View>
              {topComponents}
              <ShareMobilizationToolsButton
                isDark={isDark}
                t={t}
                activeGroup={activeGroup}
                setShowSnackbar={setShowCopiedToClipboardSnackbar}
                isRTL={isRTL}
              />
              <Text
                style={{
                  ...type(
                    activeGroup.language,
                    'h2',
                    'Bold',
                    'left',
                    colors(isDark).text
                  ),
                  paddingHorizontal: 20,
                  marginBottom: 10,
                  fontSize: 22 * scaleMultiplier,
                }}
              >
                {t.mobilization_tools.show_mobilization_tab}
              </Text>
              <WahaSeparator isDark={isDark} />
            </View>
          )}
          keyExtractor={(item) => item.name}
          ListFooterComponent={() => (
            <View>
              <WahaSeparator isDark={isDark} />
              <View style={{ height: 60 * scaleMultiplier }} />
            </View>
          )}
          ItemSeparatorComponent={() => <WahaSeparator isDark={isDark} />}
        />
      ) : (
        <View style={{ width: '100%' }}>
          <WahaSeparator isDark={isDark} />
          <WahaItem
            title={t.mobilization_tools.unlock_mobilization_tools}
            onPress={() => navigate('MobilizationToolsUnlock')}
            isRTL={isRTL}
            isDark={isDark}
            activeGroup={activeGroup}
          >
            <Icon
              name={isRTL ? 'arrow-left' : 'arrow-right'}
              color={colors(isDark).icons}
              size={50 * scaleMultiplier}
            />
          </WahaItem>
          <WahaSeparator isDark={isDark} />
        </View>
      )}
      <SnackBar
        visible={showCopiedToClipboardSnackbar}
        textMessage={t.general.copied_to_clipboard}
        messageStyle={{
          color: colors(isDark).textOnColor,
          fontSize: 24 * scaleMultiplier,
          fontFamily: info(activeGroup.language).font + '-Black',
          textAlign: 'center',
        }}
        backgroundColor={colors(isDark).success}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
})

export default MobilizationToolsScreen
