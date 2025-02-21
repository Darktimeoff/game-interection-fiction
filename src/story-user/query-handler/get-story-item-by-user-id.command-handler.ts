import { GetStoryItemByUserIdQuery } from "@/story-user/query/get-story-item-by-user-id.query"
import { StoryUserService } from "@/story-user/story-user.service";
import { StoryHandleService } from "@/story/story-handle.service";
import { QueryHandlerInterface } from "@/generic/cqrs/query/interface/query-handler.interface";

export class GetStoryItemByUserIdQueryHandler implements QueryHandlerInterface<GetStoryItemByUserIdQuery> {
    constructor(
      private readonly storyHandle: StoryHandleService,
      private readonly storyUser: StoryUserService
    ) {
    }

    async execute({userId}: GetStoryItemByUserIdQuery) {
      const {storyState} = await this.storyUser.findByUserId(userId)

      return await this.storyHandle.handle(storyState)
    }
}