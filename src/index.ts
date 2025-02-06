import { App } from "@/app/app";
import { LoggerConsole } from "@/generic/logging/logger.service";
import appContainer from "@/app/app.container";
import { MenuController } from "./menu/menu.controller";

const logger = new LoggerConsole('Main::');

export async function main() {
    try {
        const menuController = appContainer.get<MenuController>(MenuController);
        if (!menuController) {
            throw new Error('MenuController not found');
        }
        const app = new App(menuController);
        await app.initialize();

        logger.log('Application started');
    } catch (error) {
        logger.error(`Failed to start application: ${error}`);
        process.exit(1);
    }
}

main();