import { StoryInterface } from "./story.interface";

export interface StoryDataloaderInterface {
    load(episodeId: string, sceneId: string): Promise<StoryInterface>;
}   