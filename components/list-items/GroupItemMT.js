import React from 'react'
import { StyleSheet, Switch, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { getSetInfo, scaleMultiplier ***REMOVED*** from '../../constants'
import { logEnableMobilizationToolsForAGroup ***REMOVED*** from '../../LogEventFunctions'
import {
  addSet,
  setShouldShowMobilizationToolsTab
***REMOVED*** from '../../redux/actions/groupsActions'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'
import GroupAvatar from '../GroupAvatar'

// variant of group list item that shows only avatar image, group name, and a switch to enable MTs

function GroupItemMT ({
  // passed from parent
  group,
  // passed from redux
  database,
  isRTL,
  groups,
  font,
  areMobilizationToolsUnlocked,
  activeGroup,
  setShouldShowMobilizationToolsTab,
  addSet
***REMOVED***) {
  // FUNCTIONS
  return (
    <View
      style={[
        styles.groupListItemContainer,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row'
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
          emoji={group.emoji***REMOVED***
          isActive={activeGroup.name === group.name***REMOVED***
        />
      </View>
      <View style={styles.groupNameContainer***REMOVED***>
        <Text
          style={StandardTypography(
            {
              font: getLanguageFont(group.language),
              isRTL: isRTL
            ***REMOVED***,
            'h3',
            'Bold',
            'left',
            colors.shark
          )***REMOVED***
        >
          {group.name***REMOVED***
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 ***REMOVED******REMOVED***>
        <Switch
          trackColor={{ false: colors.chateau, true: colors.apple ***REMOVED******REMOVED***
          thumbColor={colors.white***REMOVED***
          ios_backgroundColor={colors.chateau***REMOVED***
          onValueChange={() => {
            // toggle MTs on or off
            setShouldShowMobilizationToolsTab(
              group.name,
              !group.shouldShowMobilizationToolsTab
            )

            // if we're toggling MTs on for the first time, add the first 2 MT sets
            if (!group.shouldShowMobilizationToolsTab) {
              logEnableMobilizationToolsForAGroup(activeGroup.language)
              for (const set of database[group.language].sets) {
                if (
                  getSetInfo('category', set.id) === 'mobilization tools' &&
                  (getSetInfo('index', set.id) === 1 ||
                    getSetInfo('index', set.id) === 2)
                ) {
                  addSet(group.name, set)
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***
          ***REMOVED******REMOVED***
          value={group.shouldShowMobilizationToolsTab***REMOVED***
          disabled={areMobilizationToolsUnlocked ? false : true***REMOVED***
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
    font: getLanguageFont(activeGroup.language),
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
