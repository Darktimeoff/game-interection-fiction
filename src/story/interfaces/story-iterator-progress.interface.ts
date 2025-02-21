import { StoryStateInterface } from "./story-state.interface"

export interface StoryIteratorProgressInterface extends Pick<StoryStateInterface, 'sceneId' | 'dialogId'> {
}
