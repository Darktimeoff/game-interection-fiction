import { CommandHandlerInterface } from "@/generic/cqrs/command/interface/command-handler.interface";
import { StateUserService } from "@/client/state/state-user.service";
import { DeleteUserCommand } from "@/client/state/command/delete-user.command";

export class DeleteUserCommandHandler implements CommandHandlerInterface<DeleteUserCommand> {
    constructor(
        private readonly stateUserService: StateUserService
    ) {}

    async execute({username}: DeleteUserCommand): Promise<void> {
        await this.stateUserService.deleteUserByName(username)
    }
}