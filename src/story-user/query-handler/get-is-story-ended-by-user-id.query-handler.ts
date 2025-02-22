
import { QueryHandlerInterface } from "@/generic/cqrs/query/interface/query-handler.interface";
import { GetIsStoryEndedByUserIdQuery } from "@/story-user/query/get-is-story-ended-by-user-id.query";
import { StoryUserService } from "@/story-user/story-user.service";

export class GetIsStoryEndedByUserIdQueryHandler implements QueryHandlerInterface<GetIsStoryEndedByUserIdQuery> {
    constructor(private readonly storyUserService: StoryUserService) {}

    async execute({userId}: GetIsStoryEndedByUserIdQuery) {
        const storyUser = await this.storyUserService.findByUserId(userId)
        return storyUser.storyState.isEnded
    }
}