import { Query } from "@/generic/cqrs/query/query"
import { StoryUserEntityInterface } from "@/story-user/entity/story-user-entity.interface"
import { StoryItemProgressInterface } from "@/story/interfaces/story-item-progress.interfce"

export class GetStoryItemByUserIdQuery extends Query<StoryItemProgressInterface> {
    constructor(
        public readonly userId: StoryUserEntityInterface['userId']
    ) {
        super()
    }
}