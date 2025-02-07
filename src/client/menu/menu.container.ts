import userContainer from "@/user/user.container";
import { MenuService } from "./menu.service";

const menuService = new MenuService(userContainer.userService);  

export default {
    menuService,
}