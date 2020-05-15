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
import AddNewSetModal from '../components/AddNewSetModal'
import AvatarImage from '../components/AvatarImage'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { resumeDownload ***REMOVED*** from '../redux/actions/downloadActions'

function SetScreen (props) {
  //// STUFF FOR TESTING

  // FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(contents => {
  //   console.log(contents)
  // ***REMOVED***)
  // console.log(scaleMultiplier)

  //// STATE

  // shows the add new set modal
  const [showAddNewSetModal, setShowAddNewSetModal] = useState(false)
  const [addNewSetLabel, setAddNewSetLabel] = useState('')
  //// CONSTRUCTOR

  useEffect(() => {
    // console.log(props.route.name)
    if (props.route.name === 'core') {
      setAddNewSetLabel(props.translations.labels.addNewCoreStorySet)
    ***REMOVED*** else if (props.route.name === 'topical') {
      setAddNewSetLabel(props.translations.labels.addNewTopicalSet)
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
        data={props.activeDatabase.sets.filter(
          set => set.category === props.route.name
        )***REMOVED***
        renderItem={renderStudySetItem***REMOVED***
        ListFooterComponent={
          <TouchableOpacity
            style={[
              styles.addNewSetContainer,
              { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
            ]***REMOVED***
            onPress={() => setShowAddNewSetModal(true)***REMOVED***
          >
            <Icon
              name='plus-filled'
              size={50 * scaleMultiplier***REMOVED***
              color='#9FA5AD'
              style={styles.addNewSetIcon***REMOVED***
            />
            <Text
              style={[
                styles.addNewSetText,
                { fontFamily: props.font + '-regular' ***REMOVED***
              ]***REMOVED***
            >
              {addNewSetLabel***REMOVED***
            </Text>
          </TouchableOpacity>
        ***REMOVED***
      />
      <AddNewSetModal
        isVisible={showAddNewSetModal***REMOVED***
        hideModal={() => setShowAddNewSetModal(false)***REMOVED***
        category={props.route.name***REMOVED***
        goNested={() => props.navigation.navigate('Sets')***REMOVED***
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
    flexDirection: 'row'
  ***REMOVED***,
  addNewSetIcon: {
    marginHorizontal: 25
  ***REMOVED***,
  addNewSetText: {
    fontSize: 14 * scaleMultiplier,
    color: '#9FA5AD'
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
    font: state.database[activeGroup.language].font
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
