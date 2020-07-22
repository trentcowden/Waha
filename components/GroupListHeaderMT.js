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
import GroupItemMT from './GroupItemMT'
import { scaleMultiplier ***REMOVED*** from '../constants'
import * as FileSystem from 'expo-file-system'

function GroupListHeaderMT (props) {
  //// FUNCTIONS

  useEffect(() => {***REMOVED***, [])

  //// RENDER

  // if our active language has a toolkit, show the list of groups
  var list = props.activeDatabase.hasToolkit ? (
    <FlatList
      data={props.groups.filter(group => group.language === props.languageID)***REMOVED***
      renderItem={renderGroupItem***REMOVED***
      keyExtractor={item => item.name***REMOVED***
    />
  ) : (
    // otherwise, show a message that says MTs are not available for that language
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
        {
          props.translations.mobilization_tools
            .no_mobilization_tools_content_text
        ***REMOVED***
      </Text>
    </View>
  )

  // renders a group item
  function renderGroupItem (groups) {
    return <GroupItemMT group={groups.item***REMOVED*** />
  ***REMOVED***

  return (
    <View style={styles.languageHeaderListContainer***REMOVED***>
      <View
        style={[
          styles.languageHeaderContainer,
          { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
        ]***REMOVED***
      >
        <View>
          <Text
            style={{
              textAlign: props.isRTL ? 'right' : 'left',
              fontFamily: props.font + '-medium',
              fontSize: 18 * scaleMultiplier,
              color: '#9FA5AD'
            ***REMOVED******REMOVED***
          >
            {props.languageName +
              ' ' +
              props.translations.mobilization_tools.groups_label***REMOVED***
          </Text>
          <Text
            style={{
              textAlign: props.isRTL ? 'right' : 'left',
              fontFamily: props.font + '-regular',
              fontSize: 18 * scaleMultiplier,
              color: '#9FA5AD'
            ***REMOVED******REMOVED***
          >
            {
              props.translations.mobilization_tools
                .mobilization_tools_status_label
            ***REMOVED***
          </Text>
        </View>
        <Image
          style={[
            styles.languageLogo,
            {
              tintColor: props.toolkitEnabled ? null : '#DEE3E9'
            ***REMOVED***
          ]***REMOVED***
          source={{
            uri: FileSystem.documentDirectory + props.languageID + '-header.png'
          ***REMOVED******REMOVED***
        />
      </View>

      {/* list of groups OR no MTs message */***REMOVED***
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
    height: 55 * scaleMultiplier,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  ***REMOVED***,
  languageLogo: {
    resizeMode: 'contain',
    width: 120 * scaleMultiplier,
    height: 40 * scaleMultiplier,
    alignSelf: 'flex-end'
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

export default connect(mapStateToProps)(GroupListHeaderMT)
