export enum ConditionType {
    daniel_alive = 'daniel_alive',
    has_map = 'has_map'
}

export type ConditionsType =  { [key in ConditionType]: boolean }

export interface ChoiceInterface {
    text: string
    nextScene: string | 'game_over' | 'episode2_01'
    setCondition?: { [key in ConditionType]: boolean }
}