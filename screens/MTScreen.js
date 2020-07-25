import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  Alert,
  Clipboard,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/BackButton'
import GroupListHeaderMT from '../components/GroupListHeaderMT'
import MessageModal from '../components/MessageModal'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
function MTScreen (props) {
  //// STATE
  const [showHowMTsWorkModal, setShowHotMTsWorkModal] = useState(false)

  //// CONSTRUCTOR

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  //// NAV OPTIONS
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

  var howMTsWork = props.toolkitEnabled ? (
    <TouchableOpacity
      style={[
        styles.unlockButton,
        { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
      ]***REMOVED***
      onPress={() => setShowHotMTsWorkModal(true)***REMOVED***
    >
      <Text
        style={{
          color: colors.shark,
          fontFamily: props.font + '-medium',
          fontSize: 18 * scaleMultiplier
        ***REMOVED******REMOVED***
      >
        {
          props.translations.mobilization_tools
            .how_mobilization_tools_work_label
        ***REMOVED***
      </Text>
      <Icon
        name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
        color={colors.tuna***REMOVED***
        size={50 * scaleMultiplier***REMOVED***
      />
    </TouchableOpacity>
  ) : null

  var groupList = props.toolkitEnabled ? (
    <FlatList
      data={getInstalledLanguageInstances()***REMOVED***
      renderItem={renderLanguageHeader***REMOVED***
      keyExtractor={item => item.languageID***REMOVED***
    />
  ) : null

  function renderLanguageHeader (languageInstances) {
    return (
      <GroupListHeaderMT
        languageName={languageInstances.item.languageName***REMOVED***
        languageID={languageInstances.item.languageID***REMOVED***
        toolkitEnabled={props.toolkitEnabled***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <Text
        style={{
          color: colors.shark,
          fontFamily: props.font + '-regular',
          fontSize: 14 * scaleMultiplier,
          marginTop: 10
        ***REMOVED******REMOVED***
      >
        {props.toolkitEnabled
          ? 'toolkit is currently enabled'
          : 'toolkit is currently disabled'***REMOVED***
      </Text>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginVertical: 50
        ***REMOVED******REMOVED***
      >
        <TouchableOpacity
          style={[
            styles.unlockButton,
            { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
          ]***REMOVED***
          onPress={
            props.toolkitEnabled
              ? () =>
                  Alert.alert(
                    props.translations.mobilization_tools.mt_code_title,
                    '281820',
                    [
                      {
                        text: props.translations.general.clipboard,
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
          <Text
            style={{
              color: colors.shark,
              fontFamily: props.font + '-medium',
              fontSize: 18 * scaleMultiplier
            ***REMOVED******REMOVED***
          >
            {props.toolkitEnabled
              ? props.translations.mobilization_tools.view_code_button_label
              : props.translations.mobilization_tools.unlock_mt_button_label***REMOVED***
          </Text>
          <Icon
            name={props.isRTL ? 'arrow-left' : 'arrow-right'***REMOVED***
            color={colors.tuna***REMOVED***
            size={50 * scaleMultiplier***REMOVED***
          />
        </TouchableOpacity>
        {howMTsWork***REMOVED***
      </View>
      <View style={{ width: '100%', flex: 1 ***REMOVED******REMOVED***>{groupList***REMOVED***</View>
      <MessageModal
        isVisible={showHowMTsWorkModal***REMOVED***
        hideModal={() => setShowHotMTsWorkModal(false)***REMOVED***
        title={
          props.translations.mobilization_tools.how_to_enable_mt_content_title
        ***REMOVED***
        body={
          props.translations.mobilization_tools.how_to_enable_mt_content_message
        ***REMOVED***
        confirmText={props.translations.general.got_it***REMOVED***
        confirmOnPress={() => setShowHotMTsWorkModal(false)***REMOVED***
        imageSource={require('../assets/gifs/unlock_mob_tools.gif')***REMOVED***
      />
    </View>
  )
***REMOVED***

//// STYLES

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
    //marginVertical: 40 * scaleMultiplier,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  ***REMOVED***
***REMOVED***)

//// REDUX

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
    toolkitEnabled: state.toolkitEnabled
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(MTScreen)
