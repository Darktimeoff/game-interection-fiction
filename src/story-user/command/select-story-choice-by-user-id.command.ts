import { CommandInterface } from "@/generic/cqrs/command/interface/command.interface";
import { StoryUserEntityInterface } from "@/story-user/entity/story-user-entity.interface";

export class SelectStoryChoiceCommandByUserId implements CommandInterface {
    constructor(
        public readonly userId: StoryUserEntityInterface['userId'],
        public readonly choiceId: number
    ) {}
}