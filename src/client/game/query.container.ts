import { QueryBus } from "@/generic/cqrs/query/query-bus";
import { GetAllUserQueryHandler } from "@/client/state/query-handler/get-all-users.query-handler";
import { GetAllUserQuery } from "@/client/state/query/get-all-user.query";
import stateUserService from "@/client/state/state.container";
import { GetCurrentUserQueryHandler } from "@/client/state/query-handler/get-current-user.query-handler";
import { GetCurrentUserQuery } from "@/client/state/query/get-current-user.query";
import { GetStoryUserByUserIdQuery } from "@/story-user/query/get-story-user-by-user-id.query";
import { GetStoryUserByUserIdQueryHandler } from "@/story-user/query-handler/get-story-user-by-user-id.command-handler";
import storyUserService from "@/story-user/story-user.container";

export const queryBus = new QueryBus()

queryBus.register(GetAllUserQuery, new GetAllUserQueryHandler(stateUserService))
queryBus.register(GetCurrentUserQuery, new GetCurrentUserQueryHandler(stateUserService))   
queryBus.register(GetStoryUserByUserIdQuery, new GetStoryUserByUserIdQueryHandler(storyUserService))