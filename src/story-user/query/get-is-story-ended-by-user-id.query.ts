import { Query } from "@/generic/cqrs/query/query";
import { StoryUserEntityInterface } from "@/story-user/entity/story-user-entity.interface";

export class GetIsStoryEndedByUserIdQuery extends Query<boolean> {
    constructor(
        public readonly userId: StoryUserEntityInterface['userId']
    ) {
        super()
    }
}