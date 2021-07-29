import { t } from 'i18n-js'
import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { connect } from 'react-redux'
import WahaBackButton from '../components/WahaBackButton'
import { scaleMultiplier } from '../constants'
import { info } from '../languages'
import { logUnlockMobilizationTools } from '../LogEventFunctions'
import { setAreMobilizationToolsUnlocked } from '../redux/actions/areMobilizationToolsUnlockedActions'
import { addSet } from '../redux/actions/groupsActions'
import { setMTUnlockAttempts } from '../redux/actions/mtUnlockAttemptsActions'
import { setShowMTTabAddedSnackbar } from '../redux/actions/popupsActions'
import { setMTUnlockTimeout } from '../redux/actions/securityActions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

function mapStateToProps (state) {
  return {
    isRTL: info(activeGroupSelector(state).language).isRTL,

    isDark: state.settings.isDarkModeEnabled,
    activeGroup: activeGroupSelector(state),
    security: state.security,
    mtUnlockAttempts: state.mtUnlockAttempts,
    groups: state.groups,
    database: state.database
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setAreMobilizationToolsUnlocked: toSet => {
      dispatch(setAreMobilizationToolsUnlocked(toSet))
    },
    setMTUnlockTimeout: time => {
      dispatch(setMTUnlockTimeout(time))
    },
    setMTUnlockAttempts: numAttempts => {
      dispatch(setMTUnlockAttempts(numAttempts))
    },
    addSet: (groupName, groupID, set) => {
      dispatch(addSet(groupName, groupID, set))
    },
    setShowMTTabAddedSnackbar: toSet => {
      dispatch(setShowMTTabAddedSnackbar(toSet))
    }
  }
}

/**
 * Screen that shows a simple passcode entry and allows the user to unlock the Mobilization Tools.
 */
const MobilizationToolsUnlockScreen = ({
  // Props passed from navigation.
  navigation: { navigate, setOptions, goBack },
  // Props passed from redux.
  isRTL,
  isDark,
  activeGroup,
  security,
  mtUnlockAttempts,
  groups,
  database,
  setAreMobilizationToolsUnlocked,
  setMTUnlockTimeout,
  setMTUnlockAttempts,
  addSet,
  setShowMTTabAddedSnackbar
}) => {
  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      headerRight: isRTL
        ? () => <WahaBackButton onPress={() => goBack()} />
        : () => <View></View>,
      headerLeft: isRTL
        ? () => <View></View>
        : () => <WahaBackButton onPress={() => goBack()} />
    })
  }, [])

  /** Keeps track of the user input of the passcode entry area. */
  const [passcode, setPasscode] = useState('')

  /** A reference to the passcode entry component. */
  const pinRef = useRef()

  /** Keeps track of whether the unlock success modal is visible. */
  const [unlockSuccessModal, setUnlockSuccessModal] = useState(false)

  const [pinInputColor, setPinInputColor] = useState(
    isDark ? colors(isDark).bg4 : colors(isDark).bg1
  )

  /**
   * useEffect function that updates every time the passcode input changes. If the user gets to 5 attempts without unlocking successfully, the app will lock them out from attempting to unlock again for 30 minutes.
   */
  useEffect(() => {
    if (mtUnlockAttempts === 5) {
      setMTUnlockAttempts(0)
      setMTUnlockTimeout(Date.now() + 1800000)
    }
  }, [mtUnlockAttempts])

  const checkForMTContent = languageID =>
    database[languageID].sets.some(set => {
      return /[a-z]{2}.3.[0-9]+/.test(set.id)
    })

  useEffect(() => {
    pinRef.current.focus()
  }, [])

  /**
   * Checks if the passcode the user enters is correct. If it is, show the success modal. If not, add one to the attempts tracker and show an alert that the code is incorrect.
   */
  const checkPasscode = fullPasscode => {
    if (fullPasscode === '281820') {
      Keyboard.dismiss()
      setAreMobilizationToolsUnlocked(true)
      navigate('SetsTabs', { screen: 'MobilizationTools' })
      setTimeout(() => setShowMTTabAddedSnackbar(true), 1000)
      logUnlockMobilizationTools(activeGroup.language)
    } else {
      setMTUnlockAttempts(mtUnlockAttempts + 1)

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
   * @return {string} - The text to display.
   */
  const getTimeoutText = () => {
    if (Date.now() - security.mtUnlockTimeout < 0)
      return `${t('mobilization_tools.too_many_attempts')} ${Math.round(
        (security.mtUnlockTimeout - Date.now()) / 60000
      )} ${t('mobilization_tools.minutes')}.`
    else if (mtUnlockAttempts === 3)
      return t('mobilization_tools.two_attempts_remaining')
    else if (mtUnlockAttempts === 4)
      return t('mobilization_tools.one_attempt_remaining')
    else return ''
  }

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg4 }
      ]}
    >
      <Text
        style={[
          type(
            activeGroup.language,
            'h3',
            'Regular',
            'center',
            colors(isDark).text
          ),
          {
            marginTop: 50 * scaleMultiplier,
            marginBottom: 30 * scaleMultiplier,
            paddingHorizontal: 20
          }
        ]}
      >
        {t('mobilization_tools.enter_code')}
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
        onTextChange={passcode => setPasscode(passcode)}
        onFulfill={fullPasscode => checkPasscode(fullPasscode)}
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
          marginRight: 3
        }}
        cellStyleFocused={{
          borderColor: colors(isDark, activeGroup.language).accent,
          borderRadius: 25,
          borderWidth: 2
        }}
      />
      <Text
        style={[
          type(
            activeGroup.language,
            'h3',
            'Regular',
            'center',
            colors(isDark).error
          ),
          {
            marginTop: 30 * scaleMultiplier,
            paddingHorizontal: 20
          }
        ]}
      >
        {getTimeoutText()}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobilizationToolsUnlockScreen)
