import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParams } from 'navigation/MainStack'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { scaleMultiplier } from '../constants'
import { logUnlockMobilizationTools } from '../functions/analyticsFunctions'
import { selector, useAppDispatch } from '../redux/hooks'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { setAreMobilizationToolsUnlocked } from '../redux/reducers/areMobilizationToolsUnlocked'
import { setMTUnlockAttempts } from '../redux/reducers/mtUnlockAttempts'
import { setShowMTTabAddedSnackbar } from '../redux/reducers/popups'
import { setMTUnlockTimeout } from '../redux/reducers/security'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

type MobilizationToolsUnlockScreenNavigationProp = StackNavigationProp<
  MainStackParams,
  'MobilizationToolsUnlock'
>

interface Props {
  navigation: MobilizationToolsUnlockScreenNavigationProp
}

/**
 * Screen that shows a simple passcode entry and allows the user to unlock the Mobilization Tools.
 */
const MobilizationToolsUnlockScreen: FC<Props> = ({
  navigation: { navigate },
}) => {
  // Redux state/dispatch.
  const isDark = selector((state) => state.settings.isDarkModeEnabled)
  const activeGroup = selector((state) => activeGroupSelector(state))
  const t = getTranslations(activeGroup.language)
  const mtUnlockAttempts = selector((state) => state.mtUnlockAttempts)
  const security = selector((state) => state.security)
  const dispatch = useAppDispatch()

  /** Keeps track of the user input of the passcode entry area. */
  const [passcode, setPasscode] = useState('')

  /** A reference to the passcode entry component. */
  const pinRef = useRef<any>(null)

  const [pinInputColor, setPinInputColor] = useState(
    isDark ? colors(isDark).bg4 : colors(isDark).bg1
  )

  /**
   * Updates every time the passcode input changes. If the user gets to 5 attempts without unlocking successfully, the app will lock them out from attempting to unlock again for 30 minutes.
   */
  useEffect(() => {
    if (mtUnlockAttempts === 5) {
      dispatch(setMTUnlockAttempts({ numAttempts: 0 }))
      dispatch(setMTUnlockTimeout({ time: Date.now() + 1800000 }))
    }
  }, [mtUnlockAttempts])

  /**
   * Focuses the pin input when the screen renders which opens the keyboard.
   */
  useEffect(() => {
    pinRef.current.focus()
  }, [])

  /**
   * Checks if the passcode the user enters is correct. If it is, show the success modal. If not, add one to the attempts tracker and show an alert that the code is incorrect.
   */
  const checkPasscode = (fullPasscode: string) => {
    if (fullPasscode === '281820') {
      Keyboard.dismiss()
      dispatch(setAreMobilizationToolsUnlocked({ toSet: true }))
      navigate('SetsTabs', { screen: 'MobilizationTools' })
      setTimeout(
        () => dispatch(setShowMTTabAddedSnackbar({ toSet: true })),
        1000
      )
      logUnlockMobilizationTools(activeGroup.language)
    } else {
      dispatch(setMTUnlockAttempts({ numAttempts: mtUnlockAttempts + 1 }))

      // Turn the pin input red for a second to further indicate that the passcode entered was incorrect.
      setPinInputColor(colors(isDark).error)
      setTimeout(() => setPinInputColor(colors(isDark).disabled), 500)

      // Make the pin input "shake" when they enter in a wrong code.
      pinRef.current.shake().then(() => {
        setPasscode('')
        pinRef.current.focus()
      })
    }
  }

  /**
   * Gets a string of the amount of attempts the user has left OR, if they're already locked out, the time they have left until they can attempt again.
   */
  const getTimeoutText = () => {
    if (Date.now() - security.mtUnlockTimeout < 0)
      return `${t.mobilization_tools.too_many_attempts} ${Math.round(
        (security.mtUnlockTimeout - Date.now()) / 60000
      )} ${t.mobilization_tools.minutes}.`
    else if (mtUnlockAttempts === 3)
      return t.mobilization_tools.two_attempts_remaining
    else if (mtUnlockAttempts === 4)
      return t.mobilization_tools.one_attempt_remaining
    else return ''
  }

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4,
      }}
    >
      <Text
        style={{
          ...type(
            activeGroup.language,
            'h3',
            'Regular',
            'center',
            colors(isDark).text
          ),
          marginTop: 50 * scaleMultiplier,
          marginBottom: 30 * scaleMultiplier,
          paddingHorizontal: 20,
        }}
      >
        {t.mobilization_tools.enter_code}
      </Text>
      <SmoothPinCodeInput
        ref={pinRef}
        value={passcode}
        codeLength={6}
        autoFocus={true}
        restrictToNumbers={true}
        animationFocused=''
        textStyle={type(
          activeGroup.language,
          'h2',
          'Regular',
          'center',
          colors(isDark).text
        )}
        onTextChange={(passcode: string) => setPasscode(passcode)}
        onFulfill={(fullPasscode: string) => checkPasscode(fullPasscode)}
        onBackspace={() => {}}
        // Disable entry if the user is locked out.
        editable={
          security.mtUnlockTimeout
            ? Date.now() - security.mtUnlockTimeout > 0
              ? true
              : false
            : true
        }
        cellSize={50 * scaleMultiplier}
        cellStyle={{
          backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg3,
          borderRadius: 25,
          borderColor: pinInputColor,
          borderWidth: 2,
          marginLeft: 3,
          marginRight: 3,
        }}
        cellStyleFocused={{
          borderColor: colors(isDark, activeGroup.language).accent,
          borderRadius: 25,
          borderWidth: 2,
        }}
      />
      <Text
        style={{
          ...type(
            activeGroup.language,
            'h3',
            'Regular',
            'center',
            colors(isDark).error
          ),
          marginTop: 30 * scaleMultiplier,
          paddingHorizontal: 20,
        }}
      >
        {getTimeoutText()}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
})

export default MobilizationToolsUnlockScreen
