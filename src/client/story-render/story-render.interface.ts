import { StoryItemInterface } from "@/story/interfaces/story-item.interface";

export interface StoryRenderInterface {
    render(item: StoryItemInterface): Promise<number | null>
}