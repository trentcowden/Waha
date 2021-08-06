export type SetInfoRequest = 'language' | 'index' | 'category'
export type LessonInfoRequest =
  | 'language'
  | 'index'
  | 'setID'
  | 'subtitle'
  | 'category'
  | 'audioSource'
  | 'videoSource'

export type LessonIndex = number
export type SetIndex = number

export type SetCategory = 'Foundational' | 'Topical' | 'MobilizationTools'
export type Language = string
export type SetID = string
export type Subtitle = string
export type AudioSource = string
export type VideoSource = string

export type SetInfo<T> = T extends 'index'
  ? SetIndex
  : T extends 'category'
  ? SetCategory
  : T extends 'language'
  ? Language
  : undefined

export type LessonInfo<T> = T extends 'language'
  ? Language
  : T extends 'index'
  ? LessonIndex
  : T extends 'setID'
  ? SetID
  : T extends 'subtitle'
  ? Subtitle
  : T extends 'category'
  ? SetCategory
  : T extends 'audioSource'
  ? AudioSource
  : T extends 'videoSource'
  ? VideoSource
  : undefined

export const getSetInfo = <T extends SetInfoRequest>(
  type: T,
  setID: string
): SetInfo<T> => {
  // Split the ID up into separate sections.
  var idComponents = setID.split('.')

  // An example setID is "en.1.1".
  switch (type) {
    case 'language':
      return idComponents[0] as SetInfo<T>
    case 'index':
      return parseInt(idComponents[2]) as SetInfo<T>
    case 'category':
      switch (idComponents[1]) {
        case '1':
          return 'Foundational' as SetInfo<T>
        case '2':
          return 'Topical' as SetInfo<T>
        case '3':
          return 'MobilizationTools' as SetInfo<T>
        default:
          return 'Foundational' as SetInfo<T>
      }
    default:
      return undefined as SetInfo<T>
  }
}

export const getLessonInfo = <T extends LessonInfoRequest>(
  type: T,
  lessonID: string
): LessonInfo<T> => {
  // Split the ID up into separate sections.
  var idComponents = lessonID.split('.')

  // An example lessonID is "en.1.1.1".
  switch (type) {
    case 'language':
      return idComponents[0] as LessonInfo<T>
    case 'index':
      return parseInt(idComponents[3]) as LessonInfo<T>
    case 'setID':
      return (idComponents[0] +
        '.' +
        idComponents[1] +
        '.' +
        idComponents[2]) as LessonInfo<T>
    case 'subtitle':
      return (idComponents[1] +
        '.' +
        idComponents[2] +
        '.' +
        idComponents[3]) as LessonInfo<T>
    case 'category':
      switch (idComponents[1]) {
        case '1':
          return 'Foundational' as LessonInfo<T>
        case '2':
          return 'Topical' as LessonInfo<T>
        case '3':
          return 'MobilizationTools' as LessonInfo<T>
        default:
          return 'Foundational' as LessonInfo<T>
      }
    case 'audioSource':
      return `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${
        idComponents[0]
      }%2Fsets%2F${idComponents[1] +
        '.' +
        idComponents[2]}%2F${lessonID}.mp3?alt=media` as LessonInfo<T>
    case 'videoSource':
      return `https://firebasestorage.googleapis.com/v0/b/waha-app-db.appspot.com/o/${
        idComponents[0]
      }%2Fsets%2F${idComponents[1] + '.' + idComponents[2]}%2F${lessonID +
        'v'}.mp4?alt=media` as LessonInfo<T>
    default:
      return undefined as LessonInfo<T>
  }
}
