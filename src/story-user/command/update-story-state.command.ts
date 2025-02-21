import { CommandInterface } from "@/generic/cqrs/command/interface/command.interface";
import { StoryUserEntityInterface } from "@/story-user/entity/story-user-entity.interface";
import { StoryStateInterface } from "@/story/interfaces/story-state.interface";

export class UpdateStoryStateCommand implements CommandInterface {
    constructor(
       public readonly userId: StoryUserEntityInterface['userId'],
       public readonly storyState: StoryStateInterface
    ) {}
}