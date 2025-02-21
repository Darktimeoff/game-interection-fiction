import { ChoiceInterface } from "@/story/interfaces/choices.interface"

export interface StoryItemInterface {
    id: string
    text: string
    choices: ChoiceInterface[]
    title?: string
}