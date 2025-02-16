
import menuContainer from "@/client/menu/menu.container";
import { GameController } from "./game.controller";
import { GameService } from "./service/game.service";
import stateContainer from "@/client/state/state.container";
import storyUserContainer from "@/story-user/story-user.container";
import { GameStoryService } from "./service/game-story.service";

const gameStoryService = new GameStoryService(
    stateContainer,
    storyUserContainer
)

const gameService = new GameService(
    menuContainer.menuService, 
    gameStoryService
);   
const gameController = new GameController(gameService);  

export default gameController