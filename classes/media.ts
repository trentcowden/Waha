import { Audio, AVPlaybackStatus, Video } from 'expo-av'
import { Chapter } from '../interfaces/setAndLessonInfo'

/**
 * Class for media used on the <PlayScreen />. This just removes some code on the <PlayScreen /> and simplifies media usage.
 */
export class Media {
  public audio: Audio.Sound | null
  public video: Video | null

  constructor (audio: Audio.Sound) {
    this.audio = audio
    this.video = null
  }

  addVideo (video: Video) {
    this.video = video
  }

  load (
    source: string,
    shouldAutoPlay: boolean,
    activeChapter: Chapter | undefined
  ): Promise<AVPlaybackStatus> {
    if (!activeChapter)
      return new Promise((): AVPlaybackStatus => ({ isLoaded: false }))

    const media = activeChapter === Chapter.TRAINING ? this.video : this.audio
    if (media !== null)
      return media.loadAsync(
        { uri: source },
        {
          // Initial play status depends on whether we should autoplay or not.
          shouldPlay: shouldAutoPlay ? true : false,
          // Call the onPlaybackStatusUpdate function once every second.
          progressUpdateIntervalMillis: 1000
        }
      )
    else return new Promise((): AVPlaybackStatus => ({ isLoaded: false }))
  }

  play (activeChapter: Chapter | undefined): Promise<AVPlaybackStatus> {
    if (!activeChapter)
      return new Promise((): AVPlaybackStatus => ({ isLoaded: false }))

    const media = activeChapter === Chapter.TRAINING ? this.video : this.audio
    if (media !== null) return media.playAsync()
    else return new Promise((): AVPlaybackStatus => ({ isLoaded: false }))
  }

  pause (activeChapter: Chapter | undefined): Promise<AVPlaybackStatus> {
    if (!activeChapter)
      return new Promise((): AVPlaybackStatus => ({ isLoaded: false }))

    const media = activeChapter === Chapter.TRAINING ? this.video : this.audio
    if (media !== null) return media.pauseAsync()
    else return new Promise((): AVPlaybackStatus => ({ isLoaded: false }))
  }

  playFromLocation (
    location: number,
    isMediaPlaying: boolean,
    activeChapter: Chapter | undefined
  ): Promise<AVPlaybackStatus> {
    if (!activeChapter)
      return new Promise((): AVPlaybackStatus => ({ isLoaded: false }))

    const media = activeChapter === Chapter.TRAINING ? this.video : this.audio
    if (media !== null)
      return media.setStatusAsync({
        shouldPlay: isMediaPlaying ? true : false,
        positionMillis: location
      })
    else return new Promise((): AVPlaybackStatus => ({ isLoaded: false }))
  }

  setAudioOnStatusUpdate (
    onStatusUpdate: (playbackStatus: AVPlaybackStatus) => void
  ) {
    if (this.audio !== null)
      this.audio.setOnPlaybackStatusUpdate(onStatusUpdate)
  }

  closeFullscreen () {
    if (this.video !== null) return this.video.dismissFullscreenPlayer()
    else return new Promise((): AVPlaybackStatus => ({ isLoaded: false }))
  }

  openFullscreen () {
    if (this.video !== null) return this.video.presentFullscreenPlayer()
    else return new Promise((): AVPlaybackStatus => ({ isLoaded: false }))
  }

  unload () {
    if (this.audio !== null) this.audio.unloadAsync()
    if (this.video !== null) this.video.unloadAsync()
  }

  cleanup () {
    this.audio = null
    this.video = null
  }
}
