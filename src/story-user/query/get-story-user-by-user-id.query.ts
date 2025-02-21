import { Query } from "@/generic/cqrs/query/query";
import { StoryUserEntityInterface } from "@/story-user/entity/story-user-entity.interface";

export class GetStoryUserByUserIdQuery extends Query<StoryUserEntityInterface> {
    constructor(public readonly userId: StoryUserEntityInterface['userId']) {
        super()
    }
}