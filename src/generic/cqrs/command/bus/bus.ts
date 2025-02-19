import { Singleton } from "@/generic/decorators/singleton.decorator"
import { CommandInterface } from "@/generic/cqrs/command/command.interface"
import { CommandHandlerInterface } from "@/generic/cqrs/command/command-handler.interface"
import { CommandBusInterface } from "./bus.interface"
import { Log, LogClass } from "@/generic/logging/log.decorator"

@Singleton
@LogClass()
export class CommandBus implements CommandBusInterface {
    private commands: Map<Function, CommandHandlerInterface<CommandInterface>> = new Map()

    @Log((command, handler) => `Register command: ${command.constructor.name} with handler: ${handler.constructor.name}`)
    public register<T extends CommandInterface>(command: { new (...args: any[]): T }, handler: CommandHandlerInterface<T>): void {
        this.commands.set(command, handler)
    }

    @Log((command) => `Execute command: ${command.constructor.name}`)
    public async execute<T extends CommandInterface>(command: T): Promise<void> {
        const handler = this.commands.get(command.constructor)
        console.log('handler', handler, this.commands)
        if(!handler) {
            throw new Error(`Handler for command ${command.constructor.name} not found`)
        }
        return await handler.execute(command)
    }

    @Log((command) => `Unregister command: ${command.constructor.name}`)
    public unregister<T extends CommandInterface>(command: T): void {
        this.commands.delete(command.constructor as new (...args: any[]) => CommandInterface)
    }
}