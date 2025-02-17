import { StoryInterface } from "@/story/interfaces/story.interface"
import { StoryItemInterface } from "./interface/story-item.interface"
import { ConditionType } from "@/story/interfaces/choices.interface"
import { StoryIteratorProgressInterface } from "./interface/story-iterator-progress.interface"

export interface StoryIteratorInterface {
   set(item: StoryInterface, sceneId: string | null, dialogId: string | null): void
   selectChoice(choiceId: number): string
   next(sceneId?: string): StoryItemInterface | null
   reset(): void
   getCondition(condition: ConditionType): boolean
   setCondition(condition: ConditionType, value: boolean): void
   getProgress(): StoryIteratorProgressInterface
}