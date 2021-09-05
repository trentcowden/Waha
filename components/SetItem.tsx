// import SvgUri from 'expo-svg-uri'
import LottieView from 'lottie-react-native'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import {
  Animated,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { AGProps, CommonProps } from 'redux/common'
import { StorySet } from 'redux/reducers/database'
import Icon from '../assets/fonts/icon_font_config'
import { isTablet, itemHeights, scaleMultiplier } from '../constants'
import { colors } from '../styles/colors'
import { type } from '../styles/typography'
import SVG from './SVG'

// The mode names are just the screens that they appear on.
export enum SetItemMode {
  SETS_SCREEN = 1,
  LESSONS_SCREEN = 2,
  ADD_SET_SCREEN = 3,
  SET_INFO_MODAL = 4,
}

interface Props extends CommonProps, AGProps {
  // The object for the set to display.
  thisSet: StorySet
  mode: SetItemMode
  font: string
  // A function to fire when the <SetItem /> is pressed. Can be undefined to make the item non-pressable.
  onSetItemSelect?: (set: StorySet) => void
  // How far through the Story Set the user is.
  progressPercentage?: number
  isInInfoMode?: boolean
  setIsInInfoMode?: (toSet: boolean) => void
  areMobilizationToolsUnlocked?: boolean
  showTrailerHighlights?: boolean
}

/**
 * A component that displays a Story Set's Album Art, progress, title, subtitle, and bookmark status. Used on a variety of screens and displayed in a variety of ways depending on the mode prop.
 */
const SetItem: FC<Props> = ({
  thisSet,
  mode,
  onSetItemSelect,
  progressPercentage = null,
  isInInfoMode = null,
  setIsInInfoMode = null,
  font,
  isRTL,
  isDark,
  activeGroup,
  areMobilizationToolsUnlocked = false,
  showTrailerHighlights = false,
}): ReactElement => {
  /**
   * This is to allow the SetItem to animate when switching to and from info mode. Not exactly sure what it does but it's necessary.
   */
  useEffect(() => {
    if (Platform.OS === 'android' && mode === SetItemMode.LESSONS_SCREEN) {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }
  }, [])

  /** Stores a dynamic Album Art component of the SetItem component. This contains a unique SVG that represents the Story Set and its style changes between modes. */
  const [albumArt, setAlbumArt] = useState(<View />)

  /** Stores the dynamic secondary icon portion of the SetItem component. This is a smaller icon on the opposite side from the primary icon and changes between modes as well. */
  const [secondaryIcon, setSecondaryIcon] = useState(<View />)

  /** The rotation of the info mode button. It spins when pressed. */
  const [iconRotation] = useState(new Animated.Value(0))

  /**
   * Animates the rotation of the info mode icon whenever isInInfoMode changes.
   */
  useEffect(() => {
    if (isInInfoMode)
      Animated.spring(iconRotation, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
    else
      Animated.spring(iconRotation, {
        toValue: 0,
        useNativeDriver: true,
      }).start()
  }, [isInInfoMode])

  /**
   * Sets the dynamic Album Art and secondary icon components of the set item based on the screen prop. Updated whenever the Active Group or progress changes.
   */
  useEffect(() => {
    switch (mode) {
      case SetItemMode.SETS_SCREEN:
        // Album Art is a circular progress bar with the set's SVG inside.
        setAlbumArt(
          <View style={styles.primaryIconContainer}>
            <AnimatedCircularProgress
              size={78 * scaleMultiplier}
              width={7 * scaleMultiplier}
              fill={progressPercentage ? progressPercentage * 100 : 0}
              tintColor={
                progressPercentage === 1
                  ? colors(isDark, activeGroup.language).accent + '50'
                  : colors(isDark, activeGroup.language).accent
              }
              rotation={0}
              backgroundColor={colors(isDark).bg4}
            >
              {() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isDark
                      ? progressPercentage === 1
                        ? colors(isDark).disabled
                        : colors(isDark).icons
                      : undefined,
                  }}
                >
                  <SVG
                    name={thisSet.iconName}
                    width={70 * scaleMultiplier}
                    height={70 * scaleMultiplier}
                    color={
                      progressPercentage === 1
                        ? isDark
                          ? colors(isDark).bg4
                          : colors(isDark).disabled
                        : isDark
                        ? colors(isDark).bg4
                        : colors(isDark).icons
                    }
                  />
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
        )
        // Secondary icon is a checkmark if the set is fully completed, a orange marker if this set is the bookmarked set, or nothing.
        setSecondaryIcon(
          progressPercentage === 1 ? (
            <View style={styles.secondaryIconContainer}>
              <Icon
                name='check-outline'
                size={30 * scaleMultiplier}
                color={colors(isDark).disabled}
              />
            </View>
          ) : (
            <View style={styles.secondaryIconContainer}>
              <Icon
                name={
                  thisSet.id === activeGroup.setBookmark
                    ? isRTL
                      ? 'triangle-left'
                      : 'triangle-right'
                    : ''
                }
                size={30 * scaleMultiplier}
                color={colors(isDark, activeGroup.language).accent}
              />
            </View>
          )
        )
        break
      case SetItemMode.LESSONS_SCREEN:
        // Album Art is the same as on the Sets screen: a circular progress bar with the set's SVG inside.
        setAlbumArt(
          <View style={styles.primaryIconContainer}>
            <AnimatedCircularProgress
              size={78 * scaleMultiplier}
              width={7 * scaleMultiplier}
              fill={progressPercentage ? progressPercentage * 100 : 0}
              tintColor={
                progressPercentage === 1
                  ? colors(isDark, activeGroup.language).accent + '50'
                  : colors(isDark, activeGroup.language).accent
              }
              rotation={0}
              backgroundColor={colors(isDark).bg4}
            >
              {() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isDark
                      ? progressPercentage === 1
                        ? colors(isDark).disabled
                        : colors(isDark).icons
                      : undefined,
                  }}
                >
                  <SVG
                    name={thisSet.iconName}
                    width={70 * scaleMultiplier}
                    height={70 * scaleMultiplier}
                    color={
                      progressPercentage === 1
                        ? isDark
                          ? colors(isDark).bg4
                          : colors(isDark).disabled
                        : isDark
                        ? colors(isDark).bg4
                        : colors(isDark).icons
                    }
                  />
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
        )
        // The secondary icon is the button to switch in and out of info mode.
        setSecondaryIcon(
          <Animated.View
            style={{
              transform: [
                {
                  rotateZ: iconRotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
                {
                  // Keeps the rotation centered instead of around a pivot.
                  translateX: 2.5 * scaleMultiplier,
                },
              ],
            }}
          >
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                )
                if (isInInfoMode && setIsInInfoMode) setIsInInfoMode(false)
                else if (setIsInInfoMode) setIsInInfoMode(true)
              }}
              style={styles.secondaryIconContainer}
            >
              {isInInfoMode ? (
                <Icon
                  name='dropdown'
                  size={35 * scaleMultiplier}
                  color={colors(isDark, activeGroup.language).accent}
                  style={{
                    transform: [{ rotateX: '180deg' }],
                  }}
                />
              ) : (
                <Icon
                  name='info'
                  size={25 * scaleMultiplier}
                  color={colors(isDark).icons}
                />
              )}
            </TouchableOpacity>
          </Animated.View>
        )
        break
      case SetItemMode.ADD_SET_SCREEN:
        // Album Art is a slightly altered version of the set's SVG without any progress shown.
        setAlbumArt(
          <View
            style={{
              ...styles.primaryIconContainer,
              backgroundColor: isDark
                ? colors(isDark).icons
                : colors(isDark).bg4,
              borderRadius: 14,
              overflow: 'hidden',
              borderWidth: 7,
              borderColor: isDark ? colors(isDark).bg4 : colors(isDark).icons,
            }}
          >
            <SVG
              name={thisSet.iconName}
              width={80 * scaleMultiplier}
              height={80 * scaleMultiplier}
              color={isDark ? colors(isDark).bg4 : colors(isDark).icons}
            />
          </View>
        )
        // Secondary icon is a small sideways arrow inviting the user to click on the item to open up a new screen in order to save it.
        setSecondaryIcon(
          <View style={styles.secondaryIconContainer}>
            <Icon
              name={isRTL ? 'arrow-left' : 'arrow-right'}
              size={30 * scaleMultiplier}
              color={colors(isDark, activeGroup.language).accent}
            />
          </View>
        )
        break
      case SetItemMode.SET_INFO_MODAL:
        // Album Art is similar to the one on the <AddSet />  screen with some slight style variations.
        setAlbumArt(
          <View
            style={{
              ...styles.primaryIconContainer,
              backgroundColor: isDark
                ? colors(isDark).icons
                : colors(isDark).bg4,
              borderRadius: 14,
              overflow: 'hidden',
              borderWidth: 7,
              borderColor: isDark ? colors(isDark).bg4 : colors(isDark).icons,
            }}
          >
            <SVG
              name={thisSet.iconName}
              width={80 * scaleMultiplier}
              height={80 * scaleMultiplier}
              color={isDark ? colors(isDark).bg4 : colors(isDark).icons}
            />
          </View>
        )
        // There is no secondary icon here.
        setSecondaryIcon(<View style={styles.secondaryIconContainer} />)
        break
    }
  }, [
    progressPercentage,
    thisSet.id === activeGroup.setBookmark,
    isInInfoMode,
    isDark,
  ])

  return (
    <TouchableOpacity
      style={{
        ...styles.setItemContainer,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        height: isTablet
          ? itemHeights[font].SetItem + 15
          : itemHeights[font].SetItem,
      }}
      onPress={onSetItemSelect ? () => onSetItemSelect(thisSet) : undefined}
      // Disable the touch feedback if there's no onSetSelect function.
      activeOpacity={onSetItemSelect ? 0.2 : 1}
    >
      {albumArt}
      <View
        style={{
          ...styles.textContainer,
          marginRight: isRTL ? 20 : 0,
          marginLeft: isRTL ? 0 : 20,
        }}
      >
        <Text
          style={{
            ...type(
              activeGroup.language,
              'd',
              'Regular',
              'left',
              progressPercentage === 1
                ? colors(isDark).disabled
                : colors(isDark).icons
            ),
            textAlignVertical: 'center',
            flexWrap: 'wrap',
          }}
          numberOfLines={1}
        >
          {thisSet.subtitle}
        </Text>
        <Text
          style={{
            ...type(
              activeGroup.language,
              'h3',
              'Black',
              'left',
              progressPercentage === 1
                ? colors(isDark).disabled
                : colors(isDark).text
            ),
            textAlignVertical: 'center',
            flexWrap: 'wrap',
          }}
          numberOfLines={2}
        >
          {thisSet.title}
        </Text>
      </View>
      {secondaryIcon}
      {thisSet.id.includes('3.1') &&
        mode === SetItemMode.SETS_SCREEN &&
        areMobilizationToolsUnlocked &&
        showTrailerHighlights && (
          <View
            style={{
              height: '100%',
              position: 'absolute',
              top: 0,
              right: 0,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
          >
            <LottieView
              autoPlay
              loop
              colorFilters={[
                {
                  keypath: 'hand 2',
                  color: colors(isDark, activeGroup.language).accent,
                },
              ]}
              resizeMode='cover'
              style={{ height: '120%' }}
              source={require('../assets/lotties/tap.json')}
            />
          </View>
        )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  setItemContainer: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  primaryIconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80 * scaleMultiplier,
    height: 80 * scaleMultiplier,
  },
  secondaryIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40 * scaleMultiplier,
    height: 40 * scaleMultiplier,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
})

const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.progressPercentage === nextProps.progressPercentage &&
    prevProps.activeGroup.setBookmark === nextProps.activeGroup.setBookmark &&
    prevProps.isInInfoMode === nextProps.isInInfoMode &&
    prevProps.setIsInInfoMode === nextProps.setIsInInfoMode &&
    prevProps.showTrailerHighlights === nextProps.showTrailerHighlights &&
    prevProps.areMobilizationToolsUnlocked ===
      nextProps.areMobilizationToolsUnlocked &&
    prevProps.isDark === nextProps.isDark
  )
}

export default React.memo(SetItem, areEqual)

/* <SvgUri
source={{
  uri: ''
}}
width={70 * scaleMultiplier}
height={70 * scaleMultiplier}
// fill={fullyCompleted ? colors(isDark).disabled : colors(isDark).text}
fill={colors(isDark).disabled}
fillAll
/>  */
