import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'

function mapStateToProps (state) {
  return {
    isDark: state.settings.isDarkModeEnabled
  }
}

/**
 * Screen that gets navigated to whenever the app enters "background" mode on iOS. This is so the app preview is hidden in the iOS multitasking view.
 */
const SplashScreen = ({
  // Props passed from redux.
  isDark
}) => {
  return (
    <View style={{ ...styles.screen, backgroundColor: colors(isDark).brand }}>
      <Image
        source={require('../assets/icons/splash.png')}
        style={{
          resizeMode: 'contain',
          width: Dimensions.get('window').width - 100 * scaleMultiplier
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(mapStateToProps)(SplashScreen)
