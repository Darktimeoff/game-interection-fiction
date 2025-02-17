import { StateUserService } from "@/client/state/state-user.service";
import { StoryRenderProgressInterface } from "@/client/story-render/interface/story-render-progress.interface";
import { StoryRenderService } from "@/client/story-render/story-render.service";
import { Log, LogClass } from "@/generic/logging/log.decorator";
import { LoggerConsole, LoggerInterface } from "@/generic/logging/logger.service";
import { StoryUserEntityInterface } from "@/story-user/entity/story-user-entity.interface";
import { StoryUserFullEntityInterface } from "@/story-user/entity/story-user-full-entity.interface";
import { StoryUserService } from "@/story-user/story-user.service";
import { StoryEnum } from "@/story/enum/story.enum";
import { StoryService } from "@/story/story.service";

@LogClass()
export class GameStoryService {
    private readonly logger: LoggerInterface = new LoggerConsole('GameStoryService::')

    constructor(
        private readonly stateUserService: StateUserService,
        private readonly storyUserService: StoryUserService,
        private readonly storyRenderService: StoryRenderService,
        private readonly stories: StoryService
    ) {}

    @Log('initializeStory', 'game', (error) => `Failed to initialize story: ${error}`)
    async initializeStory(): Promise<void> {
        const user = this.stateUserService.getCurrentUser()
        if(!user) {
            throw new Error('Current user not selected')
        }

        const storyUser = await this.storyUserService.findByUserId(user.id)
        await this.storyRenderService.initialize(storyUser)
        return await this.renderStories(storyUser)
    }

    private async renderStories(storyUser: StoryUserFullEntityInterface): Promise<void> {
        const tempStoryUser: StoryUserEntityInterface = {
            ...storyUser,
        }

        const storyIds = await this.stories.getStoryIds()
        let episodeIds = await this.stories.getSceneIds(storyUser.storyId)

        while(true) {
            const item = await this.storyRenderService.next()
            this.logger.log(`renderStories:: progress ${JSON.stringify(item)}`)
            tempStoryUser.sceneId = item?.sceneId ?? null
            tempStoryUser.dialogId = item?.dialogId ?? null 

            if (item?.nextScene) {
                if (episodeIds.includes(item.nextScene)) {
                    tempStoryUser.episodeId = item.nextScene;
                } else if (storyIds.includes(item.nextScene as StoryEnum)) {
                    episodeIds = await this.stories.getSceneIds(item.nextScene as StoryEnum);
                    tempStoryUser.episodeId = episodeIds[0];
                    tempStoryUser.storyId = item.nextScene as StoryEnum;
                }

                const story = await this.stories.load(tempStoryUser.storyId, tempStoryUser.episodeId);
                this.storyRenderService.updateStory(story);
            }

            this.logger.log(`renderStories:: updateStory ${JSON.stringify(tempStoryUser)}`)

            await this.storyUserService.updateStoryUser(tempStoryUser);

            if(this.checkExitCondition(item, storyIds, episodeIds, tempStoryUser)) {
                break
            }
        }
    }

    private checkExitCondition(item: StoryRenderProgressInterface | null, storyIds: StoryEnum[], episodeIds: string[], storyUser: StoryUserEntityInterface): boolean {
        if(!item && storyUser.storyId === storyIds.at(-1) && storyUser.episodeId === episodeIds.at(-1)) {
            return true
        }

        if(item?.nextScene && ['game_over', 'end'].includes(item?.nextScene)) {
            return true
        }

        return false
    }
}