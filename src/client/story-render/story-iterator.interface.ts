import { StoryInterface } from "@/story/interfaces/story.interface"
import { StoryItemInterface } from "./interface/story-item.interface"
import { ConditionType } from "@/story/interfaces/choices.interface"

export interface StoryIteratorInterface {
   set(item: StoryInterface, sceneId: string): void
   selectChoice(choiceId: number): void
   next(sceneId?: string): StoryItemInterface | null
   reset(): void
   getCondition(condition: ConditionType): boolean
   setCondition(condition: ConditionType, value: boolean): void
}