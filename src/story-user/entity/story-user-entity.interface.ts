import { StoryStateInterface } from "@/story/interfaces/story-state.interface";
import { UserEntityInterface } from "@/user/entity/user-entity.interface";



export interface StoryUserEntityInterface {
    id: number;
    userId: UserEntityInterface['id'];
    storyState: StoryStateInterface
}