import { StoryRenderConsole } from "./story-render-console";
import { StoryRenderService } from "./story-render.service";
import { StoryIterator } from "./story-iterator";
import { ReadlineService } from "@/generic/readline/readline.service";

const storyRenderConsole = new StoryRenderConsole(new ReadlineService())
const storyIterator = new StoryIterator()
const storyRenderService = new StoryRenderService(storyRenderConsole, storyIterator)

export default storyRenderService