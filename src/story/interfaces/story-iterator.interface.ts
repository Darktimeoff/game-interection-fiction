import { StoryInterface } from "@/story/interfaces/story.interface"
import { ConditionType, ConditionsType } from "@/story/interfaces/choices.interface"
import { StoryItemInterface } from "./story-item.interface"
import { StoryIteratorProgressInterface } from "./story-iterator-progress.interface"

export interface StoryIteratorInterface {
   set(item: StoryInterface, sceneId?: string | null, dialogId?: string | null, conditions?: ConditionsType): void
   selectChoice(choiceId: number): string
   next(): StoryItemInterface | null
   reset(): void
   getConditions(): ConditionsType
   setCondition(condition: ConditionType, value: boolean): void
   getProgress(): StoryIteratorProgressInterface
}