import { StateStore } from "@/client/state/state.store";
import { ValidationError } from "@/generic/errors/validation.error";
import { Log, LogClass } from "@/generic/logging/log.decorator";
import { UserService } from "@/user/user.service";

@LogClass()
export class MenuActionsService {
    constructor(
        private readonly stateStore: StateStore,
        private readonly userService: UserService
    ) {}

    @Log(
        (name) => `Creating user with name: ${name}`, 
        (user, name) => `User created with name ${name}: ${JSON.stringify(user)}`,
        (error, name) => `Failed to create user with name ${name}: ${error}`
    )
    async createUser(name: string) {
        await this.validateUser(name)

        const user = await this.userService.createUser({
            name
        })
        this.stateStore.setUser(user)

        return user
    }

    private async validateUser(name: string): Promise<void> {
        const user = await this.userService.findByName(name)
        if(user) {
            throw new ValidationError('User already exists')
        }
    }
}