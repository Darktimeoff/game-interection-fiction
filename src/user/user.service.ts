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

    @Log(
        (name) => `Find user by name: ${name}`,
        (user, name) => `Found user by name ${name}: ${JSON.stringify(user)}`,
        (error, name) => `Error finding user by name ${name}: ${error}`
    )
    async findByName(name: string): Promise<UserEntityInterface | null> {
        return this.userRepository.findByName(name)
    }

    @Log(
        (id) => `Find user by id: ${id}`,
        (user, id) => `Found user by id ${id}: ${JSON.stringify(user)}`,
        (error, id) => `Error finding user by id ${id}: ${error}`
    )
    async findById(id: number): Promise<UserEntityInterface | null> {
        return this.userRepository.findById(id)
    }

    @Log(
        (id) => `Deleting user by id: ${id}`,
        (user, id) => `User deleted by id ${id}: ${JSON.stringify(user)}`,
        (error, id) => `Error deleting user by id ${id}: ${error}`
    )
    async deleteById(id: number): Promise<boolean> {
        return this.userRepository.deleteById(id)
    }

    @Log(
        (name) => `Deleting user by name: ${name}`,
        (user, name) => `User deleted by name ${name}: ${JSON.stringify(user)}`,
        (error, name) => `Error deleting user by name ${name}: ${error}`
    )
    async deleteByName(name: string): Promise<boolean> {
        return this.userRepository.deleteByName(name)
    }
}