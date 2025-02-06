import { App } from "@/app/app";
import { LoggerConsole } from "@/generic/logging/logger.service";

const logger = new LoggerConsole('Main::');

export async function main() {
    try {
        const app = new App();
        app.initialize();

        logger.log('Application started');
    } catch (error) {
        logger.error(`Failed to start application: ${error}`);
        process.exit(1);
    }
}

main();