import { Log, LogClass } from "@/generic/logging/log.decorator";
import { StoryRenderProgressInterface } from "./interface/story-render-progress.interface";
import { StoryIteratorInterface } from "./story-iterator.interface";
import { StoryRenderInterface } from "./story-render.interface";
import { StoryUserFullEntityInterface } from "@/story-user/entity/story-user-full-entity.interface";
import { StoryInterface } from "@/story/interfaces/story.interface";
import { ValidationError } from "@/generic/errors/validation.error";

@LogClass()
export class StoryRenderService {
    constructor(
        private readonly renders: StoryRenderInterface,
        private readonly iterator: StoryIteratorInterface
    ) {}

    @Log(
        (userStory) => `Initialize story ${userStory.storyId} ${userStory.episodeId} ${userStory.sceneId} ${userStory.dialogId}`,
        (_, userStory) => `Initialized story ${userStory.storyId} ${userStory.episodeId} ${userStory.sceneId} ${userStory.dialogId}`,
        (error, userStory) => `Error in initialize: ${error} story: ${userStory.storyId} ${userStory.episodeId} ${userStory.sceneId} ${userStory.dialogId}`
    )
    initialize(userStory: StoryUserFullEntityInterface): void {
        this.iterator.set(userStory.story, userStory.sceneId, userStory.dialogId)
    }

    @Log(
        (story) => `Update story ${story.id}`,
        (_, story) => `Updated story ${story.id}`,
        (error, story) => `Error in updateStory: ${error} story: ${story.id}`
    )
    updateStory(story: StoryInterface): void {
        this.iterator.set(story, null, null)
    }

    @Log(
        'Call next',
        (result) => `Called next, result: ${JSON.stringify(result)}`,
        (error) => `Error in next: ${error}`
    )
    async next(): Promise<StoryRenderProgressInterface | null> {
        const item = this.iterator.next()
        if(!item) {
            return null
        }

        const choiceId = await this.renders.render(item)
        if(choiceId === null) {
           return {
            ...this.iterator.getProgress(),
            nextScene: null,
            choiceId: null
           }
        }

        const progress = this.iterator.getProgress()

        try {
            const nextScene = this.iterator.selectChoice(choiceId)

            return {
                ...progress,
                choiceId,
                nextScene
            }
        } catch(error) {
            if(error instanceof ValidationError) {
                console.log(error.message)
                await this.next() 
            }

           throw error
        }

    }
}