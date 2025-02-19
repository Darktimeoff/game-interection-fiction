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