import { loadJsonFile } from "@/generic/utils/load-json-file.utils";
import { join } from "node:path";
import { StoryFullInterface } from "./interfaces/story.interface";
import { StoryDataloaderInterface } from "./interfaces/story-dataloder.interface";
import { StoryEnum } from "./enum/story.enum";
import { readdir } from "node:fs/promises";


export class StoryFileDataloader implements StoryDataloaderInterface {
    private readonly dataPath = join(__dirname, '..', 'data', 'stories');
    private _initialSceneId = '01';

    get path(): string {
        return this.dataPath;
    }

    get initialSceneId(): string {
        return this._initialSceneId;
    }

    get initialStoryId(): StoryEnum {
        return StoryEnum.episode1;
    }

    async load(storyId: StoryEnum = this.initialStoryId, sceneId: string = this.initialSceneId): Promise<StoryFullInterface> {
        const filePath = `${this.dataPath}/${storyId}/${sceneId}.json`;
        const scene = await loadJsonFile(filePath);
        return {
            ...scene,
            storyId,
        };
    }

    async getSceneIds(storyId: StoryEnum): Promise<string[]> {
        const scenes = await readdir(`${this.dataPath}/${storyId}`);
        return scenes.map(scene => scene.replace('.json', ''));
    }

    async getStoryIds(): Promise<StoryEnum[]> {
        const stories = await readdir(this.dataPath);
        return stories.map(story => story as StoryEnum);
    }
}