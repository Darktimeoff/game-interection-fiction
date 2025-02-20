
import { CommandHandlerInterface } from "@/generic/cqrs/command/interface/command-handler.interface";
import { CreateUserCommand } from "@/client/state/command/create-user.command";
import { StateUserService } from "@/client/state/state-user.service";

export class CreateUserCommandHandler implements CommandHandlerInterface<CreateUserCommand> {
    constructor(
        private readonly stateUserService: StateUserService
    ) {}

    async execute({username}: CreateUserCommand): Promise<void> {
        await this.stateUserService.createUser(username)
    }
}