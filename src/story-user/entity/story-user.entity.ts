import { UserEntityInterface } from "@/user/entity/user-entity.interface";
import { StoryUserEntityInterface } from "./story-user-entity.interface";
import { StoryStateInterface } from "@/story/interfaces/story-state.interface";

export class StoryUserEntity implements StoryUserEntityInterface {
    id!: number;
    userId!: UserEntityInterface['id'];
    storyState!: StoryStateInterface;

    constructor({id, userId, storyState}: StoryUserEntityInterface) {
        this.id = id;
        this.userId = userId;
        this.storyState = storyState;
    }
}