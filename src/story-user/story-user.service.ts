import { Log } from "@/generic/logging/log.decorator";
import { StoryUserEntityInterface } from "./entity/story-user-entity.interface";
import { StoryUserFullEntityInterface } from "./entity/story-user-full-entity.interface";
import { StoryUserRepository } from "./story-user.repository";
import { StoryEnum } from "@/story/enum/story.enum";
import { StoryService } from "@/story/story.service";
import { CONDITIONS_INITIAL } from "./const/conditions_initial.const";

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
    async findByUserId(userId: StoryUserEntityInterface['userId']): Promise<StoryUserFullEntityInterface> {
        const storyUser = await this.repository.findByUserId(userId);
        if (!storyUser) {
            return await this.create(userId);
        }

        const story = await this.stories.load(storyUser.storyId, storyUser.episodeId);

        return {
            ...storyUser,
            story,
        };
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

    private async create(userId: StoryUserEntityInterface['userId']): Promise<StoryUserFullEntityInterface> {
        const story = await this.stories.load(StoryEnum.episode1, '01');

        const storyUser = await this.repository.create({
            userId,
            storyId: story.storyId,
            episodeId: story.id,
            sceneId: null,
            dialogId: null,
            conditions: CONDITIONS_INITIAL()
        });

        return {
            ...storyUser,
            story,
        };
    }
}