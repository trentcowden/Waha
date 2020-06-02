import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity
***REMOVED*** from 'react-native'
import * as FileSystem from 'expo-file-system'
import SetItem from '../components/SetItem'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { resumeDownload ***REMOVED*** from '../redux/actions/downloadActions'
import { getStateFromPath ***REMOVED*** from '@react-navigation/native'

function SetScreen (props) {
  //// STUFF FOR TESTING

  // FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(contents => {
  //   console.log(contents)
  // ***REMOVED***)
  // console.log(scaleMultiplier)

  //// STATE

  // shows the add new set modal
  const [addNewSetLabel, setAddNewSetLabel] = useState('')
  const [setCategory, setSetCategory] = useState('')

  //// CONSTRUCTOR

  useEffect(() => {
    // console.log(props.route.name)
    if (props.route.name === 'Core') {
      setAddNewSetLabel(props.translations.labels.addNewCoreStorySet)
      setSetCategory('core')
    ***REMOVED*** else if (props.route.name === 'Topical') {
      setAddNewSetLabel(props.translations.labels.addNewTopicalSet)
      setSetCategory('topical')
    ***REMOVED*** else {
      setSetCategory('toolkit')
    ***REMOVED***
  ***REMOVED***, [])

  //// NAV OPTIONS

  //// RENDER

  function renderStudySetItem (setList) {
    return (
      <SetItem
        thisSet={setList.item***REMOVED***
        isSmall={false***REMOVED***
        mode='shown'
        onSetSelect={() =>
          props.navigation.navigate('LessonList', {
            thisSet: setList.item
          ***REMOVED***)
        ***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <View style={styles.screen***REMOVED***>
      <FlatList
        data={
          props.route.name === 'Topical'
            ? // if we're displaying topical sets, display them in the order added
              props.activeDatabase.sets
                .filter(set => set.category === setCategory)
                .filter(set =>
                  props.activeGroup.addedSets.some(
                    addedSet => addedSet.id === set.id
                  )
                )
                .sort(
                  (a, b) =>
                    props.activeGroup.addedSets.indexOf(a.id) -
                    props.activeGroup.addedSets.indexOf(b.id)
                )
            : // otherwise, display them in numerical order
              props.activeDatabase.sets
                .filter(set => set.category === setCategory)
                .filter(set =>
                  props.activeGroup.addedSets.some(
                    addedSet => addedSet.id === set.id
                  )
                )
        ***REMOVED***
        renderItem={renderStudySetItem***REMOVED***
        extraData={props.activeGroup***REMOVED***
        ListFooterComponent={
          setCategory === 'toolkit' ? null : (
            <TouchableOpacity
              style={[
                styles.addNewSetContainer,
                { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
              ]***REMOVED***
              onPress={() =>
                props.navigation.navigate('AddSetStack', {
                  screen: 'AddSet',
                  params: {
                    category: setCategory === 'core' ? 'core' : 'folder'
                  ***REMOVED***
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
                  name='plus-filled'
                  size={60 * scaleMultiplier***REMOVED***
                  color='#9FA5AD'
                  style={styles.addNewSetIcon***REMOVED***
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  flexDirection: 'column',
                  marginRight: props.isRTL ? 20 : 0,
                  marginLeft: props.isRTL ? 0 : 20
                ***REMOVED******REMOVED***
              >
                <Text
                  style={{
                    fontFamily: props.font + '-regular',
                    fontSize: 14 * scaleMultiplier,
                    color: '#9FA5AD',
                    textAlign: props.isRTL ? 'right' : 'left'
                  ***REMOVED******REMOVED***
                >
                  {addNewSetLabel***REMOVED***
                </Text>
              </View>
            </TouchableOpacity>
          )
        ***REMOVED***
      />
    </View>
  )
***REMOVED***

//// STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EAEEF0'
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

//// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***
function mapDispatchToProps (dispatch) {
  return {
    resumeDownload: (lessonID, downloadSnapshotJSON) => {
      dispatch(resumeDownload(lessonID, downloadSnapshotJSON))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(SetScreen)
