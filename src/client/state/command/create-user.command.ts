import { CommandInterface } from "@/generic/cqrs/command/command.interface";

export class CreateUserCommand implements CommandInterface {
    constructor(
        public readonly username: string
    ) {}
}