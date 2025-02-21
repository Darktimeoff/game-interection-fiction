import { StoryCachedDataLoader } from "./story-cached.dataloader";
import { StoryFileAccess } from "./story-file.access";
import { StoryFileDataloader } from "./story-file.dataloader";
import { StoryHandleService } from "./story-handle.service";
import { StoryService } from "./story.service";
import { StoryIterator } from "./story-iterator";

const storyDataloader = new StoryFileAccess(new StoryCachedDataLoader(new StoryFileDataloader()));
const storyService = new StoryService(storyDataloader);
const storyIterator = new StoryIterator()
const storyHandleService = new StoryHandleService(storyIterator, storyService)

export {
    storyService,
    storyHandleService
}