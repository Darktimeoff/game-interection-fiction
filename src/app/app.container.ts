import { ServiceLocator } from "@/generic/service-locator/service-locator.service";
import menuContainer from "@/menu/menu.container";
import { MenuController } from "@/menu/menu.controller";

export const serviceLocator = new ServiceLocator();

serviceLocator.register(MenuController, menuContainer.menuController);

export default serviceLocator;
