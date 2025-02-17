import { StateUserService } from "@/client/state/state-user.service";
import { StoryUserService } from "@/story-user/story-user.service";

export class GameStoryService {
    constructor(
        private readonly stateUserService: StateUserService,
        private readonly storyUserService: StoryUserService,
    ) {}

    async getStory(): Promise<void> {
        const user = this.stateUserService.getCurrentUser()
        if(!user) {
            throw new Error('Current user not selected')
        }

        const storyUser = await this.storyUserService.findByUserId(user.id)
        console.log(storyUser)
    }
}