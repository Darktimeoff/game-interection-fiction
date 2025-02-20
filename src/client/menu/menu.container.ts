
import { MenuService } from "@/client/menu/menu.service";
import stateContainer from "@/client/state/state.container";
import { commandBus } from "@/client/game/command.container";

const menuService = new MenuService(stateContainer, commandBus);  

export default {
    menuService,
}