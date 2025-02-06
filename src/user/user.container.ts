import { UserService } from "@/user/user.service";
import { UserRepository } from "@/user/user.repository";
import { StorageFileService } from "@/generic/storage/storage-file.service";
import { UserEntityInterface } from "@/user/entity/user-entity.interface";
import path from 'node:path';

const pathToFile = path.join(process.cwd(), 'data', 'users.json');
const userRepository = new UserRepository(new StorageFileService<UserEntityInterface>(pathToFile));
const userService = new UserService(userRepository);

export default {
    userService,
}