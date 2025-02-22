import { ConditionType } from "@/story/interfaces/choices.interface";
import { StoryIterator } from "@/story/story-iterator";
import { StoryInterface } from "@/story/interfaces/story.interface";
import { CONDITIONS_INITIAL } from '@/story/const/conditions_initial.const'

describe('StoryIterator', () => {
    let storyIterator: StoryIterator;
    let mockStory: StoryInterface;

    beforeEach(() => {
        // Базовая тестовая история
        mockStory = {
            id: "test_story",
            title: "Test Story",
            description: "Test story description",
            scenes: [
                {
                    id: "scene1",
                    description: "First scene description",
                    dialogs: [
                        {
                            id: "0",
                            character: "Character1",
                            text: "First dialog",
                            choices: [
                                {
                                    text: "Go to scene 2",
                                    nextScene: "scene2",
                                    setCondition: { [ConditionType.daniel_alive]: true, [ConditionType.has_map]: true }
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "scene2",
                    description: "Second scene description",
                    dialogs: [
                        {
                            id: "0",
                            character: "Character2",
                            text: "Second dialog",
                            condition: "daniel_alive",
                            choices: [
                                {
                                    text: "End story",
                                    nextScene: "end",
                                    setCondition: { [ConditionType.daniel_alive]: false, [ConditionType.has_map]: true }
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        storyIterator = new StoryIterator();
    });

    it('should initialize with a story', () => {
        storyIterator.set(mockStory, null, null, CONDITIONS_INITIAL());
        const firstItem = storyIterator.next();
        
        expect(firstItem?.id).toBe("test_story")
        expect(firstItem?.text).toBe("Test story description")
        expect(firstItem?.title).toBe("Test Story")
        expect(firstItem?.choices).toEqual([])
    });

    it('should return scene description after story description', () => {
        storyIterator.set(mockStory, null, null, CONDITIONS_INITIAL());
        storyIterator.next(); // Skip story description
        const sceneItem = storyIterator.next();

        expect(sceneItem?.id).toBe("scene1")
        expect(sceneItem?.title).toBe("")
        expect(sceneItem?.text).toBe("First scene description")
        expect(sceneItem?.choices).toEqual([])
    });

    it('should return dialog after scene description', () => {
        storyIterator.set(mockStory, null, null, CONDITIONS_INITIAL());
        storyIterator.next(); // Skip story description
        storyIterator.next(); // Skip scene description
        const dialogItem = storyIterator.next();

        expect(dialogItem?.id).toBe("0")
        expect(dialogItem?.title).toBe("Character1")
        expect(dialogItem?.text).toBe("First dialog")
        expect(dialogItem?.choices).toEqual([
                {
                    text: "Go to scene 2",
                    nextScene: "scene2",
                setCondition: { [ConditionType.daniel_alive]: true, [ConditionType.has_map]: true }
            }
        ])
    });

    it('should handle conditional dialogs', () => {
        storyIterator.set(mockStory, null, null, CONDITIONS_INITIAL());
        storyIterator.next(); // Skip story description
        storyIterator.next(); // Skip scene description
        storyIterator.next();
        
        // Выбираем переход к scene2
        storyIterator.selectChoice(0);
        
        // Получаем описание второй сцены
        const scene2 = storyIterator.next();
        expect(scene2?.text).toBe("Second scene description");
        
        // Проверяем диалог с условием daniel_alive
        const conditionalDialog = storyIterator.next();
        expect(conditionalDialog?.title).toBe("Character2");
        expect(conditionalDialog?.text).toBe("Second dialog");
    });

    it('should handle condition changes through choices', () => {
        storyIterator.set(mockStory, null, null, CONDITIONS_INITIAL());
        
        // Пропускаем до диалога в первой сцене
        storyIterator.next();
        storyIterator.next();
        storyIterator.next();
        
        // Выбираем переход к scene2
        storyIterator.selectChoice(0);
        
        // Пропускаем до диалога во второй сцене
        storyIterator.next();
        const dialogBeforeChoice = storyIterator.next();
        expect(dialogBeforeChoice?.title).toBe("Character2");
        expect(dialogBeforeChoice?.text).toBe("Second dialog");
        
        // Выбираем опцию, которая устанавливает daniel_alive в false
        storyIterator.selectChoice(0);
        
        // Проверяем, что условие изменилось
        expect(storyIterator.getConditions()[ConditionType.daniel_alive]).toBe(false);
    });

    it('should skip dialogs that don\'t meet conditions', () => {
        const storyWithMultipleDialogs: StoryInterface = {
            ...mockStory,
            scenes: [
                {
                    id: "scene1",
                    description: "Test scene",
                    dialogs: [
                        {
                            id: "0",
                            character: "Character1",
                            text: "Always visible",
                            choices: []
                        },
                        {
                            id: "1",
                            character: "Character2",
                            text: "Only visible if daniel_alive",
                            condition: "daniel_alive",
                            choices: []
                        },
                        {
                            id: "2",
                            character: "Character3",
                            text: "Final dialog",
                            choices: []
                        }
                    ]
                }
            ]
        };

        storyIterator.set(storyWithMultipleDialogs, null, null, CONDITIONS_INITIAL());
        storyIterator.setCondition(ConditionType.daniel_alive, false);

        storyIterator.next(); // Skip story description
        storyIterator.next(); // Skip scene description
        
        const dialog1 = storyIterator.next();
        expect(dialog1?.title).toBe("Character1");
        expect(dialog1?.text).toBe("Always visible");

        const dialog2 = storyIterator.next();
        expect(dialog2?.title).toBe("Character3");
        expect(dialog2?.text).toBe("Final dialog");
    });

    it('should return null when story ends', () => {
        storyIterator.set(mockStory, null, null, CONDITIONS_INITIAL());
        
        // Проходим через всю историю
        while(true) {
            const item = storyIterator.next()
            console.log('item', item)
            if(item?.choices?.length && item.choices.length > 0) {
                storyIterator.selectChoice(0)
            }

            if(!item) {
                expect(storyIterator.next()).toBeNull()
                break
            }
        }
    });
});