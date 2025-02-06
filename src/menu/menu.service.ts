import { Log, LogClass } from "@/generic/logging/log.decorator";
import { UserService } from "@/user/user.service";

@LogClass()
export class MenuService {
    constructor(
        private readonly userService: UserService
    ) {}

    @Log('getMenu', 'menu', (error) => `Failed to get menu: ${error}`)
    getMenu(): void {
        console.log("MenuService", this.userService);
    }
}   