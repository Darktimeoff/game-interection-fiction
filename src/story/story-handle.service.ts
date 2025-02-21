import { StoryEnum } from "./enum/story.enum";
import { StoryItemProgressInterface } from "./interfaces/story-item-progress.interfce";
import { StoryIteratorInterface } from "./interfaces/story-iterator.interface";
import { StoryStateInterface } from "./interfaces/story-state.interface";
import { StoryService } from "./story.service";

export class StoryHandleService {
    constructor(
        private readonly storyIterator: StoryIteratorInterface,
        private readonly stories: StoryService
    ) {}

    async handle(storyState: StoryStateInterface): Promise<StoryItemProgressInterface> {
        await this.restore(storyState)
        const storyItem = this.storyIterator.next()
        
        return {
            item: storyItem,
            state: this.getState(storyState),
        }
    }

    async selectChoice(storyState: StoryStateInterface, choiceId: number): Promise<StoryStateInterface> {
        await this.restore(storyState)
        const nextScene = this.storyIterator.selectChoice(choiceId)
        const isEpisode = await this.isNextEpisode(storyState.storyId, nextScene)
        const isStory = await this.isNextStory(nextScene)

        if(isStory || isEpisode) {
            return  {
                ...storyState,
                ...(isStory ? {storyId: nextScene as StoryEnum, episodeId: '01'} : {episodeId: nextScene}),
                conditions: this.storyIterator.getConditions(),
                sceneId: null,
                dialogId: null,
            }
        }
      
        return this.getState(storyState)
    }

    private async restore(storyState: StoryStateInterface): Promise<void> {
        const story = await this.stories.load(storyState.storyId, storyState.episodeId)
        this.storyIterator.set(story, storyState.sceneId, storyState.dialogId, storyState.conditions)
    }

    private getState(storyState: StoryStateInterface) {
        return {
            ...storyState,
            ...this.storyIterator.getProgress(),
            conditions: this.storyIterator.getConditions()
        }
    }

    private async isNextStory(nextScene: string): Promise<boolean> {
        const storyIds = await this.stories.getStoryIds()
        return storyIds.includes(nextScene as StoryEnum)
    }

    private async isNextEpisode(storyId: StoryEnum, nextScene: string): Promise<boolean> {
        const episodeIds = await this.stories.getSceneIds(storyId)
        return episodeIds.includes(nextScene)
    }
}