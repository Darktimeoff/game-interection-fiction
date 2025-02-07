import { StateStore } from "@/client/state/state.store";
import { ValidationError } from "@/generic/errors/validation.error";
import { Log, LogClass } from "@/generic/logging/log.decorator";
import { UserEntityInterface } from "@/user/entity/user-entity.interface";
import { UserService } from "@/user/user.service";

@LogClass()
export class StateUserService {
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

    @Log(
        () => `Getting users`, 
        (users) => `Users: ${JSON.stringify(users)}`,
        (error) => `Failed to get users: ${error}`
    )
    async getUsers(): Promise<UserEntityInterface[]> {
        return await this.userService.getUsers()
    }

    @Log(
        (id) => `Selecting user by id: ${id}`,
        (user, id) => `User selected by id ${id}: ${JSON.stringify(user)}`,
        (error, id) => `Failed to select user by id ${id}: ${error}`
    )
    async selectUserByName(name: string): Promise<UserEntityInterface> {
        const user = await this.userService.findByName(name)
        if(!user) {
            throw new ValidationError('User not found')
        }

        this.stateStore.setUser(user)

        return user
    }

    @Log(
        (id) => `Deleting user by id: ${id}`,
        (user, id) => `User deleted by id ${id}: ${JSON.stringify(user)}`,
        (error, id) => `Error deleting user by id ${id}: ${error}`
    )
    async deleteUserByName(name: string): Promise<void> {
        const currentUser = this.stateStore.user
        if(currentUser?.name === name) {
            throw new ValidationError('Cannot delete current user')
        }

        const isDeleted = await this.userService.deleteByName(name)
        if(!isDeleted) {
            throw new ValidationError('User not found')
        }
    }

    private async validateUser(name: string): Promise<void> {
        const user = await this.userService.findByName(name)
        if(user) {
            throw new ValidationError('User already exists')
        }
    }
}