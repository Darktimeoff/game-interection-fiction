import { ServiceLocator } from "@/generic/service-locator/service-locator.service";
import { UserService } from "@/user/user.service";
import { MenuService } from "@/menu/menu.service";
import { MenuController } from "@/menu/menu.controller";

export const serviceLocator = new ServiceLocator();
const userService = new UserService();
const menuService = new MenuService(userService);
const menuController = new MenuController(menuService);     

serviceLocator.register(UserService, userService);
serviceLocator.register(MenuService, menuService);
serviceLocator.register(MenuController, menuController);

export default serviceLocator;