import React from 'react'
import { StyleSheet, Switch, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, scaleMultiplier ***REMOVED*** from '../constants'
import { addSet, setShowToolkit ***REMOVED*** from '../redux/actions/groupsActions'
import AvatarImage from './AvatarImage'
// variant of group list item that shows only avatar image, group name, and a switch to enable MTs
function GroupItemMT (props) {
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
      <View
        style={{
          marginHorizontal: 20
        ***REMOVED******REMOVED***
      >
        <AvatarImage
          size={50 * scaleMultiplier***REMOVED***
          emoji={props.group.emoji***REMOVED***
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
              color: props.toolkitEnabled ? colors.shark : colors.chateau
            ***REMOVED***
          ]***REMOVED***
        >
          {props.group.name***REMOVED***
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 ***REMOVED******REMOVED***>
        <Switch
          trackColor={{ false: colors.chateau, true: colors.apple ***REMOVED******REMOVED***
          thumbColor={colors.white***REMOVED***
          ios_backgroundColor={colors.chateau***REMOVED***
          onValueChange={() => {
            // toggle MTs on or off
            props.setShowToolkit(props.group.name, !props.group.showToolkit)

            // if we're toggling MTs on for the first time, add the MT sets
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
    backgroundColor: colors.white
  ***REMOVED***,
  groupNameContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    flexWrap: 'nowrap'
  ***REMOVED***,
  groupNameText: {
    color: colors.chateau,
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
    setShowToolkit: (groupName, toSet) => {
      dispatch(setShowToolkit(groupName, toSet))
    ***REMOVED***,
    addSet: (groupName, setID) => {
      dispatch(addSet(groupName, setID))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(GroupItemMT)
