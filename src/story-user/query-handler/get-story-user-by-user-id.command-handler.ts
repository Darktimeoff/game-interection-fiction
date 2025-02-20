import { QueryHandlerInterface } from "@/generic/cqrs/query/interface/query-handler.interface";
import { GetStoryUserByUserIdQuery } from "@/story-user/query/get-story-user-by-user-id.query";
import { StoryUserService } from "@/story-user/story-user.service";
import { StoryUserFullEntityInterface } from "@/story-user/entity/story-user-full-entity.interface";

export class GetStoryUserByUserIdQueryHandler implements QueryHandlerInterface<GetStoryUserByUserIdQuery> {
    constructor(private readonly storyUserService: StoryUserService) {}

    async execute({userId}: GetStoryUserByUserIdQuery): Promise<StoryUserFullEntityInterface> {
        return this.storyUserService.findByUserId(userId)
    }
}