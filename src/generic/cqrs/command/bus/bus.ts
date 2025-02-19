import { Singleton } from "@/generic/decorators/singleton.decorator"
import { CommandInterface } from "@/generic/cqrs/command/command.interface"
import { CommandHandlerInterface } from "@/generic/cqrs/command/command-handler.interface"
import { CommandBusInterface } from "./bus.interface"
import { Log, LogClass } from "@/generic/logging/log.decorator"

@Singleton
@LogClass()
export class CommandBus implements CommandBusInterface {
    private commands: Map<Function, CommandHandlerInterface<CommandInterface>> = new Map()

    @Log(
        (command, handler) => `Register command: ${command?.constructor.name} with handler: ${handler?.constructor.name}`,
        (_, command, handler) => `Registered handler ${handler?.constructor.name} for command ${command?.constructor.name}`,
        (error, command, handler) => `Failed to register handler ${handler?.constructor.name} for command ${command?.constructor.name}: ${error}`
    )
    public register<T extends CommandInterface>(command: { new (...args: any[]): T }, handler: CommandHandlerInterface<T>): void {
        if(!command || !handler) {
            throw new Error('Command or handler is not defined')
        }
        this.commands.set(command, handler)
    }

    @Log(
        (command) => `Execute command: ${command?.constructor?.name}`,
        (_, command) => `Handler: ${command?.constructor?.name}`,
        (error, command) => `Failed to execute command ${command?.constructor?.name}: ${error}`
    )
    public async execute<T extends CommandInterface>(command: T): Promise<void> {
        const handler = this.commands.get(command.constructor)
      
        if(!handler) {
            throw new Error(`Handler for command ${command.constructor.name} not found`)
        }

        return await handler.execute(command)
    }

    @Log(
        (command) => `Unregister command: ${command?.constructor?.name}`,
        (_, command) => `Unregistered command ${command?.constructor?.name}`,
        (error, command) => `Failed to unregister command ${command?.constructor?.name}: ${error}`
    )
    public unregister<T extends CommandInterface>(command: { new (...args: any[]): T }): void {
        this.commands.delete(command.constructor)
    }
}