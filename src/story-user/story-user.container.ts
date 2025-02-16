import {join} from "node:path";
import { StoryUserRepository } from "./story-user.repository";
import { StorageFileService } from "@/generic/storage/storage-file.service";
import { StoryUserEntityInterface } from "./entity/story-user-entity.interface";
import storyDataloader from "@/story/story.container";
import { StoryUserService } from "./story-user.service";

const pathToFile = join(__dirname, '..', 'data', 'storage', 'story-users.json');
const repository = new StoryUserRepository(new StorageFileService<StoryUserEntityInterface>(pathToFile));
const storyUserService = new StoryUserService(repository, storyDataloader);

export default storyUserService