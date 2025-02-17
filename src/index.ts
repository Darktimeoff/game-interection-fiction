import { LoggerConsole } from "@/generic/logging/logger.service";
import gameContainer from "@/client/game/game.container";
// import { join } from "path";
// import { loadJsonFile } from "./generic/utils/load-json-file.utils";
// import storyRenderService from "./client/story-render/story-render.container";
// import { StoryInterface } from "./story/interfaces/story.interface";
// import { StoryEnum } from "./story/enum/story.enum";

const logger = new LoggerConsole('Main::');

export async function main() {
    try {
        await gameContainer.startGame();
        // await storyIteratorTest()
        logger.log('Application started');
    } catch (error) {
        logger.error(`Failed to start application: ${error}`);
        process.exit(1);
    }
}

main();

// async function storyIteratorTest() {
//     const path = join(__dirname, 'data', 'stories', 'episode1')
//     const story05 = await loadJsonFile(join(path, '05.json'))
//     const story06 = await loadJsonFile(join(path, '06.json'))

//     const stories: StoryInterface[] = [story05, story06]
//     storyRenderService.initialize({
//         story: stories.shift()!,
//         storyId: StoryEnum.episode1,
//         episodeId: '05',
//         sceneId: null,
//         dialogId: null,
//         id: 0,
//         userId: 0,
//     })

//     while(true) {
//         const item = await storyRenderService.next()
//         if(!item && !stories.length) {
//             break
//         }

//         if(item?.nextScene === '06') {
//             storyRenderService.updateStory(stories.shift()!)
//         }
//     }
// }