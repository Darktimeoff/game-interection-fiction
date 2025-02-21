import { StoryInterface } from "@/story/interfaces/story.interface"
import { StoryIteratorInterface } from "@/story/interfaces/story-iterator.interface"
import { Singleton } from "@/generic/decorators/singleton.decorator"
import { ConditionsType, ConditionType } from "@/story/interfaces/choices.interface"
import { StoryItemInterface } from "@/story/interfaces/story-item.interface"
import { SceneInterface } from "@/story/interfaces/scene.interface"
import { DialogInterface } from "@/story/interfaces/dialog.interface"
import { LoggerConsole } from "@/generic/logging/logger.service"
import { StoryIteratorProgressInterface } from "./interfaces/story-iterator-progress.interface"
import { ValidationError } from "@/generic/errors/validation.error"

@Singleton
export class StoryIterator implements StoryIteratorInterface {
    private logger = new LoggerConsole('StoryIterator::')
    private story: StoryInterface | null = null
    private sceneId: string | null = null
    private dialogId: string | null = null
    private conditionMap!: ConditionsType
    private isEnd: boolean = false

    getProgress(): StoryIteratorProgressInterface {
        return {
            sceneId: this.sceneId,
            dialogId: this.dialogId,
        }
    }

    getConditions(): ConditionsType {
        return this.conditionMap
    }

    setCondition(condition: ConditionType, value: boolean): void {
        this.conditionMap[condition] = value
    }

    reset(): void {
        this.story = null
        this.sceneId = null
        this.dialogId = null
        this.conditionMap = Object.values(ConditionType).reduce((acc, type) => {
            acc[type] = true
            return acc
        }, {} as ConditionsType)
        this.isEnd = false
    }

    set(item: StoryInterface, sceneId: string | null = null, dialogId: string | null = null, conditions?: ConditionsType): void {
        this.story = item
        this.sceneId = sceneId
        this.dialogId = dialogId
        if(conditions) {
            this.conditionMap = conditions
        }
        this.isEnd = false
    }

    selectChoice(choiceIndex: number): string {
        if(!this.story) {
            throw new Error('Story is not initialized')
        }

        this.logger.log(`selectChoice::choiceIndex: ${choiceIndex} sceneId: ${this.sceneId} dialogId: ${this.dialogId}`)

        if(!this.sceneId) {
            throw new Error('SceneId is not initialized')
        }

        if(!this.dialogId) {
            throw new Error('DialogId is not initialized')
        }


        const scene = this.story.scenes?.find(scene => scene.id === this.sceneId)
        const dialog = scene?.dialogs?.find(dialog => dialog.id === this.dialogId)
        const choice = dialog?.choices?.[choiceIndex]

        this.logger.log(`selectChoice::choice: ${JSON.stringify(choice)}`)

        if(!choice) {
            throw new ValidationError('Choice is not found')
        }

        if(choice.setCondition) {
            Object.entries(choice.setCondition).forEach(([key, value]) => {
                this.setCondition(key as ConditionType, value)
            })
        }

        this.sceneId = this.story?.scenes.filter(this.filterByCondition.bind(this))?.find(scene => scene.id === choice.nextScene)?.id ?? null
        this.dialogId = null
        this.isEnd = !this.sceneId
        this.logger.log(`selectChoice::sceneId: ${this.sceneId} ${this.isEnd}`)

        return choice.nextScene
    }

    next(): StoryItemInterface | null {
        const filterByCondition = this.filterByCondition.bind(this)
        if(!this.story) {
            throw new Error('Story is not initialized')
        }

        if(this.isEnd) {
            return null
        }
        
        if(!this.sceneId) {
            const scene = this.formatRootScene(this.story)
            this.sceneId = this.story.scenes.filter(filterByCondition)[0].id
            this.dialogId = null
            this.logger.log(`next::sceneId: ${this.sceneId} dialogId: ${this.dialogId} condition: ${JSON.stringify(this.conditionMap)}`)
            return scene
        }

        const scene = this.story.scenes.filter(filterByCondition)?.find(scene => scene.id === this.sceneId)
        if(!scene) {
            this.logger.log(`next::scene not found`)
            return null
        }

        if(!this.dialogId) {
            const item = this.formatScene(scene)
            this.dialogId = scene.dialogs.filter(filterByCondition)[0].id
            this.logger.log(`next::sceneId: ${this.sceneId} dialogId: ${this.dialogId} condition: ${JSON.stringify(this.conditionMap)}`)
            return item
        }

        const dialogs = scene.dialogs.filter(filterByCondition)
        const findIndex = dialogs.findIndex(dialog => dialog.id === this.dialogId)
        const dialog = dialogs[findIndex]
        if(dialog) {
            const item = this.formatDialog(scene, dialog)
            this.dialogId = dialogs.length > findIndex + 1 ? dialogs[findIndex + 1].id : dialogs[findIndex].id
            this.logger.log(`next::sceneId: ${this.sceneId} dialogId: ${this.dialogId} condition: ${JSON.stringify(this.conditionMap)}`)
            return item
        }

        return null
    }

    private filterByCondition(item: SceneInterface | DialogInterface): boolean {
        if(!item.condition) {
            return true
        }

        let conditionText = item.condition

        for(const [key, value] of Object.entries(this.conditionMap)) {
            if(item.condition.includes(key)) {
                conditionText = conditionText.replace(key, value.toString())
            }
        }

        return eval(conditionText)
    }

    private formatRootScene(scene: StoryInterface): StoryItemInterface {
        return {
            id: scene.id,
            text: scene.description,
            title: scene.title,
            choices: []
        }
    } 

    private formatScene(scene: SceneInterface): StoryItemInterface {
        return {
            id: scene.id,
            text: scene.description,
            choices: []
        }
    }

    private formatDialog(scene: SceneInterface, dialog: DialogInterface): StoryItemInterface {
        return {
            id: scene.id,
            title: dialog.character,
            text: dialog.text,
            choices: dialog.choices || []
        }
    }
}