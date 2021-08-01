import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { gutterSize } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'
import ModalScreen from './ModalScreen'

function mapStateToProps (state) {
  return {
    isRTL: info(activeGroupSelector(state).language).isRTL,
    activeGroup: activeGroupSelector(state),
    t: getTranslations(activeGroupSelector(state).language),
    isDark: state.settings.isDarkModeEnabled
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

/**
 * A modal that displays the various copyright attributions for a language. Uses <ModalScreen /> under the hood.
 * @param {boolean} isVisible - Whether the modal is visible.
 * @param {Function} hideModal - Function to hide the modal.
 */
const CopyrightsModal = ({
  // Props passed from a parent component.
  isVisible,
  hideModal,
  // Props passed from redux.
  isRTL,
  activeGroup,
  isDark,
  t
}) => {
  return (
    <ModalScreen
      title={t.general.view_copyright}
      hideModal={hideModal}
      isVisible={isVisible}
    >
      <View style={{ flex: 1, paddingHorizontal: gutterSize }}>
        <Text
          style={type(
            activeGroup.language,
            'h3',
            'Regular',
            'left',
            colors(isDark).text
          )}
          adjustsFontSizeToFit
        >
          {t.general.copyrights}
        </Text>
      </View>
    </ModalScreen>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CopyrightsModal)
