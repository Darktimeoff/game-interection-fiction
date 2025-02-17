import { StoryRenderConsole } from "./story-render-console";
import { StoryRenderService } from "./story-render.service";
import { StoryIterator } from "./story-iterator";

const storyRenderConsole = new StoryRenderConsole()
const storyIterator = new StoryIterator()
const storyRenderService = new StoryRenderService(storyRenderConsole, storyIterator)

export default storyRenderService