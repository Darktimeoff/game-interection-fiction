import { Log } from "@/generic/logging/log.decorator";
import { StoryUserEntityInterface } from "./entity/story-user-entity.interface";
import { StoryUserRepository } from "./story-user.repository";
import { StoryService } from "@/story/story.service";
import { StoryStateInterface } from "@/story/interfaces/story-state.interface";
import { CONDITIONS_INITIAL } from "@/story/const/conditions_initial.const";

export class StoryUserService {
    constructor(
        private readonly repository: StoryUserRepository,
        private readonly stories: StoryService,
    ) {}

    @Log(
        (userId) => `Finding story user for userId ${userId}`,
        (storyUser, userId) => `Founded story user ${userId}: ${storyUser.id}`,
        (error, userId) => `Error finding story user ${userId}: ${error}`,
    )
    async findByUserId(userId: StoryUserEntityInterface['userId']): Promise<StoryUserEntityInterface> {
        const storyUser = await this.repository.findByUserId(userId);
        if (!storyUser) {
            return await this.create(userId);
        }

        return storyUser
    }

    @Log(
        (storyUser) => `Updating story user ${JSON.stringify(storyUser)}`,
        (newStoryUser, storyUser) => `Updated story user ${JSON.stringify(storyUser)}: ${JSON.stringify(newStoryUser)}`,
        (err, storyUser) => `Error updating story user ${JSON.stringify(storyUser)}: ${err}`
    )
    async updateStoryUser(storyUser: StoryUserEntityInterface): Promise<StoryUserEntityInterface> {
        const storyUserEntity = await this.repository.updateById(storyUser.id, storyUser)
        if(!storyUserEntity) {
           throw new Error('Story user not found')
        }

        return storyUserEntity
    }

    @Log(
        (userId, storyState) => `Updating story state for userId ${userId} with storyState ${JSON.stringify(storyState)}`,
        (newStoryUser, userId, storyState) => `Updated story state for userId ${userId} with storyState ${JSON.stringify(storyState)}: ${JSON.stringify(newStoryUser)}`,
        (err, userId, storyState) => `Error updating story state for userId ${userId} with storyState ${JSON.stringify(storyState)}: ${err}`
    )
    async updateStoryState(userId: StoryUserEntityInterface['userId'], storyState: StoryStateInterface): Promise<StoryUserEntityInterface> {
        const storyUser = await this.findByUserId(userId)
        return await this.updateStoryUser({
            ...storyUser,
            storyState
        })
    }

    private async create(userId: StoryUserEntityInterface['userId']): Promise<StoryUserEntityInterface> {
        const storyUser = await this.repository.create({
            userId,
            storyState: {
                storyId: this.stories.getInitialStoryId(),
                episodeId: this.stories.getInitialSceneId(),
                sceneId: null,
                dialogId: null,
                conditions: CONDITIONS_INITIAL()
            }
        });

        return {
            ...storyUser,
        };
    }
}