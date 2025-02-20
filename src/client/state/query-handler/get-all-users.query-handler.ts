import { QueryHandlerInterface } from "@/generic/cqrs/query/interface/query-handler.interface";
import { GetAllUserQuery } from "@/client/state/query/get-all-user.query";
import { StateUserService } from "@/client/state/state-user.service";
import { UserEntityInterface } from "@/user/entity/user-entity.interface";

export class GetAllUserQueryHandler implements QueryHandlerInterface<GetAllUserQuery> {
    constructor(
        private readonly stateUserService: StateUserService
    ) {}

    async execute(_: GetAllUserQuery): Promise<UserEntityInterface[]> {
        return this.stateUserService.getUsers();
    }
}