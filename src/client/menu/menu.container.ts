
import { MenuService } from "@/client/menu/menu.service";
import { commandBus } from "@/client/app/command.container";
import { queryBus } from "@/client/app/query.container";

const menuService = new MenuService(queryBus, commandBus);  

export default {
    menuService,
}