import React from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import SetItem from '../components/list-items/SetItem'
import WahaButton from '../components/standard/WahaButton'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { addSet ***REMOVED*** from '../redux/actions/groupsActions'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'
import ModalScreen from './ModalScreen'

function mapStateToProps (state) {
  return {
    downloads: state.downloads,
    activeDatabase: activeDatabaseSelector(state),
    isRTL: activeDatabaseSelector(state).isRTL,
    activeGroup: activeGroupSelector(state),
    translations: activeDatabaseSelector(state).translations,
    font: getLanguageFont(activeGroupSelector(state).language)
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    addSet: (groupName, groupID, set) => {
      dispatch(addSet(groupName, groupID, set))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

/** A modal screen that displays the various lessons in a set and their scripture references. */
function SetInfoModal ({
  // Props passed from a parent component.
  isVisible,
  hideModal,
  category,
  thisSet,
  showSnackbar,
  // Props passed from redux.
  downloads,
  activeDatabase,
  isRTL,
  activeGroup,
  translations,
  font,
  addSet
***REMOVED***) {
  //+ FUNCTIONS

  function renderLessonInfoItem (item) {
    if (item.scripture) {
      var scriptureList = item.scripture[0].header
      item.scripture.forEach((chunk, index) => {
        if (index !== 0) scriptureList += ', ' + chunk.header
      ***REMOVED***)

      return (
        // These are touchable because scrolling a FlatList within a modal only works when the items are touchable. Weird, but necessary.
        <TouchableOpacity
          style={{
            marginVertical: 10 * scaleMultiplier,
            justifyContent: 'center',
            paddingHorizontal: 40,
            width: Dimensions.get('window').width
          ***REMOVED******REMOVED***
          activeOpacity={1***REMOVED***
        >
          <Text
            style={StandardTypography(
              { font, isRTL ***REMOVED***,
              'h4',
              'Bold',
              'left',
              colors.shark
            )***REMOVED***
          >
            {item.title***REMOVED***
          </Text>
          <Text
            style={StandardTypography(
              { font, isRTL ***REMOVED***,
              'p',
              'Regular',
              'left',
              colors.chateau
            )***REMOVED***
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
            paddingHorizontal: 40,
            width: Dimensions.get('window').width
          ***REMOVED******REMOVED***
        >
          <Text
            style={StandardTypography(
              { font, isRTL ***REMOVED***,
              'h4',
              'Bold',
              'left',
              colors.shark
            )***REMOVED***
          >
            {item.title***REMOVED***
          </Text>
        </TouchableOpacity>
      )
  ***REMOVED***

  return (
    <ModalScreen
      title={translations.add_set.header_set_details***REMOVED***
      hideModal={hideModal***REMOVED***
      isVisible={isVisible***REMOVED***
    >
      <View style={styles.studySetItemContainer***REMOVED***>
        <SetItem thisSet={thisSet***REMOVED*** screen='SetInfo' />
      </View>
      <WahaButton
        type='filled'
        color={colors.apple***REMOVED***
        onPress={() => {
          addSet(activeGroup.name, activeGroup.id, thisSet)
          showSnackbar()
          hideModal()
        ***REMOVED******REMOVED***
        style={{ marginHorizontal: 20, marginVertical: 10 ***REMOVED******REMOVED***
        label={translations.add_set.add_new_story_set_button_label***REMOVED***
        extraComponent={
          <Icon
            style={{ marginHorizontal: 10 ***REMOVED******REMOVED***
            color={colors.white***REMOVED***
            size={36 * scaleMultiplier***REMOVED***
            name='playlist-add'
          />
        ***REMOVED***
      />
      <View style={{ flex: 1 ***REMOVED******REMOVED***>
        <FlatList
          keyExtractor={item => item.id***REMOVED***
          // nestedScrollEnabled
          data={thisSet.lessons***REMOVED***
          renderItem={({ item ***REMOVED***) => renderLessonInfoItem(item)***REMOVED***
          contentContainerStyle={{ flexGrow: 1 ***REMOVED******REMOVED***
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

export default connect(mapStateToProps, mapDispatchToProps)(SetInfoModal)
