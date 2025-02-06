
import { MenuService } from "@/menu/menu.service";
import { MenuController } from "@/menu/menu.controller";
import userContainer from "@/user/user.container";

const menuService = new MenuService(userContainer.userService);
const menuController = new MenuController(menuService);  

export default {
    menuController,
}