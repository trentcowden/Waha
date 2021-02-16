import { NavigationContainer ***REMOVED*** from '@react-navigation/native'
import { createStackNavigator ***REMOVED*** from '@react-navigation/stack'
import React from 'react'
import { getSystemIsRTL ***REMOVED*** from '../constants'
import LanguageInstanceInstallScreen from '../screens/LanguageInstanceInstallScreen'
import LoadingScreen from '../screens/LoadingScreen'
import WahaOnboardingSlidesScreen from '../screens/WahaOnboardingSlidesScreen'

const Stack = createStackNavigator()

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
