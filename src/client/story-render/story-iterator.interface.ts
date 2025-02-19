import { StoryInterface } from "@/story/interfaces/story.interface"
import { StoryItemInterface } from "./interface/story-item.interface"
import { ConditionType, ConditionsType } from "@/story/interfaces/choices.interface"
import { StoryIteratorProgressInterface } from "./interface/story-iterator-progress.interface"

export interface StoryIteratorInterface {
   set(item: StoryInterface, sceneId?: string | null, dialogId?: string | null, conditions?: ConditionsType): void
   selectChoice(choiceId: number): string
   next(sceneId?: string): StoryItemInterface | null
   reset(): void
   getConditions(): ConditionsType
   setCondition(condition: ConditionType, value: boolean): void
   getProgress(): StoryIteratorProgressInterface
}