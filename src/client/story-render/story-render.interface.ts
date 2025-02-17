import { StoryItemInterface } from "./interface/story-item.interface";

export interface StoryRenderInterface {
    render(item: StoryItemInterface): Promise<number | null>
}