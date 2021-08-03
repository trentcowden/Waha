import React, { useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PagerView from 'react-native-pager-view'
import { connect } from 'react-redux'
import EmojiViewer from '../components/EmojiViewer'
import GroupNameTextInput from '../components/GroupNameTextInput'
import OnboardingImage from '../components/OnboardingImage'
import OnboardingPage from '../components/OnboardingPage'
import PageDots from '../components/PageDots'
import WahaButton from '../components/WahaButton'
import { buttonModes, groupNames, scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { changeActiveGroup } from '../redux/actions/activeGroupActions'
import { setHasOnboarded } from '../redux/actions/databaseActions'
import { editGroup } from '../redux/actions/groupsActions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

function mapStateToProps (state) {
  return {
    isRTL: info(activeGroupSelector(state).language).isRTL,
    isDark: state.settings.isDarkModeEnabled,
    activeGroup: activeGroupSelector(state),
    t: getTranslations(activeGroupSelector(state).language)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setHasOnboarded: toSet => dispatch(setHasOnboarded(toSet)),
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
    changeActiveGroup: groupName => dispatch(changeActiveGroup(groupName))
  }
}

const numPages = 4

/**
 * Screen that takes the user through a couple onboarding slides describing what Waha is and allows them to customize their first group.
 * @param {string} selectedLanguage - The language that the user selected just before going into the onboarding slides.
 */
const WahaOnboardingSlidesScreen = ({
  // Props passed from navigation.
  navigation: { navigate },
  route: {
    // Props passed from previous screen.
    params: { selectedLanguage }
  },
  // Props passed from redux.
  isRTL,
  isDark,
  activeGroup,
  t,
  setHasOnboarded,
  editGroup,
  changeActiveGroup
}) => {
  /** The ref for the pager view. Used to manually swipe pages. */
  const pagerRef = useRef()

  // i18n.locale = selectedLanguage

  /** Ref for the group name text input. */
  const groupNameInputRef = useRef()

  /** Keeps track of onboarding page we're currently on. */
  const [activePage, setActivePage] = useState(0)

  /** Keeps track of the user's group name input and emoji selection. */
  const [groupNameInput, setGroupNameInput] = useState('')
  const [emojiInput, setEmojiInput] = useState('default')

  /** Edits a group and sets it as the active group. */
  const editGroupAndFinish = () => {
    // If the name of the new group is blank, just finish onboarding and leave the group as default.
    if (groupNameInput === '') {
      skipOnboarding()
      return
    }

    // Change the active group to the newly edited group.
    changeActiveGroup(groupNameInput)

    // Call editGroup() redux function.
    editGroup(groupNames[selectedLanguage], groupNameInput, emojiInput, true)

    // Finish up onboarding and go to the loading screen.
    setHasOnboarded(true)
    navigate('Loading', {
      selectedLanguage: selectedLanguage
    })
  }

  /** Skips onboarding and just goes straight to the loading screen. */
  const skipOnboarding = () => {
    setHasOnboarded(true)
    navigate('Loading', {
      selectedLanguage: selectedLanguage
    })
  }

  // The 4 onboarding pages. These are stored here in an array so that we can call pages.reverse() to reverse the order of the pages for RTL languages.
  const pages = [
    <OnboardingPage
      key='1'
      title={t.onboarding.onboarding_1_title}
      message={t.onboarding.onboarding_1_message}
      isDark={isDark}
      activeGroup={activeGroup}
    >
      <OnboardingImage
        imageType='lottie'
        source={require('../assets/lotties/onboarding1.json')}
        isDark={isDark}
      />
    </OnboardingPage>,
    <OnboardingPage
      key='2'
      title={t.onboarding.onboarding_2_title}
      message={t.onboarding.onboarding_2_message}
      isDark={isDark}
      activeGroup={activeGroup}
    >
      <OnboardingImage
        imageType='lottie'
        source={require('../assets/lotties/onboarding2.json')}
        isDark={isDark}
      />
    </OnboardingPage>,
    <OnboardingPage
      key='3'
      title={t.onboarding.onboarding_3_title}
      message={t.onboarding.onboarding_3_message}
      isDark={isDark}
      activeGroup={activeGroup}
    >
      <OnboardingImage
        imageType='lottie'
        source={require('../assets/lotties/onboarding3.json')}
        isDark={isDark}
      />
    </OnboardingPage>,
    <OnboardingPage
      key='4'
      title={t.onboarding.onboarding_4_title}
      message={t.onboarding.onboarding_4_message}
      isDark={isDark}
      activeGroup={activeGroup}
    >
      <GroupNameTextInput
        groupNameInput={groupNameInput}
        setGroupNameInput={setGroupNameInput}
        groupNameInputRef={groupNameInputRef}
        activeGroup={activeGroup}
        isRTL={isRTL}
        isDark={isDark}
        t={t}
      />
      <EmojiViewer
        emojiInput={emojiInput}
        setEmojiInput={setEmojiInput}
        activeGroup={activeGroup}
        isDark={isDark}
        t={t}
      />
    </OnboardingPage>
  ]

  return (
    <SafeAreaView
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3
      }}
    >
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={isRTL ? numPages - 1 : 0}
        onPageSelected={event => {
          // Focus the group name text input when the user reaches the last page. Note: it's numPages - 1 because the indices for the pages start at 0.
          if (
            (!isRTL && event.nativeEvent.position === numPages - 1) ||
            (isRTL && event.nativeEvent.position === 0)
          )
            groupNameInputRef.current.focus()

          // Set the active page to the new page.
          setActivePage(event.nativeEvent.position)
        }}
      >
        {isRTL ? pages.reverse() : pages}
      </PagerView>
      <View
        style={{
          ...styles.bottomControlsContainer,
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}
      >
        <PageDots
          numDots={numPages}
          activeDot={activePage}
          isRTL={isRTL}
          isDark={isDark}
        />
        <View
          style={{
            ...styles.skipButtonContainer,
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}
        >
          <TouchableOpacity
            onPress={skipOnboarding}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={type(
                activeGroup.language,
                'h4',
                'Bold',
                'center',
                colors(isDark).text
              )}
            >
              {t.general.skip}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: 20 }} />
        <WahaButton
          label={t.general.continue}
          onPress={
            // This button goes to the next page or finishes onboarding if we're on the last page.
            isRTL
              ? activePage === 0
                ? editGroupAndFinish
                : () => pagerRef.current.setPage(activePage - 1)
              : activePage === 3
              ? editGroupAndFinish
              : () => pagerRef.current.setPage(activePage + 1)
          }
          mode={buttonModes.SUCCESS}
          extraContainerStyles={{
            // Make the continue button twice as big as the skip button.
            flex: 2
          }}
          isDark={isDark}
          isRTL={isRTL}
          language={activeGroup.language}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center'
  },
  pager: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomControlsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  skipButtonContainer: {
    height: 65 * scaleMultiplier,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WahaOnboardingSlidesScreen)
