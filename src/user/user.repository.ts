import { StorageInterface } from "@/generic/storage/storage.interface";
import { UserEntity } from "./entity/user.entity";
import { UserEntityInterface } from "./entity/user-entity.interface";
import { UserCreateDtoInterface } from "./dto/user-create-dto.interface";
import { LogClass } from "@/generic/logging/log.decorator";

@LogClass()
export class UserRepository {
    constructor(
        private readonly storage: StorageInterface<UserEntityInterface>
    ) {}


    async create(user:UserCreateDtoInterface): Promise<UserEntityInterface> {
        const userEntity = new UserEntity({
            ...user,
            id: Date.now(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return this.storage.create(userEntity);
    }

    async findAll(): Promise<UserEntityInterface[]> {
        return this.storage.findAll();
    }

    async findById(id: number): Promise<UserEntityInterface | null> {
        return this.storage.findOne({ id });
    }

    async findByName(name: string): Promise<UserEntityInterface | null> {
        return this.storage.findOne({ name });
    }
}