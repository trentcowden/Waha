import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  YellowBox
***REMOVED*** from 'react-native'
import SnackBar from 'react-native-snackbar-component'
import { connect ***REMOVED*** from 'react-redux'
import Separator from '../components/Separator'
import SetItem from '../components/SetItem'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import { addSet ***REMOVED*** from '../redux/actions/groupsActions'
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state'
])

function AddSetScreen (props) {
  const [setItemMode, setSetItemMode] = useState('')
  const [onPress, setOnPress] = useState(() => {***REMOVED***)
  const [showSnackbar, setShowSnackbar] = useState(false)

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  function getNavOptions () {
    return {
      title:
        props.route.params.category === 'core'
          ? props.translations.add_set.header_foundational
          : props.translations.add_set.header_topical,
      headerLeft: props.isRTL
        ? () => <View></View>
        : () => (
            <TouchableOpacity onPress={() => props.navigation.goBack()***REMOVED***>
              <Icon
                name='cancel'
                size={45 * scaleMultiplier***REMOVED***
                color={colors.oslo***REMOVED***
              />
            </TouchableOpacity>
          ),
      headerRight: props.isRTL
        ? () => (
            <TouchableOpacity onPress={() => props.navigation.goBack()***REMOVED***>
              <Icon
                name='cancel'
                size={45 * scaleMultiplier***REMOVED***
                color={colors.oslo***REMOVED***
              />
            </TouchableOpacity>
          )
        : () => <View></View>
    ***REMOVED***
  ***REMOVED***

  //// RENDER
  function renderStudySetItem (setList) {
    return (
      <SetItem
        thisSet={setList.item***REMOVED***
        isSmall={false***REMOVED***
        mode='addset'
        onSetSelect={() => {
          props.navigation.navigate('SetInfo', {
            category: props.route.params.category,
            thisSet: setList.item,
            showSnackbar: () => {
              setShowSnackbar(true)
              setTimeout(() => setShowSnackbar(false), 2000)
            ***REMOVED***
          ***REMOVED***)
        ***REMOVED******REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <FlatList
        data={
          props.activeDatabase.sets
            .filter(set => set.category === props.route.params.category)
            .filter(
              set =>
                !props.activeGroup.addedSets.some(
                  addedSet => addedSet.id === set.id
                )
            )
          // NOT USED: for folders
          // // if we're displaying topical sets:
          // // 1. filter by all sets that are topical,
          // // 2. filter by topical sets in the specified folder, and then
          // // 3. filter to only display sets that haven't already been added
          // props.route.params.category === 'topical'
          //   ? props.activeDatabase.sets
          //       .filter(set => set.category === 'topical')
          //       .filter(set => set.folder === props.route.params.folder)
          //       .filter(
          //         set =>
          //           !props.activeGroup.addedSets.some(
          //             addedSet => addedSet.id === set.id
          //           )
          //       )
          //   : // if we're displaying core or folders:
          //     // 1. filter by cateogry (core or folder)
          //     // 2. filter to only display sets that haven't already been added
          //     props.activeDatabase.sets
          //       .filter(set => set.category === props.route.params.category)
          //       .filter(
          //         set =>
          //           !props.activeGroup.addedSets.some(
          //             addedSet => addedSet.id === set.id
          //           )
          //       )
        ***REMOVED***
        ItemSeparatorComponent={() => <Separator />***REMOVED***
        ListFooterComponent={() => <Separator />***REMOVED***
        ListHeaderComponent={() => <Separator />***REMOVED***
        renderItem={renderStudySetItem***REMOVED***
        ListEmptyComponent={
          <View style={{ width: '100%', margin: 10 ***REMOVED******REMOVED***>
            <Text
              style={{
                fontFamily: props.font + '-regular',
                color: colors.chateau,
                fontSize: 14 * scaleMultiplier,
                textAlign: 'center'
              ***REMOVED******REMOVED***
            >
              {props.translations.add_set.no_more_sets_text***REMOVED***
            </Text>
          </View>
        ***REMOVED***
      />
      <SnackBar
        visible={showSnackbar***REMOVED***
        textMessage={props.translations.add_set.set_added_message***REMOVED***
        messageStyle={{
          color: colors.white,
          fontSize: 24 * scaleMultiplier,
          fontFamily: props.font + '-black',
          textAlign: 'center'
        ***REMOVED******REMOVED***
        backgroundColor={colors.apple***REMOVED***
      />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1
  ***REMOVED***
***REMOVED***)

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    font: state.database[activeGroup.language].font,
    translations: state.database[activeGroup.language].translations,
    isRTL: state.database[activeGroup.language].isRTL,
    activeDatabase: state.database[activeGroup.language],
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addSet: (groupName, setID) => {
      dispatch(addSet(groupName, setID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(AddSetScreen)
