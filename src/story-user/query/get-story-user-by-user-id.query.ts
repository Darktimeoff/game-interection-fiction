import { Query } from "@/generic/cqrs/query/query";
import { StoryUserFullEntityInterface } from "@/story-user/entity/story-user-full-entity.interface";
import { StoryUserEntityInterface } from "@/story-user/entity/story-user-entity.interface";

export class GetStoryUserByUserIdQuery extends Query<StoryUserFullEntityInterface> {
    constructor(public readonly userId: StoryUserEntityInterface['userId']) {
        super()
    }
}