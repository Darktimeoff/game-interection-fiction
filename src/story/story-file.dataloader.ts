import { loadJsonFile } from "@/generic/utils/load-json-file.utils";
import { join } from "node:path";
import { StoryFullInterface } from "./interfaces/story.interface";
import { StoryDataloaderInterface } from "./interfaces/story-dataloder.interface";
import { StoryEnum } from "./enum/story.enum";


export class StoryFileDataloader implements StoryDataloaderInterface {
    private readonly dataPath = join(__dirname, '..', 'data', 'stories');
    private initialSceneId = '01';

    get path(): string {
        return this.dataPath;
    }

    async load(storyId: StoryEnum = StoryEnum.episode1, episodeId: string = this.initialSceneId): Promise<StoryFullInterface> {
        const filePath = `${this.dataPath}/${storyId}/${episodeId}.json`;
        const scene = await loadJsonFile(filePath);
        return {
            ...scene,
            storyId,
        };
    }
}