import { CommandHandlerInterface } from "@/generic/cqrs/command/interface/command-handler.interface";
import { UpdateStoryUserCommand } from "@/story-user/command/update-story-user.command";
import { StoryUserService } from "@/story-user/story-user.service";

export class UpdateStoryUserCommandHandler implements CommandHandlerInterface<UpdateStoryUserCommand> {
    constructor(
        private readonly storyUserService: StoryUserService
    ) {}

    
    async execute({storyUser}: UpdateStoryUserCommand): Promise<void> {
        await this.storyUserService.updateStoryUser(storyUser)
    }
}