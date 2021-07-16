import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { scaleMultiplier } from '../constants'
import { activeDatabaseSelector } from '../redux/reducers/activeGroup'
import { colors } from '../styles/colors'

function mapStateToProps (state) {
  return {
    isRTL: activeDatabaseSelector(state).isRTL,
    isDark: state.settings.isDarkModeEnabled
  }
}

/**
 * A component that renders behind the <LessonItem /> component that gets revealed when the user swipes the lesson item.
 * @param {boolean} isComplete - Whether this lesson is complete or not.
 * @param {Function} toggleComplete - Marks this lesson as complete.
 * @param {Function} showShareModal - Shows the share modal.
 */
const LessonSwipeBackdrop = ({
  // Props passed from a parent component.
  isComplete,
  toggleComplete,
  showShareModal,
  // Props passed from redux.
  isRTL,
  isDark
}) => (
  <View
    style={[
      styles.lessonSwipeBackdropContainer,
      // Reverse the sides that the complete/share buttons are on for RTL languages.
      { flexDirection: isRTL ? 'row-reverse' : 'row' }
    ]}
  >
    {isComplete ? (
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor: colors(isDark).disabled,
            alignItems: isRTL ? 'flex-end' : 'flex-start'
          }
        ]}
        onPress={toggleComplete}
      >
        <View style={styles.iconContainer}>
          <Icon name='cancel-filled' size={20} color={colors(isDark).bg4} />
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor: colors(isDark).success,
            alignItems: isRTL ? 'flex-end' : 'flex-start'
          }
        ]}
        onPress={toggleComplete}
      >
        <View style={styles.iconContainer}>
          <Icon name='check-filled' size={20} color={colors(isDark).bg4} />
        </View>
      </TouchableOpacity>
    )}
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: colors(isDark).highlight,
          alignItems: isRTL ? 'flex-start' : 'flex-end'
        }
      ]}
      onPress={showShareModal}
    >
      <View style={styles.iconContainer}>
        <Icon
          name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'}
          size={20}
          color={colors(isDark).bg4}
        />
      </View>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  lessonSwipeBackdropContainer: {
    width: '100%',
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  iconContainer: {
    width: 50 * scaleMultiplier,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(mapStateToProps)(LessonSwipeBackdrop)
