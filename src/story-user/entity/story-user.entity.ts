import { UserEntityInterface } from "@/user/entity/user-entity.interface";
import { StoryUserEntityInterface } from "./story-user-entity.interface";
import { StoryEnum } from "@/story/enum/story.enum";
import { ConditionsType } from "@/story/interfaces/choices.interface";

export class StoryUserEntity implements StoryUserEntityInterface {
    id!: number;
    userId!: UserEntityInterface['id'];
    storyId!: StoryEnum;
    episodeId!: string;
    sceneId!: string | null;
    dialogId!: string | null;
    conditions!: ConditionsType;
    constructor(storyUser: StoryUserEntityInterface) {
        this.id = storyUser.id;
        this.userId = storyUser.userId;
        this.storyId = storyUser.storyId;
        this.episodeId = storyUser.episodeId;
        this.sceneId = storyUser.sceneId;
        this.conditions = storyUser.conditions;
    }
}