import { StoryEnum } from "@/story/enum/story.enum";
import { StoryFullInterface } from "@/story/interfaces/story.interface";

export interface StoryDataloaderInterface {
    path: string;

    load(storyId?: StoryEnum, episodeId?: string): Promise<StoryFullInterface>;
}   