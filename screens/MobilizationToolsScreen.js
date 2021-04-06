import React, { useEffect ***REMOVED*** from 'react'
import { Alert, Clipboard, StyleSheet, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/standard/BackButton'
import Blurb from '../components/standard/Blurb'
import Hero from '../components/standard/Hero'
import Separator from '../components/standard/Separator'
import WahaItem from '../components/standard/WahaItem'
import { scaleMultiplier ***REMOVED*** from '../constants'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    database: state.database,
    isRTL: activeDatabaseSelector(state).isRTL,
    translations: activeDatabaseSelector(state).translations,
    font: getLanguageFont(activeGroupSelector(state).language),
    areMobilizationToolsUnlocked: state.areMobilizationToolsUnlocked,
    groups: state.groups
  ***REMOVED***
***REMOVED***

/**
 * Screen that shows information about the Mobilization Tools and a button to unlock them.
 */
const MobilizationToolsScreen = ({
  // Props passed from navigation.
  navigation: { setOptions, goBack, navigate ***REMOVED***,
  // Props passed from redux.
  database,
  isRTL,
  translations,
  font,
  areMobilizationToolsUnlocked,
  groups
***REMOVED***) => {
  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      headerRight: isRTL
        ? () => <BackButton onPress={() => goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => goBack()***REMOVED*** />
    ***REMOVED***)
  ***REMOVED***, [])

  return (
    <View style={styles.screen***REMOVED***>
      <Hero source={require('../assets/gifs/unlock_mob_tools.gif')***REMOVED*** />
      <Blurb
        text={
          areMobilizationToolsUnlocked
            ? translations.mobilization_tools.mobilization_tools_vision
            : translations.mobilization_tools.mobilization_tools_pre_unlock
        ***REMOVED***
      />
      <Separator />
      <WahaItem
        title={
          areMobilizationToolsUnlocked
            ? translations.mobilization_tools.view_code_button_label
            : translations.mobilization_tools.unlock_mt_button_label
        ***REMOVED***
        onPress={
          areMobilizationToolsUnlocked
            ? () =>
                Alert.alert(
                  translations.mobilization_tools.mt_code_title,
                  '281820',
                  [
                    {
                      text: translations.general.copy_to_clipboard,
                      onPress: () => Clipboard.setString('281820')
                    ***REMOVED***,
                    {
                      text: translations.general.close,
                      onPress: () => {***REMOVED***
                    ***REMOVED***
                  ]
                )
            : () => navigate('MobilizationToolsUnlock')
        ***REMOVED***
      >
        <Icon
          name={isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
          color={colors.tuna***REMOVED***
          size={50 * scaleMultiplier***REMOVED***
        />
      </WahaItem>
      <Separator />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze,
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(MobilizationToolsScreen)
