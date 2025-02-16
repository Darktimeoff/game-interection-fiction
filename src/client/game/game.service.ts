import { MenuService } from "@/client/menu/menu.service";
import { Log, LogClass } from "@/generic/logging/log.decorator";
import { MenuActionEnum } from "@/client/menu/enum/menu-action.enum";
import { StoryUserService } from "@/story-user/story-user.service";
import { StateUserService } from "@/client/state/state-user.service";

@LogClass()
export class GameService {
    constructor(
        private readonly menuService: MenuService,
        private readonly stateUserService: StateUserService,
        private readonly storyUserService: StoryUserService
    ) {}

    @Log('startGame', 'game', (error) => `Failed to start game: ${error}`)
    async startGame(): Promise<void> {
        const menuAction = await this.menuService.getMenu()
        if(menuAction !== MenuActionEnum.START_GAME) {
            return
        }

        const user = this.stateUserService.getCurrentUser()
        if(!user) {
            throw new Error('Current user not selected')
        }

        const storyUser = await this.storyUserService.findByUserId(user.id)
        console.log(storyUser)
    }
}