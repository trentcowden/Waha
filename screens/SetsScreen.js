// import * as FileSystem from 'expo-file-system'
import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import SetItem from '../components/list-items/SetItem'
import { getSetInfo, scaleMultiplier ***REMOVED*** from '../constants'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

/**
 * Screen component for the story sets screen. This screen shows the list of currently added story sets in a category. Used three times for the three tabs.
 * @param {Object***REMOVED*** props - Props passed to this screen.
 * @param {Object***REMOVED*** navigation - Navigation object passed to this screen.
 * @param {Function***REMOVED*** navigate - Navigation function used to navigate to another screen.
 * @param {Object***REMOVED*** route - Route object passed from navigation to this screen.
 * @param {string***REMOVED*** name - Name of the route of the version of this screen. Can be "Foundational", "Topical", or "Mobilization Tools". This screen is used for all 3 tabs and the route name changes which sets are shown.
 * @param {Object***REMOVED*** activeDatabase - The database object for the language of the currently active group. Contains translations, sets, etc.
 * @param {boolean***REMOVED*** isRTL - Whether the language of the currently selected group is right-to-left aligned or not.
 * @param {Object***REMOVED*** activeGroup - The object for the currently active group.
 * @param {Object***REMOVED*** translations - The translations for the language of the currently selected group.
 * @param {string***REMOVED*** font - The name of the font for the langauge script of the currently selected group. Matches with fonts names in the assets folder.
 */
function SetsScreen ({
  // Props passed from navigation.
  navigation: { navigate ***REMOVED***,
  route: { name: routeName ***REMOVED***,
  // Props passed from redux.
  activeDatabase,
  isRTL,
  activeGroup,
  translations,
  font
***REMOVED***) {
  //+ STUFF FOR TESTING

  // FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(contents => {
  //   console.log(contents)
  // ***REMOVED***)
  // console.log(scaleMultiplier)

  //+ STATE

  // shows the add new set modal
  const [addNewSetLabel, setAddNewSetLabel] = useState('')
  const [setCategory, setSetCategory] = useState('')

  //+ CONSTRUCTOR

  useEffect(() => {
    // console.log(routeName)
    if (routeName === 'Foundational') {
      setAddNewSetLabel(
        translations.sets.add_foundational_story_set_button_label
      )
      setSetCategory('foundational')
    ***REMOVED*** else if (routeName === 'Topical') {
      setAddNewSetLabel(translations.sets.add_topical_set_button_label)
      setSetCategory('topical')
    ***REMOVED*** else {
      setAddNewSetLabel(translations.sets.add_mobilization_tool_button_label)
      setSetCategory('mobilization tools')
    ***REMOVED***
  ***REMOVED***, [activeGroup, translations])

  //+ NAV OPTIONS

  // get the sets for whatever tab we're on
  function getSetData () {
    // if we're adding core sets, display them in numerical order
    return routeName === 'Foundational'
      ? activeDatabase.sets
          .filter(set => getSetInfo('category', set.id) === setCategory)
          .filter(set =>
            activeGroup.addedSets.some(addedSet => addedSet.id === set.id)
          )
      : // if we're displaying topical/mt sets, display them in the order added
        activeDatabase.sets
          .filter(set => getSetInfo('category', set.id) === setCategory)
          .filter(set =>
            activeGroup.addedSets.some(addedSet => addedSet.id === set.id)
          )
          .sort((a, b) => {
            return a.index - b.index
          ***REMOVED***)
          .sort((a, b) => {
            return (
              activeGroup.addedSets.indexOf(
                activeGroup.addedSets.filter(
                  addedSet => addedSet.id === a.id
                )[0]
              ) -
              activeGroup.addedSets.indexOf(
                activeGroup.addedSets.filter(
                  addedSet => addedSet.id === b.id
                )[0]
              )
            )
          ***REMOVED***)
  ***REMOVED***

  //+ RENDER

  function renderStudySetItem ({ item ***REMOVED***) {
    return (
      <SetItem
        thisSet={item***REMOVED***
        mode='shown'
        onSetSelect={() =>
          navigate('Lessons', {
            thisSet: item
          ***REMOVED***)
        ***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <FlatList
        data={getSetData()***REMOVED***
        renderItem={renderStudySetItem***REMOVED***
        extraData={activeGroup***REMOVED***
        ListFooterComponent={
          <TouchableOpacity
            style={[
              styles.addNewSetContainer,
              { flexDirection: isRTL ? 'row-reverse' : 'row' ***REMOVED***
            ]***REMOVED***
            onPress={() =>
              navigate('AddSet', {
                category: setCategory
              ***REMOVED***)
            ***REMOVED***
          >
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: 80 * scaleMultiplier,
                height: 80 * scaleMultiplier
              ***REMOVED******REMOVED***
            >
              <Icon
                name='plus'
                size={60 * scaleMultiplier***REMOVED***
                color={colors.chateau***REMOVED***
                style={styles.addNewSetIcon***REMOVED***
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'column',
                marginRight: isRTL ? 20 : 0,
                marginLeft: isRTL ? 0 : 20
              ***REMOVED******REMOVED***
            >
              <Text
                style={StandardTypography(
                  { font, isRTL ***REMOVED***,
                  'p',
                  'Regular',
                  'left',
                  colors.chateau
                )***REMOVED***
              >
                {addNewSetLabel***REMOVED***
              </Text>
            </View>
          </TouchableOpacity>
        ***REMOVED***
      />
    </View>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.porcelain
  ***REMOVED***,
  headerImage: {
    resizeMode: 'contain',
    width: 120,
    height: 40,
    alignSelf: 'center'
  ***REMOVED***,
  addNewSetContainer: {
    width: '100%',
    height: 80 * scaleMultiplier,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 20
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language),
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(SetsScreen)
