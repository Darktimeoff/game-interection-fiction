import { CommandHandlerInterface } from "@/generic/cqrs/command/command-handler.interface";
import { CommandInterface } from "@/generic/cqrs/command/command.interface";
import { BusInterface } from "@/generic/cqrs/bus/bus.interface";

export interface CommandBusInterface extends BusInterface<CommandInterface, CommandHandlerInterface<CommandInterface>> {
  execute<T extends CommandInterface>(command: T): Promise<void>
}