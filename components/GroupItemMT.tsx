import { AGProps, CommonProps } from 'interfaces/common'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import GroupAvatar from '../components/GroupAvatar'
import { scaleMultiplier } from '../constants'
import { Group } from '../redux/reducers/groups'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  thisGroup: Group
  areMobilizationToolsUnlocked: boolean
  // Function to call when the <Switch /> component is tapped.
  onSwitchChange: (
    oldGroupName: string,
    newGroupName: string,
    emoji: string,
    shouldShowMobilizationToolsTab: boolean
  ) => void
}

/**
 * A pressable item used on the MobilizationTools screen to display a group. Similar to the GroupItem component, but a lot simpler. It still displays the group name, but just allows the user to show the Mobilization Tools tab for a specific group.
 */
const GroupItemMT: FC<Props> = ({
  thisGroup,
  isRTL,
  isDark,
  areMobilizationToolsUnlocked,
  activeGroup,
  onSwitchChange,
}): ReactElement => {
  return (
    <View
      style={{
        ...styles.groupListItemContainer,
        backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        borderLeftWidth: isRTL ? 0 : 5,
        borderRightWidth: isRTL ? 5 : 0,
        borderColor: colors(isDark, thisGroup.language).accent,
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
        }}
      >
        <GroupAvatar
          style={{
            backgroundColor: isDark ? colors(isDark).bg4 : colors(isDark).bg2,
          }}
          size={50 * scaleMultiplier}
          emoji={thisGroup.emoji}
          isActive={activeGroup.name === thisGroup.name}
          isDark={isDark}
          isRTL={isRTL}
        />
      </View>
      <View style={styles.groupNameContainer}>
        <Text
          style={{
            ...type(
              thisGroup.language,
              'h3',
              'Regular',
              'left',
              colors(isDark).text
            ),
            textAlign: isRTL ? 'right' : 'left',
          }}
        >
          {thisGroup.name}
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Switch
          trackColor={{
            false: colors(isDark).disabled,
            true: colors(isDark).success,
          }}
          thumbColor={isDark ? colors(isDark).icons : colors(isDark).bg4}
          ios_backgroundColor={colors(isDark).disabled}
          onValueChange={() => {
            // Toggle the visibility of the Mobilization Tools tab for this group on or off.
            onSwitchChange(
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
    alignItems: 'center',
  },
  groupNameContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
})

export default GroupItemMT
