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

/**
 * A modal that displays the various lessons in a set and their scripture references. Uses <ModalScreen /> under the hood.
 * @param {boolean***REMOVED*** isVisible - Whether the modal is visible.
 * @param {Function***REMOVED*** hideModal - Function to hide the modal.
 * @param {Object***REMOVED*** thisSet - The object for the set we're displaying the information about.
 * @param {boolean***REMOVED*** showSnackbar - Whether to show the "Set Added!" Snackbar component or not.
 */
const SetInfoModal = ({
  // Props passed from a parent component.
  isVisible,
  hideModal,
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
***REMOVED***) => {
  /** Renders a item with the information for a lesson. */
  const renderLessonInfoItem = ({ item ***REMOVED***) => {
    // If lesson has scripture, format the list of scripture to be a string with the scripture addresses separated by commas.
    if (item.scripture) {
      var scriptureList = item.scripture[0].header

      item.scripture.forEach((passage, index) => {
        if (index !== 0) scriptureList += ', ' + passage.header
      ***REMOVED***)
    ***REMOVED***

    return (
      // These use <TouchableOpacity /> instead of <View /> because scrolling a FlatList within a modal only works when the items are touchable. Wack.
      <TouchableOpacity
        style={{
          marginVertical: 10 * scaleMultiplier,
          justifyContent: 'center',
          paddingHorizontal: 40,
          width: Dimensions.get('window').width
        ***REMOVED******REMOVED***
        // This disables the touchable feedback so it appears like a <View />.
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

        {/* Display list of scripture below the title if this lesson has scripture (not all of them do). */***REMOVED***
        {item.scripture && (
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
        )***REMOVED***
      </TouchableOpacity>
    )
  ***REMOVED***

  const keyExtractor = item => item.id

  return (
    <ModalScreen
      title={translations.add_set.header_set_details***REMOVED***
      hideModal={hideModal***REMOVED***
      isVisible={isVisible***REMOVED***
    >
      <View style={styles.setItemContainer***REMOVED***>
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
          keyExtractor={keyExtractor***REMOVED***
          data={thisSet.lessons***REMOVED***
          renderItem={renderLessonInfoItem***REMOVED***
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
  setItemContainer: {
    width: '100%',
    height: 100 * scaleMultiplier
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps, mapDispatchToProps)(SetInfoModal)
