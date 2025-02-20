import { CommandInterface } from "@/generic/cqrs/command/interface/command.interface";

export class SelectUserCommand implements CommandInterface {
    constructor(
        public readonly username: string
    ) {}
}