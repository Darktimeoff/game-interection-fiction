import userContainer from "@/user/user.container";
import { MenuService } from "@/client/menu/menu.service";
import { StateStore } from "@/client/state/state.store";
import { StateUserService } from "@/client/state/state-user.service";

const stateStore = new StateStore()
const stateUserService = new StateUserService(stateStore, userContainer.userService);
const menuService = new MenuService(stateUserService);  

export default {
    menuService,
}