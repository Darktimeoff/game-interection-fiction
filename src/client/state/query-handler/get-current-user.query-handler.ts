
import { QueryHandlerInterface } from "@/generic/cqrs/query/interface/query-handler.interface";
import { GetCurrentUserQuery } from "@/client/state/query/get-current-user.query";
import { StateUserService } from "@/client/state/state-user.service";
import { UserEntityInterface } from "@/user/entity/user-entity.interface";

export class GetCurrentUserQueryHandler implements QueryHandlerInterface<GetCurrentUserQuery> {
    constructor(private readonly stateUserService: StateUserService) {
        
    }

    async execute(_: GetCurrentUserQuery): Promise<UserEntityInterface | null> {
        return this.stateUserService.getCurrentUser();
    }
}