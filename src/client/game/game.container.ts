
import menuContainer from "@/client/menu/menu.container";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";

const gameService = new GameService(menuContainer.menuService);   
const gameController = new GameController(gameService);  

export default {
    gameController,
}