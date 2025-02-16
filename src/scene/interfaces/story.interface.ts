import { SceneInterface } from "./scene.interface";

export interface StoryInterface {
    id: string;
    title: string;
    description: string;
    scenes: SceneInterface[];
}