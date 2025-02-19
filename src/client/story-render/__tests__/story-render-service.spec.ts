import { StoryRenderService } from '../story-render.service'
import { StoryIteratorInterface } from '../story-iterator.interface'
import { StoryRenderInterface } from '../story-render.interface'
import { StoryInterface } from '@/story/interfaces/story.interface'
import { StoryUserFullEntityInterface } from '@/story-user/entity/story-user-full-entity.interface'
import { StoryItemInterface } from '../interface/story-item.interface'
import { StoryEnum } from '@/story/enum/story.enum'
import { CONDITIONS_INITIAL } from '@/story-user/const/conditions_initial.const'

describe('StoryRenderService', () => {
    let storyRenderService: StoryRenderService
    let mockIterator: jest.Mocked<StoryIteratorInterface>
    let mockRender: jest.Mocked<StoryRenderInterface>

    beforeEach(() => {
        // Создаем моки для Iterator и Render
        mockIterator = {
            set: jest.fn(),
            selectChoice: jest.fn(),
            next: jest.fn(),
            reset: jest.fn(),
            getConditions: jest.fn(),
            setCondition: jest.fn(),
            getProgress: jest.fn()
        }

        mockRender = {
            render: jest.fn()
        }

        storyRenderService = new StoryRenderService(mockRender, mockIterator)
    })

    describe('initialize', () => {
        it('should initialize iterator with user story data', () => {
            const mockUserStory: StoryUserFullEntityInterface = {
                id: 1,
                userId: 1,
                storyId: StoryEnum.episode1,
                episodeId: 'episode1',
                sceneId: 'scene1',
                dialogId: 'dialog1',
                story: {
                    id: 'story1',
                    title: 'Test Story',
                    description: 'Test Description',
                    scenes: []
                },
                conditions: CONDITIONS_INITIAL()
            }

            storyRenderService.initialize(mockUserStory)

            expect(mockIterator.set).toHaveBeenCalledWith(
                mockUserStory.story,
                mockUserStory.sceneId,
                mockUserStory.dialogId,
                mockUserStory.conditions
            )
        })
    })

    describe('updateStory', () => {
        it('should update iterator with new story', () => {
            const mockStory: StoryInterface = {
                id: 'story1',
                title: 'Test Story',
                description: 'Test Description',
                scenes: []
            }

            storyRenderService.updateStory(mockStory)

            expect(mockIterator.set).toHaveBeenCalledWith(mockStory, null, null)
        })
    })

    describe('next', () => {
        it('should return null when iterator returns null', async () => {
            mockIterator.next.mockReturnValue(null)

            const result = await storyRenderService.next()

            expect(result).toBeNull()
            expect(mockRender.render).not.toHaveBeenCalled()
        })

        it('should handle story item without choices', async () => {
            const mockItem: StoryItemInterface = {
                id: 'test',
                text: 'Test text',
                choices: []
            }

            const mockProgress = {
                sceneId: 'scene1',
                dialogId: 'dialog1'
            }

            mockIterator.next.mockReturnValue(mockItem)
            mockRender.render.mockResolvedValue(null)
            mockIterator.getProgress.mockReturnValue(mockProgress)

            const result = await storyRenderService.next()

            expect(result).toEqual({
                ...mockProgress,
                nextScene: null,
                choiceId: null
            })
            expect(mockRender.render).toHaveBeenCalledWith(mockItem)
        })

        it('should handle story item with choices', async () => {
            const mockItem: StoryItemInterface = {
                id: 'test',
                text: 'Test text',
                choices: [
                    { text: 'Choice 1', nextScene: 'scene2' }
                ]
            }

            const mockProgress = {
                sceneId: 'scene1',
                dialogId: 'dialog1'
            }

            mockIterator.next.mockReturnValue(mockItem)
            mockRender.render.mockResolvedValue(0)
            mockIterator.getProgress.mockReturnValue(mockProgress)
            mockIterator.selectChoice.mockReturnValue('scene2')

            const result = await storyRenderService.next()

            expect(result).toEqual({
                ...mockProgress,
                choiceId: 0,
                nextScene: 'scene2'
            })
            expect(mockRender.render).toHaveBeenCalledWith(mockItem)
            expect(mockIterator.selectChoice).toHaveBeenCalledWith(0)
        })

        it('should handle render errors', async () => {
            const mockItem: StoryItemInterface = {
                id: 'test',
                text: 'Test text',
                choices: []
            }

            mockIterator.next.mockReturnValue(mockItem)
            mockRender.render.mockRejectedValue(new Error('Render error'))

            await expect(storyRenderService.next()).rejects.toThrow('Render error')
        })

        it('should handle iterator errors', async () => {
            mockIterator.next.mockImplementation(() => {
                throw new Error('Iterator error')
            })

            await expect(storyRenderService.next()).rejects.toThrow('Iterator error')
        })
    })
})