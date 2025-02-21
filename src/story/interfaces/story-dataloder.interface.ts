import { StoryEnum } from "@/story/enum/story.enum";
import { StoryFullInterface } from "@/story/interfaces/story.interface";

export interface StoryDataloaderInterface {
    path: string;
    initialSceneId: string;

    load(storyId?: StoryEnum, sceneId?: string): Promise<StoryFullInterface>;

    getStoryIds(): Promise<StoryEnum[]>;

    getSceneIds(storyId: StoryEnum): Promise<string[]>;
}   