import * as ScreenOrientation from 'expo-screen-orientation'

/**
 * Locks Waha's orientation to portrait. If it's available, it locks to "PORTRAIT", which allows for regular and upside-down portrait. If it's not, it locks to "PORTRAIT_UP", which allows only regular portrait. Upside-down portrait generally isn't supported on phones with notches.
 */
export const lockPortrait = (thenFunction?: () => void) => {
  ScreenOrientation.supportsOrientationLockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT
  ).then(isSupported => {
    if (isSupported) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      ).then(() => {
        if (thenFunction) thenFunction()
      })
    } else {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      ).then(() => {
        if (thenFunction) thenFunction()
      })
    }
  })
}

/**
 * Locks Waha's orientation to landscape.
 */
export const lockLandscape = () => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
}
