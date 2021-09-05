import React, { FC, ReactElement } from 'react'
import { ViewStyle } from 'react-native'
import { AGProps, CommonProps, TProps } from 'redux/common'
import { SecurityState } from 'redux/reducers/security'
import Icon from '../assets/fonts/icon_font_config'
import OptionsModalButton from '../components/OptionsModalButton'
import WahaSeparator from '../components/WahaSeparator'
import { scaleMultiplier } from '../constants'
import OptionsModal from '../modals/OptionsModal'
import { colors } from '../styles/colors'

interface Props extends CommonProps, AGProps, TProps {
  isVisible: boolean
  hideModal: () => void
  security: SecurityState
  setTimeoutDuration: (ms: number) => void
}

/**
 * A modal that allows the user to change the security timeout. Displays a list of options using the OptionsModal component.
 * @param {boolean} isVisible - Whether the modal should be visible or not.
 * @param {Function} hideModal - Function to hide the modal.
 */
const SecurityTimeoutPickerModal: FC<Props> = ({
  isVisible,
  hideModal,
  security,
  isRTL,
  isDark,
  t,
  activeGroup,
  setTimeoutDuration,
}): ReactElement => {
  const checkIconStyle: ViewStyle = {
    position: 'absolute',
    paddingHorizontal: 20,
    right: isRTL ? undefined : 0,
    left: isRTL ? 0 : undefined,
  }

  return (
    <OptionsModal
      isVisible={isVisible}
      hideModal={hideModal}
      closeText={t.general.cancel}
      isDark={isDark}
      activeGroup={activeGroup}
      isRTL={isRTL}
    >
      {/* Button to set the timeout duration to instant. */}
      <OptionsModalButton
        label={t.security.instant}
        onPress={() => {
          setTimeoutDuration(0), hideModal()
        }}
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      >
        {security.timeoutDuration === 0 ? (
          <Icon
            name='check'
            color={colors(isDark).success}
            size={30 * scaleMultiplier}
            style={checkIconStyle}
          />
        ) : null}
      </OptionsModalButton>
      <WahaSeparator isDark={isDark} />
      {/* Button to set the timeout duration to 1 minute. */}
      <OptionsModalButton
        label={t.security.one_minute}
        onPress={() => {
          setTimeoutDuration(60000), hideModal()
        }}
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      >
        {security.timeoutDuration === 60000 ? (
          <Icon
            name='check'
            color={colors(isDark).success}
            size={30 * scaleMultiplier}
            style={checkIconStyle}
          />
        ) : null}
      </OptionsModalButton>
      <WahaSeparator isDark={isDark} />
      {/* Button to set the timeout duration to 5 minutes. */}
      <OptionsModalButton
        label={t.security.five_minutes}
        onPress={() => {
          setTimeoutDuration(300000), hideModal()
        }}
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      >
        {security.timeoutDuration === 300000 ? (
          <Icon
            name='check'
            color={colors(isDark).success}
            size={30 * scaleMultiplier}
            style={checkIconStyle}
          />
        ) : null}
      </OptionsModalButton>
      <WahaSeparator isDark={isDark} />
      {/* Button to set the timeout duration to 15 minutes. */}
      <OptionsModalButton
        label={t.security.fifteen_minutes}
        onPress={() => {
          setTimeoutDuration(900000), hideModal()
        }}
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      >
        {security.timeoutDuration === 900000 ? (
          <Icon
            name='check'
            color={colors(isDark).success}
            size={30 * scaleMultiplier}
            style={checkIconStyle}
          />
        ) : null}
      </OptionsModalButton>
      <WahaSeparator isDark={isDark} />
      {/* Button to set the timeout duration to 1 hour. */}
      <OptionsModalButton
        label={t.security.one_hour}
        onPress={() => {
          setTimeoutDuration(3600000), hideModal()
        }}
        isDark={isDark}
        activeGroup={activeGroup}
        isRTL={isRTL}
      >
        {security.timeoutDuration === 3600000 ? (
          <Icon
            name='check'
            color={colors(isDark).success}
            size={30 * scaleMultiplier}
            style={checkIconStyle}
          />
        ) : null}
      </OptionsModalButton>
    </OptionsModal>
  )
}

export default SecurityTimeoutPickerModal
