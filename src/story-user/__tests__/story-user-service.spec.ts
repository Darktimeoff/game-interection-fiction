import { StoryFileDataloader } from "@/story/story-file.dataloader";
import { StoryUserRepository } from "../story-user.repository";
import { StoryUserService } from "../story-user.service";
import { StorageFileService } from "@/generic/storage/storage-file.service";
import { unlink, writeFile } from "node:fs/promises";
import { StoryUserEntityInterface } from "@/story-user/entity/story-user-entity.interface";
import { UserService } from "@/user/user.service";
import { UserRepository } from "@/user/user.repository";
import { UserEntityInterface } from "@/user/entity/user-entity.interface";
import { join } from "node:path";
import { StoryEnum } from "@/story/enum/story.enum";
import { StoryService } from "@/story/story.service";

const pathToFile = join(__dirname, 'story-users.json');
const pathToUsersFile = join(__dirname, 'users.json');

describe('StoryUserService', () => {
    let storyUserService: StoryUserService
    let userService: UserService
    let user: UserEntityInterface

    beforeAll(async () => {
        await writeFile(pathToFile, JSON.stringify([]));

        storyUserService = new StoryUserService(new StoryUserRepository(
            new StorageFileService<StoryUserEntityInterface>(pathToFile)
        ), new StoryService(
            new StoryFileDataloader()
        ));

        await writeFile(pathToUsersFile, JSON.stringify([]));

        userService = new UserService(new UserRepository(
            new StorageFileService<UserEntityInterface>(pathToUsersFile)
        ));

        user  = await userService.createUser({
            name: 'test',
        });
    });

    afterAll(async () => {
        await unlink(pathToFile);
        await unlink(pathToUsersFile);
    });

    it('should create story user', async () => {
        const storyUser = await storyUserService.findByUserId(user.id);
        expect(storyUser).toBeDefined();
        expect(storyUser.userId).toBe(user.id);
        expect(storyUser.storyId).toBe(StoryEnum.episode1);
        expect(storyUser.episodeId).toBe('01');
        expect(storyUser.sceneId).toBeNull();
    });
});
