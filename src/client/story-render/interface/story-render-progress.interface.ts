import { StoryIteratorProgressInterface } from "./story-iterator-progress.interface"

export interface StoryRenderProgressInterface extends StoryIteratorProgressInterface {
    choiceId: number | null
    nextScene: string | null
}