import React, { useEffect ***REMOVED*** from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Alert,
  Image
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import GroupListItemToolkit from '../components/GroupListItemToolkit'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { deleteGroup ***REMOVED*** from '../redux/actions/groupsActions'
import { deleteLanguage ***REMOVED*** from '../redux/actions/databaseActions'
import * as FileSystem from 'expo-file-system'
import { removeDownload ***REMOVED*** from '../redux/actions/downloadActions'

function LanguageInstanceHeaderToolkit (props) {
  //// FUNCTIONS

  useEffect(() => {***REMOVED***, [])

  //// RENDER

  var list = props.activeDatabase.hasToolkit ? (
    <FlatList
      data={props.groups.filter(group => group.language === props.languageID)***REMOVED***
      renderItem={renderGroupItem***REMOVED***
      keyExtractor={item => item.name***REMOVED***
    />
  ) : (
    <View
      style={{
        height: 80 * scaleMultiplier,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin: 2,
        justifyContent: 'center'
      ***REMOVED******REMOVED***
    >
      <Text
        style={{
          fontFamily: props.font + '-regular',
          fontSize: 14 * scaleMultiplier,
          color: '#82868D',
          textAlign: 'center'
        ***REMOVED******REMOVED***
      >
        {props.translations.labels.noToolkit***REMOVED***
      </Text>
    </View>
  )

  function renderGroupItem (groups) {
    return <GroupListItemToolkit group={groups.item***REMOVED*** />
  ***REMOVED***

  return (
    <View style={styles.languageHeaderListContainer***REMOVED***>
      <View
        style={[
          styles.languageHeaderContainer,
          { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
        ]***REMOVED***
      >
        <Text
          style={[
            styles.languageHeaderText,
            {
              textAlign: props.isRTL ? 'right' : 'left',
              fontFamily: props.font + '-regular'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.languageName + ' ' + props.translations.labels.toolkitStatus***REMOVED***
        </Text>
        <Image
          style={styles.languageLogo***REMOVED***
          source={{
            uri: FileSystem.documentDirectory + props.languageID + '-header.png'
          ***REMOVED******REMOVED***
        />
      </View>
      {list***REMOVED***
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  languageHeaderListContainer: {
    width: '100%',
    marginBottom: 15,
    marginTop: 3
  ***REMOVED***,
  languageHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 30
  ***REMOVED***,
  trashButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  languageHeaderText: {
    fontSize: 18 * scaleMultiplier,
    color: '#9FA5AD',
    marginHorizontal: 30,
    flex: 1
  ***REMOVED***,
  languageLogo: {
    resizeMode: 'stretch',
    width: 96 * scaleMultiplier,
    height: 32 * scaleMultiplier,
    alignSelf: 'flex-end',
    marginHorizontal: 10
  ***REMOVED***,
  addGroupContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 3
  ***REMOVED***,
  addGroupText: {
    color: '#2D9CDB',
    fontSize: 18 * scaleMultiplier,
    textAlign: 'left'
  ***REMOVED***
***REMOVED***)

// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    groups: state.groups,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    deleteGroup: name => {
      dispatch(deleteGroup(name))
    ***REMOVED***,
    deleteLanguage: language => {
      dispatch(deleteLanguage(language))
    ***REMOVED***,
    removeDownload: lessonID => {
      dispatch(removeDownload(lessonID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageInstanceHeaderToolkit)
