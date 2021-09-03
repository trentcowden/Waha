import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParams } from 'navigation/MainStack'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Piano from '../components/Piano'
import PianoPasscodeDisplay from '../components/PianoPasscodeDisplay'
import WahaBackButton from '../components/WahaBackButton'
import WahaButton from '../components/WahaButton'
import { logEnableSecurityMode } from '../functions/analyticsFunctions'
import { info } from '../functions/languageDataFunctions'
import { selector, useAppDispatch } from '../hooks'
import { WahaButtonMode } from '../interfaces/components'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { setShowPasscodeSetSnackbar } from '../redux/reducers/popups'
import { setCode, setSecurityEnabled } from '../redux/reducers/security'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

type PianoPasscodeSetScreenNavigationProp = StackNavigationProp<
  MainStackParams,
  'PianoPasscodeSet'
>

type PianoPasscodeSetScreenRouteProp =
  | RouteProp<MainStackParams, 'PianoPasscodeSet'>
  | RouteProp<MainStackParams, 'PianoPasscodeSetConfirm'>
  | RouteProp<MainStackParams, 'PianoPasscodeChange'>
  | RouteProp<MainStackParams, 'PianoPasscodeChangeConfirm'>

interface Props {
  navigation: PianoPasscodeSetScreenNavigationProp
  route: PianoPasscodeSetScreenRouteProp
}

/**
 * A screen that allows the user to set/change/confirm their piano passcode.
 * @param {string} passcode - (Optional) If the user is confirming their passcode, this is the passcode already entered so we can verify that they match.
 */
const PianoPasscodeSetScreen: FC<Props> = ({
  navigation: { setOptions, navigate, goBack },
  route: { name: routeName, params: { passcode } = { passcode: null } },
}): ReactElement => {
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const activeGroup = selector((state) => activeGroupSelector(state))
  const t = getTranslations(activeGroup.language)
  const isRTL = info(activeGroup.language).isRTL
  const dispatch = useAppDispatch()

  /** Keeps track of the passcode that the user is entering into the piano. */
  const [localPasscode, setLocalPasscode] = useState('')

  /** The text to display above the piano telling the user what to do. */
  const instructionText = {
    PianoPasscodeSet: t.security.choose_passcode,
    PianoPasscodeSetConfirm: t.security.confirm_passcode,
    PianoPasscodeChange: t.security.choose_passcode,
    PianoPasscodeChangeConfirm: t.security.confirm_passcode,
  }

  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      title: t.security.security,
      headerRight: isRTL
        ? () => (
            <WahaBackButton
              onPress={() => {
                goBack()
                if (routeName === 'PianoPasscodeSet') goBack()
              }}
              isRTL={isRTL}
              isDark={isDark}
            />
          )
        : () => <View />,
      headerLeft: isRTL
        ? () => <View />
        : () => (
            <WahaBackButton
              onPress={() => {
                goBack()
                if (routeName === 'PianoPasscodeSet') goBack()
              }}
              isRTL={isRTL}
              isDark={isDark}
            />
          ),
    })
  }, [])

  /** useEffect function that triggers whenever the user's passcode input changes and handles all necessary situations. */
  useEffect(() => {
    // If the user has entered in a full 6-digit passcode (each digit takes up 2 characters in the passcode string)...
    if (localPasscode.length === 12)
      switch (routeName) {
        case 'PianoPasscodeSet':
          // After entering in their passcode for the first time, reset the passcode input and navigate to the confirmation screen.
          setLocalPasscode('')
          navigate('PianoPasscodeSetConfirm', {
            passcode: localPasscode,
          })
          break
        case 'PianoPasscodeSetConfirm':
          // If passcodes match, pop up an alert, log it, set security enabled, set the passcode in redux, and go back.
          if (localPasscode === passcode) {
            dispatch(setShowPasscodeSetSnackbar({ toSet: true }))
            setTimeout(
              () => dispatch(setShowPasscodeSetSnackbar({ toSet: false })),
              2000
            )
            // Log the enabling of Security Mode in Firebase analytics.
            logEnableSecurityMode(activeGroup.id)

            dispatch(setSecurityEnabled({ toSet: true }))
            dispatch(setCode({ code: passcode }))
            goBack()
            goBack()
            goBack()
          } // Otherwise, show an alert that the passcodes don't match.
          else {
            Alert.alert(
              t.security.no_match_title,
              t.security.no_match_message,
              [{ text: t.general.ok, onPress: () => {} }]
            )
            goBack()
          }
          break
        case 'PianoPasscodeChange':
          // After entering in their passcode for the first time, reset the passcode input and navigate to the confirmation screen.
          setLocalPasscode('')
          navigate('PianoPasscodeChangeConfirm', {
            passcode: localPasscode,
          })
          break
        case 'PianoPasscodeChangeConfirm':
          // If passcodes match, pop up an alert, set the passcode in redux, and go back.
          if (localPasscode === passcode) {
            dispatch(setShowPasscodeSetSnackbar({ toSet: true }))
            setTimeout(
              () => dispatch(setShowPasscodeSetSnackbar({ toSet: false })),
              2000
            )
            dispatch(setSecurityEnabled({ toSet: true }))
            dispatch(setCode({ code: localPasscode }))
            goBack()
            goBack()
          } // Otherwise, show an alert that the passcodes don't match.
          else {
            Alert.alert(
              t.security.no_match_title,
              t.security.no_match_message,
              [{ text: t.general.ok, onPress: () => {} }]
            )
            goBack()
          }
          break
      }
  }, [localPasscode])

  return (
    <SafeAreaView
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
      }}
    >
      <View style={styles.topContainer}>
        <View style={styles.instructionTextContainer}>
          <Text
            style={type(
              activeGroup.language,
              'h2',
              'Bold',
              'center',
              colors(isDark).text
            )}
          >
            {instructionText[routeName]}
          </Text>
        </View>
        <PianoPasscodeDisplay
          passcode={localPasscode}
          isRTL={isRTL}
          isDark={isDark}
        />
        <WahaButton
          mode={WahaButtonMode.ERROR_SECONDARY}
          onPress={() => setLocalPasscode('')}
          label={t.general.clear}
          extraContainerStyles={{
            width: Dimensions.get('window').width / 3,
            marginVertical: 0,
          }}
          isDark={isDark}
          isRTL={isRTL}
          screenLanguage={activeGroup.language}
        />
      </View>
      <Piano setPlayedNotes={setLocalPasscode} isDark={isDark} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  topContainer: { width: '100%', alignItems: 'center' },
  instructionTextContainer: { width: '100%', paddingHorizontal: 20 },
})

export default PianoPasscodeSetScreen
