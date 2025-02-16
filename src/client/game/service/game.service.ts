import { MenuService } from "@/client/menu/menu.service";
import { Log, LogClass } from "@/generic/logging/log.decorator";
import { MenuActionEnum } from "@/client/menu/enum/menu-action.enum";
import { GameStoryService } from "./game-story.service";

@LogClass()
export class GameService {
    constructor(
        private readonly menuService: MenuService,
        private readonly gameStoryService: GameStoryService
    ) {}

    @Log('startGame', 'game', (error) => `Failed to start game: ${error}`)
    async startGame(): Promise<void> {
        const menuAction = await this.menuService.getMenu()
        if(!menuAction || ![MenuActionEnum.START_GAME, MenuActionEnum.CREATE_USER].includes(menuAction)) {
            return
        }

        await this.gameStoryService.getStory()
    }
}