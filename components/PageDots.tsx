import React, { FC, ReactElement } from 'react'
import { View } from 'react-native'
import { scaleMultiplier } from '../constants'
import { CommonProps } from '../redux/common'
import { colors } from '../styles/colors'

/**
 * A component that renders a single dot representing a page of something that is horizontally scrollable.
 */
const Dot = ({ isActive, isDark }: { isActive: boolean; isDark: boolean }) => (
  <View
    style={{
      marginHorizontal: 5,
      backgroundColor: isActive
        ? colors(isDark).icons
        : colors(isDark).disabled,
      width: isActive ? 9 * scaleMultiplier : 7 * scaleMultiplier,
      height: isActive ? 9 * scaleMultiplier : 7 * scaleMultiplier,
      borderRadius: isActive ? 4.5 * scaleMultiplier : 3.5 * scaleMultiplier,
    }}
  />
)

interface Props extends CommonProps {
  // The total number of dots (i.e. number of pages) to display.
  numDots: number
  // The currently active dot (i.e. page).
  activeDot: number
}

/**
 * Displays a number of dots corresponding to pages in a PagerView.
 */
const PageDots: FC<Props> = ({
  numDots,
  activeDot,
  isRTL,
  isDark,
}): ReactElement => {
  // Array that holds the many dot components.
  var dots = []

  // Add a dot for each page.
  for (var i = 1; i < numDots + 1; i++) {
    dots.push(
      <Dot
        // Whether a dot is active depends on whether the pages go from RTL or LTR. For RTL:
        isActive={isRTL ? numDots - activeDot === i : activeDot + 1 === i}
        key={i}
        isDark={isDark}
      />
    )
  }

  return (
    <View
      style={{
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
      }}
    >
      {dots}
    </View>
  )
}

export default PageDots
