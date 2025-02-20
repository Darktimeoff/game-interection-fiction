import { CommandHandlerInterface } from "@/generic/cqrs/command/interface/command-handler.interface";
import { CommandInterface } from "@/generic/cqrs/command/interface/command.interface";
import { BusInterface } from "@/generic/cqrs/bus/bus.interface";

export interface CommandBusInterface extends BusInterface<CommandInterface, CommandHandlerInterface<CommandInterface>> {
  execute<T extends CommandInterface>(command: T): Promise<void>
}