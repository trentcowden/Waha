import React, { FC, ReactElement } from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Lesson, ScripturePassage, StorySet } from 'redux/reducers/database'
import Icon from '../assets/fonts/icon_font_config'
import SetItem from '../components/SetItem'
import WahaButton from '../components/WahaButton'
import { scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { selector, useAppDispatch } from '../hooks'
import { SetItemMode, WahaButtonMode } from '../interfaces/components'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { addSet } from '../redux/reducers/groups'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'
import ModalScreen from './ModalScreen'

interface Props {
  isVisible: boolean
  hideModal: () => void
  thisSet: StorySet | undefined
  showSnackbar: () => void
}

/**
 * A modal that displays the various lessons in a set and their scripture references. Uses <ModalScreen /> under the hood.
 * @param {boolean} isVisible - Whether the modal is visible.
 * @param {Function} hideModal - Function to hide the modal.
 * @param {Object} thisSet - The object for the set we're displaying the information about.
 * @param {boolean} showSnackbar - Whether to show the "Set Added!" Snackbar component or not.
 */
const SetInfoModal: FC<Props> = ({
  isVisible,
  hideModal,
  thisSet,
  showSnackbar,
}): ReactElement => {
  const activeGroup = selector((state) => activeGroupSelector(state))
  const isRTL = info(activeGroup.language).isRTL
  const t = getTranslations(activeGroup.language)
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const font = info(activeGroup.language).font
  const dispatch = useAppDispatch()

  /**
   * Renders a item with the information for a lesson.
   * @param {Object} item - The lesson to render.
   * */
  const renderLessonInfoItem = ({ item }: { item: Lesson }) => {
    // If lesson has scripture, format the list of scripture to be a string with the Scripture addresses separated by commas.
    var scriptureList = ''
    if (item.scripture) {
      scriptureList += item.scripture[0].header

      item.scripture.forEach((passage: ScripturePassage, index: number) => {
        if (index !== 0) scriptureList += ', ' + passage.header
      })
    }

    return (
      // These use <TouchableOpacity /> instead of <View /> because scrolling a FlatList within a modal only works when the items are touchable. Wack.
      <TouchableOpacity
        style={{
          marginVertical: 10 * scaleMultiplier,
          justifyContent: 'center',
          paddingHorizontal: 40,
          width: Dimensions.get('window').width,
        }}
        // This disables the touchable feedback so it appears like a <View />.
        activeOpacity={1}
      >
        <Text
          style={type(
            activeGroup.language,
            'h4',
            'Bold',
            'left',
            colors(isDark).text
          )}
        >
          {item.title}
        </Text>

        {/* Display list of scripture below the title if this lesson has scripture (not all of them do). */}
        {item.scripture && (
          <Text
            style={type(
              activeGroup.language,
              'p',
              'Regular',
              'left',
              colors(isDark).secondaryText
            )}
          >
            {scriptureList}
          </Text>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <ModalScreen
      title={t.sets.set_details}
      hideModal={hideModal}
      isVisible={isVisible}
      isRTL={isRTL}
      activeGroup={activeGroup}
      isDark={isDark}
    >
      {thisSet ? (
        <View>
          <View style={styles.setItemContainer}>
            <SetItem
              thisSet={thisSet}
              mode={SetItemMode.SET_INFO_MODAL}
              font={font}
              isRTL={isRTL}
              isDark={isDark}
              activeGroup={activeGroup}
            />
          </View>
          <WahaButton
            mode={WahaButtonMode.SUCCESS}
            onPress={() => {
              dispatch(
                addSet({
                  groupName: activeGroup.name,
                  groupID: activeGroup.id,
                  set: thisSet,
                })
              )
              showSnackbar()
              hideModal()
            }}
            extraContainerStyles={{ marginVertical: 10 }}
            extraLabelStyles={{ flex: 1 }}
            label={t.sets.add_new_story_set}
            extraComponent={
              <Icon
                style={{ marginHorizontal: 10 }}
                color={colors(isDark).bg4}
                size={36 * scaleMultiplier}
                name='playlist-add'
              />
            }
            isDark={isDark}
            isRTL={isRTL}
            screenLanguage={activeGroup.language}
          />
          <FlatList
            keyExtractor={(item) => item.id}
            data={thisSet.lessons}
            renderItem={renderLessonInfoItem}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1 }}
            ListFooterComponent={() => <View style={{ height: 80 }} />}
          />
        </View>
      ) : (
        <View />
      )}
    </ModalScreen>
  )
}

const styles = StyleSheet.create({
  setItemContainer: {
    width: '100%',
    height: 100 * scaleMultiplier,
  },
})

export default SetInfoModal
