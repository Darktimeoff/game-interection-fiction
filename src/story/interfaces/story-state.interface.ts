import { StoryEnum } from "@/story/enum/story.enum"
import { ConditionsType } from "./choices.interface"

export interface StoryStateInterface {
    storyId: StoryEnum 
    episodeId: string
    sceneId: string | null
    dialogId: string | null
    conditions: ConditionsType
    isEnded: boolean
}