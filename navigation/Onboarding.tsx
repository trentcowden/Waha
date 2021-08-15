import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC, ReactElement } from 'react'
import { View } from 'react-native'
import { selector } from '../hooks'
import LanguageSelectScreen from '../screens/LanguageSelectScreen'
import LoadingScreen from '../screens/LoadingScreen'
import WahaOnboardingSlidesScreen from '../screens/WahaOnboardingSlidesScreen'
import { colors } from '../styles/colors'

export type OnboardingParams = {
  InitialLanguageSelect: undefined
  WahaOnboardingSlides: {
    selectedLanguage: string
  }
  Loading: {
    selectedLanguage: string
  }
}

// Create the stack navigator.
const Stack = createStackNavigator<OnboardingParams>()

/*
  This component renders the stack navigator used for the initial onboarding screens. This navigator is the first thing the user sees when they open the app for the first time. It contains the language instance install screen, the onboarding slides screen, and the loading screen.
*/
const Onboarding: FC = ({}): ReactElement => {
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            // Use fade screen transition for this navigator since we won't necessarily know if a language is RTL or LTR on the first screen.
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          }}
        >
          <Stack.Screen
            name='InitialLanguageSelect'
            component={LanguageSelectScreen}
          />
          <Stack.Screen
            name='WahaOnboardingSlides'
            component={WahaOnboardingSlidesScreen}
          />
          <Stack.Screen name='Loading' component={LoadingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default Onboarding
