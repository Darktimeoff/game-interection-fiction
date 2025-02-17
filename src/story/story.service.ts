import { StoryEnum } from "./enum/story.enum";
import { StoryDataloaderInterface } from "./interfaces/story-dataloder.interface";
import { StoryFullInterface } from "./interfaces/story.interface";

export class StoryService {
    constructor(
        private readonly dataLoader: StoryDataloaderInterface
    ) {}

    async load(storyId: StoryEnum, episodeId: string): Promise<StoryFullInterface> {
        return await this.dataLoader.load(storyId, episodeId)
    }

    async getStoryIds(): Promise<StoryEnum[]> {
        return await this.dataLoader.getStoryIds()
    }

    async getSceneIds(storyId: StoryEnum): Promise<string[]> {
        return await this.dataLoader.getSceneIds(storyId)
    }
}