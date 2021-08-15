import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { scaleMultiplier } from '../constants'
import { AGProps, CommonProps } from '../interfaces/common'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps, AGProps {
  isVisible: boolean
  hideModal: () => void
  closeText: string
}

/**
 * A modal component that displays a list of buttons. Very similar to the standard iOS action sheet.
 * @param {boolean} isVisible - Whether the modal is visible.
 * @param {Function} hideModal - Function to hide the modal.
 * @param {string} closeText - The text to display on the button that closes the modal.
 * @param {Component} children - The list of buttons to display in the modal.
 */
const OptionsModal: FC<Props> = ({
  // Props passed from a parent component.
  isVisible,
  hideModal,
  closeText,
  children,
  // Props passed from redux.
  isDark,
  activeGroup,
}): ReactElement => (
  <Modal
    isVisible={isVisible}
    hasBackdrop={true}
    onBackdropPress={() => hideModal()}
    backdropOpacity={0.3}
    style={{ justifyContent: 'flex-end' }}
    onSwipeComplete={() => hideModal()}
    swipeDirection={['down']}
    propagateSwipe={true}
    useNativeDriver
  >
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          ...styles.childrenContainer,
          backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
        }}
      >
        {children}
      </View>
      <View
        style={{
          ...styles.closeButtonContainer,
          backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
        }}
      >
        <TouchableOpacity
          onPress={() => hideModal()}
          style={{
            ...styles.closeButtonContainer,
            backgroundColor: isDark ? colors(isDark).bg2 : colors(isDark).bg4,
          }}
        >
          <Text
            style={type(
              activeGroup.language,
              'h3',
              'Bold',
              'center',
              colors(isDark).error
            )}
          >
            {closeText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  childrenContainer: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 20,
    marginVertical: 10,
  },
  closeButtonContainer: {
    width: '100%',
    maxWidth: 500,
    height: 70 * scaleMultiplier,
    justifyContent: 'center',
    borderRadius: 20,
  },
})

export default OptionsModal
