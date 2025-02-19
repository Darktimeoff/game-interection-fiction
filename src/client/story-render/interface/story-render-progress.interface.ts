import { ConditionsType } from "@/story/interfaces/choices.interface"
import { StoryIteratorProgressInterface } from "./story-iterator-progress.interface"

export interface StoryRenderProgressInterface extends StoryIteratorProgressInterface {
    choiceId: number | null
    nextScene: string | null
    conditions: ConditionsType
}