import React from 'react'
import LanguageSelectScreen from '../screens/LanguageSelectScreen'
import OnboardingSlidesScreen from '../screens/OnboardingSlidesScreen'
import LoadingScreen from '../screens/LoadingScreen'

import { NavigationContainer ***REMOVED*** from '@react-navigation/native'
import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'

const Stack = createStackNavigator()

function Onboarding () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false ***REMOVED******REMOVED***>
        <Stack.Screen name='LanguageSelect' component={LanguageSelectScreen***REMOVED*** />
        <Stack.Screen
          name='OnboardingSlides'
          component={OnboardingSlidesScreen***REMOVED***
        />
        <Stack.Screen name='Loading' component={LoadingScreen***REMOVED*** />
      </Stack.Navigator>
    </NavigationContainer>
  )
***REMOVED***

export default Onboarding
