import { CommandInterface } from "@/generic/cqrs/command/interface/command.interface";

export class CreateUserCommand implements CommandInterface {
    constructor(
        public readonly username: string
    ) {}
}