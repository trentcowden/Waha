import { Emoji } from 'assets/groupIcons/_groupIcons'
import { LanguageID } from 'languages'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../assets/fonts/icon_font_config'
import EmojiViewer from '../components/EmojiViewer'
import GroupAvatar from '../components/GroupAvatar'
import GroupNameTextInput from '../components/GroupNameTextInput'
import { scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import ModalScreen from '../modals/ModalScreen'
import { selector, useAppDispatch } from '../redux/hooks'
import {
  activeGroupSelector,
  changeActiveGroup,
} from '../redux/reducers/activeGroup'
import { createGroup, editGroup, Group } from '../redux/reducers/groups'
import { incrementGlobalGroupCounter } from '../redux/reducers/languageInstallation'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

interface Props {
  isVisible: boolean
  hideModal: () => void
  // Whether the user is editing an existing group or adding a new group. Possible options are 'EditGroup' or 'AddGroup'.
  mode: string
  // If editing a group, this is the object for that group.
  thisGroup?: Group
  // If creating a new group, we need the langaugeID for when we call the CreateGroup() redux function.
  languageID?: LanguageID
}

// Modal that allows the user to add or edit a group. Uses the <ModalScreen /> component under the hood.
const AddEditGroupModal: FC<Props> = ({
  isVisible,
  hideModal,
  mode,
  thisGroup,
  languageID,
}): ReactElement => {
  // Redux state/dispatch.
  const activeGroup = selector((state) => activeGroupSelector(state))
  const isRTL = info(activeGroup.language).isRTL
  const t = getTranslations(activeGroup.language)
  const groups = selector((state) => state.groups)
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const globalGroupCounter = selector(
    (state) => state.languageInstallation.globalGroupCounter
  )
  const areMobilizationToolsUnlocked = selector(
    (state) => state.areMobilizationToolsUnlocked
  )
  const dispatch = useAppDispatch()

  /** Keeps track of the user input for the group name <TextInput />. */
  const [groupNameInput, setGroupNameInput] = useState('')

  /** Keeps track of the user selection for the group emoji. */
  const [emojiInput, setEmojiInput] = useState<Emoji>('default')

  /** Whether the slider for showing/hiding the Mobilization Tools tab should be visible or not. */
  const [shouldShowMTTabInput, setShouldShowMTTabInput] = useState(
    areMobilizationToolsUnlocked ? false : true
  )

  /** Whether the <GroupNameTextInput /> is blank. */
  const [isGroupNameBlank, setIsGroupNameBlank] = useState(
    mode === 'EditGroup' ? false : true
  )

  /** Whether the name the user types into the <GroupNameTextInput /> is the same as a Group name that already exists. */
  const [isGroupNameDuplicate, setIsGroupNameDuplicate] = useState(false)

  /**
   * Checks for duplicates and blanks whenever the group name input changes.
   */
  useEffect(() => {
    checkForDuplicate()
    checkForBlank()
  }, [groupNameInput])

  /**
   * Checks if a user-inputted group name is a duplicate of another group. The process for checking is different if we're editing vs. adding a group.
   */
  const checkForDuplicate = () => {
    // If we're adding a new group, simply check if the group name already exists in another group.
    if (mode === 'AddGroup')
      if (groups.some((group) => group.name === groupNameInput))
        setIsGroupNameDuplicate(true)
      else setIsGroupNameDuplicate(false)
    // If we're editing a group, check if any group has the same name but obvously don't count it as a duplicate for itself.
    else if (
      thisGroup !== undefined &&
      groups.some(
        (group) =>
          group.name === groupNameInput && thisGroup.name !== groupNameInput
      )
    )
      setIsGroupNameDuplicate(true)
    else setIsGroupNameDuplicate(false)
  }

  /**
   * Checks if a user-inputted group name is blank.
   */
  const checkForBlank = () => {
    if (groupNameInput === '') setIsGroupNameBlank(true)
    else setIsGroupNameBlank(false)
  }

  /**
   * Creates a new group and sets it as the active group.
   */
  const createGroupHandler = () => {
    if (languageID !== undefined)
      // Call createGroup() redux function.
      dispatch(
        createGroup({
          groupName: groupNameInput,
          language: languageID,
          emoji: emojiInput,
          shouldShowMobilizationToolsTab: shouldShowMTTabInput,
          groupID: globalGroupCounter + 1,
          groupNumber: groups.length + 1,
        })
      )

    // Change the active group to the newly created group.
    dispatch(changeActiveGroup({ groupName: groupNameInput }))

    // Increment the global group counter redux variable.
    dispatch(incrementGlobalGroupCounter())

    // Hide this modal.
    hideModal()
  }

  /**
   * Edits a group and sets it as the active group.
   */
  const editGroupHandler = () => {
    // Change the active group to the newly edited group.
    if (thisGroup !== undefined && thisGroup.name === activeGroup.name)
      dispatch(changeActiveGroup({ groupName: groupNameInput }))

    // Call editGroup() redux function.
    if (thisGroup !== undefined)
      dispatch(
        editGroup({
          oldGroupName: thisGroup.name,
          newGroupName: groupNameInput,
          emoji: emojiInput,
          shouldShowMobilizationToolsTab: shouldShowMTTabInput,
        })
      )

    // Hide this modal.
    hideModal()
  }

  /**
   * Handles the changing of the <GroupNameTextInput />.
   */
  const handleGroupNameInputChangeText = (text: string) => {
    setGroupNameInput(text)
  }

  /**
   * Handles the changing of the selected emoji in the <EmojiViewer />.
   */
  const handleEmojiPress = (emoji: Emoji) => {
    setEmojiInput(emoji)
  }

  return (
    <ModalScreen
      isVisible={isVisible}
      hideModal={hideModal}
      topRightComponent={
        !isGroupNameBlank && !isGroupNameDuplicate ? (
          <TouchableOpacity
            onPress={
              mode === 'AddGroup' ? createGroupHandler : editGroupHandler
            }
            style={{
              width: 45 * scaleMultiplier,
              height: 45 * scaleMultiplier,
            }}
          >
            <Icon
              name='check'
              size={40 * scaleMultiplier}
              color={colors(isDark).icons}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )
      }
      onCancelPress={() => {
        // Clear out the inputs when we close the modal.
        setGroupNameInput('')
        setEmojiInput('default')
        setShouldShowMTTabInput(areMobilizationToolsUnlocked ? false : true)
      }}
      onModalWillShow={
        mode === 'AddGroup'
          ? () => {
              setGroupNameInput('')
              setEmojiInput('default')
            }
          : () => {
              if (thisGroup) {
                // If we're editing a group, populate our state with the name and emoji of that group.
                setGroupNameInput(thisGroup.name)
                setEmojiInput(thisGroup.emoji)
                setShouldShowMTTabInput(
                  thisGroup.shouldShowMobilizationToolsTab
                )
              }
            }
      }
      title={mode === 'AddGroup' ? t.groups.new_group : t.groups.edit_group}
      isRTL={isRTL}
      activeGroup={activeGroup}
      isDark={isDark}
    >
      <View style={styles.groupAvatarContainer}>
        <GroupAvatar
          style={{
            backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg1,
          }}
          emoji={emojiInput}
          size={120}
          isDark={isDark}
          isRTL={isRTL}
        />
      </View>
      <GroupNameTextInput
        groupNameInput={groupNameInput}
        onGroupNameInputChangeText={handleGroupNameInputChangeText}
        isDuplicate={isGroupNameDuplicate}
        activeGroup={activeGroup}
        isRTL={isRTL}
        isDark={isDark}
        t={t}
      />
      {areMobilizationToolsUnlocked && (
        <View style={{ width: '100%', paddingHorizontal: 20, maxWidth: 500 }}>
          <View
            style={{
              ...styles.shouldShowMTTabInputContainer,
              flexDirection: isRTL ? 'row-reverse' : 'row',
              borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
              backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
            }}
          >
            <Text
              style={type(
                activeGroup.language,
                'h3',
                'Regular',
                'left',
                colors(isDark).text
              )}
            >
              {t.mobilization_tools.show_mobilization_tab}
            </Text>
            <Switch
              trackColor={{
                false: colors(isDark).disabled,
                true: colors(isDark).success,
              }}
              thumbColor={isDark ? colors(isDark).icons : colors(isDark).bg4}
              ios_backgroundColor={colors(isDark).disabled}
              onValueChange={() =>
                setShouldShowMTTabInput((current) => !current)
              }
              value={shouldShowMTTabInput}
              disabled={areMobilizationToolsUnlocked ? false : true}
            />
          </View>
        </View>
      )}
      <EmojiViewer
        emojiInput={emojiInput}
        onEmojiPress={handleEmojiPress}
        activeGroup={activeGroup}
        isDark={isDark}
        t={t}
        isRTL={isRTL}
      />
    </ModalScreen>
  )
}

const styles = StyleSheet.create({
  groupAvatarContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20 * scaleMultiplier,
  },
  shouldShowMTTabInputContainer: {
    width: '100%',
    paddingHorizontal: 10,
    height: 60 * scaleMultiplier,
    maxWidth: 500,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 20 * scaleMultiplier,
  },
})

