import { GetCurrentUserQuery } from "@/client/state/query/get-current-user.query";
import { StoryRenderInterface } from "@/client/story-render/story-render.interface";
import { CommandBusInterface } from "@/generic/cqrs/command/interface/command-bus.interface";
import { QueryBusInterface } from "@/generic/cqrs/query/interface/query-bus.interface";
import { Log, LogClass } from "@/generic/logging/log.decorator";
import { SelectStoryChoiceCommandByUserId } from "@/story-user/command/select-story-choice-by-user-id.command";
import { UpdateStoryStateCommand } from "@/story-user/command/update-story-state.command";
import { GetStoryItemByUserIdQuery } from "@/story-user/query/get-story-item-by-user-id.query";

@LogClass()
export class GameStoryService {
    constructor(
        private readonly commandBus: CommandBusInterface,
        private readonly queryBus: QueryBusInterface,
        private readonly storyRender: StoryRenderInterface
    ) {}

    @Log('initializeStory', 'game', (error) => `Failed to initialize story: ${error}`)
    async initializeStory(): Promise<void> {
        const user = await this.queryBus.execute(new GetCurrentUserQuery())
        if(!user) {
            throw new Error('Current user not selected')
        }
        while(true) {
            await this.renderScene(user.id)
        }
    }

    private async renderScene(userId: number): Promise<void> {
        const {item, state} = await this.queryBus.execute(new GetStoryItemByUserIdQuery(userId))
        await this.commandBus.execute(new UpdateStoryStateCommand(userId, state))

        if(!item) {
            return
        }

        const choice = await this.storyRender.render(item)
        if(choice === null) {
            return
        }
        
        
        try {
            await this.commandBus.execute(new SelectStoryChoiceCommandByUserId(userId, choice))
        } catch(error) {
            await this.renderScene(userId)
        }
    }
}
