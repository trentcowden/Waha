import { NavigationContainer ***REMOVED*** from '@react-navigation/native'
import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import React from 'react'
import LanguageSelectScreen from '../screens/LanguageSelectScreen'
import LoadingScreen from '../screens/LoadingScreen'
import OnboardingSlidesScreen from '../screens/OnboardingSlidesScreen'

const Stack = createStackNavigator()

function Onboarding () {
  //+ RENDER
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false ***REMOVED******REMOVED***>
        <Stack.Screen name='LanguageSelect' component={LanguageSelectScreen***REMOVED*** />
        <Stack.Screen
          name='OnboardingSlides'
          component={OnboardingSlidesScreen***REMOVED***
          options={{
            gestureEnabled: false
          ***REMOVED******REMOVED***
        />
        <Stack.Screen name='Loading' component={LoadingScreen***REMOVED*** />
      </Stack.Navigator>
    </NavigationContainer>
  )
***REMOVED***

export default Onboarding
