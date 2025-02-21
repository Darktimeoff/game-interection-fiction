import { StoryCachedDataLoader } from "./story-cached.dataloader";
import { StoryFileAccess } from "./story-file.access";
import { StoryFileDataloader } from "./story-file.dataloader";
import { StoryService } from "./story.service";

const storyDataloader = new StoryFileAccess(new StoryCachedDataLoader(new StoryFileDataloader()));
const storyService = new StoryService(storyDataloader);

export default storyService