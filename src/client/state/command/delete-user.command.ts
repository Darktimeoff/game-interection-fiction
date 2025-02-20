import { CommandInterface } from "@/generic/cqrs/command/command.interface";

export class DeleteUserCommand implements CommandInterface {
    constructor(
        public readonly username: string
    ) {}
}