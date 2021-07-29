import { t } from 'i18n-js'
import React, { useEffect, useState } from 'react'
import {
  Clipboard,
  FlatList,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import SnackBar from 'react-native-snackbar-component'
import { connect } from 'react-redux'
import GroupItemMT from '../components/GroupItemMT'
import WahaBackButton from '../components/WahaBackButton'
import WahaBlurb from '../components/WahaBlurb'
import WahaHero from '../components/WahaHero'
import WahaItem from '../components/WahaItem'
import WahaSeparator from '../components/WahaSeparator'
import { scaleMultiplier } from '../constants'
import { info } from '../languages'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
function mapStateToProps (state) {
  return {
    database: state.database,
    isRTL: info(activeGroupSelector(state).language).isRTL,

    isDark: state.settings.isDarkModeEnabled,
    areMobilizationToolsUnlocked: state.areMobilizationToolsUnlocked,
    groups: state.groups,
    activeGroup: activeGroupSelector(state)
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
  activeGroup
}) => {
  const [showSnackbar, setShowSnackbar] = useState(false)

  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      headerRight: isRTL
        ? () => <WahaBackButton onPress={() => goBack()} />
        : () => <View></View>,
      headerLeft: isRTL
        ? () => <View></View>
        : () => <WahaBackButton onPress={() => goBack()} />
    })
  }, [])

  // /**
  //  * Renders the GroupItemMT component used for the Groups SectionList item.
  //  * @param {Object} group - The object for the group to render.
  //  * @return {Component} - The GroupItemMT component.
  //  */
  function renderGroupItem ({ item }) {
    return <GroupItemMT thisGroup={item} />
  }

  const topComponents = (
    <View style={{ width: '100%' }}>
      <WahaHero source={require('../assets/lotties/mob_tools_unlocked.json')} />
      <WahaBlurb
        text={
          areMobilizationToolsUnlocked
            ? t('mobilization_tools.blurb_post_unlock')
            : t('mobilization_tools.blurb_pre_unlock')
        }
      />
    </View>
  )

  const shareComponent = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25 * scaleMultiplier
      }}
    >
      <View style={{ justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            borderRadius: 15,
            // borderWidth: 1.5,
            // backgroundColor: colors(isDark).bg1,
            overflow: 'hidden'
          }}
          onPress={() => {
            setShowSnackbar(true)
            setTimeout(() => setShowSnackbar(false), 1500)
            Clipboard.setString(
              `${t('mobilization_tools.share_message_1')}\n${t(
                'mobilization_tools.share_message_2'
              )}\n${t('mobilization_tools.share_message_3')}\n${t(
                'mobilization_tools.share_message_4'
              )}\n${t('mobilization_tools.share_message_5')}`
            )
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              // height: '100%',
              // width: '100%',
              backgroundColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
              borderBottomWidth: 4,
              borderBottomColor: isDark
                ? colors(isDark).bg2
                : colors(isDark).bg1Shadow
            }}
          >
            <Text
              style={type(
                activeGroup.language,
                'h4',
                'Regular',
                'center',
                colors(isDark).text
              )}
            >
              {t('mobilization_tools.unlock_code')}
            </Text>
            <Text
              style={type(
                activeGroup.language,
                'h1',
                'Bold',
                'center',
                colors(isDark).text
              )}
            >
              2 8 1 8 2 0
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: -45 * scaleMultiplier
          }}
          onPress={() =>
            Share.share({
              message: `${t('mobilization_tools.share_message_1')}\n${t(
                'mobilization_tools.share_message_2'
              )}\n${t('mobilization_tools.share_message_3')}\n${t(
                'mobilization_tools.share_message_4'
              )}\n${t('mobilization_tools.share_message_5')}`
            })
          }
        >
          <Icon
            name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'}
            color={colors(isDark).icons}
            size={30 * scaleMultiplier}
          />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3 }
      ]}
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
              {shareComponent}
              <Text
                style={[
                  type(
                    activeGroup.language,
                    'h2',
                    'Bold',
                    'left',
                    colors(isDark).text
                  ),
                  {
                    paddingHorizontal: 20,
                    marginBottom: 10,
                    fontSize: 22 * scaleMultiplier
                  }
                ]}
              >
                {t('mobilization_tools.show_mobilization_tab')}
              </Text>
              <WahaSeparator />
            </View>
          )}
          keyExtractor={item => item.name}
          ListFooterComponent={() => <WahaSeparator />}
          ItemSeparatorComponent={() => <WahaSeparator />}
        />
      ) : (
        <View style={{ width: '100%' }}>
          <WahaSeparator />
          <WahaItem
            title={t('mobilization_tools.unlock_mobilization_tools')}
            onPress={() => navigate('MobilizationToolsUnlock')}
          >
            <Icon
              name={isRTL ? 'arrow-left' : 'arrow-right'}
              color={colors(isDark).icons}
              size={50 * scaleMultiplier}
            />
          </WahaItem>
          <WahaSeparator />
        </View>
      )}
      <SnackBar
        visible={showSnackbar}
        textMessage={t('general.copied_to_clipboard')}
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

export default connect(mapStateToProps)(MobilizationToolsScreen)
