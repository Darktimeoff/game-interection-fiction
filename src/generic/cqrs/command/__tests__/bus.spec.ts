import { CommandBus } from '../bus/command-bus'
import { CommandInterface } from '../command.interface'
import { CommandHandlerInterface } from '../command-handler.interface'

// Test Commands
class TestCommand implements CommandInterface {
    constructor(public readonly data: string) {}
}

class AnotherTestCommand implements CommandInterface {
    constructor(public readonly value: number) {}
}

class FailingCommand implements CommandInterface {
    constructor(public readonly message: string) {}
}

// Test Handlers
class TestCommandHandler implements CommandHandlerInterface<TestCommand> {
    public executeCount = 0
    public lastCommand: TestCommand | null = null

    async execute(command: TestCommand): Promise<void> {
        this.executeCount++
        this.lastCommand = command
        return Promise.resolve()
    }
}

class AnotherTestCommandHandler implements CommandHandlerInterface<AnotherTestCommand> {
    public executeCount = 0
    public lastValue: number | null = null

    async execute(command: AnotherTestCommand): Promise<void> {
        this.executeCount++
        this.lastValue = command.value
        return Promise.resolve()
    }
}

class FailingCommandHandler implements CommandHandlerInterface<FailingCommand> {
    async execute(command: FailingCommand): Promise<void> {
        throw new Error(command.message)
    }
}

describe('CommandBus', () => {
    let commandBus: CommandBus
    let testHandler: TestCommandHandler
    let anotherTestHandler: AnotherTestCommandHandler
    let failingHandler: FailingCommandHandler

    beforeEach(() => {
        commandBus = new CommandBus()
        testHandler = new TestCommandHandler()
        anotherTestHandler = new AnotherTestCommandHandler()
        failingHandler = new FailingCommandHandler()
    })

    describe('registration', () => {
        it('should successfully register a command handler', () => {
            const command = new TestCommand('test')
            commandBus.register(TestCommand, testHandler)
            
            expect(() => commandBus.execute(command)).not.toThrow()
        })

        it('should allow registering multiple different commands', () => {
            commandBus.register(TestCommand, testHandler)
            commandBus.register(AnotherTestCommand, anotherTestHandler)

            expect(async () => {
                await commandBus.execute(new TestCommand('test'))
                await commandBus.execute(new AnotherTestCommand(42))
            }).not.toThrow()
        })

        it('should override handler when registering same command type', () => {
            const newHandler = new TestCommandHandler()
            
            commandBus.register(TestCommand, testHandler)
            commandBus.register(TestCommand, newHandler)
            
            const command = new TestCommand('test')
            commandBus.execute(command)

            expect(testHandler.executeCount).toBe(0)
            expect(newHandler.executeCount).toBe(1)
        })
    })

    describe('execution', () => {
        beforeEach(() => {
            commandBus.register(TestCommand, testHandler)
            commandBus.register(AnotherTestCommand, anotherTestHandler)
            commandBus.register(FailingCommand, failingHandler)
        })

        it('should execute command with correct handler', async () => {
            const command = new TestCommand('test data')
            await commandBus.execute(command)

            expect(testHandler.executeCount).toBe(1)
            expect(testHandler.lastCommand).toBe(command)
        })

        it('should execute multiple commands correctly', async () => {
            const command1 = new TestCommand('test1')
            const command2 = new TestCommand('test2')
            const command3 = new AnotherTestCommand(42)

            await commandBus.execute(command1)
            await commandBus.execute(command2)
            await commandBus.execute(command3)

            expect(testHandler.executeCount).toBe(2)
            expect(testHandler.lastCommand).toBe(command2)
            expect(anotherTestHandler.executeCount).toBe(1)
            expect(anotherTestHandler.lastValue).toBe(42)
        })

        it('should throw error when handler is not found', async () => {
            class UnregisteredCommand implements CommandInterface {}
            
            await expect(
                commandBus.execute(new UnregisteredCommand())
            ).rejects.toThrow('Handler for command UnregisteredCommand not found')
        })

        it('should propagate errors from handlers', async () => {
            const errorMessage = 'Handler error'
            const command = new FailingCommand(errorMessage)

            await expect(
                commandBus.execute(command)
            ).rejects.toThrow(errorMessage)
        })

        it('should handle concurrent command executions', async () => {
            const commands = Array.from({ length: 10 }, (_, i) => 
                new TestCommand(`test${i}`)
            )

            await Promise.all(commands.map(cmd => commandBus.execute(cmd)))

            expect(testHandler.executeCount).toBe(10)
        })
    })

    describe('error scenarios', () => {
        it('should handle null/undefined commands gracefully', () => {
            // @ts-expect-error Testing invalid input
            expect(() => commandBus.execute(null)).rejects.toThrow()
            // @ts-expect-error Testing invalid input
            expect(() => commandBus.execute(undefined)).rejects.toThrow()
        })

        it('should handle invalid handler registration', () => {
            // @ts-expect-error Testing invalid input
            expect(() => commandBus.register(null, testHandler)).toThrow()
            // @ts-expect-error Testing invalid input
            expect(() => commandBus.register(TestCommand, null)).toThrow()
        })
    })

    describe('performance', () => {
        it('should handle large number of registrations', () => {
            const handlers = Array.from({ length: 1000 }, (_, __) => {
                class DynamicCommand implements CommandInterface {
                    constructor(public id: number) {}
                }
                class DynamicHandler implements CommandHandlerInterface<DynamicCommand> {
                    execute(): Promise<void> {
                        return Promise.resolve()
                    }
                }
                return [DynamicCommand, new DynamicHandler()] as const
            })

            expect(() => {
                handlers.forEach(([cmd, handler]) => 
                    commandBus.register(cmd, handler)
                )
            }).not.toThrow()
        })

        it('should execute commands within reasonable time', async () => {
            const start = Date.now()
            const commands = Array.from({ length: 100 }, () => 
                new TestCommand('performance test')
            )

            await Promise.all(commands.map(cmd => commandBus.execute(cmd)))

            const duration = Date.now() - start
            expect(duration).toBeLessThan(1000) // Should complete within 1 second
        })
    })
})