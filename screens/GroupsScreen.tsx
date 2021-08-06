import * as FileSystem from 'expo-file-system'
import { Group } from 'interfaces/groups'
import { InfoAndGroupsForLanguage } from 'interfaces/languages'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { SectionList, StyleSheet, View } from 'react-native'
import AddNewGroupButton from '../components/AddNewGroupButton'
import AddNewLanguageInstanceButton from '../components/AddNewLanguageInstanceButton'
import GroupItem from '../components/GroupItem'
import GroupListHeader from '../components/GroupListHeader'
import GroupsScreenEditButton from '../components/GroupsScreenEditButton'
import WahaBackButton from '../components/WahaBackButton'
import WahaSeparator from '../components/WahaSeparator'
import {
  getInstalledLanguagesData,
  info,
} from '../functions/languageDataFunctions'
import { selector, useAppDispatch } from '../hooks'
import AddEditGroupModal from '../modals/AddEditGroupModal'
import { changeActiveGroup } from '../redux/actions/activeGroupActions'
import { deleteLanguageData } from '../redux/actions/databaseActions'
import { removeDownload } from '../redux/actions/downloadActions'
import { deleteGroup } from '../redux/actions/groupsActions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { getTranslations } from '../translations/translationsConfig'

interface Props {}

/**
 * A screen that displays all of the installed language instances and the groups in those language instances. Allows for switching the active group and  editing, deleting, and adding groups & languages.
 */
const GroupsScreen: FC<Props> = ({
  // Props passed from navigation.
  navigation: { setOptions, goBack, navigate },
  // Props passed from redux.
}): ReactElement => {
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const activeGroup = selector((state) => activeGroupSelector(state))
  const t = getTranslations(activeGroup.language)
  const isRTL = info(activeGroup.language).isRTL
  const database = selector((state) => state.database)
  const groups = selector((state) => state.groups)

  const dispatch = useAppDispatch()

  /** Keeps track of whether the screen is in editing mode or not. Editing mode is enabled via a button in the header and switches a lot of functionality on the screen. */
  const [isEditing, setIsEditing] = useState(false)

  /** useEffect function that sets the navigation options for this screen. Unlock similar functions in other screens, this one is updated more often since the header must update whenever the active group changes and when editingMode changes. */
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

  /** When adding a new group, this state keeps track of the language instance that the user is adding a group in so it can be passed into the CreateGroup() function. */
  const [languageID, setLanguageID] = useState(activeGroup.language)

  /** When editing a specific group, this component stores the object for the group that is being edited. */
  const [editingGroup, setEditingGroup] = useState(activeGroup)

  /** Keeps track of whether the add group modal is visible. */
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)

  /** Keeps track of whether the edit group modal is visible. */
  const [showEditGroupModal, setShowEditGroupModal] = useState(false)

  /** Deletes an entire language instance. This involves deleting every group, every downloaded file, and all data stored in redux for a language instance. Triggered by pressing the trash can icon next to the langauge's name in editing mode. */
  const deleteLanguageInstance = (languageID: string) => {
    // Delete every group for this language instance.
    groups.map((group) => {
      if (group.language === languageID) {
        dispatch(deleteGroup(group.name))
      }
    })

    if (FileSystem.documentDirectory !== null)
      // Delete all downloaded files for this language instance.
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(
        (contents) => {
          for (const item of contents) {
            if (item.slice(0, 2) === languageID) {
              FileSystem.deleteAsync(FileSystem.documentDirectory + item)
              dispatch(removeDownload(item.slice(0, 5)))
            }
          }
        }
      )

    // Delete redux data for this language instance.
    dispatch(deleteLanguageData(languageID))
  }

  /**
   * Renders a GroupListHeader component used for the Groups SectionList section header.
   * @param {Object} languageInstance - The object for the language instance to render.
   * @return {Component} - The GroupListHeader component.
   */
  const renderGroupListHeader = (language: InfoAndGroupsForLanguage) => (
    <GroupListHeader
      nativeName={language.nativeName}
      languageID={language.languageID}
      isEditing={isEditing}
      isRTL={isRTL}
      t={t}
      isDark={isDark}
      activeGroup={activeGroup}
      deleteLanguageInstance={deleteLanguageInstance}
    />
  )

  /**
   * Renders a GroupItem component used for the Groups SectionList item.
   * @param {Object} group - The object for the group to render.
   * @return {Component} - The GroupItem component.
   */
  const renderGroupItem = (group: Group) => (
    <GroupItem
      thisGroup={group}
      isEditing={isEditing}
      openEditModal={() => {
        setEditingGroup(group)
        setShowEditGroupModal(true)
      }}
      database={database}
      isRTL={isRTL}
      isDark={isDark}
      groups={groups}
      t={t}
      activeGroup={activeGroup}
      deleteGroup={(groupName: string) => dispatch(deleteGroup(groupName))}
      changeActiveGroup={(groupName: string) =>
        dispatch(changeActiveGroup(groupName))
      }
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
        sections={getInstalledLanguagesData(database, groups)}
        renderItem={({ item }) => renderGroupItem(item)}
        renderSectionHeader={({ section }) => renderGroupListHeader(section)}
        keyExtractor={(item) => item.name}
        extraData={isRTL}
        ItemSeparatorComponent={() => <WahaSeparator isDark={isDark} />}
        SectionSeparatorComponent={() => <WahaSeparator isDark={isDark} />}
        renderSectionFooter={({ section }) => (
          <AddNewGroupButton
            section={section}
            setLanguageID={(languageID: string) => setLanguageID(languageID)}
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
            navigate={(screen: string, params: Object) =>
              navigate(screen, params)
            }
            languageAndGroupData={getInstalledLanguagesData(database, groups)}
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
