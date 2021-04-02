import React from 'react'
import { StyleSheet, Switch, Text, View ***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import { getSetInfo, scaleMultiplier ***REMOVED*** from '../../constants'
import { logEnableMobilizationToolsForAGroup ***REMOVED*** from '../../LogEventFunctions'
import {
  addSet,
  setShouldShowMobilizationToolsTab
***REMOVED*** from '../../redux/actions/groupsActions'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../../styles/typography'
import GroupAvatar from '../GroupAvatar'

function mapStateToProps (state) {
  return {
    database: state.database,
    isRTL: activeDatabaseSelector(state).isRTL,
    groups: state.groups,
    font: getLanguageFont(activeGroupSelector(state).language),
    areMobilizationToolsUnlocked: state.areMobilizationToolsUnlocked,
    activeGroup: activeGroupSelector(state)
  ***REMOVED***
***REMOVED***

function mapDispatchToProps (dispatch) {
  return {
    setShouldShowMobilizationToolsTab: (groupName, toSet) => {
      dispatch(setShouldShowMobilizationToolsTab(groupName, toSet))
    ***REMOVED***,
    addSet: (groupName, groupID, set) => {
      dispatch(addSet(groupName, groupID, set))
    ***REMOVED***
  ***REMOVED***
***REMOVED***

/**
 * A pressable item used on the MobilizationTools screen to display a group. Similar to the GroupItem component, but a lot simpler. It still displays the group name, but just allows the user to enable the Mobilization Tools for a specific group.
 * @param {Object***REMOVED*** thisGroup - The object for the group that we're displaying in this component.
 */
function GroupItemMT ({
  // Props passed from a parent component.
  thisGroup,
  // Props passed from redux.
  database,
  isRTL,
  groups,
  font,
  areMobilizationToolsUnlocked,
  activeGroup,
  setShouldShowMobilizationToolsTab,
  addSet
***REMOVED***) {
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
          emoji={thisGroup.emoji***REMOVED***
          isActive={activeGroup.name === thisGroup.name***REMOVED***
        />
      </View>
      <View style={styles.groupNameContainer***REMOVED***>
        <Text
          style={StandardTypography(
            {
              font: getLanguageFont(thisGroup.language),
              isRTL: isRTL
            ***REMOVED***,
            'h3',
            'Bold',
            'left',
            colors.shark
          )***REMOVED***
        >
          {thisGroup.name***REMOVED***
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 ***REMOVED******REMOVED***>
        <Switch
          trackColor={{ false: colors.chateau, true: colors.apple ***REMOVED******REMOVED***
          thumbColor={colors.white***REMOVED***
          ios_backgroundColor={colors.chateau***REMOVED***
          onValueChange={() => {
            // Toggle the visibility of the Mobilization Tools tab for this group on or off.
            setShouldShowMobilizationToolsTab(
              thisGroup.name,
              !thisGroup.shouldShowMobilizationToolsTab
            )

            // If we're toggling the Mobilization Tools on for this group, log the event and add the first 2 Mobilization Tools sets to this group.
            if (!thisGroup.shouldShowMobilizationToolsTab) {
              logEnableMobilizationToolsForAGroup(
                activeGroup.language,
                thisGroup.id,
                groups.indexOf(thisGroup) + 1
              )
              for (const set of database[thisGroup.language].sets) {
                if (
                  getSetInfo('category', set.id) === 'mobilization tools' &&
                  (getSetInfo('index', set.id) === 1 ||
                    getSetInfo('index', set.id) === 2)
                ) {
                  addSet(thisGroup.name, thisGroup.id, set)
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***
          ***REMOVED******REMOVED***
          value={thisGroup.shouldShowMobilizationToolsTab***REMOVED***
          disabled={areMobilizationToolsUnlocked ? false : true***REMOVED***
        />
      </View>
    </View>
  )
***REMOVED***

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
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps, mapDispatchToProps)(GroupItemMT)
