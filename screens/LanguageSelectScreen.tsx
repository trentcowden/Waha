import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Audio } from 'expo-av'
import * as Localization from 'expo-localization'
import { LanguageID } from 'languages'
import { MainStackParams } from 'navigation/MainStack'
import React, { FC, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'
import SafeAreaView from 'react-native-safe-area-view'
import { StorySet } from 'redux/reducers/database'
import Icon from '../assets/fonts/icon_font_config'
import { languageT2S } from '../assets/languageT2S/_languageT2S'
import LanguageItem from '../components/LanguageItem'
import LanguageVersionItem from '../components/LanguageVersionItem'
import WahaButton, { WahaButtonMode } from '../components/WahaButton'
import WahaSeparator from '../components/WahaSeparator'
import { scaleMultiplier } from '../constants'
import db from '../firebase/db'
import { getAllLanguagesData, info } from '../functions/languageDataFunctions'
import { LanguageFamilyMetadata, LanguageMetadata } from '../languages'
import { OnboardingParams } from '../navigation/Onboarding'
import { selector, useAppDispatch } from '../redux/hooks'
import {
  activeGroupSelector,
  changeActiveGroup,
} from '../redux/reducers/activeGroup'
import {
  deleteLanguageData,
  downloadLanguageCoreFiles,
  storeLanguageSets,
  storeOtherLanguageContent,
} from '../redux/reducers/database'
import { createGroup } from '../redux/reducers/groups'
import { setIsInstallingLanguageInstance } from '../redux/reducers/isInstallingLanguageInstance'
import {
  incrementGlobalGroupCounter,
  setHasFetchedLanguageData,
  setRecentActiveGroup,
} from '../redux/reducers/languageInstallation'
import { setIsDarkModeEnabled } from '../redux/reducers/settings'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

type LanguageSelectScreenNavigationProp = StackNavigationProp<
  OnboardingParams,
  'InitialLanguageSelect'
> &
  StackNavigationProp<OnboardingParams, 'InitialLanguageVersionSelect'> &
  StackNavigationProp<MainStackParams, 'SubsequentLanguageSelect'> &
  StackNavigationProp<MainStackParams, 'SubsequentLanguageVersionSelect'>

type LanguageSelectScreenRouteProp =
  | RouteProp<OnboardingParams, 'InitialLanguageSelect'>
  | RouteProp<OnboardingParams, 'InitialLanguageVersionSelect'>
  | RouteProp<MainStackParams, 'SubsequentLanguageSelect'>
  | RouteProp<MainStackParams, 'SubsequentLanguageVersionSelect'>

interface Props {
  navigation: LanguageSelectScreenNavigationProp
  route: LanguageSelectScreenRouteProp
}

interface RouteConfig {
  shouldShowHeaderTitle: boolean
  // The text for the primary heading.
  heading1: string | undefined
  // The text for the secondary heading.
  heading2: string | undefined
  // Whether the Language search bar should be visible.
  shouldShowSearchBar: boolean
  // Whether, upon tapping continue, the user should be taken to the onboarding slides.
  shouldGoToOnboarding: boolean
  // Whether we're showing a list of Languages or a list of versions within a Language.
  contentToShow: 'languages' | 'versions'
}

/**
 * A screen that displays a list of language instances to install. This appears as the first screen the user sees when they open the app for the first time, as well as later if they want to install another language instance.
 */
const LanguageSelectScreen: FC<Props> = ({
  navigation: { setOptions, navigate, goBack },
  route: {
    name: routeName,
    params: {
      // An array of Languages that are currently installed. Defaults to an empty array since there aren't any installed Languages when the user opens the app for the first time.
      installedLanguageInstances,
      // If a Language is selected that has multiple versions, this screen is rendered again, this time with a list of the versions to select. This param is the object for the Language that has multiple versions.
      languageWithVersions,
    } = {
      installedLanguageInstances: [],
      languageWithVersions: {},
    },
  },
}) => {
  // Redux state/dispatch.
  const groups = selector((state) => state.groups)
  const activeGroup = selector((state) => activeGroupSelector(state))
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const t =
    activeGroup.name === 'No Active Group'
      ? getTranslations(Localization.locale.slice(0, 2))
      : getTranslations(activeGroup.language)
  const isConnected = selector((state) => state.network.isConnected)
  const isRTL =
    activeGroup.name === 'No Active Group'
      ? info(Localization.locale.slice(0, 2) as LanguageID).isRTL
      : info(activeGroup.language).isRTL
  const screenLanguage =
    activeGroup.name === 'No Active Group'
      ? info(Localization.locale.slice(0, 2) as LanguageID).languageID
      : activeGroup.language
  const languageInstallation = selector((state) => state.languageInstallation)
  const dispatch = useAppDispatch()

  /** Keeps track of the language that is currently selected. */
  const [selectedLanguage, setSelectedLanguage] = useState<
    LanguageMetadata | undefined
  >()

  /** Keeps track of the Y position of the start button for animating. */
  const [buttonYPos] = useState(new Animated.Value(68 * scaleMultiplier + 20))

  /** The sound object for playing the language text-to-speech files. */
  const [audio] = useState(new Audio.Sound())

  /** Keeps track of the text the user enters into the search bar. */
  const [searchTextInput, setSearchTextInput] = useState('')

  /** Keeps track of whether we're actively fetching Firebase data or not. */
  const [isFetchingFirebaseData, setIsFetchingFirebaseData] = useState(false)

  // Gets whether the user's phone is in dark mode or light mode.
  const colorScheme = useColorScheme()

  type RouteConfigs = Record<typeof routeName, RouteConfig>

  /**
   * Returns an object that has a bunch of parameters that determine what to display on the screen based on the route name.
   */
  const getRouteConfigs = (): RouteConfigs => {
    return {
      InitialLanguageSelect: {
        shouldShowHeaderTitle: false,
        heading1: t.language_select.welcome,
        heading2: t.language_select.select_language,
        shouldShowSearchBar: true,
        shouldGoToOnboarding: true,
        contentToShow: 'languages',
      },
      SubsequentLanguageSelect: {
        shouldShowHeaderTitle: true,
        heading1: undefined,
        heading2: undefined,
        shouldShowSearchBar: true,
        shouldGoToOnboarding: false,
        contentToShow: 'languages',
      },
      InitialLanguageVersionSelect: {
        shouldShowHeaderTitle: false,
        heading1: t.language_select.multiple_versions,
        heading2: t.language_select.select_version,
        shouldShowSearchBar: false,
        shouldGoToOnboarding: true,
        contentToShow: 'versions',
      },
      SubsequentLanguageVersionSelect: {
        shouldShowHeaderTitle: true,
        heading1: t.language_select.multiple_versions,
        heading2: t.language_select.select_version,
        shouldShowSearchBar: false,
        shouldGoToOnboarding: false,
        contentToShow: 'versions',
      },
    }
  }

  /** Keeps track of the route config. */
  const [routeConfig, setRouteConfig] = useState<RouteConfigs>(
    getRouteConfigs()
  )

  /**
   * Sets the route config based on the routeName, or if the Language changes.
   */
  useEffect(() => {
    setRouteConfig(getRouteConfigs())
  }, [screenLanguage, routeName])

  /**
   * Sets Waha to whatever mode the user's phone is set to, either dark mode or light mode.
   */
  useEffect(() => {
    if (routeName === 'InitialLanguageSelect') {
      // Set color mode to the phone's current setting (light or dark mode).
      if (colorScheme === 'dark')
        dispatch(setIsDarkModeEnabled({ toSet: true }))
      else dispatch(setIsDarkModeEnabled({ toSet: false }))
    }
  }, [])

  /**
   * Plays the text-to-speech audio file for a language.
   */
  const playAudio = async (
    languageID: LanguageID,
    // Whether the audio that should be played is for the name of Language or the name of a version (which is the brand name).
    type: 'language' | 'version'
  ) => {
    audio.unloadAsync()
    if (type === 'version') {
      await audio.loadAsync(languageT2S[`${languageID}_brandname`]).then(() => {
        audio.playAsync()
      })
    } else
      await audio.loadAsync(languageT2S[languageID]).then(() => {
        audio.playAsync()
      })
  }

  /**
   * Fetches all the data for a language from the Firestore Database. This includes the various Story Sets from the 'sets' collection and the Language info from the 'languages' collection. It's an async function and doesn't resolve until all the information has been fetched and stored. If any fetch fails, it throws an error.
   */
  const fetchFirestoreData = async (languageID: LanguageID) => {
    // Set the installingLanguageInstance redux variable to true since we're now installing a language instance.
    dispatch(setIsInstallingLanguageInstance({ toSet: true }))

    // Set the isFetchingFirebaseData local state to true so that the continue button shows the activity indicator.
    setIsFetchingFirebaseData(true)

    // Fetch all the Story Sets with the language ID of the selected language and store them in redux.
    await db
      .collection('sets')
      .where('languageID', '==', languageID)
      .get()
      .then((querySnapshot) => {
        // If the data is valid and the current Waha version is greater than or equal to the version in Firebase (we set the shouldWrite variable earlier)...
        if (!querySnapshot.empty) {
          // Create a temp array to hold Story Sets.
          var sets: StorySet[] = []

          // Add Story Sets to our temp array.
          querySnapshot.forEach((doc) => {
            var storySetItem: StorySet = {
              id: doc.id,
              languageID: doc.data().languageID,
              title: doc.data().title,
              subtitle: doc.data().subtitle,
              iconName: doc.data().iconName,
              lessons: doc.data().lessons,
              tags: doc.data().tags,
            }
            sets.push(storySetItem)
          })

          // Write all of the Story Sets to redux.
          dispatch(storeLanguageSets({ sets, languageID }))
        }
      })
      .catch((error) => {
        console.log(error)
        throw error
      })

    // Fetch the Language info for the selected language and store it in redux.
    await db
      .collection('languages')
      .doc(languageID)
      .get()
      .then(async (doc) => {
        var languageData = doc.data()

        // If we get some legitimate data back...
        if (doc.exists && languageData !== undefined) {
          // Store our Language info in redux.
          dispatch(
            storeOtherLanguageContent({
              files: languageData.files,
              questionSets: languageData.questions,
              languageID,
            })
          )
        }
      })
      .catch((error) => {
        console.log(error)
        throw error
      })
    return
  }

  /**
   * Handles the user pressing the start button after they select a language instance to install. Involves fetching the necessary Firebase data, setting the hasFetchedLanguageData to true, creating a group for the language, and starting the download of the language Core Files. If this is the first language instance they've installed, we want to navigate to the onboarding slides too.
   */
  const handleContinuePress = () => {
    // Only do something if the user has actually selected a Language or version.
    if (selectedLanguage) {
      // For convenience.
      const selectedLanguageID = selectedLanguage.languageID

      // If a Language has versions, navigate to the relevant version select screen.
      if (selectedLanguage.versions !== undefined) {
        if (routeName === 'InitialLanguageSelect')
          navigate('InitialLanguageVersionSelect', {
            languageWithVersions: selectedLanguage,
          })
        else if (routeName === 'SubsequentLanguageSelect')
          navigate('SubsequentLanguageVersionSelect', {
            languageWithVersions: selectedLanguage,
            installedLanguageInstances: installedLanguageInstances,
          })
        // Otherwise, get the data for a Language.
      } else
        fetchFirestoreData(selectedLanguageID)
          .then(() => {
            // Set the hasFetchedLanguageData redux variable to true since we're done fetching from Firebase.
            dispatch(setHasFetchedLanguageData({ toSet: true }))

            // If we're adding a subsequent language instance, then we need to store the active group's language
            if (activeGroup)
              dispatch(setRecentActiveGroup({ groupName: activeGroup.name }))

            // Start downloading the Core Files for this language.
            dispatch(downloadLanguageCoreFiles(selectedLanguageID))

            // Create a new group using the default group name stored in constants.js, assuming a group hasn't already been created with the same name. We don't want any duplicates.
            if (
              !groups.some(
                (group) =>
                  group.name ===
                  getTranslations(selectedLanguageID).other.default_group_name
              )
            ) {
              dispatch(incrementGlobalGroupCounter())

              // Create the default Group for the new Language.
              dispatch(
                createGroup({
                  groupName:
                    getTranslations(selectedLanguageID).other
                      .default_group_name,
                  language: selectedLanguageID,
                  emoji: 'default',
                  shouldShowMobilizationToolsTab: true,
                  groupID: languageInstallation.globalGroupCounter,
                  groupNumber: groups.length + 1,
                })
              )
            }

            // Change the Active Group to the new Group we just created.
            dispatch(
              changeActiveGroup({
                groupName:
                  getTranslations(selectedLanguageID).other.default_group_name,
              })
            )

            // Set the local isFetchingFirebaseData state to false.
            setIsFetchingFirebaseData(false)

            // Navigate to the onboarding slides if this is the first language instance install.
            if (
              routeName === 'InitialLanguageSelect' ||
              routeName === 'InitialLanguageVersionSelect'
            ) {
              navigate('WahaOnboardingSlides', {
                selectedLanguage: selectedLanguageID,
              })
            }
          })
          .catch((error) => {
            console.log(error)

            // If we get an error, reset the isFetching state, delete any data that might have still come through, and show the user an alert that there was an error.
            setIsFetchingFirebaseData(false)
            dispatch(deleteLanguageData({ languageID: selectedLanguageID }))

            Alert.alert(
              t.language_select.fetch_error_title,
              t.language_select.fetch_error_message,
              [
                {
                  text: t.general.ok,
                  onPress: () => {},
                },
              ]
            )
          })
    }
  }

  /**
   * Animates the continue button in and sets the selectedLanguage state when a Language is selected.
   */
  const handleLanguageItemPress = (language: LanguageMetadata) => {
    if (!selectedLanguage) {
      Animated.spring(buttonYPos, {
        toValue: 0,
        useNativeDriver: true,
      }).start()
    }
    setSelectedLanguage(language)
  }

  /**
   * Gets the versions for a specific Language.
   */
  const getLanguageVersions = (language: LanguageMetadata) => {
    if (language.versions) {
      if (installedLanguageInstances)
        return language.versions.filter(
          (version) =>
            !installedLanguageInstances.some(
              (installedLanguage) =>
                installedLanguage.languageID === version.languageID
            )
        )
      else return language.versions
    } else return []
  }

  /**
   * Renders a <LanguageItem /> component.
   */
  const renderLanguageItem = (language: LanguageMetadata) => (
    <LanguageItem
      languageID={language.languageID}
      nativeName={language.nativeName}
      localeName={t.languages[language.languageID]}
      headers={language.headers}
      onLanguageItemPress={() => handleLanguageItemPress(language)}
      isSelected={
        selectedLanguage
          ? selectedLanguage.languageID === language.languageID
            ? true
            : false
          : false
      }
      playAudio={() => playAudio(language.languageID, 'language')}
      isDark={isDark}
      isRTL={isRTL}
      screenLanguage={screenLanguage}
      versions={language.versions}
    />
  )

  /**
   * Renders a component used for the Languages SectionList header.
   */
  const renderLanguageHeader = (languageFamily: LanguageFamilyMetadata) => (
    <View
      style={{
        ...styles.languageHeaderContainer,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
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

  /**
   * Renders a <LanguageVersionItem /> component.
   */
  const renderLanguageVersionItem = ({ item }: { item: LanguageMetadata }) => (
    <LanguageVersionItem
      languageID={item.languageID}
      headers={item.headers}
      brandName={item.brandName}
      note={item.note ? item.note : ''}
      isSelected={
        selectedLanguage
          ? selectedLanguage.languageID === item.languageID
            ? true
            : false
          : false
      }
      onPress={() => {
        if (!selectedLanguage) {
          Animated.spring(buttonYPos, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
        setSelectedLanguage(item)
      }}
      playAudio={() => playAudio(item.languageID, 'version')}
      isRTL={isRTL}
      isDark={isDark}
    />
  )
  return (
    <SafeAreaView
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
      }}
      // forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' }}
    >
      {/* Render a back button only if we're selecting a version for our first Language. If we're selecting a version for a subsequent Language, the header will already contain a back button. */}
      {routeName === 'InitialLanguageVersionSelect' && (
        <SafeAreaView style={{ width: '100%' }}>
          <TouchableOpacity
            style={{
              alignSelf: isRTL ? 'flex-end' : 'flex-start',
              width: 100,
              alignItems: isRTL ? 'flex-end' : 'flex-start',
            }}
            onPress={() => goBack()}
          >
            <Icon
              name={isRTL ? 'arrow-right' : 'arrow-left'}
              size={45 * scaleMultiplier}
              color={colors(isDark).icons}
            />
          </TouchableOpacity>
        </SafeAreaView>
      )}
      {routeConfig[routeName].heading1 !== undefined && (
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
              fontSize: 28 * scaleMultiplier,
            }}
          >
            {routeConfig[routeName].heading1}
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
            {routeConfig[routeName].heading2}
          </Text>
        </View>
      )}
      {routeConfig[routeName].shouldShowSearchBar && (
        <View
          style={{
            ...styles.searchBarContainer,
            flexDirection: isRTL ? 'row-reverse' : 'row',
            width: Dimensions.get('window').width - 40,
            maxWidth: 500,
            borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
            backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
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
              alignItems: 'center',
            }}
            onChangeText={(text) => setSearchTextInput(text)}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder={t.general.search}
            placeholderTextColor={colors(isDark).secondaryText}
          />
        </View>
      )}
      <View style={styles.languageListContainer}>
        {routeConfig[routeName].contentToShow === 'languages' ? (
          <SectionList
            style={{ height: '100%' }}
            sections={getAllLanguagesData(
              t,
              installedLanguageInstances,
              searchTextInput
            )}
            ItemSeparatorComponent={() => <WahaSeparator isDark={isDark} />}
            SectionSeparatorComponent={() => <WahaSeparator isDark={isDark} />}
            keyExtractor={(item) => item.languageID}
            renderItem={({ item }) => renderLanguageItem(item)}
            renderSectionHeader={({ section }) => renderLanguageHeader(section)}
            renderSectionFooter={() => (
              <View style={{ height: 20 * scaleMultiplier, width: '100%' }} />
            )}
            ListFooterComponent={() => (
              <View style={{ width: '100%', height: 100 * scaleMultiplier }} />
            )}
          />
        ) : (
          <FlatList
            style={{
              height: '100%',
              width: '100%',
              paddingVertical: 20 * scaleMultiplier,
            }}
            keyExtractor={(item) => item.languageID}
            data={getLanguageVersions(languageWithVersions)}
            renderItem={renderLanguageVersionItem}
            ItemSeparatorComponent={() => (
              <View style={{ height: 20 * scaleMultiplier }} />
            )}
          />
        )}
      </View>
      <Animated.View
        style={{
          ...styles.startButtonContainer,
          transform: [{ translateY: buttonYPos }],
        }}
      >
        <WahaButton
          mode={isConnected ? WahaButtonMode.SUCCESS : WahaButtonMode.DISABLED}
          label={
            isConnected
              ? isFetchingFirebaseData
                ? ''
                : routeName === 'InitialLanguageSelect'
                ? t.general.continue
                : t.language_select.add_language + ' '
              : ''
          }
          onPress={
            isConnected && !isFetchingFirebaseData
              ? handleContinuePress
              : undefined
          }
          extraComponent={
            isConnected ? (
              isFetchingFirebaseData ? (
                <ActivityIndicator color={colors(isDark).bg4} />
              ) : undefined
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
          screenLanguage={screenLanguage}
        />
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginTop: 20 * scaleMultiplier,
    paddingHorizontal: 20,
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  languageHeaderContainer: {
    height: 40 * scaleMultiplier,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchBarContainer: {
    borderRadius: 30,
    borderWidth: 2,
    height: 50 * scaleMultiplier,
    paddingHorizontal: 5,
    flexDirection: info(Localization.locale as LanguageID).isRTL
      ? 'row-reverse'
      : 'row',
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20 * scaleMultiplier,
  },
  searchIconContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  languageListContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
  },
})

export default LanguageSelectScreen
