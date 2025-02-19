import { ChoiceInterface } from "@/story/interfaces/choices.interface"
import { StoryItemInterface } from "./interface/story-item.interface"
import { StoryRenderInterface } from "./story-render.interface"
import { ReadlineServiceInterface } from "@/generic/readline/readline-service.interface"


export class StoryRenderConsole implements StoryRenderInterface {
    constructor(
        private readonly rl: ReadlineServiceInterface
    ) {
    }


    async render(item: StoryItemInterface): Promise<number | null> {
        // console.clear()

        if(item.title) {
            console.log(item.title)
        }

        console.log(item.text)

        if(item.choices.length > 0) {
            console.log('\nВарианты:')
            item.choices.forEach(this.renderChoice)
            return Number(await this.rl.question('\nответ: ')) - 1
        }
 
        await this.rl.question('\nНажмите Enter для продолжения...')
   
        return null
    }

    private renderChoice(choice: ChoiceInterface, index: number): void {
        console.log(`${index + 1}. ${choice.text}`)
    }
}