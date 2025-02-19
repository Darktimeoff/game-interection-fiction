import { StoryEnum } from "@/story/enum/story.enum";
import { ConditionsType } from "@/story/interfaces/choices.interface";
import { UserEntityInterface } from "@/user/entity/user-entity.interface";



export interface StoryUserEntityInterface {
    id: number;
    userId: UserEntityInterface['id'];
    storyId: StoryEnum;
    episodeId: string;
    sceneId: string | null;
    dialogId: string | null;
    conditions: ConditionsType
}