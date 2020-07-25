import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/BackButton'
import GroupListHeader from '../components/GroupListHeader'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
function GroupsScreen (props) {
  //// STATE

  const [isEditing, setIsEditing] = useState(false)

  //// CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [isEditing, props])

  //// NAV OPTIONS

  function getNavOptions () {
    return {
      headerRight: props.isRTL
        ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
        : () => (
            <TouchableOpacity
              style={styles.editButtonContainer***REMOVED***
              onPress={() => setIsEditing(old => !old)***REMOVED***
            >
              <Text
                style={[
                  styles.editButtonText,
                  {
                    fontFamily: props.font + '-regular'
                  ***REMOVED***
                ]***REMOVED***
              >
                {isEditing
                  ? props.translations.groups.done_button_label
                  : props.translations.groups.edit_button_label***REMOVED***
              </Text>
            </TouchableOpacity>
          ),
      headerLeft: props.isRTL
        ? () => (
            <TouchableOpacity
              style={styles.editButtonContainer***REMOVED***
              onPress={() => setIsEditing(old => !old)***REMOVED***
            >
              <Text
                style={[
                  styles.editButtonText,
                  {
                    fontFamily: props.font + '-regular'
                  ***REMOVED***
                ]***REMOVED***
              >
                {isEditing
                  ? props.translations.groups.done_button_label
                  : props.translations.groups.edit_button_label***REMOVED***
              </Text>
            </TouchableOpacity>
          )
        : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  //// FUNCTIONS

  function getInstalledLanguageInstances () {
    var installedLanguageInstances = []
    for (key in props.database) {
      if (key.length === 2) {
        var languageObject = {***REMOVED***
        languageObject['languageName'] = props.database[key].displayName
        languageObject['languageID'] = key
        installedLanguageInstances.push(languageObject)
      ***REMOVED***
    ***REMOVED***
    return installedLanguageInstances
  ***REMOVED***

  //// RENDER

  function renderLanguageInstanceItem (languageInstances) {
    return (
      <GroupListHeader
        languageName={languageInstances.item.languageName***REMOVED***
        languageID={languageInstances.item.languageID***REMOVED***
        goToAddNewGroupScreen={() =>
          props.navigation.navigate('AddGroup', {
            languageID: languageInstances.item.languageID
          ***REMOVED***)
        ***REMOVED***
        goToEditGroupScreen={groupName =>
          props.navigation.navigate('EditGroup', { groupName: groupName ***REMOVED***)
        ***REMOVED***
        isEditing={isEditing***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <View style={styles.languageList***REMOVED***>
        <FlatList
          data={getInstalledLanguageInstances()***REMOVED***
          renderItem={renderLanguageInstanceItem***REMOVED***
          keyExtractor={item => item.languageID***REMOVED***
          ListFooterComponent={
            <TouchableOpacity
              style={styles.addNewLanguageContainer***REMOVED***
              onPress={() =>
                props.navigation.navigate('AddLanguage', {
                  installedLanguageInstances: getInstalledLanguageInstances()
                ***REMOVED***)
              ***REMOVED***
            >
              <Text
                style={[
                  styles.addNewLanguageText,
                  {
                    textAlign: props.isRTL ? 'right' : 'left',
                    fontFamily: props.font + '-medium'
                  ***REMOVED***
                ]***REMOVED***
              >
                {props.translations.groups.new_language_button_label***REMOVED***
              </Text>
            </TouchableOpacity>
          ***REMOVED***
        />
      </View>
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.athens
  ***REMOVED***,
  languageList: {
    flex: 1
  ***REMOVED***,
  addNewLanguageContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'center',
    borderTopColor: colors.athens,
    paddingHorizontal: 20
  ***REMOVED***,
  addNewLanguageText: {
    fontSize: 18 * scaleMultiplier,
    color: colors.chateau
  ***REMOVED***,
  editButtonContainer: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  editButtonText: {
    color: colors.shark,
    fontSize: 18 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    database: state.database,
    isRTL: state.database[activeGroup.language].isRTL,
    translations: state.database[activeGroup.language].translations,
    isConnected: state.network.isConnected,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(GroupsScreen)
