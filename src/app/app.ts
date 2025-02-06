import { Log, LogClass } from "@/generic/logging/log.decorator";
import { MenuController } from "@/menu/menu.controller";

@LogClass()
export class App {
    constructor(
        private readonly menuController: MenuController
    ) {}

    @Log('initialize', 'initialized', (error) => `Failed to initialize: ${error}`)  
    async initialize(): Promise<void> {
        return await this.menuController.getMenu();
    }
}