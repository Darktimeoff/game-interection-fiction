import { StoryItemInterface } from "./story-item.interface";
import { StoryStateInterface } from "./story-state.interface";

export interface StoryItemProgressInterface  {
    state: StoryStateInterface
    item: StoryItemInterface | null
}