export default AddEditGroupModal

// Someday we'll let the user set a custom photo as their group avatar...until then this code will remain sad and neglected.

// async function openImageLibraryHandler () {
//   var permissionGranted = false
//   await ImagePicker.getCameraRollPermissionsAsync().then(
//     permissionResponse => {
//       if (permissionResponse.status !== 'granted') {
//         ImagePicker.requestCameraRollPermissionsAsync().then(
//           permissionResponse => {
//             if (permissionResponse.status === 'granted') {
//               openImageLibraryHandler()
//             }
//           }
//         )
//       } else {
//         permissionGranted = true
//       }
//     }
//   )
//   if (permissionGranted) {
//     ImagePicker.launchImageLibraryAsync({}).then(returnObject => {
//       if (returnObject.cancelled !== true) {
//         setAvatarSource(returnObject.uri)
//       }
//       setShowImagePickerModal(false)
//     })
//   }
// }

// async function openCameraHandler () {
//   var permissionGranted = false
//   await ImagePicker.getCameraPermissionsAsync().then(permissionResponse => {
//     if (permissionResponse.status !== 'granted') {
//       ImagePicker.requestCameraPermissionsAsync().then(permissionResponse => {
//         if (permissionResponse.status === 'granted') {
//           openCameraHandler()
//         }
//       })
//     } else {
//       permissionGranted = true
//     }
//   })
//   if (permissionGranted) {
//     ImagePicker.launchCameraAsync({}).then(returnObject => {
//       if (returnObject.cancelled !== true) {
//         setAvatarSource(returnObject.uri)
//       }
//       setShowImagePickerModal(false)
//     })
//   }
// }
