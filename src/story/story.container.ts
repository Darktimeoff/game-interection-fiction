import { StoryFileAccess } from "./story-file.access";
import { StoryFileDataloader } from "./story-file.dataloader";

const storyDataloader = new StoryFileDataloader();
const storyAccess = new StoryFileAccess(storyDataloader);

export default storyAccess