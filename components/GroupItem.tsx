import React, { FC, ReactElement, useEffect, useState } from 'react'
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { AGProps, CommonProps, TProps } from 'redux/common'
import { Lesson, StorySet } from 'redux/reducers/database'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { getLessonInfo } from '../functions/setAndLessonDataFunctions'
import { Database } from '../redux/reducers/database'
import { Group } from '../redux/reducers/groups'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import GroupAvatar from './GroupAvatar'

enum AnimatedPosition {
  EDITING = 0,
  ISRTL = 24 * scaleMultiplier + 25,
  ISNOTRTL = -24 * scaleMultiplier - 25,
}

interface Props extends CommonProps, AGProps, TProps {
  // The object for the group that we're displaying in this component.
  thisGroup: Group
  // Whether we're in "editing" mode or not.
  isEditing: boolean
  database: Database
  groups: Group[]
  onDeleteGroupButtonPress: (groupName: string) => void
  onGroupItemPress: (group: Group) => void
}

/**
 * A pressable item used on the Group screen to display a group in the groups section list. It shows the name of the group, the icon, whether it's active or not, and the current bookmark, and allows for editing and deleting.
 */
const GroupItem: FC<Props> = ({
  thisGroup,
  isEditing,
  database,
  isRTL,
  isDark,
  groups,
  t,
  activeGroup,
  onDeleteGroupButtonPress,
  onGroupItemPress,
}): ReactElement => {
  /** Keeps track of the components for the left button and the right icon of the group item. These get switched when isRTL is true. */
  const [leftButton, setLeftButton] = useState(<View />)
  const [rightIcon, setRightIcon] = useState(<View />)

  /** Keeps track of whether this group is the last group in a language instance. */
  const [isLastGroupInLanguageInstance, setIsLastGroupInLanguageInstance] =
    useState(false)

  /** Keeps track of the animated position of the left icon of the group item component, in this case the delete button. */
  const [groupItemXPos] = useState(
    new Animated.Value(
      isEditing
        ? AnimatedPosition.EDITING
        : isRTL
        ? AnimatedPosition.ISRTL
        : AnimatedPosition.ISNOTRTL
    )
  )

  /**
   * Animate the position of the delete icon whenever isEditing, isRTL, or isLastGroupInLanguageInstance changes. This pushes the whole component over to the right or left to reveal the hidden buttons.
   */
  useEffect(() => {
    animateGroupItem()
  }, [isEditing, isLastGroupInLanguageInstance, isRTL])

  /**
   * Animates the X position of the group item.
   */
  const animateGroupItem = () => {
    // If a group is the last in a language instance and isn't the active group, it should always stay in the non-edit-mode position.
    if (isLastGroupInLanguageInstance && activeGroup.name !== thisGroup.name) {
      Animated.spring(groupItemXPos, {
        toValue: isRTL ? AnimatedPosition.ISRTL : AnimatedPosition.ISNOTRTL,
        useNativeDriver: true,
      }).start()
      // Otherwise, animate the group item based off whether edit mode is active or not.
    } else {
      if (isEditing) {
        Animated.spring(groupItemXPos, {
          toValue: AnimatedPosition.EDITING,
          useNativeDriver: true,
        }).start()
      } else if (!isEditing) {
        Animated.spring(groupItemXPos, {
          toValue: isRTL ? AnimatedPosition.ISRTL : AnimatedPosition.ISNOTRTL,
          useNativeDriver: true,
        }).start()
      }
    }
  }

  /**
   * Determine whether this Group is the last in a Language whenever the editing status or the Groups array change.
   */
  useEffect(() => {
    if (
      groups.filter((group) => group.language === thisGroup.language).length ===
      1
    )
      setIsLastGroupInLanguageInstance(true)
    else setIsLastGroupInLanguageInstance(false)
  }, [isEditing, groups])

  /**
   * Gets the Set and Lesson Bookmarks for this Group and returns them in a nicely formatted string.
   */
  const getBookmarkLesson = () => {
    // If for some reason no group got passed, return an empty string.
    if (thisGroup) {
      // Get the object for the currently bookmarked set.
      var bookmarkSet = database[thisGroup.language].sets.filter(
        (set: StorySet) => set.id === thisGroup.setBookmark
      )[0]

      // Get the index of the bookmarked lesson within the bookmarked set.
      var bookmarkSetBookmarkLesson = thisGroup.addedSets.filter(
        (savedSet) => savedSet.id === bookmarkSet.id
      )[0].bookmark

      // Finally, get the object for the bookmarked lesson. This will be the most useful information to see on the group item.
      var bookmarkLesson = bookmarkSet.lessons.filter(
        (lesson: Lesson) =>
          getLessonInfo('index', lesson.id) === bookmarkSetBookmarkLesson
      )[0]

      // If everything is good, return the bookmark lesson. Otherwise, return an empty string.
      return bookmarkLesson && bookmarkSet
        ? `${getLessonInfo('subtitle', bookmarkLesson.id)} ${
            bookmarkLesson.title
          }`
        : ''
    } else return ''
  }

  /**
   * Sets the left and right buttons of the <GroupItem /> appropriately when necessary.
   */
  useEffect(() => {
    // Determine what to render for the delete button. This button shows up next to groups in editing mode if that group is able to be deleted. Exceptions are that you can't delete the active group and that you can't delete a group that's the last in a language instance.
    if (activeGroup.name !== thisGroup.name && !isLastGroupInLanguageInstance)
      setLeftButton(
        <Animated.View style={{ transform: [{ translateX: groupItemXPos }] }}>
          <TouchableOpacity
            style={styles.minusButtonContainer}
            onPress={() => {
              Alert.alert(
                t.groups.delete_group_title,
                t.groups.delete_group_message,
                [
                  {
                    text: t.general.cancel,
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: t.general.ok,
                    onPress: () => onDeleteGroupButtonPress(thisGroup.name),
                    style: 'destructive',
                  },
                ]
              )
            }}
          >
            <Icon
              name='minus-filled'
              size={24 * scaleMultiplier}
              color={colors(isDark).error}
            />
          </TouchableOpacity>
        </Animated.View>
      )
    else if (activeGroup.name === thisGroup.name)
      setLeftButton(
        <Animated.View
          style={{
            ...styles.minusButtonContainer,
            transform: [{ translateX: groupItemXPos }],
          }}
        >
          <Icon
            name='check'
            size={24 * scaleMultiplier}
            color={colors(isDark).highlight}
          />
        </Animated.View>
      )
    else if (isLastGroupInLanguageInstance)
      setLeftButton(
        <View
          style={{
            // Make the width such that the group avatar/text doesn't change position in editing mode. This width makes up for the padding that is lost in editing mode.
            width: 24 * scaleMultiplier + 40,
          }}
        />
      )

    // Determine what to render for the 'right' button. This button highlights the active group with a blue checkmark while in regular mode and switches to a right arrow for all groups while in edit mode.
    if (isEditing)
      setRightIcon(
        <View style={styles.iconContainer}>
          <Icon
            name={isRTL ? 'arrow-left' : 'arrow-right'}
            size={36 * scaleMultiplier}
            color={colors(isDark).disabled}
          />
        </View>
      )
    else if (activeGroup.name === thisGroup.name)
      setRightIcon(
        <View style={styles.iconContainer}>
          <Icon
            name='check'
            size={24 * scaleMultiplier}
            color={colors(isDark).highlight}
          />
        </View>
      )
    else
      setRightIcon(
        <View
          style={{ ...styles.iconContainer, width: 24 * scaleMultiplier }}
        />
      )
  }, [isEditing, activeGroup, isLastGroupInLanguageInstance])

  return (
    <View
      style={{
        ...styles.groupItemContainer,
        backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        borderLeftWidth: isRTL ? 0 : 5,
        borderRightWidth: isRTL ? 5 : 0,
        borderColor: colors(isDark, thisGroup.language).accent,
      }}
    >
      {leftButton}
      <TouchableOpacity
        style={{
          ...styles.touchableAreaContainer,
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
        onPress={() => onGroupItemPress(thisGroup)}
      >
        <Animated.View
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
            transform: [{ translateX: groupItemXPos }],
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
          <View
            style={{
              ...styles.groupTextContainer,
              marginLeft: isRTL ? 0 : 20,
              marginRight: isRTL ? 20 : 0,
            }}
          >
            <Text
              style={{
                ...type(
                  // Always display the group name in the group's language's font, not the active group's font.
                  thisGroup.language,
                  'h3',
                  'Black',
                  'left',
                  colors(isDark).text
                ),
                textAlign: isRTL ? 'right' : 'left',
              }}
              numberOfLines={1}
            >
              {thisGroup.name}
            </Text>
            {getBookmarkLesson() === '' ? null : (
              <Text
                style={{
                  ...type(
                    // Similarly, display the bookmark text in the group's language's font, not the active group's language's font.
                    thisGroup.language,
                    'd',
                    'Regular',
                    'left',
                    colors(isDark).secondaryText
                  ),
                  textAlign: isRTL ? 'right' : 'left',
                }}
                numberOfLines={1}
              >
                {getBookmarkLesson()}
              </Text>
            )}
          </View>
        </Animated.View>
        {rightIcon}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  groupItemContainer: {
    height: 80 * scaleMultiplier,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableAreaContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  minusButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 20,
  },
  groupTextContainer: {
    flex: 1,
    height: '100%',
    flexWrap: 'nowrap',
  },
})

export default GroupItem
