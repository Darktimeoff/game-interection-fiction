import { App } from "@/app/app";
import { LoggerConsole } from "@/generic/logging/logger.service";
import appContainer from "@/app/app.container";
import { MenuController } from "./menu/menu.controller";

const logger = new LoggerConsole('Main::');

export async function main() {
    try {
        const app = new App(appContainer.get<MenuController>(MenuController));
        app.initialize();

        logger.log('Application started');
    } catch (error) {
        logger.error(`Failed to start application: ${error}`);
        process.exit(1);
    }
}

main();