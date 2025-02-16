
import menuContainer from "@/client/menu/menu.container";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import stateContainer from "@/client/state/state.container";
import storyUserContainer from "@/story-user/story-user.container";

const gameService = new GameService(
    menuContainer.menuService, 
    stateContainer,
    storyUserContainer
);   
const gameController = new GameController(gameService);  

export default {
    gameController,
}