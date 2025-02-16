import { ConditionType, DialogInterface } from "./dialog.interface";

export interface SceneInterface {
    id: string;
    description: string;
    dialogs: DialogInterface[];
    condition?: ConditionType;
}