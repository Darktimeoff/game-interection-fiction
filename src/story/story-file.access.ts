
import { readdir } from "node:fs/promises";
import { StoryDataloaderInterface } from "./interfaces/story-dataloder.interface";
import { StoryInterface } from "./interfaces/story.interface";
import { StoryEnum } from "./enum/story.enum";

export class StoryFileAccess implements StoryDataloaderInterface {
    constructor(private readonly storyDataloader: StoryDataloaderInterface) {}

    get path(): string {
        return this.storyDataloader.path;
    }

    async load(storyId: StoryEnum = StoryEnum.episode1, episodeId: string = ''): Promise<StoryInterface> {
        await this.validateEpisodeId(storyId);
        await this.validateSceneId(storyId, episodeId);

        return await this.storyDataloader.load(storyId, episodeId);
    }

    private async validateEpisodeId(storyId: StoryEnum) {
        const episodes = await readdir(this.storyDataloader.path);
        if(episodes.length === 0) {
            throw new Error('No episodes found');
        };

        if(!episodes.includes(storyId)) {
            throw new Error(`Story id ${storyId} not found`);
        };
    }

    private async validateSceneId(storyId: StoryEnum, episodeId: string) {
        const episodeIds = (await readdir(`${this.storyDataloader.path}/${storyId}`)).map(sceneId => sceneId.replace('.json', ''));
        if(episodeIds.length === 0) {
            throw new Error(`No episodes found in story ${storyId}`);
        };


        if(!episodeIds.includes(episodeId)) {
            throw new Error(`Episode id ${episodeId} not found in story ${storyId}`);
        };
    }
}