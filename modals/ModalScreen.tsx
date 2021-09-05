import Constants from 'expo-constants'
import React, { FC, ReactElement } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal from 'react-native-modal'
import { AGProps, CommonProps } from 'redux/common'
import Icon from '../assets/fonts/icon_font_config'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  isVisible: boolean
  hideModal: () => void
  topRightComponent?: ReactElement
  onCancelPress?: () => void
  onModalWillShow?: () => void
  title: string
}

/**
 * A component that renders a fullscreen modal with a header.
 * @param {boolean} isVisible - Whether the modal is visible or not.
 * @param {Function} hideMopdal - Function to hide the modal.
 * @param {Component} topRightComponent - (Optional) Component to display in the upper right corner of the modal. The upper left is always the x button to close.
 * @param {Function} onCancelPress - (Optional) Function to fire when the user presses the upper-left close button. Supplements closing the modal.
 * @param {Function} onModalWillShow - Function to fire when the modal first opens.
 * @param {string} title - The title of the screen to display at the very top of the component.
 * @param {Component} children - The component to display as the content of the modal screen.
 */
const ModalScreen: FC<Props> = ({
  isVisible,
  hideModal,
  topRightComponent = null,
  onCancelPress,
  onModalWillShow,
  title,
  children,
  isRTL,
  isDark,
  activeGroup,
}): ReactElement => (
  // Outer view is here because of some weird scrolling issues that occur when there's nested scrollable content inside the modal.
  <View>
    <Modal
      isVisible={isVisible}
      hasBackdrop={true}
      useNativeDriver
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      backdropOpacity={0.3}
      onSwipeComplete={hideModal}
      swipeDirection={['down']}
      propagateSwipe={true}
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0,
        marginHorizontal: 0,
        // Need to make the modal have 20px of space above it from the header. The way to do that is different between iOS and Android.
        marginTop:
          Platform.OS === 'ios'
            ? Constants.statusBarHeight > 40
              ? 60
              : 30
            : 20,
      }}
      onModalWillShow={onModalWillShow}
    >
      <View
        style={{
          ...styles.contentContainer,
          backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).bg3,
        }}
      >
        <View
          style={{
            ...styles.headerContainer,
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (onCancelPress) onCancelPress()
              hideModal()
            }}
            style={styles.headerButtonContainer}
          >
            <Icon
              name='cancel'
              size={45 * scaleMultiplier}
              color={colors(isDark).icons}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text
              style={type(
                activeGroup.language,
                'h3',
                'Bold',
                'center',
                colors(isDark).text
              )}
            >
              {title}
            </Text>
          </View>
          <View style={styles.headerButtonContainer}>{topRightComponent}</View>
        </View>
        {children}
      </View>
    </Modal>
  </View>
)

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10 * scaleMultiplier,
  },
  headerTitleContainer: { flex: 1 },
  headerButtonContainer: {
    width: 45 * scaleMultiplier,
    height: 45 * scaleMultiplier,
  },
})

export default ModalScreen
