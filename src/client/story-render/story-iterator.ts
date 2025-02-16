import { StoryInterface } from "@/story/interfaces/story.interface"
import { StoryIteratorInterface } from "./story-iterator.interface"
import { Singleton } from "@/generic/decorators/singleton.decorator"
import { ConditionType } from "@/story/interfaces/choices.interface"
import { StoryItemInterface } from "./interface/story-item.interface"
import { SceneInterface } from "@/story/interfaces/scene.interface"
import { DialogInterface } from "@/story/interfaces/dialog.interface"
import { LoggerConsole } from "@/generic/logging/logger.service"

@Singleton
export class StoryIterator implements StoryIteratorInterface {
    private logger = new LoggerConsole('StoryIterator::')
    private story: StoryInterface | null = null
    private sceneId: string | null = null
    private dialogId: string | null = null
    private conditionMap!: Record<ConditionType, boolean>
    private isEnd: boolean = false

    constructor(story?: StoryInterface, id: string | null = null) {
        this.reset()
        if(story) {
            this.set(story, id)
        }
    }

    getCondition(condition: ConditionType): boolean {
        return this.conditionMap[condition]
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
        }, {} as Record<ConditionType, boolean>)
        this.isEnd = false
    }

    set(item: StoryInterface, id: string | null = null): void {
        this.story = item
        this.sceneId = id
        this.dialogId = null
        this.isEnd = false
    }

    selectChoice(choiceIndex: number): void {
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

        if(!choice) {
            throw new Error('Choice is not found')
        }

        if(choice.setCondition) {
            Object.entries(choice.setCondition).forEach(([key, value]) => {
                this.setCondition(key as ConditionType, value)
            })
        }

        this.sceneId = this.story?.scenes.filter(this.filterByCondition.bind(this))?.find(scene => scene.id === choice.nextScene)?.id ?? null
        this.dialogId = null
        this.isEnd = !this.sceneId
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