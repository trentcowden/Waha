import { DrawerNavigationProp } from '@react-navigation/drawer'
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import * as StoreReview from 'expo-store-review'
import { InfoAndGroupsForAllLanguages } from 'interfaces/languages'
import { LessonType } from 'interfaces/playScreen'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { AppState, LogBox, Platform, View } from 'react-native'
import { Lesson, StorySet } from 'redux/reducers/database'
import GroupAvatar from '../components/GroupAvatar'
import ScreenHeaderImage from '../components/ScreenHeaderImage'
import TestModeDisplay from '../components/TestModeDisplay'
import WahaBackButton from '../components/WahaBackButton'
import { scaleMultiplier } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { selector, useAppDispatch } from '../hooks'
import { SetCategory } from '../interfaces/setAndLessonInfo'
import SetsTabs, { SetsTabsParams } from '../navigation/SetsTabs'
import {
  setHasUsedPlayScreen,
  setLessonCounter,
  setNumLessonsTilReview,
  setReviewTimeout,
} from '../redux/actions/persistedPopupsActions'
import { setIsTimedOut, setTimer } from '../redux/actions/securityActions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import AddSetScreen from '../screens/AddSetScreen'
import ContactUsScreen from '../screens/ContactUsScreen'
import GroupsScreen from '../screens/GroupsScreen'
import InformationScreen from '../screens/InformationScreen'
import LanguageSelectScreen from '../screens/LanguageSelectScreen'
import LessonsScreen from '../screens/LessonsScreen'
import MobilizationToolsScreen from '../screens/MobilizationToolsScreen'
import MobilizationToolsUnlockScreen from '../screens/MobilizationToolsUnlockScreen'
import PianoAppScreen from '../screens/PianoAppScreen'
import PianoPasscodeSetScreen from '../screens/PianoPasscodeSetScreen'
import PlayScreen from '../screens/PlayScreen'
import SecurityModeScreen from '../screens/SecurityModeScreen'
import SecurityOnboardingSlidesScreen from '../screens/SecurityOnboardingSlidesScreen'
import SplashScreen from '../screens/SplashScreen'
import StorageScreen from '../screens/StorageScreen'
import { colors } from '../styles/colors'
import { getTranslations } from '../translations/translationsConfig'
import { MainDrawerParams } from './MainDrawer'

// Ignore the Android timer warning because it's annoying.
LogBox.ignoreLogs(['Setting a timer'])

export type MainStackParams = {
  SetsTabs: NavigatorScreenParams<SetsTabsParams>
  Lessons: { setID: string }
  Play: {
    thisLesson: Lesson
    thisSet: StorySet
    isAudioAlreadyDownloaded: boolean
    isVideoAlreadyDownloaded: boolean
    isAlreadyDownloading: boolean
    lessonType: LessonType
  }
  Groups: undefined
  AddSet: { category: SetCategory }
  SubsequentLanguageSelect: {
    installedLanguageInstances: InfoAndGroupsForAllLanguages
  }
  Storage: undefined
  MobilizationTools: undefined
  MobilizationToolsUnlock: undefined
  SecurityMode: undefined
  SecurityOnboardingSlides: undefined
  PianoPasscodeSet: undefined
  PianoPasscodeSetConfirm: { passcode?: string }
  PianoPasscodeChange: undefined
  PianoPasscodeChangeConfirm: { passcode?: string }
  PianoApp: undefined
  Splash: undefined
  Information: undefined
  ContactUs: undefined
}

// Create the stack navigator.
const Stack = createStackNavigator<MainStackParams>()

type MainStackNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParams, 'MainStack'>,
  StackNavigationProp<MainStackParams>
>

interface Props {
  navigation: MainStackNavigationProp
}

/*
 This component renders the main navigation stack used for almost all the screens in Waha. It also contains some logic related to things that happen globally in the background. The reason some logic would be here instead of in MainDrawer.js is because this component has access to the navigation prop.
 */
