import { Audio } from 'expo-av'
import * as Localization from 'expo-localization'
import { locale } from 'i18n-js'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'
import { connect } from 'react-redux'
import { languageT2S } from '../assets/languageT2S/_languageT2S'
import LanguageItem from '../components/LanguageItem'
import WahaButton from '../components/WahaButton'
import WahaSeparator from '../components/WahaSeparator'
import { buttonModes, groupNames, scaleMultiplier } from '../constants'
import db from '../firebase/db'
import { getAllLanguagesData, info } from '../functions/languageDataFunctions'
import { changeActiveGroup } from '../redux/actions/activeGroupActions'
import {
  deleteLanguageData,
  downloadLanguageCoreFiles,
  incrementGlobalGroupCounter,
  setHasFetchedLanguageData,
  setRecentActiveGroup,
  storeLanguageData,
  storeLanguageSets
} from '../redux/actions/databaseActions'
import { createGroup, deleteGroup } from '../redux/actions/groupsActions'
import { setIsInstallingLanguageInstance } from '../redux/actions/isInstallingLanguageInstanceActions'
import { setIsDarkModeEnabled } from '../redux/actions/settingsActions'
import { storeDownloads } from '../redux/actions/storedDownloadsActions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

function mapStateToProps (state) {
  return {
    groups: state.groups,
    database: state.database,
    activeGroup: state.activeGroup === null ? {} : activeGroupSelector(state),
    isDark: state.settings.isDarkModeEnabled,
    t:
      state.activeGroup === null
        ? getTranslations(Localization.locale.slice(0, 2))
        : getTranslations(activeGroupSelector(state).language),
    isConnected: state.network.isConnected,
    isRTL:
      state.activeGroup === null
        ? info(Localization.locale.slice(0, 2)).isRTL
        : info(activeGroupSelector(state).language).isRTL,
    screenLanguage:
      state.activeGroup === null
        ? info(Localization.locale.slice(0, 2)).languageID
        : activeGroupSelector(state).language
  }
}

function mapDispatchToProps (dispatch) {
  return {
    downloadLanguageCoreFiles: languageInstanceID =>
      dispatch(downloadLanguageCoreFiles(languageInstanceID)),
    storeLanguageData: (data, languageInstanceID) =>
      dispatch(storeLanguageData(data, languageInstanceID)),
    setIsInstallingLanguageInstance: toSet =>
      dispatch(setIsInstallingLanguageInstance(toSet)),
    storeDownloads: downloads => dispatch(storeDownloads(downloads)),
    setHasFetchedLanguageData: hasFetchedLanguageData =>
      dispatch(setHasFetchedLanguageData(hasFetchedLanguageData)),
    storeLanguageSets: (sets, languageInstanceID) =>
      dispatch(storeLanguageSets(sets, languageInstanceID)),
    deleteLanguageData: languageInstanceID =>
      dispatch(deleteLanguageData(languageInstanceID)),
    deleteGroup: groupName => dispatch(deleteGroup(groupName)),
    incrementGlobalGroupCounter: () => dispatch(incrementGlobalGroupCounter()),
    createGroup: (
      groupName,
      language,
      emoji,
      shouldShowMobilizationToolsTab,
      groupID,
      groupNumber
    ) =>
      dispatch(
        createGroup(
          groupName,
          language,
          emoji,
          shouldShowMobilizationToolsTab,
          groupID,
          groupNumber
        )
      ),
    changeActiveGroup: name => {
      dispatch(changeActiveGroup(name))
    },
    setRecentActiveGroup: groupName => {
      dispatch(setRecentActiveGroup(groupName))
    },
    setIsDarkModeEnabled: toSet => dispatch(setIsDarkModeEnabled(toSet))
  }
}

/**
 * A screen that displays a list of language instances to install. This appears as the first screen the user sees when they open the app for the first time, as well as later if they want to install another language instance.
 * @param {string} routeName - The name of the screen variant. In this case, can either be "InitialLanguageInstanceInstall" or "SubsequentLanguageInstanceInstall" since this screen component is used twice.
 * @param {Object[]} installedLanguageInstances - (Optional) An array of languages instances that are currently installed. Defaults to null since there aren't any installed language instances when the user opens the app for the first time. This variable is only relevant when the user is installing a subsequent language instance.
 * @param {string} installedLanguageInstances[].languageID - The ID of the language.
 * @param {string} installedLanguageInstances[].languageName - The name of the language.
 */
