import { CommandInterface } from "@/generic/cqrs/command/command.interface";

export class SelectUserCommand implements CommandInterface {
    constructor(
        public readonly username: string
    ) {}
}