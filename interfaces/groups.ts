export interface Group {
  name: string
  id: string
  language: string
  emoji: string
  recentCoreOrTool: string
  setBookmark: string
  shouldShowMobilizationToolsTab: boolean
  addedSets: SavedSet[]
}

export interface SavedSet {
  id: string
  progress: number[]
  bookmark: number
}
