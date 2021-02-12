import Constants from 'expo-constants'
import React from 'react'
import { Text, TouchableOpacity, View ***REMOVED*** from 'react-native'
import Modal from 'react-native-modal'
import { connect ***REMOVED*** from 'react-redux'
import { scaleMultiplier ***REMOVED*** from '../constants'
import { colors ***REMOVED*** from '../styles/colors'
import { getLanguageFont, StandardTypography ***REMOVED*** from '../styles/typography'

function ModalScreen ({
  // passed from parent
  isVisible,
  hideModal,
  topRightComponent,
  onCancelPress,
  onModalWillShow,
  title,
  children = null,
  // passed from redux
  downloads,
  activeDatabase,
  isRTL,
  activeGroup,
  translations,
  font
***REMOVED***) {
  return (
    <View>
      <Modal
        isVisible={isVisible***REMOVED***
        hasBackdrop={true***REMOVED***
        onBackdropPress={hideModal***REMOVED***
        onBackButtonPress={hideModal***REMOVED***
        backdropOpacity={0.3***REMOVED***
        onSwipeComplete={hideModal***REMOVED***
        // swipeDirection={['down']***REMOVED***
        // propagateSwipe={true***REMOVED***
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          margin: 0,
          marginTop:
            Platform.OS === 'ios'
              ? Constants.statusBarHeight > 40
                ? 60
                : 30
              : 20
          // marginVertical: 20 * scaleMultiplier
        ***REMOVED******REMOVED***
        onModalWillShow={onModalWillShow***REMOVED***
      >
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
          ***REMOVED******REMOVED***
        >
          <View
            style={{
              width: '100%',
              // height: 50 * scaleMultiplier,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10
            ***REMOVED******REMOVED***
          >
            <TouchableOpacity
              onPress={() => {
                onCancelPress ? onCancelPress() : null
                hideModal()
              ***REMOVED******REMOVED***
              style={{
                width: 45 * scaleMultiplier,
                height: 45 * scaleMultiplier
              ***REMOVED******REMOVED***
            >
              <Icon
                name='cancel'
                size={45 * scaleMultiplier***REMOVED***
                color={colors.oslo***REMOVED***
              />
            </TouchableOpacity>
            <View style={{ flex: 1 ***REMOVED******REMOVED***>
              <Text
                style={StandardTypography(
                  { font, isRTL ***REMOVED***,
                  'h3',
                  'Bold',
                  'center',
                  colors.shark
                )***REMOVED***
              >
                {title***REMOVED***
              </Text>
            </View>
            <View
              style={{
                width: 45 * scaleMultiplier,
                height: 45 * scaleMultiplier
              ***REMOVED******REMOVED***
            >
              {topRightComponent***REMOVED***
            </View>
          </View>
          {children***REMOVED***
        </View>
      </Modal>
    </View>
  )
***REMOVED***

//+ REDUX

function mapStateToProps (state) {
  var activeGroup = state.groups.filter(
    item => item.name === state.activeGroup
  )[0]
  return {
    downloads: state.downloads,
    activeDatabase: state.database[activeGroup.language],
    isRTL: state.database[activeGroup.language].isRTL,
    activeGroup: activeGroup,
    translations: state.database[activeGroup.language].translations,
    font: getLanguageFont(activeGroup.language)
  ***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(ModalScreen)
