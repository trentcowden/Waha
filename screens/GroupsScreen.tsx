import { StackNavigationProp } from '@react-navigation/stack'
import { LanguageID } from 'languages'
import { MainStackParams } from 'navigation/MainStack'
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react'
import { SectionList, StyleSheet, View } from 'react-native'
import AddNewGroupButton from '../components/AddNewGroupButton'
import AddNewLanguageInstanceButton from '../components/AddNewLanguageInstanceButton'
import GroupItem from '../components/GroupItem'
import GroupListHeader from '../components/GroupListHeader'
import GroupsScreenEditButton from '../components/GroupsScreenEditButton'
import WahaBackButton from '../components/WahaBackButton'
import WahaSeparator from '../components/WahaSeparator'
import {
  deleteLanguage,
  getInstalledLanguagesInfoAndGroups,
  info,
} from '../functions/languageDataFunctions'
import { InfoAndGroupsForLanguage } from '../languages'
import AddEditGroupModal from '../modals/AddEditGroupModal'
import { selector, useAppDispatch } from '../redux/hooks'
import {
  activeGroupSelector,
  changeActiveGroup,
} from '../redux/reducers/activeGroup'
import { deleteGroup, Group } from '../redux/reducers/groups'
import { colors } from '../styles/colors'
import { getTranslations } from '../translations/translationsConfig'

type GroupsScreenScreenNavigationProp = StackNavigationProp<
  MainStackParams,
  'Groups'
>

interface Props {
  navigation: GroupsScreenScreenNavigationProp
}

