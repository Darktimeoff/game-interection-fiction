import { Log } from "@/generic/logging/log.decorator";
import { StoryEnum } from "./enum/story.enum";
import { StoryDataloaderInterface } from "./interfaces/story-dataloder.interface";
import { StoryFullInterface } from "./interfaces/story.interface";

export class StoryService {
    constructor(
        private readonly dataLoader: StoryDataloaderInterface
    ) {}

    @Log(
        (storyId, episodeId) => `Load story ${storyId} ${episodeId}`,
        (_, storyId, episodeId) => `Loaded story ${storyId} ${episodeId}`,
        (error, storyId, episodeId) => `Error in load: ${error} story: ${storyId} ${episodeId}`
    )
    async load(storyId: StoryEnum, episodeId: string): Promise<StoryFullInterface> {
        return await this.dataLoader.load(storyId, episodeId)
    }

    @Log(
        'Get story ids',
        (result) => `Got story ids: ${result.join(', ')}`,
        (error) => `Error in getStoryIds: ${error}`
    )
    async getStoryIds(): Promise<StoryEnum[]> {
        return await this.dataLoader.getStoryIds()
    }

    @Log(
        (storyId) => `Get scene ids for story ${storyId}`,
        (result) => `Got scene ids: ${result.join(', ')}`,
        (error, storyId) => `Error in getSceneIds: ${error} story: ${storyId}`
    )
    async getSceneIds(storyId: StoryEnum): Promise<string[]> {
        return await this.dataLoader.getSceneIds(storyId)
    }
}