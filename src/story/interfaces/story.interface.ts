import { StoryEnum } from "../enum/story.enum";
import { SceneInterface } from "./scene.interface";

export interface StoryInterface {
    id: string;
    title: string;
    description: string;
    scenes: SceneInterface[];
}

export interface StoryFullInterface extends StoryInterface {
    storyId: StoryEnum;
}