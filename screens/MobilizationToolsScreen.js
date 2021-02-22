import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  Alert,
  Clipboard,
  SectionList,
  StyleSheet,
  Text,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import GroupListHeaderMT from '../components/list-headers/GroupListHeaderMT'
import GroupItemMT from '../components/list-items/GroupItemMT'
import BackButton from '../components/standard/BackButton'
import Blurb from '../components/standard/Blurb'
import Hero from '../components/standard/Hero'
import Separator from '../components/standard/Separator'
import WahaItem from '../components/standard/WahaItem'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function MobilizationToolsScreen ({
  // Props passed from navigation.
  navigation: { setOptions, goBack, navigate ***REMOVED***,
  // Props passed from redux.
  database,
  activeDatabase,
  isRTL,
  translations,
  font,
  activeGroup,
  areMobilizationToolsUnlocked,
  groups
***REMOVED***) {
  //+ STATE
  const [showHowMTsWorkModal, setShowHowMTsWorkModal] = useState(false)

  //+ CONSTRUCTOR

  useEffect(() => {
    setOptions(getNavOptions())
  ***REMOVED***, [])

  //+ NAV OPTIONS
  function getNavOptions () {
    return {
      headerRight: isRTL
        ? () => <BackButton onPress={() => goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  // get the list of installed languages and all the groups with that language
  //  to populate section list
  function getLanguageAndGroupData () {
    var installedLanguageInstances = []
    for (key in database) {
      if (key.length === 2) {
        var languageObject = {***REMOVED***
        languageObject['title'] = database[key].displayName
        languageObject['languageID'] = key

        // get groups for that language
        languageObject['data'] = groups.filter(group => group.language === key)
        installedLanguageInstances.push(languageObject)
      ***REMOVED***
    ***REMOVED***
    return installedLanguageInstances
  ***REMOVED***

  //+ RENDER

  // section list render functions
  function renderLanguageInstanceItem (section) {
    return (
      <GroupListHeaderMT
        languageName={section.title***REMOVED***
        languageID={section.languageID***REMOVED***
        areMobilizationToolsUnlocked={areMobilizationToolsUnlocked***REMOVED***
      />
    )
  ***REMOVED***

  function renderGroupItem (group) {
    return <GroupItemMT group={group***REMOVED*** />
  ***REMOVED***

  // list of all the groups with options to turn MTs on or off for each

  return (
    <View style={styles.screen***REMOVED***>
      {areMobilizationToolsUnlocked ? null : (
        <View style={{ width: '100%' ***REMOVED******REMOVED***>
          <Blurb
            text={translations.mobilization_tools.mobilization_tools_pre_unlock***REMOVED***
          />
          <Separator />
          <WahaItem
            title={translations.mobilization_tools.unlock_mt_button_label***REMOVED***
            onPress={() => navigate('MobilizationToolsUnlock')***REMOVED***
          >
            <Icon
              name={isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
              color={colors.tuna***REMOVED***
              size={50 * scaleMultiplier***REMOVED***
            />
          </WahaItem>
          <Separator />
        </View>
      )***REMOVED***

      {/* list of groups with option to enable MTs for each group */***REMOVED***
      <View style={{ width: '100%', flex: 1 ***REMOVED******REMOVED***>
        {areMobilizationToolsUnlocked ? (
          <SectionList
            sections={getLanguageAndGroupData()***REMOVED***
            renderItem={({ item, section ***REMOVED***) => {
              return database[section.languageID].sets.some(set => {
                return /[a-z]{2***REMOVED***.3.[0-9]+/.test(set.id)
              ***REMOVED***)
                ? renderGroupItem(item)
                : null
            ***REMOVED******REMOVED***
            ListHeaderComponent={() => (
              <View>
                {areMobilizationToolsUnlocked ? (
                  <Hero
                    source={require('../assets/gifs/unlock_mob_tools.gif')***REMOVED***
                  />
                ) : null***REMOVED***
                <Blurb
                  text={
                    translations.mobilization_tools.mobilization_tools_vision
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
                <View style={{ width: '100%', height: 40 * scaleMultiplier ***REMOVED******REMOVED*** />
                <View style={{ width: '100%', paddingHorizontal: 20 ***REMOVED******REMOVED***>
                  <Text
                    style={StandardTypography(
                      { font, isRTL ***REMOVED***,
                      'h2',
                      'Black',
                      'left',
                      colors.shark
                    )***REMOVED***
                  >
                    {
                      translations.mobilization_tools
                        .mobilization_tools_status_label
                    ***REMOVED***
                  </Text>
                </View>
              </View>
            )***REMOVED***
            renderSectionHeader={({ section ***REMOVED***) =>
              renderLanguageInstanceItem(section)
            ***REMOVED***
            renderSectionFooter={({ section ***REMOVED***) => {
              var hasMTContent = database[section.languageID].sets.some(set => {
                return /[a-z]{2***REMOVED***.3.[0-9]+/.test(set.id)
              ***REMOVED***)
              return hasMTContent ? (
                <View style={{ width: '100%', height: 20 ***REMOVED******REMOVED*** />
              ) : (
                <View>
                  <Separator />
                  <View
                    style={{
                      height: 80 * scaleMultiplier,
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.white,
                      justifyContent: 'center',
                      paddingHorizontal: 20
                    ***REMOVED******REMOVED***
                  >
                    <Text
                      style={StandardTypography(
                        { font, isRTL ***REMOVED***,
                        'p',
                        'Regular',
                        'center',
                        colors.chateau
                      )***REMOVED***
                    >
                      {
                        translations.mobilization_tools
                          .no_mobilization_tools_content_text
                      ***REMOVED***
                    </Text>
                  </View>
                  <Separator />
                  <View style={{ width: '100%', height: 20 ***REMOVED******REMOVED*** />
                </View>
              )
            ***REMOVED******REMOVED***
            keyExtractor={item => item.name***REMOVED***
            SectionSeparatorComponent={({ section ***REMOVED***) => {
              var hasMTContent = database[section.languageID].sets.some(set => {
                return /[a-z]{2***REMOVED***.3.[0-9]+/.test(set.id)
              ***REMOVED***)

              return hasMTContent ? <Separator /> : null
            ***REMOVED******REMOVED***
            ItemSeparatorComponent={({ section ***REMOVED***) => {
              var hasMTContent = database[section.languageID].sets.some(set => {
                return /[a-z]{2***REMOVED***.3.[0-9]+/.test(set.id)
              ***REMOVED***)

              return hasMTContent ? <Separator /> : null
            ***REMOVED******REMOVED***
          />
        ) : null***REMOVED***
      </View>
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.aquaHaze,
    alignItems: 'center'
  ***REMOVED***,
  unlockButton: {
    width: '100%',
    height: 80 * scaleMultiplier,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.athens,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    database: state.database,
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language),
    activeGroup: activeGroup,
    areMobilizationToolsUnlocked: state.areMobilizationToolsUnlocked,
    groups: state.groups
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(MobilizationToolsScreen)
