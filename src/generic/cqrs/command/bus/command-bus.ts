import { Singleton } from "@/generic/decorators/singleton.decorator"
import { CommandInterface } from "@/generic/cqrs/command/command.interface"
import { CommandHandlerInterface } from "@/generic/cqrs/command/command-handler.interface"
import { CommandBusInterface } from "./command-bus.interface"
import { Log, LogClass } from "@/generic/logging/log.decorator"
import { Bus } from "@/generic/cqrs/bus/bus"

@Singleton
@LogClass()
export class CommandBus extends Bus<CommandInterface, CommandHandlerInterface<CommandInterface>> implements CommandBusInterface {
    constructor() {
        super()
    }

    @Log(
        (command) => `Execute command: ${command?.constructor?.name}`,
        (_, command) => `Handler: ${command?.constructor?.name}`,
        (error, command) => `Failed to execute command ${command?.constructor?.name}: ${error}`
    )
    public async execute<T extends CommandInterface>(command: T): Promise<void> {
        const handler = this.mapped.get(command.constructor)
      
        if(!handler) {
            throw new Error(`Handler for command ${command.constructor.name} not found`)
        }

        return await handler.execute(command)
    }
}