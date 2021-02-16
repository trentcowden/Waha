import { NavigationContainer ***REMOVED*** from '@react-navigation/native'
import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import React from 'react'
import { getSystemIsRTL ***REMOVED*** from '../constants'
import LanguageInstanceInstallScreen from '../screens/LanguageInstanceInstallScreen'
import LoadingScreen from '../screens/LoadingScreen'
import WahaOnboardingSlidesScreen from '../screens/WahaOnboardingSlidesScreen'

// Create the stack navigator.
const Stack = createStackNavigator()

/**
 * This component renders the stack navigator used for the initial onboarding screens. This navigator is the first thing the user sees when they open the app for the first time. It contains the language instance install screen, the onboarindg slides screen, and the loading screen.
 */
function Onboarding () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureDirection: getSystemIsRTL()
            ? 'horizontal-inverted'
            : 'horizontal'
        ***REMOVED******REMOVED***
      >
        <Stack.Screen
          name='InitialLanguageInstanceInstall'
          component={LanguageInstanceInstallScreen***REMOVED***
        />
        <Stack.Screen
          name='WahaOnboardingSlides'
          component={WahaOnboardingSlidesScreen***REMOVED***
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
