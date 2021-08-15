import { getSetInfo } from '../functions/setAndLessonInfoFunctions'
import { SetCategory } from '../interfaces/setAndLessonInfo'
import { DBLanguageData, StorySet } from '../redux/reducers/database'
import { Group, SavedSet } from '../redux/reducers/groups'

/** Checks to see if a set is almost complete and adds the next set if all the conditions are met. The conditions are:
 * 1) The Foundational set after this one exists.
 * 2) This set is 85% or more complete.
 * 3) This set is Foundational.
 * 4) The Foundational set after this one hasn't already been added.
 */
export const checkForAlmostCompleteSet = (
  thisSet: StorySet,
  addedSet: SavedSet,
  activeGroup: Group,
  activeDatabase: DBLanguageData | undefined,
  addSet: (groupName: string, groupID: number, set: StorySet) => void,
  setShowNextSetUnlockedModal: (toSet: boolean) => void
) => {
  // Firstly, we need to get the set after this one before we can do anything else.
  if (activeDatabase) {
    var nextSet = activeDatabase.sets.filter(
      dbSet =>
        getSetInfo('category', dbSet.id) === SetCategory.FOUNDATIONAL &&
        getSetInfo('index', dbSet.id) === getSetInfo('index', thisSet.id) + 1
    )[0]

    // If all of the criteria are met, add the next set and show a modal notifying the user.
    if (nextSet) {
      if (
        addedSet.progress.length / thisSet.lessons.length > 0.85 &&
        getSetInfo('category', thisSet.id) === SetCategory.FOUNDATIONAL &&
        !activeGroup.addedSets.some(savedSet => savedSet.id === nextSet.id)
      ) {
        addSet(
          activeGroup.name,
          activeGroup.id,
          activeDatabase.sets
            .filter(
              set => getSetInfo('category', set.id) === SetCategory.FOUNDATIONAL
            )
            .filter(
              set =>
                getSetInfo('index', set.id) ===
                getSetInfo('index', thisSet.id) + 1
            )[0]
        )
        setShowNextSetUnlockedModal(true)
        return true
      }
    }
    return false
  } else return false
}

export const checkForFullyCompleteSet = (
  thisSet: StorySet,
  addedSet: SavedSet,
  setShowSetCompleteModal: (toSet: boolean) => void
) => {
  if (addedSet.progress.length === thisSet.lessons.length) {
    setShowSetCompleteModal(true)
    return true
  }
  return false
}
