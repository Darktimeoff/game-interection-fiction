import { StoryUserEntityInterface } from "@/story-user/entity/story-user-entity.interface";

export interface StoryUserCreateInterface extends Omit<StoryUserEntityInterface, 'id'> {}