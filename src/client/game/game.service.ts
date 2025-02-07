import { MenuService } from "@/client/menu/menu.service";
import { Log, LogClass } from "@/generic/logging/log.decorator";

@LogClass()
export class GameService {
    constructor(
        private readonly menuService: MenuService
    ) {}

    @Log('startGame', 'game', (error) => `Failed to start game: ${error}`)
    async startGame(): Promise<void> {
        return await this.menuService.getMenu()
    }
}