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

function WahaModal (props) {
  const [headerTitle, setHeaderTitle] = useState('')
  const [category, setCategory] = useState('')
  const [setItemMode, setSetItemMode] = useState('')
  useEffect(() => {
    console.log(props.category)
    if (props.category === 'core') {
      setHeaderTitle(props.translations.labels.addNewCoreStorySet)
      setCategory(props.category)
      setSetItemMode('hidden')
    ***REMOVED*** else if (props.category === 'topical') {
      setHeaderTitle(props.translations.labels.addNewTopicalSet)
      setCategory('folder')
      setSetItemMode('folder')
    ***REMOVED***
  ***REMOVED***, [])

  //// RENDER
  function renderStudySetItem (setList) {
    return (
      <SetItem
        thisSet={setList.item***REMOVED***
        isSmall={false***REMOVED***
        onSetSelect={() => props.goNested()***REMOVED***
        mode={setItemMode***REMOVED***
      />
    )
  ***REMOVED***

  return (
    <Modal
      isVisible={props.isVisible***REMOVED***
      hasBackdrop={true***REMOVED***
      onBackdropPress={props.hideModal***REMOVED***
      onBackButtonPress={props.hideModal***REMOVED***
      // onSwipeComplete={props.hideModal***REMOVED***
      // swipeDirection={'down'***REMOVED***
      backdropOpacity={0.3***REMOVED***
      style={{ justifyContent: 'flex-end', flex: 1, margin: 0 ***REMOVED******REMOVED***
    >
      <View style={styles.contentContainer***REMOVED***>
        <View
          style={[
            styles.modalHeader,
            { flexDirection: props.isRTL ? 'row-reverse' : 'row' ***REMOVED***
          ]***REMOVED***
        >
          <TouchableOpacity
            style={styles.closeButton***REMOVED***
            onPress={props.hideModal***REMOVED***
          >
            <Icon name='cancel' size={36 * scaleMultiplier***REMOVED*** color='#3A3C3F' />
          </TouchableOpacity>
          <Text
            style={[
              styles.modalHeaderText,
              {
                fontFamily: props.font + '-medium',
                paddingLeft: props.isRTL ? 0 : -40,
                paddingRight: props.isRTL ? -40 : 0
              ***REMOVED***
            ]***REMOVED***
          >
            {headerTitle***REMOVED***
          </Text>
          <View style={styles.closeButton***REMOVED*** />
        </View>
        <FlatList
          data={props.activeDatabase.sets.filter(
            set => set.category === category
          )***REMOVED***
          renderItem={renderStudySetItem***REMOVED***
        />
      </View>
    </Modal>
  )
***REMOVED***

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flex: 1,
    marginTop: 50
  ***REMOVED***,
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    margin: 10
  ***REMOVED***,
  closeButton: {
    alignSelf: 'flex-start',
    width: 40,
    justifyContent: 'center'
  ***REMOVED***,
  modalHeaderText: {
    color: '#1D1E20',
    fontSize: 24 * scaleMultiplier,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center'
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
    activeDatabase: state.database[activeGroup.language]
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(WahaModal)
