import { loadJsonFile } from "@/generic/utils/load-json-file.utils";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { StoryInterface } from "./interfaces/story.interface";
import { StoryDataloaderInterface } from "./interfaces/story-dataloder.interface";


export class StoryFileDataloader implements StoryDataloaderInterface {
    private readonly dataPath = join(__dirname, '..', 'data', 'stories');
    private initialEpisodeId = 'episode1';
    private initialSceneId = '01';

    async load(episodeId: string = this.initialEpisodeId, sceneId: string = this.initialSceneId): Promise<StoryInterface> {
        await this.validateEpisodeId(episodeId);
        await this.validateSceneId(episodeId, sceneId);

        const filePath = `${this.dataPath}/${episodeId}/${sceneId}.json`;
        const scene = await loadJsonFile(filePath);
        return scene;
    }

    private async validateEpisodeId(episodeId: string) {
        const episodes = await readdir(this.dataPath);
        if(episodes.length === 0) {
            throw new Error('No episodes found');
        };

        if(!episodes.includes(episodeId)) {
            throw new Error(`Episode id ${episodeId} not found`);
        };
    }

    private async validateSceneId(episodeId: string, sceneId: string) {
        const sceneIds = (await readdir(`${this.dataPath}/${episodeId}`)).map(sceneId => sceneId.replace('.json', ''));
        if(sceneIds.length === 0) {
            throw new Error(`No scenes found in episode ${episodeId}`);
        };


        if(!sceneIds.includes(sceneId)) {
            throw new Error(`Scene id ${sceneId} not found in episode ${episodeId}`);
        };
    }
}