import { StoryInterface } from "@/story/interfaces/story.interface";
import { StoryUserEntityInterface } from "./story-user-entity.interface";

export interface StoryUserFullEntityInterface extends StoryUserEntityInterface {
    story: StoryInterface;
}