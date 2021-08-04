import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import Icon from '../assets/fonts/icon_font_config'
import WahaBackButton from '../components/WahaBackButton'
import WahaButton from '../components/WahaButton'
import { buttonModes, scaleMultiplier } from '../constants'
import db from '../firebase/db'
import { info } from '../functions/languageDataFunctions'
import { appVersion } from '../modeSwitch'
import {
  activeDatabaseSelector,
  activeGroupSelector
} from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'

function mapStateToProps (state) {
  return {
    activeGroup: activeGroupSelector(state),
    activeDatabase: activeDatabaseSelector(state),
    isRTL: info(activeGroupSelector(state).language).isRTL,
    t: getTranslations(activeGroupSelector(state).language),
    isDark: state.settings.isDarkModeEnabled,
    isConnected: state.network.isConnected
  }
}

const ContactUsScreen = ({
  navigation: { setOptions, goBack },
  // Props passed from redux.
  activeGroup,
  activeDatabase,
  isRTL,
  t,
  isDark,
  isConnected
}) => {
  /** The text for the email input component. */
  const [emailTextInput, setEmailTextInput] = useState(null)

  /** The text for the message input component. */
  const [messageTextInput, setMessageTextInput] = useState('')

  /** The text for the reproduction steps input component. */
  const [reproductionStepsTextInput, setReproductionStepsTextInput] = useState(
    ''
  )

  /** The value of the checkbox that keeps track of whether or not the message describes a bug. */
  const [isBugChecked, setIsBugChecked] = useState(false)

  /** Keeps track of whether the message is actively being submitted to Firestore or not. */
  const [isSubmitting, setIsSubmitting] = useState(false)

  /** Keeps track of whether the email address is valid or not. */
  const [emailError, setEmailError] = useState(null)

  /** useEffect function that sets the navigation options for this screen. */
  useEffect(() => {
    setOptions({
      headerRight: isRTL
        ? () => (
            <WahaBackButton
              onPress={() => goBack()}
              isRTL={isRTL}
              isDark={isDark}
            />
          )
        : () => {},
      headerLeft: isRTL
        ? () => {}
        : () => (
            <WahaBackButton
              onPress={() => goBack()}
              isRTL={isRTL}
              isDark={isDark}
            />
          )
    })
  }, [])

  /** useEffect function that checks the validity of an email address any time the email input changes. */
  useEffect(() => {
    if (emailTextInput !== null) {
      checkEmail()
    }
  }, [emailTextInput])

  /** Checks whether an email address is valid using a regular expression. If it's valid, set the email error state to false. Otherwise, set it to true.*/
  const checkEmail = () => {
    if (emailTextInput.match(/^.+@.+\..+$/)) setEmailError(false)
    else setEmailError(true)
  }

  /** Sends the form information to Firestore and pops up an appropriate alert. */
  const submit = () => {
    setIsSubmitting(true)
    db.collection('feedback')
      .add({
        language: activeGroup.language,
        contactEmail: activeDatabase.contactEmail,
        email: emailTextInput,
        message: messageTextInput,
        isABug: isBugChecked,
        reproductionSteps: reproductionStepsTextInput,
        appVersion: appVersion,
        OS: Platform.OS,
        timeSubmitted: new Date().toString()
      })
      .then(() => {
        setIsSubmitting(false)
        Alert.alert(
          t.contact_us.submitted_successfully_title,
          t.contact_us.submitted_successfully_message,
          [
            {
              text: t.general.ok,
              onPress: () => {
                goBack()
              }
            }
          ]
        )
      })
      .catch(() => {
        setIsSubmitting(false)
        Alert.alert(
          t.contact_us.submit_error_title,
          t.contact_us.submit_error_message,
          [
            {
              text: t.general.ok,
              onPress: () => {}
            }
          ]
        )
      })
  }

  // Determine what to render for the asterisk components based on isRTL. They need to be conditional because in LTR, the asterisk goes on the right of the word whereas in RTL, it goes on the left. The asterisk indicates a required field.
  var asteriskComponent = isRTL ? (
    <Text
      style={type(
        activeGroup.language,
        'h3',
        'Bold',
        'left',
        colors(isDark).error
      )}
    >
      {'* '}
    </Text>
  ) : (
    <Text
      style={type(
        activeGroup.language,
        'h3',
        'Bold',
        'left',
        colors(isDark).error
      )}
    >
      {' *'}
    </Text>
  )
  var leftAsterisk = isRTL ? asteriskComponent : null
  var rightAsterisk = isRTL ? null : asteriskComponent

  return (
    <SafeAreaView
      style={{
        ...styles.screen,
        backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3
      }}
    >
      <ScrollView bounces={false} style={styles.scrollViewContainer}>
        <View style={{ width: '100%', height: 20 * scaleMultiplier }} />
        {/* Email input area. */}
        <View style={styles.sectionContainer}>
          <Text
            style={{
              ...type(
                activeGroup.language,
                'h3',
                'Bold',
                'left',
                colors(isDark).text
              ),
              marginVertical: 10
            }}
          >
            {leftAsterisk}
            {t.contact_us.email}
            {rightAsterisk}
          </Text>
          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TextInput
              onChangeText={text => setEmailTextInput(text)}
              autoCapitalize='none'
              autoCorrect={false}
              spellCheck={false}
              style={{
                ...type(
                  activeGroup.language,
                  'h3',
                  'Regular',
                  'left',
                  colors(isDark).text
                ),
                ...styles.textInputContainer,
                paddingTop: 0,
                paddingBottom: 0,
                backgroundColor: isDark
                  ? colors(isDark).bg2
                  : colors(isDark).bg4,
                borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
                borderWidth: 2
              }}
              keyboardType='email-address'
              placeholder='name@email.com'
              placeholderTextColor={colors(isDark).disabled}
            />
            {emailError !== null ? (
              <View style={styles.emailStatusIconContainer}>
                <Icon
                  name={emailError ? 'cancel' : 'check'}
                  color={
                    emailError ? colors(isDark).error : colors(isDark).success
                  }
                  size={
                    emailError ? 45 * scaleMultiplier : 40 * scaleMultiplier
                  }
                />
              </View>
            ) : null}
          </View>
        </View>
        {/* Message input area. */}
        <View style={styles.sectionContainer}>
          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                ...type(
                  activeGroup.language,
                  'h3',
                  'Bold',
                  'left',
                  colors(isDark).text
                ),
                marginVertical: 10 * scaleMultiplier
              }}
            >
              {leftAsterisk}
              {t.contact_us.message}
              {rightAsterisk}
            </Text>
            <Text
              style={type(
                activeGroup.language,
                'h4',
                'regular',
                'left',
                messageTextInput.length > 1000
                  ? colors(isDark).error
                  : colors(isDark).disabled
              )}
            >
              {messageTextInput.length + '/1000'}
            </Text>
          </View>
          <TextInput
            onChangeText={text => setMessageTextInput(text)}
            style={{
              ...type(
                activeGroup.language,
                'h3',
                'Regular',
                'left',
                colors(isDark).text
              ),
              ...styles.textInputContainer,
              height: 200 * scaleMultiplier,
              textAlignVertical: 'top',
              backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
              borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
              borderWidth: 2
            }}
            multiline
            placeholder={t.contact_us.message_placeholder}
            placeholderTextColor={colors(isDark).disabled}
          />
        </View>
        {/* Bug checkmark input area. */}
        <View
          style={{
            ...styles.bugSectionContainer,
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}
        >
          <TouchableOpacity
            onPress={() => setIsBugChecked(old => !old)}
            style={{
              ...styles.checkIconContainer,
              backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
              borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
              borderWidth: 2
            }}
          >
            {isBugChecked ? (
              <Icon name='check' size={25} color={colors(isDark).icons} />
            ) : null}
          </TouchableOpacity>
          <Text
            style={{
              ...type(
                activeGroup.language,
                'h3',
                'Regular',
                'left',
                colors(isDark).text
              ),
              marginHorizontal: 10
            }}
          >
            {t.contact_us.is_a_bug}
          </Text>
        </View>
        {/* Reproduction steps input area. */}
        {isBugChecked ? (
          <View style={styles.sectionContainer}>
            <Text
              style={{
                ...type(
                  activeGroup.language,
                  'h3',
                  'Bold',
                  'left',
                  colors(isDark).text
                ),
                marginVertical: 10 * scaleMultiplier
              }}
            >
              {t.contact_us.reproducable}
            </Text>
            <TextInput
              onChangeText={text => setReproductionStepsTextInput(text)}
              style={{
                ...type(
                  activeGroup.language,
                  'h3',
                  'Regular',
                  'left',
                  colors(isDark).text
                ),
                ...styles.textInputContainer,
                height: 200 * scaleMultiplier,
                textAlignVertical: 'top',
                backgroundColor: isDark
                  ? colors(isDark).bg2
                  : colors(isDark).bg4,
                borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
                borderWidth: 2
              }}
              multiline
            />
          </View>
        ) : null}
        {/* Submit button. */}
        <WahaButton
          mode={
            // Potential error states are if the email is invalid, the email is blank, or the message length is over 1000 characters.
            emailError ||
            emailTextInput === null ||
            !isConnected ||
            messageTextInput.length > 1000
              ? buttonModes.DISABLED
              : buttonModes.SUCCESS
          }
          label={isSubmitting || !isConnected ? '' : t.general.submit}
          onPress={submit}
          extraContainerStyles={{
            width: Dimensions.get('window').width / 3,
            alignSelf: isRTL ? 'flex-start' : 'flex-end',
            marginTop: 10 * scaleMultiplier
          }}
          extraComponent={
            isConnected ? (
              // If we're in the middle of submitting, change the submit button to show an activity indicator.
              isSubmitting ? (
                <View>
                  <ActivityIndicator color={colors(isDark).bg4} />
                </View>
              ) : null
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
          language={activeGroup.language}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  scrollViewContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20
  },
  sectionContainer: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20 * scaleMultiplier
  },
  textInputContainer: {
    flex: 1,
    borderRadius: 10,
    height: 60 * scaleMultiplier,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  emailStatusIconContainer: {
    width: 50 * scaleMultiplier,
    height: 50 * scaleMultiplier,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bugSectionContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20 * scaleMultiplier,
    marginTop: 10 * scaleMultiplier
  },
  checkIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(mapStateToProps)(ContactUsScreen)
