import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import ModalScreen from '../components/ModalScreen'
import SetItem from '../components/SetItem'
import WahaButton from '../components/WahaButton'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import { addSet ***REMOVED*** from '../redux/actions/groupsActions'

function SetInfoModal (props) {
  //+ FUNCTIONS

  function renderLessonInfoItem (item) {
    if (item.scripture) {
      var scriptureList = item.scripture[0].header
      item.scripture.forEach((chunk, index) => {
        if (index !== 0) scriptureList += ', ' + chunk.header
      ***REMOVED***)

      return (
        <TouchableOpacity
          style={{
            marginVertical: 10 * scaleMultiplier,
            justifyContent: 'center',
            paddingHorizontal: 40
          ***REMOVED******REMOVED***
        >
          <Text style={Typography(props, 'h4', 'medium', 'left', colors.shark)***REMOVED***>
            {item.title***REMOVED***
          </Text>
          <Text
            style={Typography(props, 'p', 'regular', 'left', colors.chateau)***REMOVED***
          >
            {scriptureList***REMOVED***
          </Text>
        </TouchableOpacity>
      )
    ***REMOVED*** else
      return (
        <TouchableOpacity
          style={{
            marginVertical: 10 * scaleMultiplier,
            justifyContent: 'center',
            paddingHorizontal: 40
          ***REMOVED******REMOVED***
        >
          <Text style={Typography(props, 'h4', 'medium', 'left', colors.shark)***REMOVED***>
            {item.title***REMOVED***
          </Text>
        </TouchableOpacity>
      )
  ***REMOVED***

  return (
    <ModalScreen
      title={props.translations.add_set.header_set_details***REMOVED***
      hideModal={props.hideModal***REMOVED***
      isVisible={props.isVisible***REMOVED***
    >
      <View style={styles.studySetItemContainer***REMOVED***>
        <SetItem thisSet={props.thisSet***REMOVED*** mode='setinfo' />
      </View>
      <WahaButton
        type='filled'
        color={colors.apple***REMOVED***
        onPress={() => {
          props.addSet(props.activeGroup.name, props.thisSet)
          props.showSnackbar()
          props.hideModal()
        ***REMOVED******REMOVED***
        style={{ marginHorizontal: 20, marginVertical: 10 ***REMOVED******REMOVED***
        label={props.translations.add_set.add_new_story_set_button_label***REMOVED***
        extraComponent={
          <Icon
            style={{ marginHorizontal: 10 ***REMOVED******REMOVED***
            color={colors.white***REMOVED***
            size={36 * scaleMultiplier***REMOVED***
            name='playlist-add'
          />
        ***REMOVED***
      />
      <View
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center'
        ***REMOVED******REMOVED***
        onStartShouldSetResponder={(): boolean => true***REMOVED***
      >
        <FlatList
          nestedScrollEnabled
          keyExtractor={item => item.id***REMOVED***
          data={props.thisSet.lessons***REMOVED***
          renderItem={({ item ***REMOVED***) => renderLessonInfoItem(item)***REMOVED***
        />
      </View>
    </ModalScreen>
  )
***REMOVED***

//+ STYLES

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10
  ***REMOVED***,
  studySetItemContainer: {
    width: '100%',
    height: 100 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    downloads: state.downloads,
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: state.database[activeGroup.language].font
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addSet: (groupName, set) => {
      dispatch(addSet(groupName, set))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(SetInfoModal)
