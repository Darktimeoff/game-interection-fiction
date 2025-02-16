
import { readdir } from "node:fs/promises";
import { StoryDataloaderInterface } from "./interfaces/story-dataloder.interface";
import { StoryInterface } from "./interfaces/story.interface";

export class StoryFileAccess implements StoryDataloaderInterface {
    constructor(private readonly storyDataloader: StoryDataloaderInterface) {}

    get path(): string {
        return this.storyDataloader.path;
    }

    async load(episodeId: string = '', sceneId: string = ''): Promise<StoryInterface> {
        await this.validateEpisodeId(episodeId);
        await this.validateSceneId(episodeId, sceneId);

        return await this.storyDataloader.load(episodeId, sceneId);
    }

    private async validateEpisodeId(episodeId: string) {
        const episodes = await readdir(this.storyDataloader.path);
        if(episodes.length === 0) {
            throw new Error('No episodes found');
        };

        if(!episodes.includes(episodeId)) {
            throw new Error(`Episode id ${episodeId} not found`);
        };
    }

    private async validateSceneId(episodeId: string, sceneId: string) {
        const sceneIds = (await readdir(`${this.storyDataloader.path}/${episodeId}`)).map(sceneId => sceneId.replace('.json', ''));
        if(sceneIds.length === 0) {
            throw new Error(`No scenes found in episode ${episodeId}`);
        };


        if(!sceneIds.includes(sceneId)) {
            throw new Error(`Scene id ${sceneId} not found in episode ${episodeId}`);
        };
    }
}