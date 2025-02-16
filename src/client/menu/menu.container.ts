
import { MenuService } from "@/client/menu/menu.service";
import stateContainer from "@/client/state/state.container";

const menuService = new MenuService(stateContainer);  

export default {
    menuService,
}