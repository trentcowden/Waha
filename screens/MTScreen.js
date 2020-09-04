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
import BackButton from '../components/BackButton'
import Blurb from '../components/Blurb'
import GroupItemMT from '../components/GroupItemMT'
import GroupListHeaderMT from '../components/GroupListHeaderMT'
import Hero from '../components/Hero'
import Separator from '../components/Separator'
import WahaItem from '../components/WahaItem'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'

function MTScreen (props) {
  //+ STATE
  const [showHowMTsWorkModal, setShowHowMTsWorkModal] = useState(false)

  //+ CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  //+ NAV OPTIONS
  function getNavOptions () {
    return {
      headerRight: props.isRTL
        ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        : () => <View></View>,
      headerLeft: props.isRTL
        ? () => <View></View>
        : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  // get the list of installed languages and all the groups with that language
  //  to populate section list
  function getLanguageAndGroupData () {
    var installedLanguageInstances = []
    for (key in props.database) {
      if (key.length === 2) {
        var languageObject = {***REMOVED***
        languageObject['title'] = props.database[key].displayName
        languageObject['languageID'] = key

        // get groups for that language
        languageObject['data'] = props.groups.filter(
          group => group.language === key
        )
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
        toolkitEnabled={props.toolkitEnabled***REMOVED***
      />
    )
  ***REMOVED***

  function renderGroupItem (group) {
    return <GroupItemMT group={group***REMOVED*** />
  ***REMOVED***

  // list of all the groups with options to turn MTs on or off for each

  return (
    <View style={styles.screen***REMOVED***>
      {props.toolkitEnabled ? (
        <Hero source={require('../assets/gifs/unlock_mob_tools.gif')***REMOVED*** />
      ) : null***REMOVED***
      <Blurb
        text={
          props.toolkitEnabled
            ? props.translations.mobilization_tools.mobilization_tools_vision
            : props.translations.mobilization_tools
                .mobilization_tools_pre_unlock
        ***REMOVED***
      />

      {props.toolkitEnabled ? null : (
        <View style={{ width: '100%' ***REMOVED******REMOVED***>
          <Separator />
          <WahaItem
            title={props.translations.mobilization_tools.unlock_mt_button_label***REMOVED***
            onPress={() => props.navigation.navigate('Passcode')***REMOVED***
          >
            <Icon
              name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
              color={colors.tuna***REMOVED***
              size={50 * scaleMultiplier***REMOVED***
            />
          </WahaItem>
          <Separator />
        </View>
      )***REMOVED***

      {/* list of groups with option to enable MTs for each group */***REMOVED***
      <View style={{ width: '100%', flex: 1 ***REMOVED******REMOVED***>
        {props.toolkitEnabled ? (
          <SectionList
            sections={getLanguageAndGroupData()***REMOVED***
            renderItem={({ item, section ***REMOVED***) => {
              return props.database[section.languageID].hasToolkit ? (
                renderGroupItem(item)
              ) : (
                <View
                  style={{
                    height: 80 * scaleMultiplier,
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.white,
                    justifyContent: 'center'
                  ***REMOVED******REMOVED***
                >
                  <Text
                    style={Typography(
                      props,
                      'p',
                      'regular',
                      'center',
                      colors.chateau
                    )***REMOVED***
                  >
                    {
                      props.translations.mobilization_tools
                        .no_mobilization_tools_content_text
                    ***REMOVED***
                  </Text>
                </View>
              )
            ***REMOVED******REMOVED***
            ListHeaderComponent={() => (
              <View>
                <Separator />
                <WahaItem
                  title={
                    props.toolkitEnabled
                      ? props.translations.mobilization_tools
                          .view_code_button_label
                      : props.translations.mobilization_tools
                          .unlock_mt_button_label
                  ***REMOVED***
                  onPress={
                    props.toolkitEnabled
                      ? () =>
                          Alert.alert(
                            props.translations.mobilization_tools.mt_code_title,
                            '281820',
                            [
                              {
                                text:
                                  props.translations.general.copy_to_clipboard,
                                onPress: () => Clipboard.setString('281820')
                              ***REMOVED***,
                              {
                                text: props.translations.general.close,
                                onPress: () => {***REMOVED***
                              ***REMOVED***
                            ]
                          )
                      : () => props.navigation.navigate('Passcode')
                  ***REMOVED***
                >
                  <Icon
                    name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
                    color={colors.tuna***REMOVED***
                    size={50 * scaleMultiplier***REMOVED***
                  />
                </WahaItem>
                <Separator />
                <View style={{ width: '100%', height: 20 * scaleMultiplier ***REMOVED******REMOVED*** />
              </View>
            )***REMOVED***
            renderSectionHeader={({ section ***REMOVED***) =>
              renderLanguageInstanceItem(section)
            ***REMOVED***
            renderSectionFooter={() => (
              <View style={{ height: 20, width: '100%' ***REMOVED******REMOVED*** />
            )***REMOVED***
            keyExtractor={item => item.name***REMOVED***
            ItemSeparatorComponent={() => <Separator />***REMOVED***
            SectionSeparatorComponent={() => <Separator />***REMOVED***
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
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font,
    activeGroup: activeGroup,
    toolkitEnabled: state.toolkitEnabled,
    groups: state.groups
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(MTScreen)
