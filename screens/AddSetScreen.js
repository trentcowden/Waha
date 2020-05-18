import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
***REMOVED*** from 'react-native'
import Modal from 'react-native-modal'
import SetItem from '../components/SetItem'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { connect ***REMOVED*** from 'react-redux'
import { addSet ***REMOVED*** from '../redux/actions/groupsActions'

function WahaModal (props) {
  const [setItemMode, setSetItemMode] = useState('')
  const [onPress, setOnPress] = useState(() => {***REMOVED***)

  useEffect(() => {
    props.navigation.setOptions(getNavOptions())
  ***REMOVED***, [])

  function getNavOptions () {
    return {
      title:
        props.route.params.category === 'core'
          ? props.translations.labels.addNewCoreStorySet
          : props.translations.labels.addNewTopicalSet
    ***REMOVED***
  ***REMOVED***

  //// RENDER
  function renderStudySetItem (setList) {
    return (
      <SetItem
        thisSet={setList.item***REMOVED***
        isSmall={false***REMOVED***
        mode={props.route.params.category === 'folder' ? 'folder' : 'hidden'***REMOVED***
        onSetSelect={
          props.route.params.category === 'folder'
            ? () =>
                props.navigation.navigate('AddSetFolder', {
                  category: 'topical',
                  folder: setList.item.subcategory
                ***REMOVED***)
            : () => {
                props.addSet(props.activeGroup.name, setList.item.id)
                props.navigation.goBack()
              ***REMOVED***
        ***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <FlatList
        data={
          props.route.params.category === 'topical'
            ? props.activeDatabase.sets
                .filter(set => set.category === 'topical')
                .filter(set => set.folder === props.route.params.folder)
                .filter(set => !props.activeGroup.addedSets.includes(set.id))
            : props.activeDatabase.sets
                .filter(set => set.category === props.route.params.category)
                .filter(set => !props.activeGroup.addedSets.includes(set.id))
        ***REMOVED***
        renderItem={renderStudySetItem***REMOVED***
      />
    </View>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF',
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

export default connect(mapStateToProps, mapDispatchToProps)(WahaModal)
