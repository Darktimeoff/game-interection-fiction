
import menuContainer from "@/client/menu/menu.container";
import { GameController } from "./game.controller";
import { GameService } from "./service/game.service";
import { GameStoryService } from "./service/game-story.service";
import storyRenderService from "@/client/story-render/story-render.container";
import storyService from "@/story/story.container";
import { commandBus } from "./command.container";
import { queryBus } from "./query.container";

const gameStoryService = new GameStoryService(
    storyRenderService,
    storyService,
    commandBus,
    queryBus
)

const gameService = new GameService(
    menuContainer.menuService, 
    gameStoryService
);   
const gameController = new GameController(gameService);  

export default gameController