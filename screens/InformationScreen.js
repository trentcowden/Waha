import * as WebBrowser from 'expo-web-browser'
import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  Clipboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/standard/BackButton'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { appVersion ***REMOVED*** from '../modeSwitch'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    font: getLanguageFont(activeGroupSelector(state).language),
    translations: activeDatabaseSelector(state).translations
  ***REMOVED***
***REMOVED***

function InformationScreen ({
  navigation: { setOptions, goBack ***REMOVED***,
  // Props passed from redux.
  isRTL,
  font,
  translations
***REMOVED***) {
  /** Whether the snackbar that pops up is visible or not.  */
  const [showSnackbar, setShowSnackbar] = useState(false)

  function getNavOptions () {
    return {
      headerRight: isRTL
        ? () => <BackButton onPress={() => goBack()***REMOVED*** />
        : () => {***REMOVED***,
      headerLeft: isRTL
        ? () => {***REMOVED***
        : () => <BackButton onPress={() => goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  useEffect(() => {
    setOptions(getNavOptions())
  ***REMOVED***, [])

  async function openBrowser (url) {
    await WebBrowser.openBrowserAsync(url, { dismissButtonStyle: 'close' ***REMOVED***)
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <TouchableOpacity
        style={[
          styles.informationItem,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row'
          ***REMOVED***
        ]***REMOVED***
        onPress={() => openBrowser('https://waha.app/privacy-policy/')***REMOVED***
      >
        <Text
          style={StandardTypography(
            { font, isRTL ***REMOVED***,
            'h3',
            'Bold',
            'left',
            colors.shark
          )***REMOVED***
        >
          {translations.general.privacy***REMOVED***
        </Text>
        <Icon name='launch' color={colors.tuna***REMOVED*** size={25 * scaleMultiplier***REMOVED*** />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.informationItem,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row'
          ***REMOVED***
        ]***REMOVED***
        onPress={() =>
          openBrowser('https://kingdomstrategies.givingfuel.com/general-giving')
        ***REMOVED***
      >
        <Text
          style={StandardTypography(
            { font, isRTL ***REMOVED***,
            'h3',
            'Bold',
            'left',
            colors.shark
          )***REMOVED***
        >
          {translations.general.donate_to_waha***REMOVED***
        </Text>
        <Icon name='launch' color={colors.tuna***REMOVED*** size={25 * scaleMultiplier***REMOVED*** />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.informationItem,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row'
          ***REMOVED***
        ]***REMOVED***
        onPress={() => {
          setShowSnackbar(true)
          setTimeout(() => setShowSnackbar(false), 2000)
          Clipboard.setString(appVersion)
        ***REMOVED******REMOVED***
      >
        <View>
          <Text
            style={StandardTypography(
              { font, isRTL ***REMOVED***,
              'h3',
              'Bold',
              'left',
              colors.shark
            )***REMOVED***
          >
            {translations.general.version***REMOVED***
          </Text>
          <Text
            style={StandardTypography(
              { font, isRTL ***REMOVED***,
              'h4',
              'Bold',
              'left',
              colors.chateau
            )***REMOVED***
          >
            {appVersion***REMOVED***
          </Text>
        </View>
        <Icon
          name='clipboard'
          color={colors.tuna***REMOVED***
          size={25 * scaleMultiplier***REMOVED***
        />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'flex-end' ***REMOVED******REMOVED***>
        <View
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 3
          ***REMOVED******REMOVED***
        >
          <Text
            style={[
              StandardTypography(
                { font, isRTL ***REMOVED***,
                'd',
                'Regular',
                'center',
                colors.geyser
              ),
              {
                marginHorizontal: 2
              ***REMOVED***
            ]***REMOVED***
          >
            Made with
          </Text>
          <Icon name='heart' size={15***REMOVED*** color={colors.geyser***REMOVED*** />
        </View>
      </View>
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.aquaHaze
  ***REMOVED***,
  informationItem: {
    width: '100%',
    height: 60 * scaleMultiplier,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(InformationScreen)
