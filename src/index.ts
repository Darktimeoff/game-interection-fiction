import { LoggerConsole } from "@/generic/logging/logger.service";
import gameContainer from "@/client/game/game.container";

const logger = new LoggerConsole('Main::');

export async function main() {
    try {
        await gameContainer.startGame();

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
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     })

//     const stories = [story05, story06]
//     const storyIterator = new StoryIterator(stories.shift())
//     while(true) {
//         console.clear()

//         const item = storyIterator.next()
        
//         if(!item && !stories.length) {
//             break
//         }

//         console.log(item)

//         const answer = await rl.question('\nВыберите пункт меню: ')
//         if(answer === '') {
//             continue
//         }
//         storyIterator.selectChoice(Number(answer))
//         const choice = item?.choices[Number(answer)]
//         if(choice?.nextScene === '06') {
//             storyIterator.set(stories.shift())
//         }
//     }
// }