const MainStack: FC<Props> = ({
  navigation: { navigate, goBack, toggleDrawer },
}): ReactElement => {
  const activeGroup = selector((state) => activeGroupSelector(state))
  const isRTL = info(activeGroup.language).isRTL
  const t = getTranslations(activeGroup.language)
  const font = info(activeGroup.language).font

  const security = selector((state) => state.security)
  const languageCoreFilesToUpdate = selector(
    (state) => state.languageInstallation.languageCoreFilesToUpdate
  )
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const hasUsedPlayScreen = selector(
    (state) => state.persistedPopups.hasUsedPlayScreen
  )
  const reviewTimeout = selector((state) => state.persistedPopups.reviewTimeout)
  const lessonCounter = selector((state) => state.persistedPopups.lessonCounter)
  const numLessonsTilReview = selector(
    (state) => state.persistedPopups.numLessonsTilReview
  )

  const dispatch = useAppDispatch()
  /** Keeps track of the current app state. Can be "active", "inactive", or "background". Set by the app state listener function. */
  const [appState, setAppState] = useState('')

  /** useEffect function that acts as a constructor. It starts up the app state listener and cleans it up as well. */
  useEffect(() => {
    const appStateUnsubscribe = AppState.addEventListener('change', (change) =>
      setAppState(change)
    )

    return function cleanup() {
      AppState.removeEventListener('change', (change) => setAppState(change))
    }
  }, [])

  // Temporary function to initialize these redux variables for users who are updating.
  useEffect(() => {
    if (hasUsedPlayScreen === undefined) dispatch(setHasUsedPlayScreen(true))
    if (reviewTimeout === undefined) dispatch(setReviewTimeout(undefined))
    if (lessonCounter === undefined) dispatch(setLessonCounter(0))
    if (numLessonsTilReview === undefined) dispatch(setNumLessonsTilReview(2))
  }, [])

  /** useEffect function that reacts to changes in app state changes. This is used to display the splash screen to hide the app preview in multitasking as well as keeping track of security mode timeouts. */
  useEffect(() => {
    if (appState === 'inactive' || appState === 'background') {
      // Hide screen during multitasking or going to the home screen on iOS.
      if (Platform.OS === 'ios') navigate('Splash')

      // Store the current time for security mode timeout checking later.
      dispatch(setTimer(Date.now()))
    } else if (appState === 'active') {
      // If we're past our review timeout, request a review and reset the timeout.
      console.log(reviewTimeout)
      if (reviewTimeout !== undefined && Date.now() > reviewTimeout) {
        StoreReview.requestReview()
        dispatch(setReviewTimeout(undefined))
      }

      if (security.securityEnabled) {
        // If we've already timed out...
        if (security.isTimedOut) {
          // ...then go straight to the piano screen.
          navigate('PianoApp')
        } else {
          // If we are now timed out, set isTimedOut to true and navigate to the piano screen.
          if (Date.now() - security.timer > security.timeoutDuration) {
            dispatch(setIsTimedOut(true))
            navigate('PianoApp')
            // Otherwise, if we haven't timed out yet, on Android, do nothing. On iOS, we will have navigated to the splash screen upon coming back into the app so we have to go back to get back to the screen we were on before.
          } else {
            if (Platform.OS === 'ios') goBack()
          }
        }
        // Similarly, on iOS, we have to go back when we get back into the app since we previously navigated to the splash screen.
      } else {
        if (Platform.OS === 'ios') goBack()
      }
    }
  }, [appState])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
      }}
    >
      <Stack.Navigator
        // Set the initial screen based on whether security is enabled or not. If it is, our initial screen should be the pianp app. Otherwise, it should be the SetsTabs.
        initialRouteName={security.securityEnabled ? 'PianoApp' : 'SetsTabs'}
        screenOptions={{
          // The drawer must open from the opposite side if the active group's language is RTL.
          gestureDirection: isRTL ? 'horizontal-inverted' : 'horizontal',
          gestureResponseDistance: {
            horizontal: 50 * scaleMultiplier,
            vertical: 135,
          },
          headerTitleAlign: 'center',
          cardStyle: {
            opacity: 1,
          },
        }}
        mode='card'
      >
        <Stack.Screen
          name='SetsTabs'
          component={SetsTabs}
          options={{
            headerStyle: {
              backgroundColor: colors(isDark).bg3,
              // Remove the header shadow.
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitle: () => (
              <ScreenHeaderImage
                isDark={isDark}
                activeGroup={activeGroup}
                isRTL={isRTL}
              />
            ),
            headerLeft: isRTL
              ? () => (
                  <TestModeDisplay
                    isDark={isDark}
                    activeGroup={activeGroup}
                    isRTL={isRTL}
                  />
                )
              : () => (
                  <View style={{ paddingHorizontal: 10 }}>
                    <GroupAvatar
                      style={{ backgroundColor: colors(isDark).bg4, zIndex: 0 }}
                      emoji={activeGroup.emoji}
                      size={35}
                      onPress={toggleDrawer}
                      isActive={true}
                      isDark={isDark}
                      isRTL={isRTL}
                    />
                    {languageCoreFilesToUpdate.length !== 0 ? (
                      <View
                        style={{
                          zIndex: 100,
                          position: 'absolute',
                          alignSelf: 'flex-end',
                          paddingHorizontal: 10,
                        }}
                      >
                        <View
                          style={{
                            width: 13 * scaleMultiplier,
                            height: 13 * scaleMultiplier,
                            borderRadius: 6.5 * scaleMultiplier,
                            backgroundColor: colors(isDark).success,
                            alignSelf: 'flex-end',
                            zIndex: 100,
                          }}
                        />
                        <View style={{ width: 5 }} />
                      </View>
                    ) : null}
                  </View>
                ),
            headerRight: isRTL
              ? () => (
                  <View style={{ paddingHorizontal: 10 }}>
                    <GroupAvatar
                      style={{ backgroundColor: colors(isDark).bg4 }}
                      emoji={activeGroup.emoji}
                      size={35}
                      onPress={toggleDrawer}
                      isActive={true}
                      isDark={isDark}
                      isRTL={isRTL}
                    />
                    {languageCoreFilesToUpdate.length !== 0 && (
                      <View
                        style={{
                          zIndex: 100,
                          position: 'absolute',
                          alignSelf: 'flex-start',
                          paddingHorizontal: 10,
                        }}
                      >
                        <View
                          style={{
                            width: 13 * scaleMultiplier,
                            height: 13 * scaleMultiplier,
                            borderRadius: 6.5 * scaleMultiplier,
                            backgroundColor: colors(isDark).success,
                            alignSelf: 'flex-end',
                            zIndex: 100,
                          }}
                        />
                        <View style={{ width: 5 }} />
                      </View>
                    )}
                  </View>
                )
              : () => (
                  <TestModeDisplay
                    isDark={isDark}
                    activeGroup={activeGroup}
                    isRTL={isRTL}
                  />
                ),
          }}
        />
        <Stack.Screen
          name='Lessons'
          component={LessonsScreen}
          options={{
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <ScreenHeaderImage
                isDark={isDark}
                activeGroup={activeGroup}
                isRTL={isRTL}
              />
            ),
            headerRight: isRTL
              ? () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                )
              : () => <View />,
            headerLeft: isRTL
              ? () => <View />
              : () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                ),
          }}
        />
        <Stack.Screen
          name='Play'
          component={PlayScreen}
          options={{
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
              elevation: 0,
              shadowColor: 'transparent',
            },
            // Disable gestures on this screen because there are already horizontally-swipable elements on it.
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name='Groups'
          component={GroupsScreen}
          options={{
            headerTitle: t.groups.groups_and_languages,
            headerStyle: {
              elevation: 0,
              shadowColor: 'transparent',
            },
          }}
        />
        <Stack.Screen
          name='AddSet'
          component={AddSetScreen}
          options={{
            title: '',
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerLeft: isRTL
              ? () => <View />
              : () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                ),
            headerRight: isRTL
              ? () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                )
              : () => <View />,
          }}
        />
        <Stack.Screen
          name='SubsequentLanguageSelect'
          component={LanguageSelectScreen}
          options={{
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
            headerRight: isRTL
              ? () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                )
              : () => <View />,
            headerLeft: isRTL
              ? () => <View />
              : () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                ),
          }}
        />
        <Stack.Screen
          name='Storage'
          component={StorageScreen}
          options={{
            headerTitle: t.storage.storage,
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
            headerRight: isRTL
              ? () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                )
              : () => <View />,
            headerLeft: isRTL
              ? () => <View />
              : () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                ),
          }}
        />
        <Stack.Screen
          name='MobilizationTools'
          component={MobilizationToolsScreen}
          options={{
            headerTitle: t.mobilization_tools.mobilization_tools,
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
            headerRight: isRTL
              ? () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                )
              : () => <View />,
            headerLeft: isRTL
              ? () => <View />
              : () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                ),
          }}
        />
        <Stack.Screen
          name='MobilizationToolsUnlock'
          component={MobilizationToolsUnlockScreen}
          options={{
            headerTitle: t.mobilization_tools.mobilization_tools,
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
            headerRight: isRTL
              ? () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                )
              : () => <View />,
            headerLeft: isRTL
              ? () => <View />
              : () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                ),
          }}
        />
        <Stack.Screen
          name='SecurityMode'
          component={SecurityModeScreen}
          options={{
            headerTitle: t.security.security,
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
            headerRight: isRTL
              ? () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                )
              : () => <View />,
            headerLeft: isRTL
              ? () => <View />
              : () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                ),
          }}
        />
        <Stack.Screen
          name='SecurityOnboardingSlides'
          component={SecurityOnboardingSlidesScreen}
          options={{
            headerTitle: t.security.security,
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
            headerRight: isRTL
              ? () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                )
              : () => <View />,
            headerLeft: isRTL
              ? () => <View />
              : () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                ),
          }}
        />
        <Stack.Screen
          name='PianoPasscodeSet'
          component={PianoPasscodeSetScreen}
          options={{
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
          }}
        />
        <Stack.Screen
          name='PianoPasscodeSetConfirm'
          component={PianoPasscodeSetScreen}
          options={{
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
          }}
        />
        <Stack.Screen
          name='PianoPasscodeChange'
          component={PianoPasscodeSetScreen}
          options={{
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
          }}
        />
        <Stack.Screen
          name='PianoPasscodeChangeConfirm'
          component={PianoPasscodeSetScreen}
          options={{
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
          }}
        />
        <Stack.Screen
          name='PianoApp'
          component={PianoAppScreen}
          options={{
            gestureEnabled: false,
            headerShown: false,
            // Set the transition out of the piano screen to be a fade instead of a swipe.
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          }}
        />
        <Stack.Screen
          name='Splash'
          component={SplashScreen}
          options={{
            gestureEnabled: false,
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name='Information'
          component={InformationScreen}
          options={{
            headerTitle: t.information.information,
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
            headerRight: isRTL
              ? () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                )
              : () => <View />,
            headerLeft: isRTL
              ? () => <View />
              : () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                ),
          }}
        />
        <Stack.Screen
          name='ContactUs'
          component={ContactUsScreen}
          options={{
            headerTitle: t.contact_us.contact_us,
            headerStyle: {
              backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: colors(isDark).text,
              fontFamily: font + '-Bold',
            },
            headerRight: isRTL
              ? () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                )
              : () => <View />,
            headerLeft: isRTL
              ? () => <View />
              : () => (
                  <WahaBackButton
                    onPress={() => goBack()}
                    isRTL={isRTL}
                    isDark={isDark}
                  />
                ),
          }}
        />
      </Stack.Navigator>
    </View>
  )
}

export default MainStack
