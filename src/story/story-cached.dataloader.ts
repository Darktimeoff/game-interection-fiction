import { Cache } from "@/generic/cache/cache-decorator";
import { StoryEnum } from "./enum/story.enum";
import { StoryDataloaderInterface } from "./interfaces/story-dataloder.interface";
import { StoryFullInterface } from "./interfaces/story.interface";
import { StoryFileDataloader } from "./story-file.dataloader";

export class StoryCachedDataLoader implements StoryDataloaderInterface {
    constructor(private readonly stories: StoryFileDataloader) {}

    get path(): string {
        return this.stories.path;
    }

    get initialSceneId(): string {
        return this.stories.initialSceneId;
    }

    get initialStoryId(): StoryEnum {
        return this.stories.initialStoryId;
    }

    @Cache(
        (storyId: StoryEnum, sceneId: string) => `${storyId}-${sceneId}`
    )
    async load(storyId: StoryEnum = StoryEnum.episode1, sceneId: string = this.initialSceneId): Promise<StoryFullInterface> {
        return this.stories.load(storyId, sceneId);
    }

    @Cache(
        (storyId: StoryEnum) => `${storyId}-sceneIds`
    )
    async getSceneIds(storyId: StoryEnum): Promise<string[]> {
        return this.stories.getSceneIds(storyId);
    }

    @Cache(
        () => 'storyIds'
    )
    async getStoryIds(): Promise<StoryEnum[]> {
        return this.stories.getStoryIds();
    }
}