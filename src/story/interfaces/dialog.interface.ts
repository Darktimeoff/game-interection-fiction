import { ChoiceInterface } from "./choices.interface";

export interface DialogInterface {
    id: string;
    character: string;
    text: string;
    condition?: string;
    choices?: ChoiceInterface[];
}