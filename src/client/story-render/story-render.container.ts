import { ReadlineService } from "@/generic/readline/readline.service";
import { StoryRenderConsole } from "./story-render-console";

const storyRenderConsole = new StoryRenderConsole(new ReadlineService())

export {storyRenderConsole}