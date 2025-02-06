import { UserRepository } from "@/user/user.repository";
import { StorageFileService } from "@/generic/storage/storage-file.service";
import { UserEntityInterface } from "@/user/entity/user-entity.interface";
import fs from 'node:fs/promises';
import { UserCreateDtoInterface } from "@/user/dto/user-create-dto.interface";

const FILE_NAME = 'users.json';

describe('UserRepository', () => {
    let userRepository: UserRepository;

    beforeEach(() => {
        fs.writeFile(FILE_NAME, JSON.stringify([]));
        userRepository = new UserRepository(new StorageFileService<UserEntityInterface>(FILE_NAME));
    })

    afterEach(() => {
        fs.unlink(FILE_NAME);
    })

    it('should create user', async () => {
        const userData: UserCreateDtoInterface = { name: 'John' };
        const user = await userRepository.create(userData);
        expect(user.name).toEqual(userData.name);
        expect(user.id).toBeDefined();
        expect(user.createdAt).toBeDefined();
        expect(user.updatedAt).toBeDefined();
    });

    it('should find all users', async () => {
        const userData: UserCreateDtoInterface = { name: 'John' };
        await userRepository.create(userData);
        const users = await userRepository.findAll();
        expect(users.length).toEqual(1);
        expect(users[0].name).toEqual(userData.name);
    });
});