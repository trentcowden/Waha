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
import BackButton from '../components/BackButton'
import SnackBar from 'react-native-snackbar-component'

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
          ? props.translations.labels.addNewCoreStorySet
          : props.translations.labels.addNewTopicalSet,
      headerLeft:
        props.route.params.category === 'topical'
          ? props.isRTL
            ? () => <View></View>
            : () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
          : props.isRTL
          ? () => <View></View>
          : () => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: 100,
                  justifyContent: props.isRTL ? 'flex-end' : 'flex-start'
                ***REMOVED******REMOVED***
                onPress={() => props.navigation.goBack()***REMOVED***
              >
                <Icon
                  name='cancel-filled'
                  size={45 * scaleMultiplier***REMOVED***
                  color='#3A3C3F'
                />
              </TouchableOpacity>
            ),
      headerRight:
        props.route.params.category === 'topical'
          ? props.isRTL
            ? () => <BackButton onPress={() => props.navigation.goBack()***REMOVED*** />
            : () => <View></View>
          : props.isRTL
          ? () => (
              <TouchableOpacity onPress={() => props.navigation.goBack()***REMOVED***>
                <Icon
                  name='cancel-filled'
                  size={45 * scaleMultiplier***REMOVED***
                  color='#3A3C3F'
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
        mode={props.route.params.category === 'folder' ? 'folder' : 'hidden'***REMOVED***
        onSetSelect={
          // if we're in a folder, we want to navigate to the sets within that folder
          props.route.params.category === 'folder'
            ? () =>
                props.navigation.navigate('AddSetFolder', {
                  category: 'topical',
                  folder: setList.item.subcategory
                ***REMOVED***)
            : // otherwise, add the set
              () => {
                props.addSet(props.activeGroup.name, setList.item.id)
                setShowSnackbar(true)
                setTimeout(() => setShowSnackbar(false), 2000)
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
                .filter(
                  set =>
                    !props.activeGroup.addedSets.some(
                      addedSet => addedSet.id === set.id
                    )
                )
            : props.activeDatabase.sets
                .filter(set => set.category === props.route.params.category)
                .filter(
                  set =>
                    !props.activeGroup.addedSets.some(
                      addedSet => addedSet.id === set.id
                    )
                )
        ***REMOVED***
        renderItem={renderStudySetItem***REMOVED***
        ListEmptyComponent={
          <View style={{ width: '100%', margin: 10 ***REMOVED******REMOVED***>
            <Text
              style={{
                fontFamily: props.font + '-regular',
                color: '#9FA5AD',
                fontSize: 14 * scaleMultiplier,
                textAlign: 'center'
              ***REMOVED******REMOVED***
            >
              {props.translations.labels.noMoreSets***REMOVED***
            </Text>
          </View>
        ***REMOVED***
      />
      <SnackBar
        visible={showSnackbar***REMOVED***
        textMessage={props.translations.labels.setAdded***REMOVED***
        messageStyle={{
          color: '#FFFFFF',
          fontSize: 24 * scaleMultiplier,
          fontFamily: props.font + '-black',
          textAlign: 'center'
        ***REMOVED******REMOVED***
        backgroundColor='#60C239'
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

export default connect(mapStateToProps, mapDispatchToProps)(AddSetScreen)
