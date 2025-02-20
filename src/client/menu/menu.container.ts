
import { MenuService } from "@/client/menu/menu.service";
import { commandBus } from "@/client/game/command.container";
import { queryBus } from "@/client/game/query.container";

const menuService = new MenuService(queryBus, commandBus);  

export default {
    menuService,
}