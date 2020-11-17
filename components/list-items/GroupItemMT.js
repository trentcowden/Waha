import React from 'react'
import { StyleSheet, Switch, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { colors, getSetInfo, scaleMultiplier ***REMOVED*** from '../../constants'
import {
  addSet,
  setShouldShowMobilizationToolsTab
***REMOVED*** from '../../redux/actions/groupsActions'
import { logEnableMobilizationToolsForAGroup ***REMOVED*** from '../../redux/LogEventFunctions'
import { BrandTypography ***REMOVED*** from '../../styles/typography'
import GroupAvatar from '../GroupAvatar'
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
        <GroupAvatar
          style={{ backgroundColor: colors.athens ***REMOVED******REMOVED***
          size={50 * scaleMultiplier***REMOVED***
          emoji={props.group.emoji***REMOVED***
          isActive={props.activeGroup.name === props.group.name***REMOVED***
        />
      </View>
      <View style={styles.groupNameContainer***REMOVED***>
        <Text
          style={BrandTypography(
            {
              font: props.database[props.group.language].font,
              isRTL: props.isRTL
            ***REMOVED***,
            'h3',
            'medium',
            'left',
            colors.shark
          )***REMOVED***
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
            props.setShouldShowMobilizationToolsTab(
              props.group.name,
              !props.group.shouldShowMobilizationToolsTab
            )

            // if we're toggling MTs on for the first time, add the first 2 MT sets
            if (!props.group.shouldShowMobilizationToolsTab) {
              logEnableMobilizationToolsForAGroup(props.activeGroup.language)
              for (const set of props.database[props.group.language].sets) {
                if (
                  getSetInfo('category', set.id) === 'mobilization tools' &&
                  (getSetInfo('index', set.id) === 1 ||
                    getSetInfo('index', set.id) === 2)
                ) {
                  props.addSet(props.group.name, set)
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***
          ***REMOVED******REMOVED***
          value={props.group.shouldShowMobilizationToolsTab***REMOVED***
          disabled={props.areMobilizationToolsUnlocked ? false : true***REMOVED***
        />
      </View>
    </View>
  )
***REMOVED***

// STYLES

const styles = StyleSheet.create({
  groupListItemContainer: {
    height: 80 * scaleMultiplier,
    // aspectRatio: 5,
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
    font: state.database[activeGroup.language].font,
    areMobilizationToolsUnlocked: state.areMobilizationToolsUnlocked,
    activeGroup: activeGroup
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setShouldShowMobilizationToolsTab: (groupName, toSet) => {
      dispatch(setShouldShowMobilizationToolsTab(groupName, toSet))
    ***REMOVED***,
    addSet: (groupName, set) => {
      dispatch(addSet(groupName, set))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(GroupItemMT)
