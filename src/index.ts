import { AppFactory } from "./client/app/app";
import { LoggerConsole } from "./generic/logging/logger.service";

export async function main() {
    const logger = new LoggerConsole()

    try {
        logger.log('Application started');
        await AppFactory.create();
        logger.log('Application finished');
    } catch (error) {
        logger.error(`Failed to start application: ${error}`);
        process.exit(1);
    }
}

main();