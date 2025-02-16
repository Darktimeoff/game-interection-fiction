import { Log } from "@/generic/logging/log.decorator";
import { StoryUserEntityInterface } from "./entity/story-user-entity.interface";
import { StoryUserFullEntityInterface } from "./entity/story-user-full-entity.interface";
import { StoryUserRepository } from "./story-user.repository";
import { StoryDataloaderInterface } from "@/story/interfaces/story-dataloder.interface";
import { StoryEnum } from "@/story/enum/story.enum";

export class StoryUserService {
    constructor(
        private readonly repository: StoryUserRepository,
        private readonly stories: StoryDataloaderInterface,
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

    private async create(userId: StoryUserEntityInterface['userId']): Promise<StoryUserFullEntityInterface> {
        const story = await this.stories.load(StoryEnum.episode1, '01');

        const storyUser = await this.repository.create({
            userId,
            storyId: story.storyId,
            episodeId: story.id,
            sceneId: null,
        });

        return {
            ...storyUser,
            story,
        };
    }
}