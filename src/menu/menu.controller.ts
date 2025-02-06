
import { MenuService } from "@/menu/menu.service";

export class MenuController {
    constructor(
        private readonly menuService: MenuService
    ) {}

    getMenu(): void {
        this.menuService.getMenu();
    }
}