import { CommandHandlerInterface } from "@/generic/cqrs/command/interface/command-handler.interface";
import { SelectUserCommand } from "@/client/state/command/select-user.command";
import { StateUserService } from "@/client/state/state-user.service";

export class SelectUserCommandHandler implements CommandHandlerInterface<SelectUserCommand> {
    constructor(
        private readonly stateUserService: StateUserService
    ) {}

    async execute({username}: SelectUserCommand): Promise<void> {
        await this.stateUserService.selectUserByName(username)
    }
}