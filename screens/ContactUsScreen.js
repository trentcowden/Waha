import React, { useEffect, useState ***REMOVED*** from 'react'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
***REMOVED*** from 'react-native'
import { connect ***REMOVED*** from 'react-redux'
import BackButton from '../components/standard/BackButton'
import WahaButton from '../components/standard/WahaButton'
import { scaleMultiplier ***REMOVED*** from '../constants'
import db from '../firebase/db'
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
    translations: activeDatabaseSelector(state).translations
  ***REMOVED***
***REMOVED***

function ContactUsScreen ({
  navigation: { setOptions, goBack ***REMOVED***,
  // Props passed from redux.
  activeGroup,
  activeDatabase,
  isRTL,
  font,
  translations
***REMOVED***) {
  const [emailTextInput, setEmailTextInput] = useState(null)
  const [messageTextInput, setMessageTextInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [emailError, setEmailError] = useState(null)

  const [emailInputRef, setEmailInputRef] = useState()

  function getNavOptions () {
    return {
      headerRight: isRTL
        ? () => <BackButton onPress={() => goBack()***REMOVED*** />
        : () => {***REMOVED***,
      headerLeft: isRTL
        ? () => {***REMOVED***
        : () => <BackButton onPress={() => goBack()***REMOVED*** />
    ***REMOVED***
  ***REMOVED***

  useEffect(() => {
    setOptions(getNavOptions())
  ***REMOVED***, [])

  useEffect(() => {
    if (emailTextInput !== null) {
      checkEmail()
    ***REMOVED***
  ***REMOVED***, [emailTextInput])

  function checkEmail () {
    if (emailTextInput.match(/^.+@.+\..+$/)) setEmailError(false)
    else setEmailError(true)
  ***REMOVED***

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
      {/* <ScrollView> */***REMOVED***
      {/* <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          marginVertical: 20 * scaleMultiplier
        ***REMOVED******REMOVED***
      >
        <Text
          style={StandardTypography(
            { font, isRTL ***REMOVED***,
            'h2',
            'Black',
            'left',
            colors.shark
          )***REMOVED***
        >
          Contact Us
        </Text>
      </View> */***REMOVED***
      <ScrollView
        bounces={false***REMOVED***
        style={{
          width: Dimensions.get('window').width,
          flex: 1,
          paddingHorizontal: 20
        ***REMOVED******REMOVED***
      >
        <View
          style={{
            width: '100%',
            // paddingHorizontal: 20,
            justifyContent: 'center',
            marginVertical: 20 * scaleMultiplier
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
              {
                marginVertical: 10
              ***REMOVED***
            ]***REMOVED***
          >
            {leftAsterisk***REMOVED***
            {translations.contact_us.email_label***REMOVED***
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
                {
                  flex: 1,
                  borderRadius: 10,
                  height: 60 * scaleMultiplier,
                  backgroundColor: colors.porcelain,
                  paddingHorizontal: 20
                ***REMOVED***
              ]***REMOVED***
              keyboardType='email-address'
            />
            {emailError !== null ? (
              <View
                style={{
                  width: 50 * scaleMultiplier,
                  height: 50 * scaleMultiplier,
                  justifyContent: 'center',
                  alignItems: 'center'
                ***REMOVED******REMOVED***
              >
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
        <View
          style={{
            width: '100%',
            // paddingHorizontal: 20,
            justifyContent: 'center'
          ***REMOVED******REMOVED***
        >
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
                {
                  marginVertical: 10 * scaleMultiplier
                ***REMOVED***
              ]***REMOVED***
            >
              {leftAsterisk***REMOVED***
              {translations.contact_us.message_label***REMOVED***
              {rightAsterisk***REMOVED***
            </Text>
            <Text
              style={[
                StandardTypography(
                  { font, isRTL ***REMOVED***,
                  'h4',
                  'regular',
                  'left',
                  messageTextInput.length > 500 ? colors.red : colors.chateau
                )
              ]***REMOVED***
            >
              {messageTextInput.length + '/500'***REMOVED***
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
              {
                // flex: 1,
                borderRadius: 10,
                height: 200 * scaleMultiplier,
                backgroundColor: colors.porcelain,
                paddingTop: 20,
                paddingBottom: 20,
                paddingHorizontal: 20,
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              ***REMOVED***
            ]***REMOVED***
            multiline
          />
        </View>
        <WahaButton
          type={
            emailError ||
            emailTextInput === null ||
            messageTextInput.length > 500
              ? 'inactive'
              : 'filled'
          ***REMOVED***
          color={
            emailError ||
            emailTextInput === null ||
            messageTextInput.length > 500
              ? colors.geyser
              : colors.apple
          ***REMOVED***
          useDefaultFont={false***REMOVED***
          label={
            isSubmitting ? '' : translations.contact_us.submit_button_label
          ***REMOVED***
          width={Dimensions.get('window').width / 3***REMOVED***
          onPress={() => {
            setIsSubmitting(true)
            db.collection('feedback')
              .add({
                language: activeGroup.language,
                contactEmail: activeDatabase.contactEmail,
                email: emailTextInput,
                message: messageTextInput
              ***REMOVED***)
              .then(() => {
                setIsSubmitting(false)
                Alert.alert(
                  translations.contact_us.popups.submitted_successfully_title,
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
                  translations.contact_us.popups.submit_error_title,
                  translations.contact_us.popups.submit_error_message,
                  [
                    {
                      text: translations.general.ok,
                      onPress: () => {***REMOVED***
                    ***REMOVED***
                  ]
                )
              ***REMOVED***)
          ***REMOVED******REMOVED***
          style={{
            height: 68 * scaleMultiplier,
            alignSelf: isRTL ? 'flex-start' : 'flex-end'
          ***REMOVED******REMOVED***
          extraComponent={
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
  ***REMOVED***
***REMOVED***)

export default connect(mapStateToProps)(ContactUsScreen)
