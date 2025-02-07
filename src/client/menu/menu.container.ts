import userContainer from "@/user/user.container";
import { MenuService } from "./menu.service";
import { MenuActionsService } from "./menu-actions.service";
import { StateStore } from "@/client/state/state.store";

const stateStore = new StateStore()
const menuActionsService = new MenuActionsService(stateStore, userContainer.userService);
const menuService = new MenuService(menuActionsService);  

export default {
    menuService,
}