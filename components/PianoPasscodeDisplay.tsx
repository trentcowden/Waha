import React, { FC, ReactElement } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { CommonProps } from 'redux/common'
import { scaleMultiplier } from '../constants'
import { colors, keyColors } from '../styles/colors'
import PianoKeyLabel from './PianoKeyLabel'

interface Props extends CommonProps {
  passcode: string
}

/**
 * A component that shows the passcode that is currently entered on the piano in a series of <PianoKeyLabel />s.
 */
const PianoPasscodeDisplay: FC<Props> = ({
  passcode,
  isRTL,
  isDark,
}): ReactElement => {
  const extraKeyPlaceholderStyles = {
    backgroundColor: colors(isDark).bg2,
    borderColor: isDark ? colors(isDark).bg4 : colors(isDark).bg1,
  }

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        padding: 20,
        flexDirection: isRTL ? 'row-reverse' : 'row',
      }}
    >
      <View style={{ ...styles.keyPlaceholder, ...extraKeyPlaceholderStyles }}>
        {passcode[1] && (
          <PianoKeyLabel
            backgroundColor={keyColors[passcode.substr(0, 2).replace(/^0/, '')]}
            number={passcode.substr(0, 2).replace(/^0/, '')}
            style={{ alignSelf: undefined, marginBottom: 0 }}
            isDark={isDark}
          />
        )}
      </View>
      <View style={{ ...styles.keyPlaceholder, ...extraKeyPlaceholderStyles }}>
        {passcode[3] && (
          <PianoKeyLabel
            backgroundColor={keyColors[passcode.substr(2, 2).replace(/^0/, '')]}
            number={passcode.substr(2, 2).replace(/^0/, '')}
            style={{ alignSelf: undefined, marginBottom: 0 }}
            isDark={isDark}
          />
        )}
      </View>
      <View style={{ ...styles.keyPlaceholder, ...extraKeyPlaceholderStyles }}>
        {passcode[5] && (
          <PianoKeyLabel
            backgroundColor={keyColors[passcode.substr(4, 2).replace(/^0/, '')]}
            number={passcode.substr(4, 2).replace(/^0/, '')}
            style={{ alignSelf: undefined, marginBottom: 0 }}
            isDark={isDark}
          />
        )}
      </View>
      <View style={{ ...styles.keyPlaceholder, ...extraKeyPlaceholderStyles }}>
        {passcode[7] && (
          <PianoKeyLabel
            backgroundColor={keyColors[passcode.substr(6, 2).replace(/^0/, '')]}
            number={passcode.substr(6, 2).replace(/^0/, '')}
            style={{ alignSelf: undefined, marginBottom: 0 }}
            isDark={isDark}
          />
        )}
      </View>
      <View style={{ ...styles.keyPlaceholder, ...extraKeyPlaceholderStyles }}>
        {passcode[9] && (
          <PianoKeyLabel
            backgroundColor={keyColors[passcode.substr(8, 2).replace(/^0/, '')]}
            number={passcode.substr(8, 2).replace(/^0/, '')}
            style={{ alignSelf: undefined, marginBottom: 0 }}
            isDark={isDark}
          />
        )}
      </View>
      <View style={{ ...styles.keyPlaceholder, ...extraKeyPlaceholderStyles }}>
        {passcode[11] && (
          <PianoKeyLabel
            backgroundColor={
              keyColors[passcode.substr(10, 2).replace(/^0/, '')]
            }
            number={passcode.substr(10, 2).replace(/^0/, '')}
            style={{ alignSelf: undefined, marginBottom: 0 }}
            isDark={isDark}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  keyPlaceholder: {
    width: Dimensions.get('window').width / 12 + 12,
    height: Dimensions.get('window').width / 12 + 12,
    borderRadius: Dimensions.get('window').width / 24 + 6,
    margin: 5 * scaleMultiplier,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
})

export default PianoPasscodeDisplay
