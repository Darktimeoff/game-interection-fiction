import { QueryBus } from "@/generic/cqrs/query/query-bus";
import { GetAllUserQueryHandler } from "@/client/state/query-handler/get-all-users.query-handler";
import { GetAllUserQuery } from "@/client/state/query/get-all-user.query";
import stateUserService from "@/client/state/state.container";

export const queryBus = new QueryBus()

queryBus.register(GetAllUserQuery, new GetAllUserQueryHandler(stateUserService))