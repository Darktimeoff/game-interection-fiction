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
import { StoryStateInterface } from "@/story/interfaces/story-state.interface";

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
        expect(storyUser.storyState.storyId).toBe(StoryEnum.episode1);
        expect(storyUser.storyState.episodeId).toBe('01');
        expect(storyUser.storyState.sceneId).toBeNull();
    });

    it('should update story user', async () => {
        const storyUser = await storyUserService.findByUserId(user.id);
        const data: StoryUserEntityInterface = {
            ...storyUser,
            storyState: {
                ...storyUser.storyState,
                // @ts-expect-error
                storyId: '20',
                episodeId: '02',
                sceneId: '01',
                dialogId: '01',
                conditions: {
                    ...storyUser.storyState.conditions,
                    daniel_alive: false,
                    has_map: true,
                }
            }
        }
        
        const newStoryUser = await storyUserService.updateStoryUser(data);
        expect(newStoryUser).toBeDefined();
        expect(newStoryUser.userId).toBe(user.id);
        expect(newStoryUser.storyState.storyId).toBe(data.storyState.storyId);
        expect(newStoryUser.storyState.episodeId).toBe(data.storyState.episodeId);
        expect(newStoryUser.storyState.sceneId).toBe(data.storyState.sceneId);
        expect(newStoryUser.storyState.dialogId).toBe(data.storyState.dialogId);
        expect(newStoryUser.storyState.conditions).toEqual(data.storyState.conditions);
    });

    it('should update story state', async () => {
        const data: StoryStateInterface = {
            // @ts-expect-error
            storyId: '20',
            episodeId: '02',
            sceneId: '01',
            dialogId: '01',
            conditions: {
                daniel_alive: false,
                has_map: true,
            }
        }
        const newStoryUser = await storyUserService.updateStoryState(user.id, data);

        expect(newStoryUser).toBeDefined();
        expect(newStoryUser.userId).toBe(user.id);
        expect(newStoryUser.storyState.storyId).toBe('20');
        expect(newStoryUser.storyState.episodeId).toBe('02');
        expect(newStoryUser.storyState.sceneId).toBe('01');
        expect(newStoryUser.storyState.dialogId).toBe('01');
        expect(newStoryUser.storyState.conditions).toEqual({
            daniel_alive: false,
            has_map: true,
        });
    });
});
