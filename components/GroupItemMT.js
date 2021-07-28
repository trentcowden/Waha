import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { connect } from 'react-redux'
import GroupAvatar from '../components/GroupAvatar'
import { scaleMultiplier } from '../constants'
import { getLanguageInfo } from '../languages'
import { editGroup } from '../redux/actions/groupsActions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

function mapStateToProps (state) {
  return {
    database: state.database,
    isRTL: getLanguageInfo(activeGroupSelector(state).language).isRTL,
    groups: state.groups,

    isDark: state.settings.isDarkModeEnabled,

    areMobilizationToolsUnlocked: state.areMobilizationToolsUnlocked,
    activeGroup: activeGroupSelector(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editGroup: (
      oldGroupName,
      newGroupName,
      emoji,
      shouldShowMobilizationToolsTab
    ) =>
      dispatch(
        editGroup(
          oldGroupName,
          newGroupName,
          emoji,
          shouldShowMobilizationToolsTab
        )
      ),
    addSet: (groupName, groupID, set) => {
      dispatch(addSet(groupName, groupID, set))
    }
  }
}

/**
 * A pressable item used on the MobilizationTools screen to display a group. Similar to the GroupItem component, but a lot simpler. It still displays the group name, but just allows the user to enable the Mobilization Tools for a specific group.
 * @param {Object} thisGroup - The object for the group that we're displaying in this component.
 */
const GroupItemMT = ({
  // Props passed from a parent component.
  thisGroup,
  // Props passed from redux.
  database,
  isRTL,
  isDark,
  groups,
  areMobilizationToolsUnlocked,
  activeGroup,
  editGroup,
  addSet
}) => {
  return (
    <View
      style={[
        styles.groupListItemContainer,
        {
          backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          borderLeftWidth: isRTL ? 0 : 5,
          borderRightWidth: isRTL ? 5 : 0,
          borderColor: colors(isDark, thisGroup.language).accent
        }
      ]}
    >
      <View
        style={{
          marginHorizontal: 20
        }}
      >
        <GroupAvatar
          style={{
            backgroundColor: isDark ? colors(isDark).bg4 : colors(isDark).bg2
          }}
          size={50 * scaleMultiplier}
          emoji={thisGroup.emoji}
          isActive={activeGroup.name === thisGroup.name}
        />
      </View>
      <View style={styles.groupNameContainer}>
        <Text
          style={type(
            thisGroup.language,
            'h3',
            'Regular',
            'left',
            colors(isDark).text
          )}
        >
          {thisGroup.name}
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Switch
          trackColor={{
            false: colors(isDark).disabled,
            true: colors(isDark).success
          }}
          thumbColor={isDark ? colors(isDark).icons : colors(isDark).bg4}
          ios_backgroundColor={colors(isDark).disabled}
          onValueChange={() => {
            // Toggle the visibility of the Mobilization Tools tab for this group on or off.
            editGroup(
              thisGroup.name,
              thisGroup.name,
              thisGroup.emoji,
              !thisGroup.shouldShowMobilizationToolsTab
            )
          }}
          value={thisGroup.shouldShowMobilizationToolsTab}
          disabled={areMobilizationToolsUnlocked ? false : true}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  groupListItemContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupNameContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    flexWrap: 'nowrap'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupItemMT)
