import React, { useEffect, useState ***REMOVED*** from 'react'
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
***REMOVED*** from 'react-native'
import { TouchableOpacity ***REMOVED*** from 'react-native-gesture-handler'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/standard/BackButton'
import WahaButton from '../components/standard/WahaButton'
import { scaleMultiplier ***REMOVED*** from '../constants'
import db from '../firebase/db'
import { appVersion ***REMOVED*** from '../modeSwitch'
import {
  activeDatabaseSelector,
  activeGroupSelector
***REMOVED*** from '../redux/reducers/activeGroup'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function mapStateToProps (state) {
  return {
    activeGroup: activeGroupSelector(state),
    activeDatabase: activeDatabaseSelector(state),
    isRTL: activeDatabaseSelector(state).isRTL,
    font: getLanguageFont(activeGroupSelector(state).language),
    translations: activeDatabaseSelector(state).translations,
    primaryColor: activeDatabaseSelector(state).primaryColor
  ***REMOVED***
***REMOVED***

const ContactUsScreen = ({
  navigation: { setOptions, goBack ***REMOVED***,
  // Props passed from redux.
  activeGroup,
  activeDatabase,
  isRTL,
  font,
  translations,
  primaryColor
***REMOVED***) => {
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
        ? () => <BackButton onPress={() => goBack()***REMOVED*** />
        : () => {***REMOVED***,
      headerLeft: isRTL
        ? () => {***REMOVED***
        : () => <BackButton onPress={() => goBack()***REMOVED*** />
    ***REMOVED***)
  ***REMOVED***, [])

  /** useEffect function that checks the validity of an email address any time the email input changes. */
  useEffect(() => {
    if (emailTextInput !== null) {
      checkEmail()
    ***REMOVED***
  ***REMOVED***, [emailTextInput])

  /** Checks whether an email address is valid using a regular expression. If it's valid, set the email error state to false. Otherwise, set it to true.*/
  function checkEmail () {
    if (emailTextInput.match(/^.+@.+\..+$/)) setEmailError(false)
    else setEmailError(true)
  ***REMOVED***

  /** Sends the form information to Firestore and pops up an appropriate alert. */
  function submit () {
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
      ***REMOVED***)
      .then(() => {
        setIsSubmitting(false)
        Alert.alert(
          translations.contact_us &&
            translations.contact_us.popups.submitted_successfully_title,
          translations.contact_us &&
            translations.contact_us.popups.submitted_successfully_message,
          [
            {
              text: translations.general.ok,
              onPress: () => {
                goBack()
              ***REMOVED***
            ***REMOVED***
          ]
        )
      ***REMOVED***)
      .catch(() => {
        setIsSubmitting(false)
        Alert.alert(
          translations.contact_us &&
            translations.contact_us.popups.submit_error_title,
          translations.contact_us &&
            translations.contact_us.popups.submit_error_message,
          [
            {
              text: translations.general.ok,
              onPress: () => {***REMOVED***
            ***REMOVED***
          ]
        )
      ***REMOVED***)
  ***REMOVED***

  // Determine what to render for the asterisk components based on isRTL. They need to be conditional because in LTR, the asterisk goes on the right of the word whereas in RTL, it goes on the left. The asterisk indicates a required field.
  var asteriskComponent = isRTL ? (
    <Text
      style={[
        StandardTypography({ font, isRTL ***REMOVED***, 'h3', 'Bold', 'left', colors.red)
      ]***REMOVED***
    >
      {'* '***REMOVED***
    </Text>
  ) : (
    <Text
      style={[
        StandardTypography({ font, isRTL ***REMOVED***, 'h3', 'Bold', 'left', colors.red)
      ]***REMOVED***
    >
      {' *'***REMOVED***
    </Text>
  )
  var leftAsterisk = isRTL ? asteriskComponent : null
  var rightAsterisk = isRTL ? null : asteriskComponent

  return (
    <SafeAreaView style={styles.screen***REMOVED***>
      <ScrollView bounces={false***REMOVED*** style={styles.scrollViewContainer***REMOVED***>
        <View style={{ width: '100%', height: 20 * scaleMultiplier ***REMOVED******REMOVED*** />
        {/* Email input area. */***REMOVED***
        <View style={styles.sectionContainer***REMOVED***>
          <Text
            style={[
              StandardTypography(
                { font, isRTL ***REMOVED***,
                'h3',
                'Bold',
                'left',
                colors.shark
              ),
              { marginVertical: 10 ***REMOVED***
            ]***REMOVED***
          >
            {leftAsterisk***REMOVED***
            {translations.contact_us && translations.contact_us.email_label***REMOVED***
            {rightAsterisk***REMOVED***
          </Text>
          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'center',
              alignItems: 'center'
            ***REMOVED******REMOVED***
          >
            <TextInput
              onChangeText={text => setEmailTextInput(text)***REMOVED***
              autoCapitalize='none'
              autoCorrect={false***REMOVED***
              spellCheck={false***REMOVED***
              style={[
                StandardTypography(
                  { font, isRTL ***REMOVED***,
                  'h3',
                  'Regular',
                  'left',
                  colors.shark
                ),
                styles.textInputContainer,
                { paddingTop: 0, paddingBottom: 0 ***REMOVED***
              ]***REMOVED***
              keyboardType='email-address'
              placeholder='name@email.com'
              placeholderTextColor={colors.chateau***REMOVED***
            />
            {emailError !== null ? (
              <View style={styles.emailStatusIconContainer***REMOVED***>
                <Icon
                  name={emailError ? 'cancel' : 'check'***REMOVED***
                  color={emailError ? colors.red : colors.apple***REMOVED***
                  size={
                    emailError ? 45 * scaleMultiplier : 40 * scaleMultiplier
                  ***REMOVED***
                />
              </View>
            ) : null***REMOVED***
          </View>
        </View>
        {/* Message input area. */***REMOVED***
        <View style={styles.sectionContainer***REMOVED***>
          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            ***REMOVED******REMOVED***
          >
            <Text
              style={[
                StandardTypography(
                  { font, isRTL ***REMOVED***,
                  'h3',
                  'Bold',
                  'left',
                  colors.shark
                ),
                { marginVertical: 10 * scaleMultiplier ***REMOVED***
              ]***REMOVED***
            >
              {leftAsterisk***REMOVED***
              {translations.contact_us && translations.contact_us.message_label***REMOVED***
              {rightAsterisk***REMOVED***
            </Text>
            <Text
              style={[
                StandardTypography(
                  { font, isRTL ***REMOVED***,
                  'h4',
                  'regular',
                  'left',
                  messageTextInput.length > 1000 ? colors.red : colors.chateau
                )
              ]***REMOVED***
            >
              {messageTextInput.length + '/1000'***REMOVED***
            </Text>
          </View>
          <TextInput
            onChangeText={text => setMessageTextInput(text)***REMOVED***
            style={[
              StandardTypography(
                { font, isRTL ***REMOVED***,
                'h3',
                'Regular',
                'left',
                colors.shark
              ),
              styles.textInputContainer,
              { height: 200 * scaleMultiplier, textAlignVertical: 'top' ***REMOVED***
            ]***REMOVED***
            multiline
            placeholder={
              translations.contact_us &&
              translations.contact_us.message_placeholder
            ***REMOVED***
            placeholderTextColor={colors.chateau***REMOVED***
          />
        </View>
        {/* Bug checkmark input area. */***REMOVED***
        <View
          style={[
            styles.bugSectionContainer,
            { flexDirection: isRTL ? 'row-reverse' : 'row' ***REMOVED***
          ]***REMOVED***
        >
          <TouchableOpacity
            onPress={() => setIsBugChecked(old => !old)***REMOVED***
            style={styles.checkIconContainer***REMOVED***
          >
            {isBugChecked ? (
              <Icon name='check' size={25***REMOVED*** color={colors.tuna***REMOVED*** />
            ) : null***REMOVED***
          </TouchableOpacity>
          <Text
            style={[
              StandardTypography(
                { font, isRTL ***REMOVED***,
                'h3',
                'Regular',
                'left',
                colors.shark
              ),
              { marginHorizontal: 10 ***REMOVED***
            ]***REMOVED***
          >
            {translations.contact_us &&
              translations.contact_us.bug_checkmark_label***REMOVED***
          </Text>
        </View>
        {/* Reproduction steps input area. */***REMOVED***
        {isBugChecked ? (
          <View style={styles.sectionContainer***REMOVED***>
            <Text
              style={[
                StandardTypography(
                  { font, isRTL ***REMOVED***,
                  'h3',
                  'Bold',
                  'left',
                  colors.shark
                ),
                { marginVertical: 10 * scaleMultiplier ***REMOVED***
              ]***REMOVED***
            >
              {translations.contact_us &&
                translations.contact_us.reproduce_label***REMOVED***
            </Text>
            <TextInput
              onChangeText={text => setReproductionStepsTextInput(text)***REMOVED***
              style={[
                StandardTypography(
                  { font, isRTL ***REMOVED***,
                  'h3',
                  'Regular',
                  'left',
                  colors.shark
                ),
                styles.textInputContainer,
                { height: 200 * scaleMultiplier, textAlignVertical: 'top' ***REMOVED***
              ]***REMOVED***
              multiline
            />
          </View>
        ) : null***REMOVED***
        {/* Submit button. */***REMOVED***
        <WahaButton
          type={
            // Potential error states are if the email is invalid, the email is blank, or the message length is over 1000 characters.
            emailError ||
            emailTextInput === null ||
            messageTextInput.length > 1000
              ? 'inactive'
              : 'filled'
          ***REMOVED***
          color={
            emailError ||
            emailTextInput === null ||
            messageTextInput.length > 1000
              ? colors.geyser
              : colors.apple
          ***REMOVED***
          useDefaultFont={false***REMOVED***
          label={
            isSubmitting
              ? ''
              : translations.contact_us &&
                translations.contact_us.submit_button_label
          ***REMOVED***
          width={Dimensions.get('window').width / 3***REMOVED***
          onPress={submit***REMOVED***
          style={{
            height: 68 * scaleMultiplier,
            alignSelf: isRTL ? 'flex-start' : 'flex-end',
            marginTop: 10 * scaleMultiplier,
            marginBottom: 20 * scaleMultiplier
          ***REMOVED******REMOVED***
          extraComponent={
            // If we're in the middle of submitting, change the submit button to show an activity indicator.
            isSubmitting ? (
              <View>
                <ActivityIndicator color={colors.white***REMOVED*** />
              </View>
            ) : null
          ***REMOVED***
        />
      </ScrollView>
    </SafeAreaView>
  )
***REMOVED***

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.aquaHaze
  ***REMOVED***,
  scrollViewContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20
  ***REMOVED***,
  sectionContainer: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20 * scaleMultiplier
  ***REMOVED***,
  textInputContainer: {
    flex: 1,
    borderRadius: 10,
    height: 60 * scaleMultiplier,
    backgroundColor: colors.porcelain,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  ***REMOVED***,
  emailStatusIconContainer: {
    width: 50 * scaleMultiplier,
    height: 50 * scaleMultiplier,
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***,
  bugSectionContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20 * scaleMultiplier,
    marginTop: 10 * scaleMultiplier
  ***REMOVED***,
  checkIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.porcelain,
    justifyContent: 'center',
    alignItems: 'center'
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(ContactUsScreen)
