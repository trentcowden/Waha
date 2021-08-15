import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs/lib/typescript/src/types'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParams } from 'navigation/MainStack'
import { SetCategory } from '../interfaces/setAndLessonInfo'
import { SetsTabsParams } from '../navigation/SetsTabs'

export type SetsScreenNavigationProp =
  | CompositeNavigationProp<
      MaterialTopTabNavigationProp<SetsTabsParams, SetCategory.FOUNDATIONAL>,
      StackNavigationProp<MainStackParams>
    >
  | CompositeNavigationProp<
      MaterialTopTabNavigationProp<SetsTabsParams, SetCategory.TOPICAL>,
      StackNavigationProp<MainStackParams>
    >
  | CompositeNavigationProp<
      MaterialTopTabNavigationProp<
        SetsTabsParams,
        SetCategory.MOBILIZATION_TOOLS
      >,
      StackNavigationProp<MainStackParams>
    >

export type SetsScreenRouteProp =
  | RouteProp<SetsTabsParams, SetCategory.FOUNDATIONAL>
  | RouteProp<SetsTabsParams, SetCategory.TOPICAL>
  | RouteProp<SetsTabsParams, SetCategory.MOBILIZATION_TOOLS>
