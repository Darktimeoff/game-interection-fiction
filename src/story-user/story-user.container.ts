import {join} from "node:path";
import { StoryUserRepository } from "./story-user.repository";
import { StorageFileService } from "@/generic/storage/storage-file.service";
import { StoryUserEntityInterface } from "./entity/story-user-entity.interface";
import { StoryUserService } from "./story-user.service";
import { storyService } from "@/story/story.container";

const pathToFile = join(__dirname, '..', 'data', 'storage', 'story-users.json');
const repository = new StoryUserRepository(new StorageFileService<StoryUserEntityInterface>(pathToFile));
const storyUserService = new StoryUserService(repository, storyService);

export default storyUserService