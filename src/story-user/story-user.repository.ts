import { StorageFileService } from "@/generic/storage/storage-file.service";

import { StoryUserEntityInterface } from "./entity/story-user-entity.interface";
import { StoryUserCreateInterface } from "./entity/story-user-entity-create.interface"; 
import { StoryUserEntity } from "./entity/story-user.entity";

export class StoryUserRepository {
    constructor(
        private readonly storage: StorageFileService<StoryUserEntityInterface>,
    ) {}

    async create(storyUser: StoryUserCreateInterface) {
        const storyUserEntity = new StoryUserEntity({
            id: Date.now(),
            ...storyUser,
        });

        return await this.storage.create(storyUserEntity);
    }

    async findByUserId(userId: StoryUserEntityInterface['userId']) {
        return await this.storage.findOne({
            userId,
        });
    }

    async updateById(id: StoryUserEntityInterface['id'], storyUser: StoryUserEntityInterface) {
        return await this.storage.update(
            {
                id,
            },
            storyUser,
        ) 
    }
}