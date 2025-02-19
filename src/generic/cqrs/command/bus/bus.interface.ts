import { CommandHandlerInterface } from "@/generic/cqrs/command/command-handler.interface";
import { CommandInterface } from "@/generic/cqrs/command/command.interface";

export interface CommandBusInterface {
    register<T extends CommandInterface>(command: { new (...args: any[]): T }, handler: CommandHandlerInterface<T>): void
    execute<T extends CommandInterface>(command: T): void
    unregister<T extends CommandInterface>(command: { new (...args: any[]): T }): void
}