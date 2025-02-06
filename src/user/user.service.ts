import { Log, LogClass } from "@/generic/logging/log.decorator";
import { UserCreateDtoInterface } from "./dto/user-create-dto.interface";
import { UserEntityInterface } from "./entity/user-entity.interface";
import { UserRepository } from "@/user/user.repository";

@LogClass()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    @Log(
        (user) => `Create user ${JSON.stringify(user)}`,
        (res, user) => `Created user ${JSON.stringify(user)}: ${JSON.stringify(res)}`,
        (err, user) => `Error creating user ${JSON.stringify(user)}: ${err}`
    )
    async createUser(user: UserCreateDtoInterface): Promise<UserEntityInterface> {
        return this.userRepository.create(user);
    }

    @Log(
        () => `Find all users`,
        (res) => `Found all users: ${JSON.stringify(res)}`,
        (err) => `Error finding all users: ${err}`
    )
    async getUsers(): Promise<UserEntityInterface[]> {
        return this.userRepository.findAll();
    }
}