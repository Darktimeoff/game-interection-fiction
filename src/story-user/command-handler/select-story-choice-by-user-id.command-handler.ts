import { CommandHandlerInterface } from "@/generic/cqrs/command/interface/command-handler.interface";
import { SelectStoryChoiceCommandByUserId } from "@/story-user/command/select-story-choice-by-user-id.command";
import { StoryUserService } from "@/story-user/story-user.service";
import { StoryHandleService } from "@/story/story-handle.service";

export class SelectStoryChoiceCommandByUserIdHandler implements CommandHandlerInterface<SelectStoryChoiceCommandByUserId> {
    constructor(private readonly storyUsers: StoryUserService, private readonly storyHandle: StoryHandleService) {}

    async execute({userId, choiceId}: SelectStoryChoiceCommandByUserId): Promise<void> {
        const storyUser = await this.storyUsers.findByUserId(userId)
        const state = await this.storyHandle.selectChoice(storyUser.storyState, choiceId)
        await this.storyUsers.updateStoryUser({...storyUser, storyState: state})
    }
}