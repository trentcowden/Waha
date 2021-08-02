import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import SnackBar from 'react-native-snackbar-component'
import { connect } from 'react-redux'
import GroupItemMT from '../components/GroupItemMT'
import ShareMobilizationToolsButton from '../components/ShareMobilizationToolsButton'
import WahaBackButton from '../components/WahaBackButton'
import WahaBlurb from '../components/WahaBlurb'
import WahaHero from '../components/WahaHero'
import WahaItem from '../components/WahaItem'
import WahaSeparator from '../components/WahaSeparator'
import { scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { editGroup } from '../redux/actions/groupsActions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

function mapStateToProps (state) {
  return {
    database: state.database,
    isRTL: info(activeGroupSelector(state).language).isRTL,
    t: getTranslations(activeGroupSelector(state).language),
    isDark: state.settings.isDarkModeEnabled,
    areMobilizationToolsUnlocked: state.areMobilizationToolsUnlocked,
    groups: state.groups,
    activeGroup: activeGroupSelector(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editGroup: (
      oldGroupName,
      newGroupName,
      emoji,
      shouldShowMobilizationToolsTab,
      language
    ) =>
      dispatch(
        editGroup(
          oldGroupName,
          newGroupName,
          emoji,
          shouldShowMobilizationToolsTab,
          language
        )
      )
  }
}

/**
 * Screen that shows information about the Mobilization Tools and a button to unlock them.
 */
const MobilizationToolsScreen = ({
  // Props passed from navigation.
  navigation: { setOptions, goBack, navigate },
  // Props passed from redux.
  database,
  isRTL,
  isDark,
  areMobilizationToolsUnlocked,
  groups,
  activeGroup,
  t,
  editGroup
}) => {
  const [showSnackbar, setShowSnackbar] = useState(false)

  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      headerRight: isRTL
        ? () => (
            <WahaBackButton
              onPress={() => goBack()}
              isRTL={isRTL}
              isDark={isDark}
            />
          )
        : () => <View></View>,
      headerLeft: isRTL
        ? () => <View></View>
        : () => (
            <WahaBackButton
              onPress={() => goBack()}
              isRTL={isRTL}
              isDark={isDark}
            />
          )
    })
  }, [])

  function renderGroupItem ({ item }) {
    return (
      <GroupItemMT
        thisGroup={item}
        isRTL={isRTL}
        isDark={isDark}
        areMobilizationToolsUnlocked={areMobilizationToolsUnlocked}
        activeGroup={activeGroup}
        editGroup={editGroup}
      />
    )
  }

  const topComponents = (
    <View style={{ width: '100%' }}>
      <WahaHero
        source={require('../assets/lotties/mob_tools_unlocked.json')}
        isDark={isDark}
      />
      <WahaBlurb
        text={
          areMobilizationToolsUnlocked
            ? t.mobilization_tools.blurb_post_unlock
            : t.mobilization_tools.blurb_pre_unlock
        }
        isDark={isDark}
        activeGroup={activeGroup}
      />
    </View>
  )

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3
      }}
    >
      {!areMobilizationToolsUnlocked && topComponents}
      {areMobilizationToolsUnlocked ? (
        <FlatList
          bounces={false}
          data={groups
            .sort((a, b) => a.groupID < b.groupID)
            .sort(
              (a, b) =>
                database[a.language].installTime >
                database[b.language].installTime
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
                setShowSnackbar={setShowSnackbar}
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
                  fontSize: 22 * scaleMultiplier
                }}
              >
                {t.mobilization_tools.show_mobilization_tab}
              </Text>
              <WahaSeparator isDark={isDark} />
            </View>
          )}
          keyExtractor={item => item.name}
          ListFooterComponent={() => <WahaSeparator isDark={isDark} />}
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
        visible={showSnackbar}
        textMessage={t.general.copied_to_clipboard}
        messageStyle={{
          color: colors(isDark).textOnColor,
          fontSize: 24 * scaleMultiplier,
          fontFamily: info(activeGroup.language).font + '-Black',
          textAlign: 'center'
        }}
        backgroundColor={colors(isDark).success}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobilizationToolsScreen)
