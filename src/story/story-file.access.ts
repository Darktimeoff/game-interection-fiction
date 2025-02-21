
import { StoryDataloaderInterface } from "./interfaces/story-dataloder.interface";
import { StoryFullInterface } from "./interfaces/story.interface";
import { StoryEnum } from "./enum/story.enum";

export class StoryFileAccess implements StoryDataloaderInterface {
    constructor(private readonly storyDataloader: StoryDataloaderInterface) {}

    get path(): string {
        return this.storyDataloader.path;
    }

    get initialSceneId(): string {
        return this.storyDataloader.initialSceneId;
    }

    get initialStoryId(): StoryEnum {
        return this.storyDataloader.initialStoryId;
    }

    async load(storyId: StoryEnum = this.initialStoryId, sceneId: string = this.initialSceneId): Promise<StoryFullInterface> {
        await this.validateStoryId(storyId);
        await this.validateSceneId(storyId, sceneId);

        return await this.storyDataloader.load(storyId, sceneId);
    }

    async getStoryIds(): Promise<StoryEnum[]> {
        return await this.storyDataloader.getStoryIds();
    }

    async getSceneIds(storyId: StoryEnum): Promise<string[]> {
        return await this.storyDataloader.getSceneIds(storyId);       
    }

    private async validateStoryId(storyId: StoryEnum) {
        const stories = await this.storyDataloader.getStoryIds();
        if(stories.length === 0) {
            throw new Error('No stories found');
        };

        if(!stories.includes(storyId)) {
            throw new Error(`Story id ${storyId} not found`);
        };
    }

    private async validateSceneId(storyId: StoryEnum, sceneId: string) {
        const sceneIds = await this.storyDataloader.getSceneIds(storyId);
        if(sceneIds.length === 0) {
            throw new Error(`No scenes found in story ${storyId}`);
        };


        if(!sceneIds.includes(sceneId)) {
            throw new Error(`Scene id ${sceneId} not found in story ${storyId}`);
        };
    }
}