import { QueryHandlerInterface } from "@/generic/cqrs/query/interface/query-handler.interface";
import { GetStoryUserByUserIdQuery } from "@/story-user/query/get-story-user-by-user-id.query";
import { StoryUserService } from "@/story-user/story-user.service";

export class GetStoryUserByUserIdQueryHandler implements QueryHandlerInterface<GetStoryUserByUserIdQuery> {
    constructor(private readonly storyUserService: StoryUserService) {}

    async execute({userId}: GetStoryUserByUserIdQuery) {
        return this.storyUserService.findByUserId(userId)
    }
}