/* 
  A screen that displays all of the installed language instances and the groups in those language instances. Allows for switching the active group and  editing, deleting, and adding groups & languages.
*/
const GroupsScreen: FC<Props> = ({
  navigation: { setOptions, goBack, navigate },
}): ReactElement => {
  // Redux state/dispatch.
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const activeGroup = selector((state) => activeGroupSelector(state))
  const t = getTranslations(activeGroup.language)
  const isRTL = info(activeGroup.language).isRTL
  const database = selector((state) => state.database)
  const groups = selector((state) => state.groups)
  const dispatch = useAppDispatch()

  /** Keeps track of whether the screen is in editing mode or not. Editing mode is enabled via a button in the header and switches a lot of functionality on the screen. */
  const [isEditing, setIsEditing] = useState(false)

  /** When adding a new group, this state keeps track of the language instance that the user is adding a group in so it can be passed into the CreateGroup() function. */
  const [languageID, setLanguageID] = useState(activeGroup.language)

  /** When editing a specific group, this component stores the object for the group that is being edited. */
  const [editingGroup, setEditingGroup] = useState(activeGroup)

  /** Keeps track of whether the add group modal is visible. */
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)

  /** Keeps track of whether the edit group modal is visible. */
  const [showEditGroupModal, setShowEditGroupModal] = useState(false)

  // Memoize the group data so that the expensive function isn't run on every re-render.
  const groupData = useMemo(
    () => getInstalledLanguagesInfoAndGroups(database, groups),
    [database, groups]
  )

  /**
   * Updates the header whenever the Active Group (to handle Language changes) changes and when isEditing changes.
   */
  useEffect(() => {
    setOptions({
      headerStyle: {
        // Switch the background color of the header in editing mode to reflect that we're in a non-standard screen view.
        backgroundColor: isEditing
          ? colors(isDark).highlight
          : isDark
          ? colors(isDark).bg1
          : colors(isDark).bg3,
        elevation: 0,
        shadowColor: 'transparent',
      },
      headerTitleStyle: {
        // Update the header text color to go with the background color changes.
        color: isEditing ? colors(isDark).textOnColor : colors(isDark).text,
        fontFamily: info(activeGroup.language).font + '-Bold',
      },
      headerRight: isRTL
        ? () => (
            <WahaBackButton
              color={isEditing ? colors(isDark).bg4 : undefined}
              onPress={() => goBack()}
              isRTL={isRTL}
              isDark={isDark}
            />
          )
        : () => (
            <GroupsScreenEditButton
              onPress={() => setIsEditing((old) => !old)}
              isEditing={isEditing}
              isDark={isDark}
              activeGroup={activeGroup}
              t={t}
              isRTL={isRTL}
            />
          ),
      headerLeft: isRTL
        ? () => (
            <GroupsScreenEditButton
              onPress={() => setIsEditing((old) => !old)}
              isEditing={isEditing}
              isDark={isDark}
              activeGroup={activeGroup}
              t={t}
              isRTL={isRTL}
            />
          )
        : () => (
            <WahaBackButton
              color={isEditing ? colors(isDark).bg4 : undefined}
              onPress={() => goBack()}
              isRTL={isRTL}
              isDark={isDark}
            />
          ),
    })
  }, [isEditing, isRTL, activeGroup])

  /**
   * Handles the press of the delete language button and deletes a language.
   */
  const handleDeleteLanguageButtonPress = (languageID: LanguageID) =>
    deleteLanguage(languageID, groups, dispatch)

  /**
   * Takes the user to the <LanguageSelectScreen /> so they can add a subsequent Language.
   */
  const handleAddNewLanguageButtonPress = () => {
    navigate('SubsequentLanguageSelect', {
      languageWithVersions: undefined,
      // Send over the currently installed language instances so that we can filter those out from the options.
      installedLanguageInstances: getInstalledLanguagesInfoAndGroups(
        database,
        groups
      ),
    })
  }

  /**
   * Deletes a Group from redux.
   */
  const handleDeleteGroupButtonPress = (groupName: string) => {
    dispatch(deleteGroup({ groupName }))
  }

  /**
   * Changes the Active Group if isEditing is false or opens the <AddEditGroupModal /> for the Group if isEditing is true.
   */
  const handleGroupItemPress = (group: Group) => {
    if (isEditing) {
      setEditingGroup(group)
      setShowEditGroupModal(true)
    } else dispatch(changeActiveGroup({ groupName: group.name }))
  }

  /**
   * Renders a <GroupListHeader /> component.
   */
  const renderGroupListHeader = ({
    section,
  }: {
    section: InfoAndGroupsForLanguage
  }) => (
    <GroupListHeader
      nativeName={section.nativeName}
      languageID={section.languageID}
      isEditing={isEditing}
      isRTL={isRTL}
      t={t}
      isDark={isDark}
      activeGroup={activeGroup}
      onDeleteLanguageButtonPress={handleDeleteLanguageButtonPress}
    />
  )

  /**
   * Renders a <GroupItem /> component.
   */
  const renderGroupItem = ({ item }: { item: Group }) => (
    <GroupItem
      thisGroup={item}
      isEditing={isEditing}
      database={database}
      isRTL={isRTL}
      isDark={isDark}
      groups={groups}
      t={t}
      activeGroup={activeGroup}
      onDeleteGroupButtonPress={handleDeleteGroupButtonPress}
      onGroupItemPress={handleGroupItemPress}
    />
  )

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
      }}
    >
      <SectionList
        sections={groupData}
        renderItem={renderGroupItem}
        renderSectionHeader={renderGroupListHeader}
        keyExtractor={(item) => item.name}
        extraData={isRTL}
        ItemSeparatorComponent={() => <WahaSeparator isDark={isDark} />}
        SectionSeparatorComponent={() => <WahaSeparator isDark={isDark} />}
        renderSectionFooter={({ section }) => (
          <AddNewGroupButton
            section={section}
            setLanguageID={(languageID: LanguageID) =>
              setLanguageID(languageID)
            }
            setShowAddGroupModal={(toSet: boolean) =>
              setShowAddGroupModal(toSet)
            }
            isRTL={isRTL}
            isDark={isDark}
            t={t}
            activeGroup={activeGroup}
          />
        )}
        ListHeaderComponent={() => (
          <View style={{ height: 10, width: '100%' }} />
        )}
        ListFooterComponent={
          <AddNewLanguageInstanceButton
            onAddNewLanguageButtonPress={handleAddNewLanguageButtonPress}
            numInstalledLanguages={
              getInstalledLanguagesInfoAndGroups(database, groups).length
            }
            isRTL={isRTL}
            isDark={isDark}
            t={t}
            activeGroup={activeGroup}
          />
        }
      />
      {/* Modals */}
      <AddEditGroupModal
        isVisible={showAddGroupModal}
        hideModal={() => setShowAddGroupModal(false)}
        mode='AddGroup'
        languageID={languageID}
      />
      <AddEditGroupModal
        isVisible={showEditGroupModal}
        hideModal={() => setShowEditGroupModal(false)}
        mode='EditGroup'
        thisGroup={editingGroup}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default GroupsScreen
