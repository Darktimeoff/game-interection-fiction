import { StoryFileAccess } from "./story-file.access";
import { StoryFileDataloader } from "./story-file.dataloader";
import { StoryService } from "./story.service";

const storyDataloader = new StoryFileDataloader();
const storyAccess = new StoryFileAccess(storyDataloader);
const storyService = new StoryService(storyAccess);

export default storyService