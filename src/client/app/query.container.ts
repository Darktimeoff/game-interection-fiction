import { QueryBus } from "@/generic/cqrs/query/query-bus";
import { GetAllUserQueryHandler } from "@/client/state/query-handler/get-all-users.query-handler";
import { GetAllUserQuery } from "@/client/state/query/get-all-user.query";
import stateUserService from "@/client/state/state.container";
import { GetCurrentUserQueryHandler } from "@/client/state/query-handler/get-current-user.query-handler";
import { GetCurrentUserQuery } from "@/client/state/query/get-current-user.query";
import { GetStoryUserByUserIdQuery } from "@/story-user/query/get-story-user-by-user-id.query";
import { GetStoryUserByUserIdQueryHandler } from "@/story-user/query-handler/get-story-user-by-user-id.command-handler";
import storyUserService from "@/story-user/story-user.container";
import { GetStoryItemByUserIdQuery } from "@/story-user/query/get-story-item-by-user-id.query";
import { GetStoryItemByUserIdQueryHandler } from "@/story-user/query-handler/get-story-item-by-user-id.command-handler";
import { storyHandleService } from "@/story/story.container";
import { GetIsStoryEndedByUserIdQuery } from "@/story-user/query/get-is-story-ended-by-user-id.query";
import { GetIsStoryEndedByUserIdQueryHandler } from "@/story-user/query-handler/get-is-story-ended-by-user-id.query-handler";

export const queryBus = new QueryBus()

queryBus.register(GetAllUserQuery, new GetAllUserQueryHandler(stateUserService))
queryBus.register(GetCurrentUserQuery, new GetCurrentUserQueryHandler(stateUserService))   
queryBus.register(GetStoryUserByUserIdQuery, new GetStoryUserByUserIdQueryHandler(storyUserService))
queryBus.register(GetStoryItemByUserIdQuery, new GetStoryItemByUserIdQueryHandler(storyHandleService, storyUserService))
queryBus.register(GetIsStoryEndedByUserIdQuery, new GetIsStoryEndedByUserIdQueryHandler(storyUserService))