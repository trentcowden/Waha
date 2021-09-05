import React, { FC, ReactElement } from 'react'
import { Text, View } from 'react-native'
import { CommonProps } from 'redux/common'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'

interface Props extends CommonProps {
  // The maximum number that this time can go up to.
  max: number
  // The time to display in milliseconds.
  time: number
  // The side of the <Scrubber /> component that this time display will go under.
  side: 'right' | 'left'
}

/**
 * A simple component to display a specific time in a nice format. Used for the current time and total time of a piece of media on the <PlayScreen /> and displayed in the <Scrubber /> component.
 */
const TimeDisplay: FC<Props> = ({ max, time, side, isDark }): ReactElement => {
  /**
   * Converts a time in milliseconds to a nicely formatted time in the format HH:MM:SS.
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
          hoursNumber < 10
            ? '0' + hoursNumber.toString()
            : hoursNumber.toString()

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
