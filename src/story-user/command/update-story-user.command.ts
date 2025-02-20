import { CommandInterface } from "@/generic/cqrs/command/command.interface";
import { StoryUserEntityInterface } from "@/story-user/entity/story-user-entity.interface";

export class UpdateStoryUserCommand implements CommandInterface {
    constructor(
        public readonly storyUser: StoryUserEntityInterface
    ) {}
}