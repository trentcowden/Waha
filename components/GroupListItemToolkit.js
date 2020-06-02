import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Switch ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import {
  deleteGroup,
  changeActiveGroup,
  setShowToolkit,
  addSet
***REMOVED*** from '../redux/actions/groupsActions'
import { scaleMultiplier ***REMOVED*** from '../constants'
import AvatarImage from '../components/AvatarImage'

function GroupListItemToolkit (props) {
  // FUNCTIONS

  return (
    <View
      style={[
        styles.groupListItemContainer,
        {
          flexDirection: props.isRTL ? 'row-reverse' : 'row'
        ***REMOVED***
      ]***REMOVED***
    >
      <View style={{ marginHorizontal: 20 ***REMOVED******REMOVED***>
        <AvatarImage
          size={50 * scaleMultiplier***REMOVED***
          source={props.group.imageSource***REMOVED***
          isActive={props.activeGroup === props.group.name***REMOVED***
        />
      </View>
      <View style={styles.groupNameContainer***REMOVED***>
        <Text
          style={[
            styles.groupNameText,
            {
              textAlign: props.isRTL ? 'right' : 'left',
              fontFamily: props.font + '-medium',
              color: props.toolkitEnabled ? '#1D1E20' : '#DEE3E9'
            ***REMOVED***
          ]***REMOVED***
        >
          {props.group.name***REMOVED***
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 ***REMOVED******REMOVED***>
        <Switch
          trackColor={{ false: '#DEE3E9', true: '#60C239' ***REMOVED******REMOVED***
          thumbColor='#FFFFFF'
          ios_backgroundColor='#DEE3E9'
          onValueChange={() => {
            props.setShowToolkit(props.group.name, !props.group.showToolkit)
            if (!props.group.showToolkit)
              for (const set of props.database[props.group.language].sets) {
                if (set.category === 'mt') {
                  props.addSet(props.group.name, set.id)
                ***REMOVED***
              ***REMOVED***
          ***REMOVED******REMOVED***
          value={props.group.showToolkit***REMOVED***
          disabled={props.toolkitEnabled ? false : true***REMOVED***
        />
      </View>
    </View>
  )
***REMOVED***

// STYLES

const styles = StyleSheet.create({
  groupListItemContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFF2F4'
  ***REMOVED***,
  groupNameContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    flexWrap: 'nowrap'
  ***REMOVED***,
  groupNameText: {
    color: '#9FA5AD',
    fontSize: 18 * scaleMultiplier,
    textAlign: 'left'
  ***REMOVED***
***REMOVED***)

// REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    database: state.database,
    isRTL: state.database[activeGroup.language].isRTL,
    groups: state.groups,
    activeGroup: state.activeGroup,
    font: state.database[activeGroup.language].font,
    toolkitEnabled: state.toolkitEnabled
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    deleteGroup: name => {
      dispatch(deleteGroup(name))
    ***REMOVED***,
    changeActiveGroup: name => {
      dispatch(changeActiveGroup(name))
    ***REMOVED***,
    setShowToolkit: (groupName, toSet) => {
      dispatch(setShowToolkit(groupName, toSet))
    ***REMOVED***,
    addSet: (groupName, setID) => {
      dispatch(addSet(groupName, setID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupListItemToolkit)
