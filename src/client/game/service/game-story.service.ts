import { StateUserService } from "@/client/state/state-user.service";
import { StoryRenderProgressInterface } from "@/client/story-render/interface/story-render-progress.interface";
import { StoryRenderService } from "@/client/story-render/story-render.service";
import { CommandBusInterface } from "@/generic/cqrs/command/bus/command-bus.interface";
import { Log, LogClass } from "@/generic/logging/log.decorator";
import { UpdateStoryUserCommand } from "@/story-user/command/update-story-user.command";
import { StoryUserEntityInterface } from "@/story-user/entity/story-user-entity.interface";
import { StoryUserFullEntityInterface } from "@/story-user/entity/story-user-full-entity.interface";
import { StoryUserService } from "@/story-user/story-user.service";
import { StoryEnum } from "@/story/enum/story.enum";
import { StoryService } from "@/story/story.service";

@LogClass()
export class GameStoryService {
    constructor(
        private readonly stateUserService: StateUserService,
        private readonly storyUserService: StoryUserService,
        private readonly storyRenderService: StoryRenderService,
        private readonly stories: StoryService,
        private readonly commandBus: CommandBusInterface
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

    @Log(
        (storyUser) => `Render story for user ${JSON.stringify(storyUser)}`,
        (_, storyUser) => `Rendered story for user ${JSON.stringify(storyUser)}`,
        (error, storyUser) => `Failed to render story: ${error} for user ${JSON.stringify(storyUser)}`
    )
    private async renderStories({story: _, ...storyUser}: StoryUserFullEntityInterface): Promise<void> {
        const tempStoryUser: StoryUserEntityInterface = {
            ...storyUser,
        }

        const storyIds = await this.stories.getStoryIds()
        let episodeIds = await this.stories.getSceneIds(storyUser.storyId)

        while(true) {
            const item = await this.renderNextScene(tempStoryUser)

            const initialStoryId = tempStoryUser.storyId

            await this.handleNextScene(item, tempStoryUser, episodeIds, storyIds)
            
            if(initialStoryId !== tempStoryUser.storyId) {
                episodeIds = await this.stories.getSceneIds(tempStoryUser.storyId)
            }

            await this.commandBus.execute(new UpdateStoryUserCommand(tempStoryUser));

            if(this.checkExitCondition(item, storyIds, episodeIds, tempStoryUser)) {
                break
            }
        }
    }

    @Log(
        (item, storyUser, episodeIds, storyIds) => `Handle next scene ${item?.nextScene} ${JSON.stringify(storyUser)} ${episodeIds.join()} ${storyIds.join()}`,
        (_, item, storyUser, episodeIds, storyIds) => `Handled next scene ${item?.nextScene} ${JSON.stringify(storyUser)} ${episodeIds.join()} ${storyIds.join()}`,
        (error, item, storyUser, episodeIds, storyIds) => `Failed to handle next scene: ${error} ${item?.nextScene} ${JSON.stringify(storyUser)} ${episodeIds.join()} ${storyIds.join()}`
    )
    private async handleNextScene(item: StoryRenderProgressInterface | null, storyUser: StoryUserEntityInterface, episodeIds: string[], storyIds: StoryEnum[]): Promise<void> {
        if(!item?.nextScene) {
            return
        }

        const isLoadNewEpisode = 
            this.handleEpisodeChange(item, storyUser, episodeIds)
            || await this.handleStoryChange(item, storyUser, storyIds)
        
        if(!isLoadNewEpisode) {
            return
        }

        const story = await this.stories.load(storyUser.storyId, storyUser.episodeId);
        this.storyRenderService.updateStory(story);
    }

    @Log(
        (storyUser) => `Render next scene for user ${JSON.stringify(storyUser)}`,
        (result, storyUser) => `Rendered next scene for user ${JSON.stringify(storyUser)}: ${JSON.stringify(result)}`,
        (error, storyUser) => `Failed to render next scene: ${error} for user ${JSON.stringify(storyUser)}`
    )
    private async renderNextScene(storyUser: StoryUserEntityInterface): Promise<StoryRenderProgressInterface | null> {
        const item = await this.storyRenderService.next()
      
        storyUser.sceneId = item?.sceneId ?? null
        storyUser.dialogId = item?.dialogId ?? null 
        if(item?.conditions) {
            storyUser.conditions = item.conditions
        }

        return item
    }

    @Log(
        (item, storyUser, episodeIds) => `Handle episode change ${item?.nextScene} ${JSON.stringify(storyUser)} ${episodeIds.join(',')}`,
        (_, item, storyUser, episodeIds) => `Handled episode change ${item?.nextScene} ${JSON.stringify(storyUser)} ${episodeIds.join(',')}`,
        (error, item, storyUser, episodeIds) => `Failed to handle episode change: ${error} ${item?.nextScene} ${JSON.stringify(storyUser)} ${episodeIds}`
    )
    private handleEpisodeChange(item: StoryRenderProgressInterface | null, storyUser: StoryUserEntityInterface, episodeIds: string[]): boolean {
        if(item?.nextScene && episodeIds.includes(item.nextScene)) {
            storyUser.episodeId = item.nextScene

            return true
        }

        return false
    }

    @Log(
        (item, storyUser, storyIds) => `Handle story change ${item?.nextScene} ${JSON.stringify(storyUser)} ${storyIds.join(',')}`,
        (_, item, storyUser, storyIds) => `Handled story change ${item?.nextScene} ${JSON.stringify(storyUser)} ${storyIds.join(',')}`,
        (error, item, storyUser, storyIds) => `Failed to handle story change: ${error} ${item?.nextScene} ${JSON.stringify(storyUser)} ${storyIds}`
    )
    private async handleStoryChange(item: StoryRenderProgressInterface | null, storyUser: StoryUserEntityInterface, storyIds: StoryEnum[]): Promise<boolean> {
        if(item?.nextScene && storyIds.includes(item.nextScene as StoryEnum)) {
            const episodeIds = await this.stories.getSceneIds(item.nextScene as StoryEnum)
            storyUser.episodeId = episodeIds[0]
            storyUser.storyId = item.nextScene as StoryEnum

            return true
        }

        return false
    }

    @Log(
        (item, storyIds, episodeIds, storyUser) => `Check exit condition ${item?.nextScene} ${storyIds.join(',')} ${episodeIds.join(',')} ${JSON.stringify(storyUser)}`,
        (_, item, storyIds, episodeIds, storyUser) => `Checked exit condition ${item?.nextScene} ${storyIds.join(',')} ${episodeIds.join(',')} ${JSON.stringify(storyUser)}`,
        (error, item, storyIds, episodeIds, storyUser) => `Failed to check exit condition: ${error} ${item?.nextScene} ${storyIds} ${episodeIds} ${JSON.stringify(storyUser)}`
    )
    private checkExitCondition(item: StoryRenderProgressInterface | null, storyIds: StoryEnum[], episodeIds: string[], storyUser: StoryUserEntityInterface): boolean {
        if(!item && storyUser.storyId === storyIds.at(-1) && storyUser.episodeId === episodeIds.at(-1)) {
            return true
        }

        if(item?.nextScene && ['end'].includes(item?.nextScene)) {
            process.exit(0)
        }

        return false
    }
}