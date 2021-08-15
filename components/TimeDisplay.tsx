import { CommonProps } from 'interfaces/common'
import React, { FC, ReactElement } from 'react'
import { Text, View } from 'react-native'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps {
  max: number
  time: number
  side: 'right' | 'left'
}

/**
 * A simple component to display a specific time in a nice format. Used for the current time and total time of a piece of media on the Play Screen and displayed in the <Scrubber /> component.
 * @param {number} max - The maximum number that this time can go up to.
 * @param {number} time - The time to display in milliseconds.
 * @param {string} side - The side that this time display goes on. Either 'right' or 'left'.
 */
const TimeDisplay: FC<Props> = ({
  // Props passed from a parent component.
  max,
  time,
  side,
  isDark,
}): ReactElement => {
  /**
   * Converts a time in milliseconds to a nicely formatted time in the format HH:MM:SS.
   * @param {number} time - The time in milliseconds to convert.
   * @return {string} - The nicely formatted time.
   */
  const convertTime = (time: number): string => {
    var secondsNumber: number
    var minutesNumber: number
    var hoursNumber: number
    var secondsString: string
    var minutesString: string
    var hoursString: string

    if (time > 0 && time <= max) {
      // If the time is greater than an hour, we need to show the hour of the time as well.
      if (time >= 3600000) {
        secondsNumber = Math.floor((time / 1000) % 60)
        minutesNumber = Math.floor((time / (1000 * 60)) % 60)
        hoursNumber = Math.floor((time / (1000 * 60 * 60)) % 60)

        secondsString = secondsNumber.toString()
        minutesString =
          minutesNumber < 10
            ? '0' + minutesNumber.toString()
            : minutesNumber.toString()
        hoursString =
          secondsNumber < 10
            ? '0' + secondsNumber.toString()
            : secondsNumber.toString()

        return `${hoursString}:${minutesString}:${secondsString}`
      } else {
        var secondsNumber = Math.floor((time / 1000) % 60)
        var minutesNumber = Math.floor((time / (1000 * 60)) % 60)

        minutesString =
          minutesNumber < 10
            ? '0' + minutesNumber.toString()
            : minutesNumber.toString()
        secondsString =
          secondsNumber < 10
            ? '0' + secondsNumber.toString()
            : secondsNumber.toString()

        return `${minutesString}:${secondsString}`
      }
    } // If the time is greater than the max allowed, just show the max.
    else if (time > max) {
      return convertTime(max)
    } else {
      return '00:00'
    }
  }

  return (
    <View>
      <Text
        style={type(
          'en',
          'd',
          'Regular',
          'center',
          side === 'left' ? colors(isDark).text : colors(isDark).secondaryText
        )}
      >
        {convertTime(time)}
      </Text>
    </View>
  )
}

export default TimeDisplay
