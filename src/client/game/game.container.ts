
import menuContainer from "@/client/menu/menu.container";
import { GameController } from "./game.controller";
import { GameService } from "./service/game.service";
import { GameStoryService } from "./service/game-story.service";
import { commandBus } from "@/client/app/command.container";
import { queryBus } from "@/client/app/query.container";
import { storyRenderConsole } from "@/client/story-render/story-render.container";

const gameStoryService = new GameStoryService(
    commandBus,
    queryBus,
    storyRenderConsole
)

const gameService = new GameService(
    menuContainer.menuService, 
    gameStoryService
);   
const gameController = new GameController(gameService);  

export default gameController