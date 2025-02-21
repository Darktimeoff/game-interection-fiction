import { CommandHandlerInterface } from "@/generic/cqrs/command/interface/command-handler.interface";
import { StoryUserService } from "@/story-user/story-user.service";
import { UpdateStoryStateCommand } from "@/story-user/command/update-story-state.command";

export class UpdateStoryStateCommandHandler implements CommandHandlerInterface<UpdateStoryStateCommand> {
    constructor(
        private readonly storyUserService: StoryUserService
    ) {}

    
    async execute({userId, storyState}: UpdateStoryStateCommand): Promise<void> {
        await this.storyUserService.updateStoryState(userId, storyState)
    }
}