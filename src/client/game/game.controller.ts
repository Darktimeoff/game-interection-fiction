
import { GameService } from "./service/game.service";


export class GameController {
    constructor(
        private readonly gameService: GameService
    ) {}

    async startGame(): Promise<void> {
        return await this.gameService.startGame()
    }
}