const LanguageSelectScreen = ({
  // Props passed from navigation.
  navigation: { setOptions, goBack, reset, navigate },
  route: {
    name: routeName,
    // Props passed from previous screen.
    params: { installedLanguageInstances } = {
      installedLanguageInstances: []
    }
  },
  // Props passed from redux.
  font,
  groups,
  database,
  activeGroup,
  isDark,
  t,
  isConnected,
  isRTL,
  screenLanguage,
  downloadLanguageCoreFiles,
  storeLanguageData,
  setIsInstallingLanguageInstance,
  storeDownloads,
  setHasFetchedLanguageData,
  storeLanguageSets,
  deleteLanguageData,
  deleteGroup,
  incrementGlobalGroupCounter,
  createGroup,
  changeActiveGroup,
  setRecentActiveGroup,
  setIsDarkModeEnabled
}) => {
  /** Keeps track of the language that is currently selected. */
  const [selectedLanguage, setSelectedLanguage] = useState('')

  /** Keeps track of the Y position of the start button for animating. */
  const [buttonYPos, setButtonYPos] = useState(
    new Animated.Value(68 * scaleMultiplier + 20)
  )

  /** The sound object for playing the language text-to-speech files. */
  const [audio, setAudio] = useState(new Audio.Sound())

  /** Keeps track of the text the user enters into the search bar. */
  const [searchTextInput, setSearchTextInput] = useState('')

  /** Keeps track of whether we're actively fetching Firebase data or not. */
  const [isFetchingFirebaseData, setIsFetchingFirebaseData] = useState(false)

  const colorScheme = useColorScheme()

  useEffect(() => {
    if (routeName === 'InitialLanguageSelect') {
      // Create our first group.

      // Set color mode to the phone's current setting (light or dark mode).
      if (colorScheme === 'dark') setIsDarkModeEnabled(true)
      else setIsDarkModeEnabled(false)
    }
  }, [])

  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      headerTitle: t.language_select.add_language
    })
  }, [])

  /**
   * Plays the text-to-speech audio file for a language.
   * @param {string} languageID - The ID of the language to play.
   */
  const playAudio = async languageID => {
    audio.unloadAsync()
    await audio.loadAsync(languageT2S[languageID]).then(() => {
      audio.playAsync()
    })
  }

  /**
   * Fetches all the data for a language from Firebase. This includes the various Story Sets from the 'sets' collection and the language info from the 'languages' collection. It's an async function and doesn't resolve until all the information has been fetched and stored. If any fetch fails, it throws an error.
   * @param {string} language - The language to fetch the firebase data for.
   */
  const fetchFirebaseData = async language => {
    // Set the installingLanguageInstance redux variable to true since we're now installing a language instance.
    setIsInstallingLanguageInstance(true)

    // Set the isFetchingFirebaseData local state to true so that the continue button shows the activity indicator.
    setIsFetchingFirebaseData(true)

    // Fetch all the Story Sets whith the language ID of the selected language and store them in redux.
    await db
      .collection('sets')
      .where('languageID', '==', language)
      .get()
      .then(response => {
        var sets = []
        response.forEach(set => {
          sets.push({
            id: set.id,
            ...set.data()
          })
        })
        storeLanguageSets(sets, language)
      })
      .catch(error => {
        console.log(error)
        throw error
      })

    // Fetch the language info for the selected language and store it in redux.
    await db
      .collection('languages')
      .doc(language)
      .get()
      .then(async doc => {
        if (doc.exists) {
          storeLanguageData(doc.data(), language)
        }
      })
      .catch(error => {
        console.log(error)
        throw error
      })

    return
  }

  /** Handles the user pressing the start button after they select a language instance to install. Involves fetching the necessary Firebase data, setting the hasFetchedLanguageData to true, creating a group for the language, and starting the download of the language core files. If this is the first language instance they've installed, we want to nagivate to the onboarding slides too. */
  const onStartPress = () => {
    fetchFirebaseData(selectedLanguage)
      .then(() => {
        // Set the hasFetchedLanguageData redux variable to true since we're done fetching from Firebase.
        setHasFetchedLanguageData(true)

        // If we're adding a subsequent language instance, then we need to store the active group's language
        if (activeGroup) setRecentActiveGroup(activeGroup.name)

        // Start downloading the core files for this language.
        downloadLanguageCoreFiles(selectedLanguage)

        // Create a new group using the default group name stored in constants.js, assuming a group hasn't already been created with the same name. We don't want any duplicates.
        if (
          !groups.some(group => group.name === groupNames[selectedLanguage])
        ) {
          incrementGlobalGroupCounter()

          createGroup(
            groupNames[selectedLanguage],
            selectedLanguage,
            'default',
            true,
            database.globalGroupCounter,
            groups.length + 1
          )
        }

        // Change the active group to the new group we just created.
        changeActiveGroup(groupNames[selectedLanguage])

        // Set the local isFetchingFirebaseData state to false.
        setIsFetchingFirebaseData(false)

        // Navigate to the onboarding slides if this is the first language instance install.
        if (routeName === 'InitialLanguageSelect') {
          navigate('WahaOnboardingSlides', {
            selectedLanguage: selectedLanguage
          })
        }
      })
      .catch(error => {
        console.log(error)

        // If we get an error, reset the isFetching state, delete any data that might have still come through, and show the user an alert that there was an error.
        setIsFetchingFirebaseData(false)
        deleteLanguageData(selectedLanguage)

        Alert.alert(
          t.language_select.fetch_error_title,
          t.language_select.fetch_error_message,
          [
            {
              text: t.general.ok,
              onPress: () => {}
            }
          ]
        )
      })
  }

  /**
   * Renders a LanguageSelectItem component used for the Languages SectionList item.
   * @param {Object} language - The object for the language to render.
   * @param {Object} languageFamily - The object for the language family that this language is a part of.
   * @return {Component} - The LanguageSelectItem component.
   */
  const renderLanguageItem = (language, languageFamily) => (
    <LanguageItem
      languageID={language.languageID}
      nativeName={language.nativeName}
      localeName={t.languages[language.languageID]}
      font={languageFamily.font}
      logos={language.logos}
      onPress={() => {
        if (!selectedLanguage) {
          Animated.spring(buttonYPos, {
            toValue: 0
          }).start()
        }
        setSelectedLanguage(language.languageID)
      }}
      isSelected={selectedLanguage === language.languageID ? true : false}
      playAudio={() => playAudio(language.languageID)}
      isDark={isDark}
      isRTL={isRTL}
      screenLanguage={screenLanguage}
    />
  )

  /**
   * Renders a component used for the Languages SectionList header.
   * @param {Object} language - The object for the language to render.
   * @param {Object} languageFamily - The object for the language family that this language is a part of.
   * @return {Component} - The LanguageSelectItem component.
   */
  const renderLanguageHeader = languageFamily => (
    <View
      style={{
        ...styles.languageHeaderContainer,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3
      }}
    >
      <Text
        style={type(
          screenLanguage,
          'h3',
          'Regular',
          'left',
          colors(isDark).secondaryText
        )}
      >
        {t.languages[languageFamily.languageFamilyID]}
      </Text>
    </View>
  )

  return (
    <SafeAreaView
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3
      }}
    >
      {routeName === 'InitialLanguageSelect' && (
        <View style={styles.headerTextContainer}>
          <Text
            style={{
              ...type(
                screenLanguage,
                'h2',
                'Bold',
                'center',
                colors(isDark).text
              ),
              fontSize: 28 * scaleMultiplier
            }}
          >
            {t.language_select.welcome}
          </Text>
          <View style={{ height: 5 }} />
          <Text
            style={type(
              screenLanguage,
              'h3',
              'Regular',
              'center',
              colors(isDark).text
            )}
          >
            {t.language_select.select_language}
          </Text>
        </View>
      )}
      <View
        style={{
          ...styles.searchBarContainer,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          width: Dimensions.get('window').width - 40,
          maxWidth: 500,
          borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
          backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4
        }}
      >
        <View style={styles.searchIconContainer}>
          <Icon
            name='search'
            size={25 * scaleMultiplier}
            color={colors(isDark).disabled}
          />
        </View>
        <TextInput
          style={{
            ...type(
              screenLanguage,
              'h3',
              'Regular',
              'left',
              colors(isDark).text
            ),
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onChangeText={text => setSearchTextInput(text)}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder={t.general.search}
          placeholderTextColor={colors(isDark).secondaryText}
        />
      </View>
      <View style={styles.languageListContainer}>
        <SectionList
          style={{ height: '100%' }}
          sections={getAllLanguagesData(
            t,
            installedLanguageInstances,
            searchTextInput
          )}
          ItemSeparatorComponent={() => <WahaSeparator isDark={isDark} />}
          SectionSeparatorComponent={() => <WahaSeparator isDark={isDark} />}
          keyExtractor={item => item.languageID}
          renderItem={({ item, section }) => renderLanguageItem(item, section)}
          renderSectionHeader={({ section }) => renderLanguageHeader(section)}
          renderSectionFooter={() => (
            <View style={{ height: 20 * scaleMultiplier, width: '100%' }} />
          )}
          ListFooterComponent={() => (
            <View style={{ width: '100%', height: 100 * scaleMultiplier }} />
          )}
        />
      </View>
      <Animated.View
        style={{
          ...styles.startButtonContainer,
          transform: [{ translateY: buttonYPos }]
        }}
      >
        <WahaButton
          mode={isConnected ? buttonModes.SUCCESS : buttonModes.DISABLED}
          label={
            isConnected
              ? isFetchingFirebaseData
                ? ''
                : routeName === 'InitialLanguageSelect'
                ? t.general.continue
                : t.language_select.add_language + ' '
              : ''
          }
          onPress={isConnected && !isFetchingFirebaseData ? onStartPress : null}
          extraComponent={
            isConnected ? (
              isFetchingFirebaseData ? (
                <ActivityIndicator color={colors(isDark).bg4} />
              ) : null
            ) : (
              <Icon
                name='cloud-slash'
                size={40}
                color={colors(isDark).disabled}
              />
            )
          }
          isDark={isDark}
          isRTL={isRTL}
          language={screenLanguage}
        />
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerTextContainer: {
    marginTop: 20 * scaleMultiplier,
    paddingHorizontal: 20
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  languageHeaderContainer: {
    height: 40 * scaleMultiplier,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  searchBarContainer: {
    borderRadius: 30,
    borderWidth: 2,
    height: 50 * scaleMultiplier,
    paddingHorizontal: 5,
    flexDirection: info(locale).isRTL ? 'row-reverse' : 'row',
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 25 * scaleMultiplier
  },
  searchIconContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  languageListContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelectScreen)
