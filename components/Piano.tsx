import { Audio } from 'expo-av'
import React, { FC, ReactElement, useRef } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, keyColors } from '../styles/colors'
import PianoKeyLabel from './PianoKeyLabel'

// The piano sound effects.
const pianoNotes = [
  require('../assets/pianoNotes/C.mp3'),
  require('../assets/pianoNotes/Db.mp3'),
  require('../assets/pianoNotes/D.mp3'),
  require('../assets/pianoNotes/Eb.mp3'),
  require('../assets/pianoNotes/E.mp3'),
  require('../assets/pianoNotes/F.mp3'),
  require('../assets/pianoNotes/Gb.mp3'),
  require('../assets/pianoNotes/G.mp3'),
  require('../assets/pianoNotes/Ab.mp3'),
  require('../assets/pianoNotes/A.mp3'),
  require('../assets/pianoNotes/Bb.mp3'),
  require('../assets/pianoNotes/B.mp3'),
]

interface Props {
  // Function that sets the played notes state. This state keeps track of what notes the user has played on the piano.
  setPlayedNotes: (pattern: (oldPattern: string) => string) => void
  isMuted?: boolean
  isDark: boolean
}

/**
 * A component that shows a playable piano. Used on the PianoApp screen for Security mode.
 */
const Piano: FC<Props> = ({
  setPlayedNotes,
  isMuted = false,
  isDark,
}): ReactElement => {
  /** Ref to store the audio object. */
  const note = useRef(new Audio.Sound())
  const shouldPlayNote = useRef(true)

  /**
   * Plays a specific piano note.
   * @param {number} number - The key number to play the note of. Each piano key is numbered.
   */
  const playNote = async (number: number) => {
    if (!isMuted && shouldPlayNote.current) {
      shouldPlayNote.current = false
      await note.current
        .unloadAsync()
        .then(() =>
          note.current
            .loadAsync(pianoNotes[number])
            .then(() =>
              note.current
                .playAsync()
                .then(() => (shouldPlayNote.current = true))
            )
        )
    }
  }

  const extraWhiteKeyStyles = {
    height: Dimensions.get('window').height / 2.5,
    backgroundColor: isDark ? colors(isDark).text : colors(isDark).bg4,
    borderColor: colors(isDark).text,
    borderWidth: isDark ? 0 : 2,
    borderBottomWidth: isDark ? 0 : 5,
  }

  const extraBlackKeyStyles = {
    height: Dimensions.get('window').height / 4,
    backgroundColor: isDark ? colors(isDark).bg1 : colors(isDark).text,
  }

  return (
    <View style={styles.pianoContainer}>
      <View style={styles.blackKeysContainer}>
        <View style={{ flex: 0.5 }} />
        <TouchableOpacity
          style={{ ...styles.blackKey, ...extraBlackKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '01')
            playNote(1)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['1']}
            number='1'
            isDark={isDark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.blackKey, ...extraBlackKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '03')
            playNote(3)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['3']}
            number='3'
            isDark={isDark}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={{ ...styles.blackKey, ...extraBlackKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '06')
            playNote(6)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['6']}
            number='6'
            isDark={isDark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.blackKey, ...extraBlackKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '08')
            playNote(8)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['8']}
            number='8'
            isDark={isDark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.blackKey, ...extraBlackKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '10')
            playNote(10)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['10']}
            number='10'
            isDark={isDark}
          />
        </TouchableOpacity>
        <View style={{ flex: 0.5 }} />
      </View>
      <View style={styles.whiteKeysContainer}>
        <TouchableOpacity
          style={{ ...styles.whiteKey, ...extraWhiteKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '00')
            playNote(0)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['0']}
            number='0'
            isDark={isDark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.whiteKey, ...extraWhiteKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '02')
            playNote(2)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['2']}
            number='2'
            isDark={isDark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.whiteKey, ...extraWhiteKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '04')
            playNote(4)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['4']}
            number='4'
            isDark={isDark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.whiteKey, ...extraWhiteKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '05')
            playNote(5)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['5']}
            number='5'
            isDark={isDark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.whiteKey, ...extraWhiteKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '07')
            playNote(7)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['7']}
            number='7'
            isDark={isDark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.whiteKey, ...extraWhiteKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '09')
            playNote(9)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['9']}
            number='9'
            isDark={isDark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.whiteKey, ...extraWhiteKeyStyles }}
          onPress={() => {
            setPlayedNotes((pattern) => pattern + '11')
            playNote(11)
          }}
        >
          <PianoKeyLabel
            backgroundColor={keyColors['11']}
            number='11'
            isDark={isDark}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pianoContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  whiteKey: {
    flex: 1,
    margin: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    zIndex: 0,
  },
  blackKeysContainer: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  whiteKeysContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  blackKey: {
    flex: 1,
    margin: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    zIndex: 1,
  },
})

export default Piano
