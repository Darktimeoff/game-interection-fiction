import { loadJsonFile } from "@/generic/utils/load-json-file.utils";
import { join } from "node:path";
import { StoryInterface } from "./interfaces/story.interface";
import { StoryDataloaderInterface } from "./interfaces/story-dataloder.interface";


export class StoryFileDataloader implements StoryDataloaderInterface {
    private readonly dataPath = join(__dirname, '..', 'data', 'stories');
    private initialEpisodeId = 'episode1';
    private initialSceneId = '01';

    get path(): string {
        return this.dataPath;
    }

    async load(episodeId: string = this.initialEpisodeId, sceneId: string = this.initialSceneId): Promise<StoryInterface> {
        const filePath = `${this.dataPath}/${episodeId}/${sceneId}.json`;
        const scene = await loadJsonFile(filePath);
        return scene;
    }
}