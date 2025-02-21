import { StoryRenderConsole } from "@/client/story-render/story-render-console"
import { StoryItemInterface } from "@/story/interfaces/story-item.interface"
import { ReadlineServiceInterface } from "@/generic/readline/readline-service.interface"


describe('StoryRenderConsole', () => {
    let storyRenderConsole: StoryRenderConsole
    let mockConsole: jest.SpyInstance[]
    let mockReadline: ReadlineServiceInterface

    beforeEach(() => {
        mockConsole = [
            jest.spyOn(console, 'clear').mockImplementation(),
            jest.spyOn(console, 'log').mockImplementation()
        ]

        mockReadline = {
            question: jest.fn(),
            pause: jest.fn(),
            resume: jest.fn()
        }

        storyRenderConsole = new StoryRenderConsole(mockReadline)
        mockReadline = (storyRenderConsole as any).rl
    })

    afterEach(() => {
        mockConsole.forEach(mock => mock.mockRestore())
    })

    it('should render story item without choices', async () => {
        const mockItem: StoryItemInterface = {
            id: 'test',
            title: 'Test Title',
            text: 'Test text',
            choices: []
        }

     
        ;(mockReadline.question as jest.Mock).mockResolvedValueOnce('')

        const result = await storyRenderConsole.render(mockItem)

    
        expect(console.clear).toHaveBeenCalled()

       
        expect(console.log).toHaveBeenCalledWith('Test Title')
        expect(console.log).toHaveBeenCalledWith('Test text')

        expect(mockReadline.question).toHaveBeenCalledWith('\nНажмите Enter для продолжения...')

        expect(result).toBeNull()
    })

    it('should render story item with choices', async () => {
        const mockItem: StoryItemInterface = {
            id: 'test',
            text: 'Test text',
            choices: [
                { text: 'Choice 1', nextScene: 'scene1' },
                { text: 'Choice 2', nextScene: 'scene2' }
            ]
        }

        ;(mockReadline.question as jest.Mock).mockResolvedValueOnce('1')

        const result = await storyRenderConsole.render(mockItem)

        expect(console.clear).toHaveBeenCalled()

        expect(console.log).toHaveBeenCalledWith('Test text')
        expect(console.log).toHaveBeenCalledWith('\nВарианты:')
        expect(console.log).toHaveBeenCalledWith('1. Choice 1')
        expect(console.log).toHaveBeenCalledWith('2. Choice 2')

        expect(mockReadline.question).toHaveBeenCalledWith('\nответ: ')

        expect(result).toBe(0)
    })

    it('should render story item without title', async () => {
        const mockItem: StoryItemInterface = {
            id: 'test',
            text: 'Test text',
            choices: []
        }

        ;(mockReadline.question as jest.Mock).mockResolvedValueOnce('')

        await storyRenderConsole.render(mockItem)

        expect(console.log).not.toHaveBeenCalledWith(undefined)
        expect(console.log).toHaveBeenCalledWith('Test text')
    })

    it('should handle invalid choice input', async () => {
        const mockItem: StoryItemInterface = {
            id: 'test',
            text: 'Test text',
            choices: [
                { text: 'Choice 1', nextScene: 'scene1' }
            ]
        }


        ;(mockReadline.question as jest.Mock).mockResolvedValueOnce('invalid')

        const result = await storyRenderConsole.render(mockItem)

        expect(result).toBe(NaN)
    })

    it('should render multiple choices in correct order', async () => {
        const mockItem: StoryItemInterface = {
            id: 'test',
            text: 'Test text',
            choices: [
                { text: 'Choice 1', nextScene: 'scene1' },
                { text: 'Choice 2', nextScene: 'scene2' },
                { text: 'Choice 3', nextScene: 'scene3' }
            ]
        }

        ;(mockReadline.question as jest.Mock).mockResolvedValueOnce('2')

        await storyRenderConsole.render(mockItem)

        const logCalls = (console.log as jest.Mock).mock.calls
        const choiceCalls = logCalls.filter(call => call[0].startsWith('1.') || 
                                                   call[0].startsWith('2.') || 
                                                   call[0].startsWith('3.'))
        
        expect(choiceCalls[0][0]).toBe('1. Choice 1')
        expect(choiceCalls[1][0]).toBe('2. Choice 2')
        expect(choiceCalls[2][0]).toBe('3. Choice 3')
    })
})