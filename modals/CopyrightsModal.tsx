import React, { FC, ReactElement } from 'react'
import { Text, View } from 'react-native'
import { gutterSize } from '../constants'
import { info } from '../functions/languageDataFunctions'
import { selector } from '../redux/hooks'
import { activeGroupSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import { getTranslations } from '../translations/translationsConfig'
import ModalScreen from './ModalScreen'

interface Props {
  isVisible: boolean
  hideModal: () => void
}

/**
 * A modal that displays the various copyright attributions for a language. Uses <ModalScreen /> under the hood.
 */
const CopyrightsModal: FC<Props> = ({ isVisible, hideModal }): ReactElement => {
  // Redux state/dispatch.
  const activeGroup = selector((state) => activeGroupSelector(state))
  const isRTL = info(activeGroup.language).isRTL
  const t = getTranslations(activeGroup.language)
  const isDark = selector((state) => state.settings.isDarkModeEnabled)

  return (
    <ModalScreen
      title={t.general.view_copyright}
      hideModal={hideModal}
      isVisible={isVisible}
      isRTL={isRTL}
      activeGroup={activeGroup}
      isDark={isDark}
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

export default CopyrightsModal
