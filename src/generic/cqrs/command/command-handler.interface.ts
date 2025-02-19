import { CommandInterface } from "./command.interface";

export interface CommandHandlerInterface<T extends CommandInterface> {
    execute(command: T): Promise<void>
}