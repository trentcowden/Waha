import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

function mapStateToProps (state) {
  return {
    isDark: state.settings.isDarkModeEnabled,

    isRTL: info(activeGroupSelector(state).language).isRTL
  }
}

/**
 * A component that displays the text for a chapter of a book. Used only in AUDIOBOOK and BOOK lesson types.
 * @param {Object} thisLesson - The object for the current lesson to display the text for.
 */
const BookView = ({
  // Props passed from a parent component.
  thisLesson,
  // Props passed from redux.
  font,

  isRTL
}) => {
  /**
   * Renders a paragraph of the chapter text.
   * @param {Object} item - The paragraph to render.
   */
  const renderParagraph = ({ item }) => (
    <Text
      style={[
        type(
          activeGroup.language,
          activeGroup.language,
          'h3',
          'Regular',
          'left',
          colors(isDark).text
        ),
        // Margin here instead of padding on the whole container because padding makes the scroll bar cover up the text.
        { marginHorizontal: 10 }
      ]}
    >
      {item + '\n'}
    </Text>
  )

  return (
    <View style={styles.bookViewContainer}>
      <FlatList
        // Render a paragraph as a FlatList item.
        data={thisLesson.text.split('\n')}
        renderItem={renderParagraph}
        keyExtractor={item => item}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bookViewContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
    flex: 1
  }
})

export default connect(mapStateToProps)(BookView)
