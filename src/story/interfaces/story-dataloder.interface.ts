import { StoryInterface } from "./story.interface";

export interface StoryDataloaderInterface {
    path: string;

    load(episodeId: string, sceneId: string): Promise<StoryInterface>;
}   