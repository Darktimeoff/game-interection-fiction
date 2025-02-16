type NextSceneType = 'game_over' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | 'episode2_01';
export enum ConditionType {
    daniel_alive = 'daniel_alive',
    has_map = 'has_map'
}
export interface DialogInterface {
    character: string;
    text: string;
    condition?: ConditionType;
    choices?: {
        text: string;
        nextScene: string | NextSceneType; 
        setCondition?: { [key in ConditionType]: boolean };
    }[];
}