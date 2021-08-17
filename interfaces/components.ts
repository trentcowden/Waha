/**
 * Modes for the <ChapterButton /> component on the <PlayScreen />.
 */
export enum ChapterButtonMode {
  INCOMPLETE = 1,
  COMPLETE = 2,
  ACTIVE = 3,
  DOWNLOADING = 4,
  DISABLED = 5
}

/**
 * Modes used for the <SetItem /> component.
 */
export enum SetItemMode {
  SETS_SCREEN = 1,
  LESSONS_SCREEN = 2,
  ADD_SET_SCREEN = 3,
  SET_INFO_MODAL = 4
}

/**
 * Modes used for the <WahaButton /> component.
 */
export enum WahaButtonMode {
  SUCCESS = 1,
  ERROR = 2,
  ERROR_SECONDARY = 3,
  DISABLED = 4
}

export interface SectionOffset {
  title: string
  globalOffset: number
  localOffset?: number
}

export interface Layouts {
  contentHeight: number
  windowHeight: number
}
